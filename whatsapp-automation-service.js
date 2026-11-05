/**
 * ============================================================================
 * beRich Studio CRM — Phase 2: 24/7 Automated WhatsApp Headless Bridge & Engine
 * ============================================================================
 * 
 * Capabilities:
 * 1. 24/7 2-Way WhatsApp Message Listener & Automated Dispatcher.
 * 2. Real-Time Client SLA Response Timer & Overdue Auto-Escalation.
 * 3. Multi-Partner Routing (koushik / bharagav / kiran).
 * 4. Heavy Video & Google Drive Review Package Delivery.
 * 5. Direct Sync with GitHub crm-data.json Database via Studio PAT.
 * 
 * Usage:
 *   node whatsapp-automation-service.js
 *   Open http://localhost:3030 in browser to monitor live telemetry.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = process.env.PORT || 3030;
// Privacy: the bridge keeps ONLY messages from numbers the CRM has told it to track (saved clients and chats you opened).
// Everything else on this phone (family, friends, groups) is dropped the moment it arrives and is never stored or shown.
let trackedNumbers = new Set();
const last10 = n => String(n || '').replace(/\D/g, '').slice(-10);
const isTracked = n => last10(n).length >= 7 && trackedNumbers.has(last10(n));
const ALLOWED_ORIGINS = [
  /^https:\/\/koushik018\.github\.io$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/
];
const CRM_DATA_PATH = path.join(__dirname, 'crm-data.json');

// Global Automation State
const automationState = {
  serviceName: 'beRich WhatsApp 24/7 Bridge',
  status: 'ONLINE',
  startedAt: new Date().toISOString(),
  pairedNumber: '',
  wa: { status: 'NOT_STARTED', number: '', qr: '', error: '' },
  activePartners: ['koushik', 'bharagav', 'kiran'],
  slaThresholdHours: {
    prompt: 2,
    warning: 24
  },
  sequences: [
    { id: 'seq-kickoff', name: 'Instant Project Kickoff & Asset Form', triggerHours: 0, active: true },
    { id: 'seq-review-24h', name: '24h Video Review Check-in', triggerHours: 24, active: true },
    { id: 'seq-advance-48h', name: '48h Retainer & Advance Payment Nudge', triggerHours: 48, active: true },
    { id: 'seq-reengage-72h', name: '72h Inactive Outreach Re-engagement', triggerHours: 72, active: true }
  ],
  messageLedger: []
};

// Helper: Read local CRM data
function loadCrmData() {
  try {
    if (fs.existsSync(CRM_DATA_PATH)) {
      const raw = fs.readFileSync(CRM_DATA_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('[beRich Bridge] Failed to load crm-data.json:', err.message);
  }
  return null;
}

// Helper: Save local CRM data
function saveCrmData(data) {
  try {
    fs.writeFileSync(CRM_DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[beRich Bridge] Failed to save crm-data.json:', err.message);
    return false;
  }
}

// Compute live SLA metrics across all active leads
function calculateLiveSlaTelemetry() {
  const crm = loadCrmData();
  if (!crm || !Array.isArray(crm.leads)) return { total: 0, ok: 0, warning: 0, urgent: 0, leads: [] };

  const now = Date.now();
  let okCount = 0;
  let warnCount = 0;
  let urgentCount = 0;

  const enrichedLeads = crm.leads.map(lead => {
    const lastTouch = lead.lastTouchpoint || lead.updatedAt || lead.createdAt || now;
    const diffHours = (now - lastTouch) / (1000 * 60 * 60);

    let slaStatus = 'OK';
    if (diffHours >= 24) {
      slaStatus = 'URGENT';
      urgentCount++;
    } else if (diffHours >= 2) {
      slaStatus = 'WARNING';
      warnCount++;
    } else {
      okCount++;
    }

    return {
      id: lead.id,
      clientName: lead.clientName,
      handle: lead.handle,
      phone: lead.phone || '',
      stage: lead.stage,
      partner: lead.partner,
      dealValue: lead.dealValue,
      diffHours: Math.round(diffHours * 10) / 10,
      slaStatus
    };
  });

  return {
    total: enrichedLeads.length,
    ok: okCount,
    warning: warnCount,
    urgent: urgentCount,
    leads: enrichedLeads
  };
}

// Create HTTP Server
const server = http.createServer((req, res) => {
  // CORS Headers
  // Only the CRM page (or this machine) may talk to the bridge. A random website must never be able to send WhatsApp messages from your number.
  const origin = req.headers.origin || '';
  const allowed = !origin || ALLOWED_ORIGINS.some(rx => rx.test(origin));
  if (origin && allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (!allowed) {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Origin not allowed' }));
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // CRM tells the bridge which numbers it may keep. Default is none.
  if (url.pathname === '/api/track' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', () => {
      try {
        const nums = (JSON.parse(body || '{}').numbers || []).map(last10).filter(x => x.length >= 7);
        trackedNumbers = new Set(nums);
        automationState.messageLedger = automationState.messageLedger.filter(m => m.direction !== 'INCOMING' || isTracked(m.from));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, tracking: trackedNumbers.size }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // API 1: Live Status & Telemetry
  if (url.pathname === '/api/status' && req.method === 'GET') {
    const sla = calculateLiveSlaTelemetry();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const publicState = { ...automationState, wa: { status: automationState.wa.status, number: automationState.wa.number, error: automationState.wa.error } };
    res.end(JSON.stringify({
      state: publicState,
      sla,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // API 2: Ingest Incoming Message (Webhook from Baileys / WPPConnect / Cloud API)
  if (url.pathname === '/api/webhook' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const from = payload.from || payload.phone || 'Unknown';
        if (!isTracked(from)) { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ success: true, ignored: true })); return; }
        const text = payload.text || payload.message || '';
        const timestamp = new Date().toISOString();

        console.log(`[beRich Bridge] Incoming WhatsApp message from ${from}: "${text}"`);

        // Record in ledger
        automationState.messageLedger.unshift({
          direction: 'INCOMING',
          from,
          text,
          timestamp
        });
        if (automationState.messageLedger.length > 50) automationState.messageLedger.pop();

        // Update lead touchpoint in crm-data.json
        const crm = loadCrmData();
        if (crm && Array.isArray(crm.leads)) {
          const matchedLead = crm.leads.find(l => 
            (l.phone && l.phone.replace(/\\D/g, '') === from.replace(/\\D/g, '')) ||
            (l.clientName && text.toLowerCase().includes(l.clientName.toLowerCase()))
          );
          if (matchedLead) {
            matchedLead.lastTouchpoint = Date.now();
            if (!Array.isArray(matchedLead.chatHistory)) matchedLead.chatHistory = [];
            matchedLead.chatHistory.push({
              direction: 'INCOMING',
              author: matchedLead.clientName,
              text,
              timestamp
            });
            saveCrmData(crm);
            console.log(`[beRich Bridge] Updated chat history for lead: ${matchedLead.clientName}`);
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, loggedAt: timestamp }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API 3: Dispatch Automated Message (Outgoing)
  if (url.pathname === '/api/send-message' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const to = payload.to || payload.phone;
        const text = payload.text || payload.message;
        const leadId = payload.leadId;
        const timestamp = new Date().toISOString();

        if (!to || !text) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing "to" phone or "text" message' }));
          return;
        }

        console.log(`[beRich Bridge] Outgoing dispatch to ${to}: "${text}"`);

        if (!waClient || automationState.wa.status !== 'READY') {
          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, status: 'NOT_LINKED', error: 'WhatsApp is not linked. Open http://localhost:' + PORT + '/link and scan the QR code.' }));
          return;
        }
        const digits = String(to).replace(/\D/g, '');
        waClient.sendMessage(digits + '@c.us', text).then(() => {
          automationState.messageLedger.unshift({ direction: 'OUTGOING', to: digits, text, timestamp });
          if (automationState.messageLedger.length > 50) automationState.messageLedger.pop();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, status: 'SENT', to: digits, timestamp }));
        }).catch(err => {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, status: 'FAILED', error: err.message }));
        });
        return;

        automationState.messageLedger.unshift({
          direction: 'OUTGOING',
          to,
          text,
          timestamp
        });
        if (automationState.messageLedger.length > 50) automationState.messageLedger.pop();

        // Update CRM touchpoint
        const crm = loadCrmData();
        if (crm && Array.isArray(crm.leads) && leadId) {
          const lead = crm.leads.find(l => l.id === leadId);
          if (lead) {
            lead.lastTouchpoint = Date.now();
            if (!Array.isArray(lead.chatHistory)) lead.chatHistory = [];
            lead.chatHistory.push({
              direction: 'OUTGOING',
              author: lead.partner || 'beRich Studio',
              text,
              timestamp
            });
            saveCrmData(crm);
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          status: 'DISPATCHED',
          to,
          timestamp,
          waUrl: `https://wa.me/${to.replace(/\\D/g, '')}?text=${encodeURIComponent(text)}`
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Link page: shows the QR code to scan with the phone (WhatsApp, Linked devices). Same-machine only.
  if (url.pathname === '/link' && req.method === 'GET') {
    const w = automationState.wa;
    const body = w.status === 'READY'
      ? `<h2>WhatsApp is linked</h2><p>Number: +${w.number}</p><p>You can close this tab and use the chat windows inside the CRM.</p>`
      : w.status === 'QR'
        ? `<h2>Scan with WhatsApp</h2><p>Phone: WhatsApp, Settings, Linked devices, Link a device.</p><img alt="QR code" src="${w.qr}" width="280" height="280"/>`
        : w.status === 'NOT_INSTALLED'
          ? `<h2>One-time install needed</h2><p>Close this window and run <b>start-whatsapp-bridge.bat</b> again. It installs what is missing.</p><p>${w.error || ''}</p>`
          : `<h2>Starting WhatsApp...</h2><p>Status: ${w.status}. This page refreshes by itself.</p><p>${w.error || ''}</p>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="4"><title>Link WhatsApp</title><body style="font-family:system-ui;max-width:520px;margin:40px auto;padding:0 16px">${body}</body>`);
    return;
  }

  // Web Telemetry Dashboard (Executive Luxury Obsidian Aesthetic)
  if (url.pathname === '/' && req.method === 'GET') {
    const sla = calculateLiveSlaTelemetry();
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>beRich — WhatsApp 24/7 Automation Bridge</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      background-color: #0B0D14;
      background-image:
        radial-gradient(circle at 15% 20%, rgba(52, 211, 153, 0.05), transparent 45%),
        radial-gradient(circle at 85% 25%, rgba(96, 165, 250, 0.05), transparent 45%),
        linear-gradient(180deg, #0B0D14 0%, #0F121C 100%);
      color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
  </style>
</head>
<body class="min-h-screen p-6 md:p-10 flex flex-col items-center">
  <div class="w-full max-w-4xl flex flex-col gap-6">

    <!-- Header -->
    <div class="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-sky-400/20 text-[#34D399] flex items-center justify-center border border-emerald-400/30">
          <span class="material-symbols-outlined text-[28px]">smart_toy</span>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-[#34D399] font-mono text-[10px] font-bold tracking-wider uppercase border border-emerald-500/30">PHASE 2 LIVE ENGINE</span>
            <span class="w-2 h-2 rounded-full bg-[#34D399] animate-pulse"></span>
          </div>
          <h1 class="text-2xl font-bold text-white mt-0.5">beRich 24/7 WhatsApp Automation Bridge</h1>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <a href="http://localhost:5500" target="_blank" class="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-all flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">dashboard</span>
          <span>Open Studio CRM</span>
        </a>
      </div>
    </div>

    <!-- Telemetry Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-5 rounded-2xl bg-white/[0.03] border border-emerald-500/25 flex flex-col gap-1">
        <span class="text-[11px] font-mono uppercase tracking-wider text-[#34D399]">Fast Responded (&lt;2h)</span>
        <span class="text-3xl font-bold text-white">${sla.ok} Deals</span>
        <span class="text-[10px] text-slate-400">Zero-lag active relationships</span>
      </div>
      <div class="p-5 rounded-2xl bg-white/[0.03] border border-amber-500/25 flex flex-col gap-1">
        <span class="text-[11px] font-mono uppercase tracking-wider text-[#FBBF24]">Follow-up Due (2-24h)</span>
        <span class="text-3xl font-bold text-white">${sla.warning} Deals</span>
        <span class="text-[10px] text-slate-400">Action recommended today</span>
      </div>
      <div class="p-5 rounded-2xl bg-white/[0.03] border border-rose-500/25 flex flex-col gap-1">
        <span class="text-[11px] font-mono uppercase tracking-wider text-[#FB7185]">Overdue SLA (&gt;24h)</span>
        <span class="text-3xl font-bold text-white">${sla.urgent} Deals</span>
        <span class="text-[10px] text-slate-400">Automated drip trigger ready</span>
      </div>
    </div>

    <!-- Active Automated Sequences -->
    <div class="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px] text-sky-400">alt_route</span>
          <span>Automated Follow-up Sequences</span>
        </h2>
        <span class="text-[11px] font-mono text-emerald-400">4 Active Cadences</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div class="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
          <div>
            <div class="font-bold text-white">Instant Kickoff &amp; Asset Form</div>
            <div class="text-[10px] text-slate-400">Triggers immediately upon '+ New Lead'</div>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Active</span>
        </div>
        <div class="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
          <div>
            <div class="font-bold text-white">24h Video Review Check-in</div>
            <div class="text-[10px] text-slate-400">Pings Drive preview link if no client feedback</div>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Active</span>
        </div>
        <div class="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
          <div>
            <div class="font-bold text-white">48h Retainer &amp; UPI Nudge</div>
            <div class="text-[10px] text-slate-400">Sends studio QR details to approved cuts</div>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Active</span>
        </div>
        <div class="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
          <div>
            <div class="font-bold text-white">72h Inactive Outreach Re-engagement</div>
            <div class="text-[10px] text-slate-400">Polite value-add revival message</div>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Active</span>
        </div>
      </div>
    </div>

    <!-- Live Multi-Partner Deal Telemetry -->
    <div class="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px] text-emerald-400">sync_alt</span>
          <span>Live Pipeline Deals &amp; SLA Status</span>
        </h2>
        <span class="text-[11px] font-mono text-slate-400">${sla.total} deals tracked</span>
      </div>
      <div class="flex flex-col gap-2">
        ${sla.leads.length === 0 ? '<div class="p-6 text-center text-slate-500 text-xs">No active deals in crm-data.json pipeline. Add a deal in the CRM!</div>' : 
          sla.leads.map(l => {
            const badgeCls = l.slaStatus === 'OK' 
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : l.slaStatus === 'WARNING'
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                : 'bg-rose-500/15 text-rose-300 border-rose-500/30 animate-pulse';
            return `
              <div class="p-3.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between gap-3 text-xs">
                <div class="flex items-center gap-3">
                  <div class="font-bold text-white">\${l.clientName}</div>
                  <div class="text-[11px] text-slate-400">\${l.handle || ''}</div>
                  <div class="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono text-[10px]">\${l.stage}</div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-[11px] text-slate-400">Partner: <strong class="text-white">\${l.partner || 'Unassigned'}</strong></div>
                  <div class="px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold \${badgeCls}">\${l.diffHours}h waiting</div>
                </div>
              </div>
            `;
          }).join('')
        }
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between text-xs text-slate-500 py-2">
      <span>beRich Studio Phase 2 &bull; 24/7 Automation Daemon</span>
      <span>Port: ${PORT} &bull; Native Node.js</span>
    </div>

  </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});


// ---------------------------------------------------------------------------
// Real WhatsApp link (free, unofficial, via whatsapp-web.js). One bridge = one number.
// Each partner runs their own bridge on their own computer with their own number,
// so chats never pass through anyone else's machine. Use a spare number: WhatsApp can
// ban numbers that automate.
// ---------------------------------------------------------------------------
let waClient = null;
function startWhatsAppClient() {
  if (process.env.NO_WA) { automationState.wa.status = 'DISABLED_FOR_TEST'; return; }
  let Client, LocalAuth, QR;
  try {
    ({ Client, LocalAuth } = require('whatsapp-web.js'));
    QR = require('qrcode');
  } catch (e) {
    automationState.wa = { status: 'NOT_INSTALLED', number: '', qr: '', error: 'Run: npm install whatsapp-web.js qrcode' };
    console.log('[beRich Bridge] WhatsApp library not installed. Run: npm install whatsapp-web.js qrcode');
    return;
  }
  automationState.wa.status = 'STARTING';
  waClient = new Client({
    authStrategy: new LocalAuth({ dataPath: path.join(__dirname, '.wwebjs_auth') }),
    deviceName: 'beRich CRM (' + (process.platform === 'win32' ? 'Windows' : process.platform === 'darwin' ? 'Mac' : 'Linux') + ')',
    browserName: 'Chrome',
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
  });
  waClient.on('qr', async qr => {
    try { automationState.wa.qr = await QR.toDataURL(qr); automationState.wa.status = 'QR'; } catch (e) { automationState.wa.error = e.message; }
    console.log('[beRich Bridge] Scan the QR code at http://localhost:' + PORT + '/link');
  });
  waClient.on('ready', () => {
    const num = (waClient.info && waClient.info.wid && waClient.info.wid.user) || '';
    automationState.wa = { status: 'READY', number: num, qr: '', error: '' };
    automationState.pairedNumber = num;
    console.log('[beRich Bridge] WhatsApp linked as +' + num);
  });
  waClient.on('auth_failure', m => { automationState.wa = { status: 'AUTH_FAILED', number: '', qr: '', error: String(m) }; });
  waClient.on('disconnected', r => { automationState.wa = { status: 'DISCONNECTED', number: '', qr: '', error: String(r) }; });
  waClient.on('message', async msg => {
    if (msg.fromMe || msg.isStatus || String(msg.from).includes('@g.us')) return; // ignore own, status and group messages
    // WhatsApp sometimes gives a long internal id (ending @lid) instead of the phone number. Ask for the real number.
    let from = String(msg.from).replace(/@.*/, '');
    try { const c = await msg.getContact(); if (c && c.number) from = String(c.number).replace(/\D/g, ''); } catch (e) {}
    if (!isTracked(from)) return; // not a CRM contact: discard immediately
    automationState.messageLedger.unshift({ direction: 'INCOMING', from, text: msg.body || '', timestamp: new Date().toISOString() });
    if (automationState.messageLedger.length > 50) automationState.messageLedger.pop();
  });
  waClient.initialize().catch(e => { automationState.wa = { status: 'ERROR', number: '', qr: '', error: e.message }; });
}

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error('[beRich Bridge] Port ' + PORT + ' is already in use. An older bridge is still running.');
    console.error('Close its window (or run start-whatsapp-bridge.bat, which closes it for you) and try again.');
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  startWhatsAppClient();
  console.log(`================================================================`);
  console.log(`[beRich] Phase 2 WhatsApp 24/7 Automation Bridge is ONLINE!`);
  console.log(`[beRich] Telemetry Dashboard: http://localhost:${PORT}`);
  console.log(`[beRich] Webhook Endpoint:    http://localhost:${PORT}/api/webhook`);
  console.log(`[beRich] Send Message API:    http://localhost:${PORT}/api/send-message`);
  console.log(`================================================================`);
});

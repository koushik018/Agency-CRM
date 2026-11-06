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

const { makeResolver } = require('./wa-resolve');
const PORT = process.env.PORT || 3030;
const resolver = makeResolver(() => waClient);
// Privacy: the bridge keeps ONLY messages from numbers the CRM has told it to track (saved clients and chats you opened).
// Everything else on this phone (family, friends, groups) is dropped the moment it arrives and is never stored or shown.
const TRACK_FILE = path.join(__dirname, 'tracked-numbers.json');
let trackedNumbers = new Set(); // last 10 digits, for matching
let trackedFull = new Set();    // full numbers with country code, for finding the chat
let lastSeen = {};              // full number -> unix seconds of the newest client message already handled
function saveTracked() { try { fs.writeFileSync(TRACK_FILE, JSON.stringify({ numbers: [...trackedFull], lastSeen }), 'utf-8'); } catch (e) {} }
const sseClients = new Set();
const trackedMsgIds = new Set();
function emitEvent(ev) {
  const line = 'data: ' + JSON.stringify(ev) + '\n\n';
  sseClients.forEach(c => { try { c.write(line); } catch (e) { sseClients.delete(c); } });
}
function emitStatus() { emitEvent({ kind: 'status', status: automationState.wa.status, number: automationState.wa.number }); }
const last10 = n => String(n || '').replace(/\D/g, '').slice(-10);
const isTracked = n => last10(n).length >= 7 && trackedNumbers.has(last10(n));
function fullFor(n) { const k = last10(n); for (const f of trackedFull) if (last10(f) === k) return f; return String(n).replace(/\D/g, ''); }
function loadTracked() {
  try {
    const j = JSON.parse(fs.readFileSync(TRACK_FILE, 'utf-8'));
    const arr = Array.isArray(j) ? j : (j.numbers || []);
    lastSeen = Array.isArray(j) ? {} : (j.lastSeen || {});
    trackedFull = new Set(arr); trackedNumbers = new Set(arr.map(last10));
  } catch (e) {}
}
loadTracked();
const MEDIA_DIR = path.join(__dirname, 'media');
const MIME_EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'video/mp4': 'mp4', 'audio/ogg': 'ogg', 'audio/mpeg': 'mp3', 'audio/mp4': 'm4a', 'application/pdf': 'pdf' };
const EXT_MIME = Object.fromEntries(Object.entries(MIME_EXT).map(([m, e]) => [e, m]));
const MAX_MEDIA_BYTES = 12 * 1024 * 1024;
const seenMsgIds = new Set();
function msgSerial(m) {
  const k = m && m.id;
  if (!k) return undefined;
  if (typeof k === 'string') return k;
  if (k._serialized) return k._serialized;
  if (!k.id) return undefined;
  const remote = k.remote && (k.remote._serialized || k.remote);
  const part = k.participant && (k.participant._serialized || k.participant);
  return [k.fromMe ? 'true' : 'false', remote, k.id, part].filter(x => x !== undefined && x !== null && x !== '').join('_');
}
function saveMediaFile(mimetype, base64, hintName) {
  const bytes = Buffer.from(base64, 'base64');
  if (bytes.length > MAX_MEDIA_BYTES) return { type: mimetype, name: hintName || 'file', tooBig: true, size: bytes.length };
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
  const ext = MIME_EXT[String(mimetype).split(';')[0]] || (String(hintName || '').split('.').pop().replace(/[^A-Za-z0-9]/g, '').slice(0, 5) || 'bin');
  const file = Date.now().toString(36) + Math.random().toString(36).slice(2, 8) + '.' + ext;
  fs.writeFileSync(path.join(MEDIA_DIR, file), bytes);
  try { const all = fs.readdirSync(MEDIA_DIR).map(n => ({ n, t: fs.statSync(path.join(MEDIA_DIR, n)).mtimeMs })).sort((x, y) => y.t - x.t); all.slice(300).forEach(o => fs.unlinkSync(path.join(MEDIA_DIR, o.n))); } catch (e) {}
  return { type: String(mimetype).split(';')[0], name: hintName || file, url: '/api/media/' + file, size: bytes.length };
}
async function saveMediaIfAny(msg) {
  try {
    if (!msg.hasMedia) return null;
    const m = await msg.downloadMedia();
    if (!m || !m.data) return null;
    return saveMediaFile(m.mimetype, m.data, m.filename);
  } catch (e) { return null; }
}
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
  ignoredMessages: 0,
  ignoredLog: [],
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

  // Put text into the message box of the real WhatsApp window and open that chat. Nothing is sent: the person presses Enter.
  if (url.pathname === '/api/draft' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', async () => {
      const send = (code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); };
      try {
        const payload = JSON.parse(body || '{}');
        const digits = String(payload.to || '').replace(/\D/g, '');
        const text = String(payload.text || '');
        if (!digits || !text) return send(400, { error: 'Missing "to" or "text"' });
        if (!waClient || automationState.wa.status !== 'READY') return send(503, { status: 'NOT_LINKED', error: 'WhatsApp is not linked.' });
        await waClient.interface.openChatWindow(digits + '@c.us');
        await waClient.pupPage.bringToFront().catch(() => {});
        await new Promise(r => setTimeout(r, 700));
        await waClient.pupPage.evaluate(t => {
          const box = document.querySelector('footer div[contenteditable="true"]') || document.querySelector('div[contenteditable="true"][data-tab="10"]');
          if (!box) throw new Error('Message box not found');
          box.focus();
          document.execCommand('selectAll', false, null);
          document.execCommand('insertText', false, t);
        }, text);
        return send(200, { success: true, status: 'DRAFTED' });
      } catch (e) {
        return send(502, { success: false, status: 'FAILED', error: e.message });
      }
    });
    return;
  }

  // CRM tells the bridge which numbers it may keep. Default is none.
  if (url.pathname === '/api/track' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', () => {
      try {
        const raw = (JSON.parse(body || '{}').numbers || []).map(n => String(n).replace(/\D/g, '')).filter(x => x.length >= 7);
        trackedFull = new Set(raw);
        trackedNumbers = new Set(raw.map(last10));
        const nowSec = Math.floor(Date.now() / 1000);
        raw.forEach(n => { if (!lastSeen[n]) lastSeen[n] = nowSec; }); // a newly tracked number starts from now, no old history
        saveTracked();
        seedLids(raw);
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

  // Live stream to the CRM: new replies, messages you sent, delivery ticks and link status. No waiting for a poll.
  if (url.pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive' });
    res.write('retry: 2000\n\n');
    sseClients.add(res);
    res.write('data: ' + JSON.stringify({ kind: 'status', status: automationState.wa.status, number: automationState.wa.number }) + '\n\n');
    const ka = setInterval(() => { try { res.write(': keep-alive\n\n'); } catch (e) {} }, 20000);
    req.on('close', () => { clearInterval(ka); sseClients.delete(res); });
    return;
  }

  // The newest messages of a CRM client's chat, straight from WhatsApp, so the CRM can show exactly what the phone shows.
  if (url.pathname === '/api/chat-history' && req.method === 'GET') {
    (async () => {
      const send = (code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); };
      try {
        const number = (url.searchParams.get('number') || '').replace(/\D/g, '');
        if (!isTracked(number)) return send(403, { error: 'Not a CRM client chat' });
        if (!waClient || automationState.wa.status !== 'READY') return send(503, { error: 'WhatsApp is not linked' });
        const wid = await waClient.getNumberId(number); if (!wid) return send(404, { error: 'That number is not on WhatsApp' });
        const chat = await waClient.getChatById(wid._serialized);
        const msgs = await chat.fetchMessages({ limit: 30 });
        for (const m of msgs) { const id = msgSerial(m); if (id && m.fromMe) trackedMsgIds.add(id); }
        return send(200, { success: true, messages: msgs.filter(m => !m.isStatus).map(m => ({ id: msgSerial(m), fromMe: !!m.fromMe, text: m.body || '', timestamp: new Date((m.timestamp || 0) * 1000).toISOString(), type: m.type, hasMedia: !!m.hasMedia, ack: m.ack })) });
      } catch (e) { return send(502, { error: e.message }); }
    })();
    return;
  }

  // Delete a whole chat from YOUR WhatsApp (the client keeps their copy). CRM client chats only.
  if (url.pathname === '/api/delete-chat' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', async () => {
      const send = (code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); };
      try {
        const number = String((JSON.parse(body || '{}')).number || '').replace(/\D/g, '');
        if (!isTracked(number)) return send(403, { error: 'Not a CRM client chat' });
        if (!waClient || automationState.wa.status !== 'READY') return send(503, { error: 'WhatsApp is not linked' });
        const wid = await waClient.getNumberId(number); if (!wid) return send(404, { error: 'That number is not on WhatsApp' });
        const chat = await waClient.getChatById(wid._serialized);
        const ok = await chat.delete();
        return send(200, { success: !!ok, deleted: 'me' });
      } catch (e) { return send(502, { success: false, error: e.message }); }
    });
    return;
  }

  // Pictures and files shared in CRM client chats.
  if (url.pathname.startsWith('/api/media/') && req.method === 'GET') {
    const file = path.basename(url.pathname.slice('/api/media/'.length));
    if (!/^[A-Za-z0-9_.-]+$/.test(file)) { res.writeHead(400); res.end(); return; }
    const full = path.join(MEDIA_DIR, file);
    if (!fs.existsSync(full)) { res.writeHead(404, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'Not found' })); return; }
    const ext = file.split('.').pop().toLowerCase();
    const mime = EXT_MIME[ext] || 'application/octet-stream';
    const inline = /^(image|video|audio)\//.test(mime) || mime === 'application/pdf';
    res.writeHead(200, { 'Content-Type': mime, 'X-Content-Type-Options': 'nosniff', 'Content-Disposition': (inline ? 'inline' : 'attachment') + '; filename="' + file + '"', 'Cache-Control': 'private, max-age=86400' });
    fs.createReadStream(full).pipe(res);
    return;
  }

  // Send a picture or file to a client.
  if (url.pathname === '/api/send-media' && req.method === 'POST') {
    let body = ''; let tooBig = false;
    req.on('data', c => { body += c; if (body.length > MAX_MEDIA_BYTES * 1.5) { tooBig = true; req.destroy(); } });
    req.on('end', async () => {
      const send = (code, obj) => { try { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); } catch (e) {} };
      try {
        if (tooBig) return send(413, { error: 'File too large (12 MB maximum)' });
        const p = JSON.parse(body || '{}');
        const digits = String(p.to || '').replace(/\D/g, '');
        if (!digits || !p.data || !p.mimetype) return send(400, { error: 'Missing "to", "data" or "mimetype"' });
        if (!waClient || automationState.wa.status !== 'READY') return send(503, { status: 'NOT_LINKED', error: 'WhatsApp is not linked' });
        const { MessageMedia } = require('whatsapp-web.js');
        const media = new MessageMedia(p.mimetype, p.data, p.filename || undefined);
        const sent = await waClient.sendMessage(digits + '@c.us', media, p.caption ? { caption: String(p.caption) } : {});
        const sid = msgSerial(sent);
        if (sent && sent.to) resolver.learn(sent.to, digits);
        if (sid) { trackedMsgIds.add(sid); seenMsgIds.add(sid); }
        const saved = saveMediaFile(p.mimetype, p.data, p.filename);
        automationState.messageLedger.unshift({ direction: 'OUTGOING', to: digits, text: p.caption || '', timestamp: new Date().toISOString(), id: sid, media: saved });
        if (automationState.messageLedger.length > 50) automationState.messageLedger.pop();
        return send(200, { success: true, status: 'SENT', id: sid, media: saved });
      } catch (e) {
        return send(502, { success: false, status: 'FAILED', error: e.message });
      }
    });
    return;
  }

  // Delete a message of a CRM client chat. Your own message: for everyone. A client's message: from your WhatsApp only.
  if (url.pathname === '/api/delete-message' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', async () => {
      const send = (code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); };
      try {
        const payload = JSON.parse(body || '{}');
        if (!payload.id && !(payload.number && payload.text)) return send(400, { error: 'Missing message id' });
        if (!waClient || automationState.wa.status !== 'READY') return send(503, { error: 'WhatsApp is not linked' });
        if (!payload.id) {
          // older CRM messages have no WhatsApp id: find the newest message with the same text near that time in this client's chat
          if (!isTracked(payload.number)) return send(403, { error: 'Not a CRM client chat' });
          const wid0 = await waClient.getNumberId(String(payload.number).replace(/\D/g, '')).catch(() => null);
          const chat0 = wid0 && await waClient.getChatById(wid0._serialized).catch(() => null);
          const list0 = chat0 ? await chat0.fetchMessages({ limit: 60 }).catch(() => []) : [];
          const want = String(payload.text).trim();
          const hit = list0.filter(m => !!m.fromMe === !!payload.fromMe && String(m.body || '').trim() === want && (!payload.ts || Math.abs(m.timestamp - payload.ts) < 900)).sort((x, y) => y.timestamp - x.timestamp)[0];
          if (!hit) return send(404, { error: 'could not find that message in WhatsApp (it may already be gone)' });
          payload.id = msgSerial(hit);
        }
        let msg = await waClient.getMessageById(payload.id).catch(() => null);
        if (!msg) return send(404, { error: 'WhatsApp no longer has this message in its list' });
        let contactNumber = '';
        try { const c = await msg.getChat(); const ct = c && (await c.getContact()); contactNumber = (ct && ct.number) || ''; } catch (e) {}
        const other = await resolver.resolveNumber(msg.fromMe ? msg.to : msg.from, contactNumber);
        if (!isTracked(other)) return send(403, { error: 'Not a CRM client chat' }); // never touch personal chats
        const wantEveryone = !!payload.everyone && !!msg.fromMe;
        // WhatsApp silently falls back to "delete for me" when it will not revoke. Ask first, then verify, so the CRM never claims more than happened.
        const info = await waClient.pupPage.evaluate(async id => {
          const M = window.require('WAWebCollections').Msg;
          const m = M.get(id) || ((await M.getMessagesById([id])) || {}).messages?.[0];
          if (!m) return null;
          let can = false;
          try { can = !!window.require('WAWebMsgActionCapability').canSenderRevokeMsg(m); } catch (e) {}
          return { can, ack: m.ack, ageHours: Math.round(((Date.now() / 1000) - (m.t || 0)) / 3600 * 10) / 10, type: m.type };
        }, payload.id).catch(() => null);
        if (wantEveryone && info && !info.can) {
          if (!payload.allowMeOnly) return send(409, { success: false, canRevoke: false, error: 'WhatsApp will not delete this one for the client (' + (info.ageHours > 48 ? 'it is older than 2 days' : 'WhatsApp says it can no longer be revoked') + ')', info });
          await msg.delete(false);
          return send(200, { success: true, deleted: 'me', note: 'WhatsApp would not delete it for the client', info });
        }
        await msg.delete(wantEveryone);
        let after = 'unknown';
        for (let i = 0; i < 10; i++) {
          await new Promise(r => setTimeout(r, 500));
          after = await waClient.pupPage.evaluate(id => { const m = window.require('WAWebCollections').Msg.get(id); return m ? (m.isRevoked || m.type === 'revoked' ? 'revoked' : m.type) : 'gone'; }, payload.id).catch(() => 'unknown');
          if (!wantEveryone || after === 'revoked') break;
        }
        trackedMsgIds.delete(payload.id);
        automationState.messageLedger = automationState.messageLedger.filter(m => m.id !== payload.id);
        if (wantEveryone) {
          if (after === 'revoked') return send(200, { success: true, deleted: 'everyone', verified: true, info });
          return send(200, { success: true, deleted: 'me', note: 'WhatsApp did not confirm deleting it for the client', verified: false, info });
        }
        return send(200, { success: true, deleted: 'me', info });
      } catch (e) {
        return send(502, { success: false, error: e.message });
      }
    });
    return;
  }

  // Restart the WhatsApp link (a stale QR code, or the WhatsApp window was closed).
  if (url.pathname === '/api/restart' && req.method === 'POST') {
    restartWhatsApp('Restarted from the CRM');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // The QR code for linking, shown inside the CRM. Only the CRM page (checked above) can read it.
  if (url.pathname === '/api/qr' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ status: automationState.wa.status, number: automationState.wa.number, error: automationState.wa.error, qr: automationState.wa.status === 'QR' ? automationState.wa.qr : '', qrAgeSec: automationState.wa.qrAt ? Math.round((Date.now() - automationState.wa.qrAt) / 1000) : null }));
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
        waClient.sendMessage(digits + '@c.us', text).then(sent => {
          const sid = msgSerial(sent);
          if (sent && sent.to) resolver.learn(sent.to, digits);
          if (sid) trackedMsgIds.add(sid);
          automationState.messageLedger.unshift({ direction: 'OUTGOING', to: digits, text, timestamp, id: sid });
          if (automationState.messageLedger.length > 50) automationState.messageLedger.pop();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, status: 'SENT', to: digits, timestamp, id: sid }));
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

// One place that decides whether a client message is kept. Used for live messages and for catching up after a restart.
async function handleIncoming(msg, from) {
  if (!isTracked(from)) {
    automationState.ignoredMessages += 1; // only counted, never read or kept
    automationState.ignoredLog.unshift({ endsWith: String(from).slice(-4), at: new Date().toISOString() });
    if (automationState.ignoredLog.length > 5) automationState.ignoredLog.pop();
    return;
  }
  const id = msgSerial(msg);
  if (id) { if (seenMsgIds.has(id)) return; seenMsgIds.add(id); }
  const media = await saveMediaIfAny(msg);
  const tsSec = msg.timestamp || Math.floor(Date.now() / 1000);
  const entry = { direction: 'INCOMING', from, text: msg.body || '', timestamp: new Date(tsSec * 1000).toISOString(), id, media };
  automationState.messageLedger.unshift(entry);
  if (automationState.messageLedger.length > 50) automationState.messageLedger.pop();
  const full = fullFor(from);
  if (!lastSeen[full] || tsSec > lastSeen[full]) { lastSeen[full] = tsSec; saveTracked(); }
  emitEvent({ kind: 'in', ...entry });
}

// Catch up on client messages that arrived while the bridge or the WhatsApp window was down.
let backfilling = false;
async function backfillTracked(reason) {
  if (backfilling || !waClient || automationState.wa.status !== 'READY') return;
  backfilling = true;
  try {
    for (const full of [...trackedFull].slice(0, 30)) {
      try {
        const wid = await waClient.getNumberId(full);
        if (!wid) continue;
        const chat = await waClient.getChatById(wid._serialized);
        const msgs = await chat.fetchMessages({ limit: 20 });
        const since = lastSeen[full] || Math.floor(Date.now() / 1000);
        const fresh = msgs.filter(m => !m.fromMe && !m.isStatus && m.timestamp > since).sort((x, y) => x.timestamp - y.timestamp);
        for (const m of fresh) await handleIncoming(m, full);
      } catch (e) { /* this number could not be checked; try again next round */ }
    }
  } finally { backfilling = false; }
}
setInterval(() => backfillTracked('timer'), 30000);


async function seedLids(numbers) {
  if (!waClient || automationState.wa.status !== 'READY') return;
  for (const full of numbers.slice(0, 30)) {
    try {
      const res = await waClient.getContactLidAndPhone([full + '@c.us']);
      const lid = res && res[0] && res[0].lid;
      if (lid) resolver.learn(lid, full);
    } catch (e) { /* best effort */ }
  }
}
let waClient = null;
let waRetries = 0;
let restarting = false;
async function restartWhatsApp(reason) {
  if (restarting) return;
  restarting = true;
  automationState.wa = { status: 'RESTARTING', number: '', qr: '', error: String(reason || '') };
  emitStatus();
  console.log('[beRich Bridge] Restarting WhatsApp: ' + reason);
  try { if (waClient) await waClient.destroy(); } catch (e) {}
  waClient = null; waRetries = 0;
  setTimeout(() => { restarting = false; startWhatsAppClient(); }, 2500);
}
// If the WhatsApp window is closed or crashes, the QR code on screen is dead. Notice it and start again.
setInterval(() => {
  try {
    if (!waClient || restarting || process.env.NO_WA) return;
    const st = automationState.wa.status;
    if (!['QR', 'READY', 'STARTING'].includes(st)) return;
    const br = waClient.pupBrowser, pg = waClient.pupPage;
    if ((br && !br.isConnected()) || (pg && pg.isClosed())) restartWhatsApp('The WhatsApp window was closed');
  } catch (e) {}
}, 5000);
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
    puppeteer: { headless: !process.env.WA_SHOW, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1100,800'] }
  });
  waClient.on('qr', async qr => {
    try { automationState.wa.qr = await QR.toDataURL(qr); automationState.wa.qrAt = Date.now(); automationState.wa.status = 'QR'; emitStatus(); } catch (e) { automationState.wa.error = e.message; }
    console.log('[beRich Bridge] Scan the QR code at http://localhost:' + PORT + '/link');
  });
  waClient.on('ready', () => {
    const num = (waClient.info && waClient.info.wid && waClient.info.wid.user) || '';
    waRetries = 0;
    automationState.wa = { status: 'READY', number: num, qr: '', error: '' };
    automationState.pairedNumber = num;
    emitStatus();
    console.log('[beRich Bridge] WhatsApp linked as +' + num);
  });
  waClient.on('auth_failure', m => { automationState.wa = { status: 'AUTH_FAILED', number: '', qr: '', error: String(m) }; });
  waClient.on('disconnected', r => { automationState.wa = { status: 'DISCONNECTED', number: '', qr: '', error: String(r) }; emitStatus(); restartWhatsApp('WhatsApp disconnected: ' + r); });
  waClient.on('message_create', async msg => {
    if (!msg.fromMe || msg.isStatus || String(msg.to).includes('@g.us')) return;
    let contactNumber = '';
    try { const c = await msg.getChat(); const ct = c && (await c.getContact()); contactNumber = (ct && ct.number) || ''; } catch (e) {}
    const to = await resolver.resolveNumber(msg.to, contactNumber);
    if (!isTracked(to)) return;
    const id = msgSerial(msg);
    if (id) trackedMsgIds.add(id);
    if (id && seenMsgIds.has(id)) { return; }
    const media = await saveMediaIfAny(msg);
    const entry = { direction: 'OUTGOING', to, text: msg.body || '', timestamp: new Date().toISOString(), id, media };
    automationState.messageLedger.unshift(entry);
    if (automationState.messageLedger.length > 50) automationState.messageLedger.pop();
    emitEvent({ kind: 'out', ...entry });
  });
  waClient.on('message_ack', (msg, ack) => {
    const id = msgSerial(msg);
    if (id && trackedMsgIds.has(id)) emitEvent({ kind: 'ack', id, ack });
  });
  waClient.on('message', async msg => {
    if (msg.fromMe || msg.isStatus || String(msg.from).includes('@g.us')) return; // ignore own, status and group messages
    // WhatsApp often gives a long internal id (@lid) instead of the phone number. Resolve the real number first.
    let contactNumber = '';
    try { const c = await msg.getContact(); contactNumber = (c && c.number) || ''; } catch (e) {}
    const from = await resolver.resolveNumber(msg.from, contactNumber);
    await handleIncoming(msg, from);
  });
  waClient.on('ready', () => { setTimeout(() => backfillTracked('ready'), 3000); });
  waClient.initialize().catch(e => {
    automationState.wa = { status: 'ERROR', number: '', qr: '', error: e.message };
    // Common on first start: the browser page reloads while WhatsApp loads. Wait and try again, up to 3 times.
    waRetries += 1;
    if (waRetries <= 3) {
      console.log('[beRich Bridge] Start failed (' + e.message + '). Retrying in 6 seconds (' + waRetries + '/3)...');
      try { waClient.destroy().catch(() => {}); } catch (x) {}
      setTimeout(() => { waClient = null; startWhatsAppClient(); }, 6000);
    }
  });
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

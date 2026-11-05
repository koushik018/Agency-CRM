
// 1-Click Realistic Video Agency Demo Deals for Immediate Kanban Testing
function loadDemoStudioDeals() {
  const demoDeals = [
    {
      id: 'DEAL-DEMO-1',
      clientName: 'CredEdge Finance',
      handle: '@crededge.in',
      country: 'India',
      stage: 'Identified',
      dealValue: 120000,
      originalCurrency: 'INR',
      originalValue: 120000,
      source: 'LinkedIn DM',
      serviceType: 'Fintech 3D Explainer Video',
      partner: 'koushik',
      sampleStatus: 'In Prep',
      phone: '+91 98765 43210',
      email: 'media@crededge.in',
      notes: 'Series A fintech startup looking for a high-end 60-second product animation.',
      payments: [],
      chatHistory: [{ direction: 'INCOMING', author: 'CredEdge Finance', text: 'Hey beRich team! Saw your reel on LinkedIn. Can you do a 60s 3D product video?', timestamp: Date.now() - 86400000 }],
      createdAt: Date.now() - 172800000,
      updatedAt: Date.now()
    },
    {
      id: 'DEAL-DEMO-2',
      clientName: 'NovaCloud AI',
      handle: '@novacloud.ai',
      country: 'USA',
      stage: 'In Discussion',
      dealValue: 255000,
      originalCurrency: 'USD',
      originalValue: 3000,
      source: 'Upwork Enterprise',
      serviceType: 'SaaS Brand Commercial & Cutdown',
      partner: 'bharagav',
      sampleStatus: 'In Prep',
      phone: '+1 415 555 2671',
      email: 'growth@novacloud.ai',
      notes: 'Enterprise AI tooling commercial for YouTube and X ads.',
      payments: [],
      chatHistory: [{ direction: 'INCOMING', author: 'NovaCloud AI', text: 'Script approved! Let us review the storyboard next.', timestamp: Date.now() - 43200000 }],
      createdAt: Date.now() - 259200000,
      updatedAt: Date.now()
    },
    {
      id: 'DEAL-DEMO-3',
      clientName: 'Alex Growth Lab',
      handle: '@alexgrowth',
      country: 'UK',
      stage: 'Sample Cut',
      dealValue: 85000,
      originalCurrency: 'GBP',
      originalValue: 800,
      source: 'Cold Email',
      serviceType: 'YouTube Masterclass Package',
      partner: 'kiran',
      sampleStatus: 'Delivered',
      phone: '+44 7911 123456',
      email: 'alex@growthlab.io',
      notes: 'Delivered 2-minute test edit. Client loved pacing and retention hooks.',
      payments: [],
      chatHistory: [{ direction: 'INCOMING', author: 'Alex Growth Lab', text: 'Sample looks incredible! Retaining all 10 videos.', timestamp: Date.now() - 21600000 }],
      createdAt: Date.now() - 345600000,
      updatedAt: Date.now()
    },
    {
      id: 'DEAL-DEMO-4',
      clientName: 'Zeta Payments',
      handle: '@zetapay',
      country: 'UAE',
      stage: 'Approved',
      dealValue: 320000,
      originalCurrency: 'AED',
      originalValue: 14000,
      source: 'Instagram DM',
      serviceType: 'Mobile App Teaser & 3D Cards',
      partner: 'koushik',
      sampleStatus: 'Approved',
      phone: '+971 50 123 4567',
      email: 'partners@zetapay.ae',
      notes: 'Contract signed. Awaiting 50% upfront retainer.',
      payments: [],
      chatHistory: [{ direction: 'INCOMING', author: 'Zeta Payments', text: 'Contract signed! Sending advance tomorrow morning.', timestamp: Date.now() - 7200000 }],
      createdAt: Date.now() - 432000000,
      updatedAt: Date.now()
    },
    {
      id: 'DEAL-DEMO-5',
      clientName: 'Apex Media Global',
      handle: '@apexmedia',
      country: 'India',
      stage: 'Closed Won',
      dealValue: 450000,
      originalCurrency: 'INR',
      originalValue: 450000,
      source: 'Direct Referral',
      serviceType: 'Global TVC Broadcast Color Grade',
      partner: 'bharagav',
      sampleStatus: 'Approved',
      phone: '+91 94400 11223',
      email: 'producer@apexmedia.in',
      notes: 'Full payment received via bank transfer. Final delivery completed.',
      payments: [
        { id: 'PAY-101', date: '2026-11-01', amount: 450000, mode: 'Bank Wire / UPI', note: '100% Retainer & Delivery Cleared' }
      ],
      chatHistory: [{ direction: 'INCOMING', author: 'Apex Media', text: 'Payment cleared! Great work team.', timestamp: Date.now() - 3600000 }],
      createdAt: Date.now() - 518400000,
      updatedAt: Date.now()
    }
  ];

  if (!Array.isArray(crmState.leads)) crmState.leads = [];
  demoDeals.forEach(d => {
    const existingIdx = crmState.leads.findIndex(existing => existing.id === d.id);
    if (existingIdx !== -1) {
      crmState.leads[existingIdx] = d;
    } else {
      crmState.leads.push(d);
    }
  });

  saveToLocalCache();
  renderKanban();
  renderHeaderAndMetrics();
  recordStudioActivity('Loaded Demo Projects', 'Populated 5 realistic video agency deals across all stages for board testing', true);
  showCRMToast('5 Realistic Demo Projects Loaded! Test dragging cards & resizing columns.', 'check_circle');
}
window.loadDemoStudioDeals = loadDemoStudioDeals;


// ============================================================================
// NATIVE HTML5 DRAG AND DROP ENGINE FOR KANBAN PROJECT BOARD
// ============================================================================
let draggedLeadId = null;

function handleKanbanCardDragStart(event, leadId) {
  draggedLeadId = leadId;
  event.dataTransfer.setData('text/plain', leadId);
  event.dataTransfer.effectAllowed = 'move';
  const card = event.currentTarget;
  if (card) {
    setTimeout(() => card.classList.add('opacity-40', 'scale-95'), 0);
  }
}

function handleKanbanCardDragEnd(event) {
  const card = event.currentTarget;
  if (card) {
    card.classList.remove('opacity-40', 'scale-95');
  }
  document.querySelectorAll('.kanban-resizable-col').forEach(col => {
    col.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-50/50', 'dark:bg-indigo-950/20');
  });
  draggedLeadId = null;
}

function handleKanbanColumnDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  const col = event.currentTarget;
  if (col && !col.classList.contains('ring-2')) {
    col.classList.add('ring-2', 'ring-indigo-500', 'bg-indigo-50/50', 'dark:bg-indigo-950/20');
  }
}

function handleKanbanColumnDragLeave(event) {
  const col = event.currentTarget;
  if (col) {
    col.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-50/50', 'dark:bg-indigo-950/20');
  }
}

async function handleKanbanColumnDrop(event, targetStage) {
  event.preventDefault();
  const leadId = event.dataTransfer.getData('text/plain') || draggedLeadId;
  const col = event.currentTarget;
  if (col) {
    col.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-50/50', 'dark:bg-indigo-950/20');
  }
  if (!leadId) return;

  const lead = crmState.leads.find(l => String(l.id) === String(leadId));
  if (!lead || String(lead.stage).toLowerCase() === String(targetStage).toLowerCase()) return;

  const oldStage = lead.stage;
  lead.stage = targetStage;
  lead.updatedAt = Date.now();
  lead.lastTouchpoint = Date.now();

  // If moved to sample cut or closed won, update sample status accordingly
  if (targetStage === 'Sample Cut' && (!lead.sampleStatus || lead.sampleStatus.includes('Identified'))) {
    lead.sampleStatus = 'Sample Cut (In Prep)';
  } else if (targetStage === 'Closed Won') {
    lead.sampleStatus = 'Delivered & Approved';
  }

  saveCrmStateLocally();
  renderAll();

  const user = getActiveStudioUser();
  recordStudioActivity('Moved Project Stage', `${user} moved "${lead.clientName}" from ${oldStage} ➔ ${targetStage}`, false);
  showCRMToast(`Moved "${lead.clientName}" to ${targetStage}!`, 'swap_horiz');

  await pushToGitHubDatabase(`${user}: Moved "${lead.clientName}" from ${oldStage} to ${targetStage}`);
}

window.handleKanbanCardDragStart = handleKanbanCardDragStart;
window.handleKanbanCardDragEnd = handleKanbanCardDragEnd;
window.handleKanbanColumnDragOver = handleKanbanColumnDragOver;
window.handleKanbanColumnDragLeave = handleKanbanColumnDragLeave;
window.handleKanbanColumnDrop = handleKanbanColumnDrop;


// Modal Alias & Lookup Resolver (Supports crm-pin-login-modal and crm-activity-log-modal)
function getModalElement(id) {
  if (id === 'crm-pin-login-modal' || id === 'crm-user-identity-modal') {
    return document.getElementById('crm-user-identity-modal') || document.getElementById('crm-pin-login-modal');
  }
  if (id === 'crm-activity-log-modal' || id === 'crm-activity-ledger-modal') {
    return document.getElementById('crm-activity-ledger-modal') || document.getElementById('crm-activity-log-modal');
  }
  return document.getElementById(id);
}
window.getModalElement = getModalElement;

/**
 * ============================================================================
 * beRich Creative Studio — 10-Partner Name-Centric Agency CRM (INR ₹ Edition)
 * ============================================================================
 * - Primary Currency: Indian Rupee (₹ / INR) with en-IN formatting (₹1,20,000)
 * - 10-Partner Name-Centric Revenue Engine (No forced splits; tracks revenue
 *   individually per active partner based strictly on assigned deals; hides unused slots)
 * - WhatsApp Daily Report Push (https://wa.me/<number>?text=<encoded_data>)
 * - Dynamic UPI Payment QR Generator (https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=...)
 * - Draggable Kanban Column Resizing (180px–500px) with auto-adjusting text
 * - Built-in Bulk Foreign-to-INR Currency Converter + Live Google Sheets Sync
 * ============================================================================
 */

// 1. Deployed Google Apps Script Web App URL (Kept Strictly Intact)
const DEFAULT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbydimCFgLqs3c-G6lczWlBPJ2ZqUeEIuyTKI1WNVxhLVenN3A1YDWNyvg7XQigrXc91bw/exec';

// 2. Default Customizable Agency Branding & Studio Payment Defaults (Synced Globally via Google Sheets)
const DEFAULT_BRANDING = {
  agencyName: 'beRich',
  agencyTagline: ''
};
const DEFAULT_UPI_ID = ''; // set in Partners & Sheet Config, stored in the private data repo
const DEFAULT_PAYPAL_LINK = 'https://paypal.me/PADAVALAKOUSHIK';
const DEFAULT_WHATSAPP_NUMBER = ''; // set in Partners & Sheet Config, stored in the private data repo
const GLOBAL_CONFIG_ROW_ID = '__STUDIO_GLOBAL_CONFIG__';

// 3. 10-Partner Slot Palette & Default Configuration (Name & Role only — No percentages)
// Slots with a non-empty name are active; empty slots are hidden in the UI.
const PARTNER_PALETTE = [
  {
    name: 'koushik',
    colorKey: 'mint',
    dotHex: '#34D399',
    lightHex: '#6EE7B7',
    textClass: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    cardBg: 'linear-gradient(135deg, rgba(16, 35, 28, 0.6) 0%, rgba(13, 17, 26, 0.85) 100%)',
    borderHex: 'rgba(52, 211, 153, 0.35)',
    glowHex: 'rgba(52, 211, 153, 0.18)',
    accentName: 'Emerald Prosperity'
  },
  {
    name: 'bharagav',
    colorKey: 'gold',
    dotHex: '#FBBF24',
    lightHex: '#FDE68A',
    textClass: 'text-amber-400',
    badgeBg: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    cardBg: 'linear-gradient(135deg, rgba(38, 30, 16, 0.6) 0%, rgba(13, 17, 26, 0.85) 100%)',
    borderHex: 'rgba(251, 191, 36, 0.35)',
    glowHex: 'rgba(251, 191, 36, 0.18)',
    accentName: 'Champagne Prestige'
  },
  {
    name: 'kiran',
    colorKey: 'sky',
    dotHex: '#60A5FA',
    lightHex: '#93C5FD',
    textClass: 'text-sky-400',
    badgeBg: 'bg-sky-500/15 text-sky-300 border border-sky-500/30',
    cardBg: 'linear-gradient(135deg, rgba(16, 28, 48, 0.6) 0%, rgba(13, 17, 26, 0.85) 100%)',
    borderHex: 'rgba(96, 165, 250, 0.35)',
    glowHex: 'rgba(96, 165, 250, 0.18)',
    accentName: 'Sapphire Clarity'
  },
  { dotHex: '#C084FC', lightHex: '#E9D5FF', textClass: 'text-purple-400', badgeBg: 'bg-purple-500/15 text-purple-300 border border-purple-500/30', cardBg: 'linear-gradient(135deg, rgba(30, 18, 48, 0.6) 0%, rgba(13, 17, 26, 0.85) 100%)', borderHex: 'rgba(192, 132, 252, 0.35)', glowHex: 'rgba(192, 132, 252, 0.18)', accentName: 'Amethyst Story' },
  { dotHex: '#F472B6', lightHex: '#FBCFE8', textClass: 'text-pink-400', badgeBg: 'bg-pink-500/15 text-pink-300 border border-pink-500/30', cardBg: 'linear-gradient(135deg, rgba(40, 18, 30, 0.6) 0%, rgba(13, 17, 26, 0.85) 100%)', borderHex: 'rgba(244, 114, 182, 0.35)', glowHex: 'rgba(244, 114, 182, 0.18)', accentName: 'Rose Polish' },
  { dotHex: '#FB923C', lightHex: '#FED7AA', textClass: 'text-orange-400', badgeBg: 'bg-orange-500/15 text-orange-300 border border-orange-500/30', cardBg: 'linear-gradient(135deg, rgba(38, 22, 14, 0.6) 0%, rgba(13, 17, 26, 0.85) 100%)', borderHex: 'rgba(251, 146, 60, 0.35)', glowHex: 'rgba(251, 146, 60, 0.18)', accentName: 'Sunset Creative' },
  { dotHex: '#2DD4BF', lightHex: '#99F6E4', textClass: 'text-teal-400', badgeBg: 'bg-teal-500/15 text-teal-300 border border-teal-500/30', cardBg: 'linear-gradient(135deg, rgba(14, 34, 34, 0.6) 0%, rgba(13, 17, 26, 0.85) 100%)', borderHex: 'rgba(45, 212, 191, 0.35)', glowHex: 'rgba(45, 212, 191, 0.18)', accentName: 'Teal Harmony' },
  { dotHex: '#A3E635', lightHex: '#D9F99D', textClass: 'text-lime-400', badgeBg: 'bg-lime-500/15 text-lime-300 border border-lime-500/30', cardBg: 'linear-gradient(135deg, rgba(24, 36, 14, 0.6) 0%, rgba(13, 17, 26, 0.85) 100%)', borderHex: 'rgba(163, 230, 53, 0.35)', glowHex: 'rgba(163, 230, 53, 0.18)', accentName: 'Lime Precision' },
  { dotHex: '#FB7185', lightHex: '#FECDD3', textClass: 'text-rose-400', badgeBg: 'bg-rose-500/15 text-rose-300 border border-rose-500/30', cardBg: 'linear-gradient(135deg, rgba(40, 18, 22, 0.6) 0%, rgba(13, 17, 26, 0.85) 100%)', borderHex: 'rgba(251, 113, 133, 0.35)', glowHex: 'rgba(251, 113, 133, 0.18)', accentName: 'Blush Motion' },
  { dotHex: '#818CF8', lightHex: '#C7D2FE', textClass: 'text-indigo-400', badgeBg: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30', cardBg: 'linear-gradient(135deg, rgba(20, 20, 48, 0.6) 0%, rgba(13, 17, 26, 0.85) 100%)', borderHex: 'rgba(129, 140, 248, 0.35)', glowHex: 'rgba(129, 140, 248, 0.18)', accentName: 'Indigo Deep' }
];

const DEFAULT_PARTNERS = [
  { id: 'P1', name: 'koushik', role: 'Partner' },
  { id: 'P2', name: 'bharagav', role: 'Partner' },
  { id: 'P3', name: 'kiran', role: 'Partner' },
  { id: 'P4', name: '', role: 'Colorist / DI' },
  { id: 'P5', name: '', role: '3D / CGI Artist' },
  { id: 'P6', name: '', role: 'Copy / Script' },
  { id: 'P7', name: '', role: 'Thumbnail / Design' },
  { id: 'P8', name: '', role: 'Client Strategy' },
  { id: 'P9', name: '', role: 'Ad Operations' },
  { id: 'P10', name: '', role: 'Producer' }
];

// Default Free GitHub JSON Database Sync Configuration
const DEFAULT_GITHUB_CONFIG = {
  owner: 'koushik018',
  repo: 'Agency-CRM-Data', // PRIVATE data repo. Keep the public Agency-CRM repo for code only.
  path: 'crm-data.json',
  branch: 'main',
  token: ''
};

// 4. Default Draggable Kanban Column Widths (Min: 180px, Max: 500px)
const KANBAN_MIN_COL_WIDTH = 180;
const KANBAN_MAX_COL_WIDTH = 500;

// ============================================================================
// DUAL-THEME ENGINE (Warm Porcelain Executive Light Mode <-> Tactical Carbon Dark Mode)
// ============================================================================
function getThemeMode() {
  return localStorage.getItem('crm_theme_mode') || 'light';
}

function setThemeMode(mode) {
  const m = mode === 'dark' ? 'dark' : 'light';
  localStorage.setItem('crm_theme_mode', m);
  document.documentElement.setAttribute('data-theme', m);
  if (m === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }

  // Update theme toggle button icon & label across all pages
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.textContent = m === 'dark' ? 'light_mode' : 'dark_mode';
  }
  const label = document.getElementById('theme-toggle-label');
  if (label) {
    label.textContent = m === 'dark' ? 'Dark' : 'Light';
  }

  // If on main dashboard, update hero widgets
  if (typeof renderHeaderAndMetrics === 'function') {
    renderHeaderAndMetrics();
  }
}

function toggleThemeMode() {
  const current = getThemeMode();
  setThemeMode(current === 'dark' ? 'light' : 'dark');
}

window.getThemeMode = getThemeMode;
window.setThemeMode = setThemeMode;
window.toggleThemeMode = toggleThemeMode;


const DEFAULT_KANBAN_WIDTHS = {
  'Identified': 260,
  'In Discussion': 260,
  'Sample Cut': 275,
  'Approved': 260,
  'Closed Won': 260
};

// 5. Default Editable Exchange Rates (1 Unit of Foreign Currency = ₹ X INR)
const DEFAULT_EXCHANGE_RATES = {
  INR: 1,
  USD: 85.00,
  EUR: 92.00,
  GBP: 108.00,
  AED: 23.15,
  CAD: 61.00,
  AUD: 55.00
};

const CURRENCY_SYMBOLS = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'AED ',
  CAD: 'C$',
  AUD: 'A$'
};

// LocalStorage Keys
const STORAGE_KEY_API_URL = 'FRAME3_GAS_WEB_APP_URL';
const STORAGE_KEY_CACHE = 'FRAME3_CRM_CLEAN_INR_V2';
const STORAGE_KEY_BRANDING = 'FRAME3_CRM_BRANDING_V2';
const STORAGE_KEY_PARTNERS = 'FRAME3_CRM_PARTNERS_10_V3';
const STORAGE_KEY_PARTNERS_LEGACY = 'FRAME3_CRM_PARTNERS_V2';
const STORAGE_KEY_RATES = 'FRAME3_CRM_EXCHANGE_RATES_V2';
const STORAGE_KEY_COL_WIDTHS = 'FRAME3_CRM_KANBAN_WIDTHS_V2';
const STORAGE_KEY_WHATSAPP = 'FRAME3_CRM_WHATSAPP_NUMBER_V1';
const STORAGE_KEY_UPI_ID = 'FRAME3_CRM_UPI_ID_V1';
const STORAGE_KEY_PAYPAL = 'FRAME3_CRM_PAYPAL_LINK_V1';
const STORAGE_KEY_DELETED_IDS = 'FRAME3_CRM_DELETED_IDS_V1';
const STORAGE_KEY_USER_NAME = 'FRAME3_STUDIO_USER_NAME_V1';
const STORAGE_KEY_USER_SECURITY = 'FRAME3_USER_SECURITY_V1';

function loadSavedUserSecurity_() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY_USER_SECURITY) || '{}');
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
      return raw;
    }
  } catch (_) {}
  return {};
}

function saveUserSecurity_() {
  try {
    localStorage.setItem(STORAGE_KEY_USER_SECURITY, JSON.stringify(crmState.userSecurity || {}));
  } catch (_) {}
}

async function hashPinCode(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(String(pin || '').trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const STORAGE_KEY_GITHUB_CONFIG = 'FRAME3_GITHUB_SYNC_CONFIG_V1';
const STORAGE_KEY_ACTIVITY_LOG = 'FRAME3_STUDIO_ACTIVITY_LOG_V1';
const STORAGE_KEY_FORM_DRAFTS = 'FRAME3_CRM_FORM_DRAFTS_V1';

// Wipe legacy demo cache if present
try {
  localStorage.removeItem('FRAME3_CRM_STATE_CACHE_V1');
} catch (_) {}

// Clean Slate Initial Arrays
const INITIAL_LEADS = [];
const INITIAL_TECH_STACK = [];
const INITIAL_REVENUE = [];

// Load & Normalize Up to 10 Partners (Name & Role only)
function loadSavedPartners_() {
  try {
    const rawV3 = JSON.parse(localStorage.getItem(STORAGE_KEY_PARTNERS) || 'null');
    const rawLegacy = JSON.parse(localStorage.getItem(STORAGE_KEY_PARTNERS_LEGACY) || 'null');
    const sourceArr = Array.isArray(rawV3) ? rawV3 : (Array.isArray(rawLegacy) ? rawLegacy : null);

    if (sourceArr) {
      return DEFAULT_PARTNERS.map((def, idx) => {
        const item = sourceArr[idx];
        const palette = PARTNER_PALETTE[idx % PARTNER_PALETTE.length];
        return {
          id: `P${idx + 1}`,
          name: item && item.name !== undefined ? String(item.name).trim() : def.name,
          role: item && item.role !== undefined ? String(item.role).trim() : def.role,
          ...palette
        };
      });
    }
  } catch (_) {}

  return DEFAULT_PARTNERS.map((def, idx) => ({
    ...def,
    ...PARTNER_PALETTE[idx % PARTNER_PALETTE.length]
  }));
}

function sanitizeTagline_(tagline) {
  if (!tagline) return '';
  const trimmed = String(tagline).trim();
  if (trimmed === '.' || trimmed === '•' || trimmed === '• .' || trimmed.replace(/[\s\.\•\-\_]/g, '') === '' || trimmed.toLowerCase() === 'keep it moving') {
    return '';
  }
  return trimmed;
}

function loadSavedBranding_() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY_BRANDING) || 'null');
    if (raw && typeof raw === 'object') {
      const savedName = String(raw.agencyName || '').trim();
      const cleanTagline = sanitizeTagline_(raw.agencyTagline);
      if (savedName && savedName !== 'Frame3') {
        return {
          agencyName: savedName.toLowerCase().includes('koubha') ? 'beRich' : savedName,
          agencyTagline: cleanTagline
        };
      }
    }
  } catch (_) {}
  return { agencyName: 'beRich', agencyTagline: '' };
}

function loadSavedKanbanWidths_() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY_COL_WIDTHS) || 'null');
    if (raw && typeof raw === 'object') {
      const merged = { ...DEFAULT_KANBAN_WIDTHS };
      Object.keys(DEFAULT_KANBAN_WIDTHS).forEach(stage => {
        const w = parseInt(raw[stage], 10);
        if (!isNaN(w)) {
          merged[stage] = Math.max(KANBAN_MIN_COL_WIDTH, Math.min(KANBAN_MAX_COL_WIDTH, w));
        }
      });
      return merged;
    }
  } catch (_) {}
  return { ...DEFAULT_KANBAN_WIDTHS };
}

/**
 * Normalizes Indian 10-digit phone numbers by automatically prepending '91'
 * so '9876543210' becomes '919876543210' (+91 96764 01967) instead of +967.
 */
function normalizeIndianWhatsAppNumber(rawInput) {
  let digits = String(rawInput || '').replace(/[^0-9]/g, '');
  if (!digits) return '';
  digits = digits.replace(/^0+/, '');
  if (digits.length === 10) {
    return '91' + digits;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }
  return digits;
}

function loadDeletedIds_() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY_DELETED_IDS) || 'null');
    if (raw && typeof raw === 'object') {
      return {
        leads: new Set(Array.isArray(raw.leads) ? raw.leads : []),
        tools: new Set(Array.isArray(raw.tools) ? raw.tools : [])
      };
    }
  } catch (_) {}
  return { leads: new Set(), tools: new Set() };
}

function detectDeviceLabel_() {
  const ua = navigator.userAgent || '';
  if (/Android/i.test(ua)) return 'Android Mobile';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS Device';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'Mac Studio';
  if (/Windows/i.test(ua)) return 'Windows PC';
  if (/Linux/i.test(ua)) return 'Linux Workstation';
  return 'Web Browser';
}

function loadGitHubConfig_() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY_GITHUB_CONFIG) || 'null');
    if (raw && typeof raw === 'object') {
      return {
        owner: String(raw.owner || DEFAULT_GITHUB_CONFIG.owner).trim(),
        repo: String(raw.repo || DEFAULT_GITHUB_CONFIG.repo).trim(),
        path: String(raw.path || DEFAULT_GITHUB_CONFIG.path).trim().replace(/^\/+/, ''),
        branch: String(raw.branch || DEFAULT_GITHUB_CONFIG.branch).trim(),
        token: String(raw.token || '').trim(),
        lastSha: String(raw.lastSha || '').trim()
      };
    }
  } catch (_) {}
  return { ...DEFAULT_GITHUB_CONFIG, lastSha: '' };
}

function loadSavedActivityLog_() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY_ACTIVITY_LOG) || 'null');
    if (Array.isArray(raw)) return raw;
  } catch (_) {}
  return [];
}

const initialDeletedSets = loadDeletedIds_();

// Global Reactive State
const crmState = {
  currentUser: (localStorage.getItem(STORAGE_KEY_USER_NAME) || '').trim(),
  userSecurity: loadSavedUserSecurity_(),
  deviceLabel: detectDeviceLabel_(),
  githubConfig: loadGitHubConfig_(),
  activityLog: loadSavedActivityLog_(),
  apiUrl: (localStorage.getItem(STORAGE_KEY_API_URL) || '').trim() || DEFAULT_WEB_APP_URL,
  branding: loadSavedBranding_(),
  partners: loadSavedPartners_(),
  whatsappNumber: normalizeIndianWhatsAppNumber(localStorage.getItem(STORAGE_KEY_WHATSAPP) || DEFAULT_WHATSAPP_NUMBER),
  upiId: (localStorage.getItem(STORAGE_KEY_UPI_ID) || '').trim() || DEFAULT_UPI_ID,
  paypalLink: (localStorage.getItem(STORAGE_KEY_PAYPAL) || '').trim() || DEFAULT_PAYPAL_LINK,
  columnWidths: loadSavedKanbanWidths_(),
  exchangeRates: JSON.parse(localStorage.getItem(STORAGE_KEY_RATES) || 'null') || { ...DEFAULT_EXCHANGE_RATES },
  deletedLeadIds: initialDeletedSets.leads,
  deletedToolIds: initialDeletedSets.tools,
  hasGlobalConfigRowInSheet: false,
  leads: [...INITIAL_LEADS],
  techStack: [...INITIAL_TECH_STACK],
  revenue: [...INITIAL_REVENUE],
  filters: {
    partner: 'ALL',
    source: 'ALL',
    sample: 'ALL',
    search: '',
    sortDesc: true,
    activityUser: 'ALL'
  },
  activeDossierLeadId: null,
  costPolicy: 'absorb',
  isSyncing: false,
  isGitHubPushing: false
};

// Expose unified `globalState` and `crmState` globally so all modules share the exact same reference
const globalState = crmState;
if (typeof window !== 'undefined') {
  window.globalState = crmState;
  window.crmState = crmState;
}

// Hydrate user's real saved data from Clean Slate V2 cache immediately on script load
(function hydrateFromLocalCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CACHE);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.leads)) {
        crmState.leads = parsed.leads
          .filter(l => l && l.id !== GLOBAL_CONFIG_ROW_ID && !crmState.deletedLeadIds.has(String(l.id)))
          .map(l => ({ ...l, updatedAt: Number(l.updatedAt) || Date.now() }));
      }
      if (Array.isArray(parsed.techStack)) {
        crmState.techStack = parsed.techStack
          .filter(t => t && !crmState.deletedToolIds.has(String(t.id)))
          .map(t => ({
            ...t,
            autoRenew: t.autoRenew !== undefined ? Boolean(t.autoRenew) : true,
            updatedAt: Number(t.updatedAt) || Date.now()
          }));
      }
      if (Array.isArray(parsed.revenue)) crmState.revenue = parsed.revenue;
      if (Array.isArray(parsed.activityLog) && crmState.activityLog.length === 0) {
        crmState.activityLog = parsed.activityLog;
      }
    }
  } catch (e) {
    console.warn('Cache load skipped:', e);
  }
})();

function saveGitHubConfig() {
  try {
    localStorage.setItem(STORAGE_KEY_GITHUB_CONFIG, JSON.stringify(crmState.githubConfig));
  } catch (_) {}
}

function saveActivityLog_() {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVITY_LOG, JSON.stringify(crmState.activityLog.slice(0, 250)));
  } catch (_) {}
}

function saveDeletedIds_() {
  try {
    localStorage.setItem(STORAGE_KEY_DELETED_IDS, JSON.stringify({
      leads: Array.from(crmState.deletedLeadIds),
      tools: Array.from(crmState.deletedToolIds)
    }));
  } catch (_) {}
}

function saveToLocalCache() {
  try {
    localStorage.setItem(STORAGE_KEY_CACHE, JSON.stringify({
      leads: crmState.leads,
      techStack: crmState.techStack,
      revenue: crmState.revenue,
      activityLog: crmState.activityLog.slice(0, 250)
    }));
    saveActivityLog_();
    if (typeof persistChats_ === 'function') persistChats_();
  } catch (e) {
    console.warn('Cache write skipped:', e);
  }
}

function saveBrandingAndPartnersConfig() {
  try {
    localStorage.setItem(STORAGE_KEY_BRANDING, JSON.stringify(crmState.branding));
    localStorage.setItem(
      STORAGE_KEY_PARTNERS,
      JSON.stringify(crmState.partners.map(p => ({ id: p.id, name: p.name, role: p.role })))
    );
  } catch (_) {}
}

function saveKanbanColumnWidths() {
  try {
    localStorage.setItem(STORAGE_KEY_COL_WIDTHS, JSON.stringify(crmState.columnWidths));
  } catch (_) {}
}

function saveExchangeRatesConfig() {
  try {
    localStorage.setItem(STORAGE_KEY_RATES, JSON.stringify(crmState.exchangeRates));
  } catch (_) {}
}

function getFullAgencyTitle() {
  let name = (crmState.branding.agencyName || DEFAULT_BRANDING.agencyName).trim();
  if (name.toLowerCase().includes('koubha') || name === 'Frame3') name = 'beRich';
  const tag = sanitizeTagline_(crmState.branding.agencyTagline);
  return tag ? `${name} ${tag}` : name;
}

/**
 * Returns only active partners (partner slots 1..10 that have a non-empty name).
 * Guarantees at least 1 fallback partner if user cleared all 10 slots.
 */
function getActivePartners() {
  const active = crmState.partners.filter(p => String(p.name || '').trim().length > 0);
  if (active.length > 0) return active;
  return [{ id: 'P1', name: 'Partner 1', role: 'Creative', ...PARTNER_PALETTE[0] }];
}

/**
 * Calculates individual Name-Centric revenue metrics for each active partner
 * based strictly on deals explicitly assigned to them.
 */
function calculateNameCentricPartnerStats() {
  const activePartners = getActivePartners();
  const statsMap = new Map();

  activePartners.forEach((p, idx) => {
    statsMap.set(p.name.toLowerCase(), {
      partner: p,
      palette: PARTNER_PALETTE[idx % PARTNER_PALETTE.length],
      closedRevenueINR: 0,
      activePipelineINR: 0,
      totalAssignedINR: 0,
      cashCollectedINR: 0,
      netProfitINR: 0,
      dealCount: 0,
      closedCount: 0
    });
  });

  crmState.leads.forEach(lead => {
    const val = parseFloat(lead.dealValue) || 0;
    const net = parseFloat(lead.netProfit) || 0;
    const assignedName = String(lead.partner || '').trim();
    const key = assignedName.toLowerCase();

    // Only credit the partner to whom this deal is explicitly assigned
    if (statsMap.has(key)) {
      const entry = statsMap.get(key);
      entry.totalAssignedINR += val;
      entry.netProfitINR += net;
      entry.dealCount += 1;
      const payments = Array.isArray(lead.payments) ? lead.payments : [];
      const leadCash = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
      entry.cashCollectedINR = (entry.cashCollectedINR || 0) + leadCash;
      if (String(lead.stage).toLowerCase() === 'closed won') {
        entry.closedRevenueINR += val;
        entry.closedCount += 1;
      } else {
        entry.activePipelineINR += val;
      }
    }
  });

  return Array.from(statsMap.values());
}

/**
 * ============================================================================
 * INDIAN RUPEE (INR ₹) FORMATTING HELPERS
 * ============================================================================
 */

function formatINR(amount, showDecimals = false) {
  const num = Number(amount) || 0;
  const sign = num < 0 ? '-' : '';
  const abs = Math.abs(num);
  return sign + '₹' + abs.toLocaleString('en-IN', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0
  });
}

function formatINRCompact(amount) {
  const num = Number(amount) || 0;
  if (num >= 10000000) {
    return '₹' + (num / 10000000).toFixed(2) + ' Cr';
  }
  if (num >= 100000) {
    return '₹' + (num / 100000).toFixed(2) + ' L';
  }
  return formatINR(num, false);
}

function convertToINR(foreignAmount, currencyCode) {
  const amt = parseFloat(foreignAmount) || 0;
  const code = (currencyCode || 'INR').toUpperCase();
  const rate = parseFloat(crmState.exchangeRates[code]) || 1;
  return Math.round(amt * rate);
}

function getPartnerStyle(partnerName) {
  const active = getActivePartners();
  const idx = active.findIndex(p => p.name.toLowerCase() === String(partnerName || '').toLowerCase());
  const p = idx >= 0 ? active[idx] : active[0];
  const pal = PARTNER_PALETTE[(idx >= 0 ? idx : 0) % PARTNER_PALETTE.length];
  const displayName = (idx >= 0 ? p.name : (partnerName || p.name));
  const initial = (displayName || 'P').trim().charAt(0).toUpperCase();
  return {
    name: displayName,
    role: idx >= 0 ? p.role : 'Partner',
    dotHex: pal.dotHex,
    badge: pal.badgeBg,
    text: pal.textClass,
    letter: initial
  };
}

/**
 * ============================================================================
 * 1A. STUDIO USER IDENTITY, PRESENCE, GITHUB JSON DB SYNC & ACTIVITY LEDGER
 * ============================================================================
 */

function encodeBase64Utf8_(str) {
  const bytes = new TextEncoder().encode(String(str || ''));
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function decodeBase64Utf8_(base64Str) {
  const cleaned = String(base64Str || '').replace(/\s/g, '');
  const binary = atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder('utf-8').decode(bytes);
}

function getActiveStudioUser() {
  return (crmState.currentUser || localStorage.getItem(STORAGE_KEY_USER_NAME) || '').trim() || 'Studio Partner';
}

function setStudioUserIdentity(name, silent = false) {
  const cleanName = String(name || '').trim();
  if (!cleanName) return;
  const previousUser = crmState.currentUser;
  crmState.currentUser = cleanName;
  try {
    localStorage.setItem(STORAGE_KEY_USER_NAME, cleanName);
  } catch (_) {}

  renderUserPresenceBar();
  closeModal('crm-user-identity-modal');

  if (!silent && previousUser !== cleanName) {
    recordStudioActivity(
      previousUser ? 'Switched Active User' : 'Joined Studio Session',
      `${cleanName} is online on ${crmState.deviceLabel}`,
      true
    );
    showCRMToast(`Welcome, ${cleanName}! You are live in the studio session.`, 'verified_user');
  }
}

let pendingLoginPartner = '';

function ensureUserIdentityPrompt() {
  const saved = (crmState.currentUser || localStorage.getItem(STORAGE_KEY_USER_NAME) || '').trim();
  const verifiedUser = sessionStorage.getItem('FRAME3_PIN_VERIFIED_USER');
  const partnerKey = saved.toLowerCase();
  const hasPin = Boolean(crmState.userSecurity && crmState.userSecurity[partnerKey]);

  // Keep active only if verified in this session and PIN is set
  if (saved && verifiedUser === saved && hasPin) {
    crmState.currentUser = saved;
    renderUserPresenceBar();
    return;
  }

  openUserIdentityModal(true);
}

function openUserIdentityModal(isInitialPrompt = false) {
  injectSharedModals();
  const modal = document.getElementById('crm-user-identity-modal');
  if (!modal) return;

  pendingLoginPartner = '';

  const stepSelect = document.getElementById('login-step-select-partner');
  const stepPin = document.getElementById('login-step-enter-pin');
  const stepKey = document.getElementById('login-step-setup-key');
  if (stepSelect) stepSelect.classList.remove('hidden');
  if (stepPin) stepPin.classList.add('hidden');
  if (stepKey) stepKey.classList.add('hidden');

  const heading = document.getElementById('identity-modal-heading');
  if (heading) heading.textContent = 'Select Partner Profile';

  const errBanner = document.getElementById('login-pin-error-banner');
  if (errBanner) errBanner.classList.add('hidden');

  const statusEl = document.getElementById('login-db-key-status');
  if (statusEl) statusEl.classList.add('hidden');

  const nameInput = document.getElementById('studio-user-name-input');
  if (nameInput) nameInput.value = '';

  const quickPartnersContainer = document.getElementById('identity-quick-partner-pills');
  if (quickPartnersContainer) {
    const activePartners = getActivePartners();
    quickPartnersContainer.innerHTML = activePartners.map(p => {
      const pKey = p.name.trim().toLowerCase();
      const hasPin = Boolean(crmState.userSecurity && crmState.userSecurity[pKey]);
      return `
        <button type="button" onclick="selectPartnerForLogin('${escapeHtml(p.name)}')"
          class="partner-login-btn p-3.5 rounded-2xl text-left transition flex items-center justify-between cursor-pointer"
          style="min-height: 60px;">
          <div class="flex items-center gap-3 min-w-0">
            <span class="w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center flex-shrink-0"
                  style="background: rgba(16, 185, 129, 0.15); color: #10B981; border: 1.5px solid rgba(16, 185, 129, 0.4);">
              ${escapeHtml((p.name[0] || 'P').toUpperCase())}
            </span>
            <div class="min-w-0">
              <div class="partner-name text-sm font-bold truncate">${escapeHtml(p.name)}</div>
              <div class="partner-role text-[11px] font-medium truncate opacity-85">${escapeHtml(p.role || 'Studio Partner')}</div>
            </div>
          </div>
          <span class="material-symbols-outlined text-[19px] flex-shrink-0" title="${hasPin ? 'PIN Protected' : 'Setup PIN Needed'}">
            ${hasPin ? 'lock' : 'lock_reset'}
          </span>
        </button>
      `;
    }).join('');
  }

  const cancelBtn = document.getElementById('identity-modal-cancel-btn');
  const xBtn = document.getElementById('identity-modal-x-btn');
  const canDismiss = !isInitialPrompt || Boolean(crmState.currentUser);
  if (cancelBtn) cancelBtn.style.display = canDismiss ? 'inline-flex' : 'none';
  if (xBtn) xBtn.style.display = canDismiss ? 'inline-flex' : 'none';

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function selectPartnerForLogin(partnerName) {
  const cleanName = String(partnerName || '').trim();
  if (!cleanName) {
    showCRMToast('Please choose or enter a partner name.', 'warning');
    return;
  }
  pendingLoginPartner = cleanName;
  const partnerKey = cleanName.toLowerCase();
  const hasPin = Boolean(crmState.userSecurity && crmState.userSecurity[partnerKey]);

  const stepSelect = document.getElementById('login-step-select-partner');
  const stepPin = document.getElementById('login-step-enter-pin');
  const stepKey = document.getElementById('login-step-setup-key');
  if (stepSelect) stepSelect.classList.add('hidden');
  if (stepKey) stepKey.classList.add('hidden');
  if (stepPin) stepPin.classList.remove('hidden');

  const selectedNameEl = document.getElementById('login-selected-partner-name');
  if (selectedNameEl) selectedNameEl.textContent = cleanName;

  const pinInput = document.getElementById('login-pin-input');
  if (pinInput) {
    pinInput.value = '';
    pinInput.classList.remove('pin-shake');
  }

  const errBanner = document.getElementById('login-pin-error-banner');
  if (errBanner) errBanner.classList.add('hidden');

  const heading = document.getElementById('identity-modal-heading');
  const pinLabel = document.getElementById('login-pin-label');
  const pinHint = document.getElementById('login-pin-hint');
  const submitText = document.getElementById('login-pin-submit-text');

  if (hasPin) {
    if (heading) heading.textContent = 'Enter 4-Digit PIN';
    if (pinLabel) pinLabel.textContent = 'Enter Your 4-Digit Security PIN';
    if (pinHint) pinHint.textContent = 'Enter your 4-digit security code to verify identity.';
    if (submitText) submitText.textContent = 'Verify PIN & Enter';
  } else {
    if (heading) heading.textContent = 'Create 4-Digit PIN';
    if (pinLabel) pinLabel.textContent = 'Create a New 4-Digit PIN';
    if (pinHint) pinHint.textContent = 'No PIN set yet. Choose 4 numbers to secure your studio actions.';
    if (submitText) submitText.textContent = 'Save PIN & Join Studio';
  }

  if (pinInput) setTimeout(() => pinInput.focus(), 100);
}

function backToPartnerSelection() {
  const stepSelect = document.getElementById('login-step-select-partner');
  const stepPin = document.getElementById('login-step-enter-pin');
  const stepKey = document.getElementById('login-step-setup-key');
  if (stepSelect) stepSelect.classList.remove('hidden');
  if (stepPin) stepPin.classList.add('hidden');
  if (stepKey) stepKey.classList.add('hidden');

  const errBanner = document.getElementById('login-pin-error-banner');
  if (errBanner) errBanner.classList.add('hidden');

  const statusEl = document.getElementById('login-db-key-status');
  if (statusEl) statusEl.classList.add('hidden');

  const heading = document.getElementById('identity-modal-heading');
  if (heading) heading.textContent = 'Select Partner Profile';
}

function showLoginDbKeySetup() {
  const stepSelect = document.getElementById('login-step-select-partner');
  const stepPin = document.getElementById('login-step-enter-pin');
  const stepKey = document.getElementById('login-step-setup-key');
  if (stepSelect) stepSelect.classList.add('hidden');
  if (stepPin) stepPin.classList.add('hidden');
  if (stepKey) stepKey.classList.remove('hidden');

  const heading = document.getElementById('identity-modal-heading');
  if (heading) heading.textContent = 'Setup Database Security Key';

  const tokenInput = document.getElementById('login-db-token-input');
  if (tokenInput) {
    const curToken = (crmState.githubConfig && crmState.githubConfig.token) || '';
    tokenInput.value = curToken;
    setTimeout(() => tokenInput.focus(), 100);
  }

  const statusEl = document.getElementById('login-db-key-status');
  if (statusEl) statusEl.classList.add('hidden');
}

async function saveLoginDbKeyAndConnect() {
  const tokenInput = document.getElementById('login-db-token-input');
  const token = (tokenInput ? tokenInput.value : '').trim();
  const statusEl = document.getElementById('login-db-key-status');
  const btn = document.getElementById('login-db-save-connect-btn');
  const btnText = document.getElementById('login-db-save-connect-text');

  if (!token) {
    if (statusEl) {
      statusEl.className = 'p-2.5 rounded-xl bg-[#4C1323] border border-[#FF6B8B]/40 text-[#FF6B8B] text-xs flex items-center gap-2';
      statusEl.innerHTML = '<span class="material-symbols-outlined text-[16px]">error</span><span>Please enter your Database Security Key (GitHub PAT).</span>';
      statusEl.classList.remove('hidden');
    }
    if (tokenInput) tokenInput.focus();
    return;
  }

  // 1. Save token into crmState.githubConfig and localStorage using exact same key as Settings modal
  crmState.githubConfig = {
    ...DEFAULT_GITHUB_CONFIG,
    ...(crmState.githubConfig || {}),
    token: token
  };
  saveGitHubConfig();

  // Also update Settings modal input if present
  const cfgTokenEl = document.getElementById('cfg-gh-token');
  if (cfgTokenEl) cfgTokenEl.value = token;

  // Show connecting UI state
  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Connecting...';
  if (statusEl) {
    statusEl.className = 'p-2.5 rounded-xl bg-teal-950/60 border border-teal-500/40 text-teal-300 text-xs flex items-center gap-2';
    statusEl.innerHTML = '<span class="w-3.5 h-3.5 rounded-full border-2 border-teal-400 border-t-transparent animate-spin flex-shrink-0"></span><span>Connecting to database &amp; pulling latest studio state...</span>';
    statusEl.classList.remove('hidden');
  }

  try {
    const success = await fetchFromGitHubDatabase(false, false);
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'Save & Connect';

    if (success) {
      showCRMToast('Connected to studio database! Please choose your profile.', 'cloud_done');
      // Return to partner selection with updated partners & userSecurity loaded from database
      openUserIdentityModal(true);
    } else {
      if (statusEl) {
        statusEl.className = 'p-2.5 rounded-xl bg-[#4C1323] border border-[#FF6B8B]/40 text-[#FF6B8B] text-xs flex items-center gap-2';
        statusEl.innerHTML = '<span class="material-symbols-outlined text-[16px]">error</span><span>Could not sync with this key. Please verify your token and repository permissions.</span>';
        statusEl.classList.remove('hidden');
      }
    }
  } catch (err) {
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'Save & Connect';
    if (statusEl) {
      statusEl.className = 'p-2.5 rounded-xl bg-[#4C1323] border border-[#FF6B8B]/40 text-[#FF6B8B] text-xs flex items-center gap-2';
      statusEl.innerHTML = `<span class="material-symbols-outlined text-[16px]">error</span><span>Connection error: ${escapeHtml(err.message || 'Check network connection')}</span>`;
      statusEl.classList.remove('hidden');
    }
  }
}

async function submitPartnerPinLogin() {
  const pinInput = document.getElementById('login-pin-input');
  const pin = (pinInput ? pinInput.value : '').trim();
  const errBanner = document.getElementById('login-pin-error-banner');
  const errText = document.getElementById('login-pin-error-text');

  if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    if (errBanner) errBanner.classList.remove('hidden');
    if (errText) errText.textContent = 'PIN must be exactly 4 numeric digits (0-9).';
    if (pinInput) {
      pinInput.classList.add('pin-shake');
      setTimeout(() => pinInput.classList.remove('pin-shake'), 400);
      pinInput.focus();
    }
    return;
  }

  const partnerName = pendingLoginPartner || 'Studio Partner';
  const partnerKey = partnerName.toLowerCase();
  const existingHash = crmState.userSecurity ? crmState.userSecurity[partnerKey] : null;

  const enteredHash = await hashPinCode(pin);

  if (!existingHash) {
    if (!crmState.userSecurity) crmState.userSecurity = {};
    crmState.userSecurity[partnerKey] = enteredHash;
    saveUserSecurity_();
    saveToLocalCache();

    pushToGitHubDatabase(`User ${partnerName} created secure PIN`);

    sessionStorage.setItem('FRAME3_PIN_VERIFIED_USER', partnerName);
    setStudioUserIdentity(partnerName, false);
    showCRMToast(`Security PIN created! Welcome, ${partnerName}.`, 'verified_user');
  } else {
    if (enteredHash === existingHash) {
      if (errBanner) errBanner.classList.add('hidden');
      sessionStorage.setItem('FRAME3_PIN_VERIFIED_USER', partnerName);
      setStudioUserIdentity(partnerName, false);
      showCRMToast(`Welcome back, ${partnerName}! Verified successfully.`, 'verified_user');
    } else {
      if (errBanner) errBanner.classList.remove('hidden');
      if (errText) errText.textContent = 'Incorrect PIN. Please try again or ask admin (koushik) to reset it.';
      if (pinInput) {
        pinInput.value = '';
        pinInput.classList.add('pin-shake');
        setTimeout(() => pinInput.classList.remove('pin-shake'), 400);
        pinInput.focus();
      }
    }
  }
}

function handleUserIdentitySubmit(e) {
  e.preventDefault();
  const input = document.getElementById('studio-user-name-input');
  const entered = input ? input.value.trim() : '';
  if (!entered) {
    showCRMToast('Please choose or enter a partner name.', 'warning');
    return;
  }
  selectPartnerForLogin(entered);
}

function renderUserPresenceBar() {
  const user = crmState.currentUser || 'Join Session';
  const isOnline = Boolean(crmState.currentUser);

  document.querySelectorAll('[data-studio-user-name]').forEach(el => {
    el.textContent = isOnline ? user : 'Set Your Name';
  });
  document.querySelectorAll('[data-studio-user-device]').forEach(el => {
    el.textContent = crmState.deviceLabel;
  });

  const countBadges = document.querySelectorAll('[data-activity-log-count]');
  countBadges.forEach(el => {
    el.textContent = String(crmState.activityLog.length);
  });
}

/**
 * Push an audit event to `crmState.activityLog`, update UI, and optionally push to GitHub JSON DB.
 */
function recordStudioActivity(action, details, pushToCloud = true) {
  const entry = {
    id: 'ACT-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    timestamp: new Date().toISOString(),
    user: getActiveStudioUser(),
    device: crmState.deviceLabel,
    action: String(action || 'Studio Update'),
    details: String(details || '')
  };

  crmState.activityLog.unshift(entry);
  if (crmState.activityLog.length > 250) {
    crmState.activityLog = crmState.activityLog.slice(0, 250);
  }

  saveToLocalCache();
  renderUserPresenceBar();
  renderActivityLedgerUI();

  if (pushToCloud) {
    pushToGitHubDatabase(`${entry.user}: ${entry.action}`);
    syncGlobalConfigToSheet();
  }
  return entry;
}

function buildGitHubDatabasePayload_() {
  return {
    version: '2026.11.02',
    updatedAt: Date.now(),
    updatedBy: getActiveStudioUser(),
    updatedFromDevice: crmState.deviceLabel,
    branding: crmState.branding,
    userSecurity: crmState.userSecurity || {},
    partners: crmState.partners.map(p => ({ id: p.id, name: p.name, role: p.role })),
    upiId: crmState.upiId,
    paypalLink: crmState.paypalLink,
    whatsappNumber: crmState.whatsappNumber,
    exchangeRates: crmState.exchangeRates,
    leads: crmState.leads,
    techStack: crmState.techStack,
    revenue: crmState.revenue,
    deletedLeadIds: Array.from(crmState.deletedLeadIds),
    deletedToolIds: Array.from(crmState.deletedToolIds),
    activityLog: crmState.activityLog.slice(0, 250)
  };
}

function applyGitHubDatabasePayload_(dbPayload) {
  if (!dbPayload || typeof dbPayload !== 'object') return { merged: false, localHasNewerData: false };

  applyCloudGlobalConfig_(dbPayload);

  let localHasNewerData = false;
  const remoteLeadIds = new Set();
  const remoteToolIds = new Set();

  // 1. Non-Destructive Merge of `leads` by ID + `updatedAt` timestamp
  if (Array.isArray(dbPayload.leads)) {
    const mergedLeadsMap = new Map();
    (crmState.leads || []).forEach(localLead => {
      if (localLead && String(localLead.id) !== GLOBAL_CONFIG_ROW_ID && !crmState.deletedLeadIds.has(String(localLead.id))) {
        mergedLeadsMap.set(String(localLead.id), normalizeLead_(localLead));
      }
    });

    dbPayload.leads.forEach(remoteLead => {
      if (!remoteLead || String(remoteLead.id) === GLOBAL_CONFIG_ROW_ID) return;
      const lid = String(remoteLead.id);
      if (crmState.deletedLeadIds.has(lid)) return;
      remoteLeadIds.add(lid);
      const normRemote = normalizeLead_(remoteLead);
      const existingLocal = mergedLeadsMap.get(lid);
      if (!existingLocal) {
        mergedLeadsMap.set(lid, normRemote);
      } else {
        const localTime = Number(existingLocal.updatedAt) || 0;
        const remoteTime = Number(normRemote.updatedAt) || Number(dbPayload.updatedAt) || 0;
        if (remoteTime >= localTime) {
          mergedLeadsMap.set(lid, normRemote);
        } else {
          localHasNewerData = true;
        }
      }
    });

    mergedLeadsMap.forEach((_, lid) => {
      if (!remoteLeadIds.has(lid)) localHasNewerData = true;
    });

    crmState.leads = Array.from(mergedLeadsMap.values());
  }

  // 2. Non-Destructive Merge of `techStack` by ID + `updatedAt` timestamp
  if (Array.isArray(dbPayload.techStack)) {
    const mergedToolsMap = new Map();
    (crmState.techStack || []).forEach(localTool => {
      if (localTool && !crmState.deletedToolIds.has(String(localTool.id))) {
        mergedToolsMap.set(String(localTool.id), normalizeTool_(localTool));
      }
    });

    dbPayload.techStack.forEach(remoteTool => {
      if (!remoteTool || !remoteTool.id) return;
      const tid = String(remoteTool.id);
      if (crmState.deletedToolIds.has(tid)) return;
      remoteToolIds.add(tid);
      const normRemote = normalizeTool_(remoteTool);
      const existingLocal = mergedToolsMap.get(tid);
      if (!existingLocal) {
        mergedToolsMap.set(tid, normRemote);
      } else {
        const localTime = Number(existingLocal.updatedAt) || 0;
        const remoteTime = Number(normRemote.updatedAt) || Number(dbPayload.updatedAt) || 0;
        if (remoteTime >= localTime) {
          mergedToolsMap.set(tid, normRemote);
        } else {
          localHasNewerData = true;
        }
      }
    });

    mergedToolsMap.forEach((_, tid) => {
      if (!remoteToolIds.has(tid)) localHasNewerData = true;
    });

    crmState.techStack = Array.from(mergedToolsMap.values());
  }

  // 3. Non-Destructive Merge of `revenue` by `invoiceId`
  if (Array.isArray(dbPayload.revenue)) {
    const revMap = new Map();
    (crmState.revenue || []).forEach(r => {
      if (r && r.invoiceId) revMap.set(String(r.invoiceId), r);
    });
    dbPayload.revenue.forEach(r => {
      if (r && r.invoiceId) revMap.set(String(r.invoiceId), r);
    });
    crmState.revenue = Array.from(revMap.values());
  }

  // 4. Non-Destructive Merge of `activityLog` by `id`
  if (Array.isArray(dbPayload.activityLog)) {
    const existingIds = new Set(crmState.activityLog.map(a => a.id));
    const combined = [...crmState.activityLog];
    dbPayload.activityLog.forEach(item => {
      if (item && item.id && !existingIds.has(item.id)) {
        combined.push(item);
        existingIds.add(item.id);
      }
    });
    combined.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
    crmState.activityLog = combined.slice(0, 250);
  }

    // 5. Authoritative Merge of userSecurity from GitHub JSON Database
  if (dbPayload.userSecurity && typeof dbPayload.userSecurity === 'object' && !Array.isArray(dbPayload.userSecurity)) {
    crmState.userSecurity = { ...dbPayload.userSecurity };
    saveUserSecurity_();
  }

  saveToLocalCache();
  return { merged: true, localHasNewerData };
}

/**
 * Direct GitHub REST API Client — GET `https://api.github.com/repos/{owner}/{repo}/contents/{path}`
 * Hydrates `globalState` (`crmState`) across refreshes and devices.
 */
async function fetchFromGitHubDatabase(showNotification = false, isSilentPoll = false) {
  const cfg = crmState.githubConfig || DEFAULT_GITHUB_CONFIG;
  const owner = (cfg.owner || DEFAULT_GITHUB_CONFIG.owner).trim();
  const repo = (cfg.repo || DEFAULT_GITHUB_CONFIG.repo).trim();
  const path = (cfg.path || DEFAULT_GITHUB_CONFIG.path).trim().replace(/^\/+/, '');
  const branch = (cfg.branch || DEFAULT_GITHUB_CONFIG.branch).trim() || 'main';
  const token = (cfg.token || '').trim();

  if (!owner || !repo || !path) return false;
  if (crmState.isGitHubPushing) return false;

  if (!isSilentPoll) {
    updateSyncBadge('syncing');
  }

  const apiUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path}?ref=${encodeURIComponent(branch)}&_t=${Date.now()}`;
  const headers = {
    'Accept': 'application/vnd.github+json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(apiUrl, { method: 'GET', headers, cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`GitHub GET ${response.status}`);
    }
    const fileMeta = await response.json();
    if (fileMeta && fileMeta.sha) {
      crmState.githubConfig.lastSha = fileMeta.sha;
      saveGitHubConfig();

      if (fileMeta.content) {
        const decodedJsonStr = decodeBase64Utf8_(fileMeta.content);
        const parsedDb = JSON.parse(decodedJsonStr);
        const { localHasNewerData } = applyGitHubDatabasePayload_(parsedDb);
        renderTechStack();
        renderKanban();
        renderAll();

        // If local state has newly added tools/deals that haven't been pushed to GitHub yet, push them now
        if (localHasNewerData && token && !crmState.isGitHubPushing) {
          pushToGitHubDatabase('Sync local studio changes to GitHub JSON');
        }
      }
      updateSyncBadge('github_live');
      if (showNotification) {
        showCRMToast(`Synced live from GitHub (${owner}/${repo}/${path})!`, 'cloud_done');
      }
      return true;
    }
  } catch (err) {
    console.warn('GitHub REST API GET notice:', err);
    if (showNotification) {
      showCRMToast(`GitHub sync notice: ${err.message}. Using cached/Sheet state.`, 'info');
    }
  }
  return false;
}

/**
 * Direct GitHub REST API Client — PUT `https://api.github.com/repos/{owner}/{repo}/contents/{path}`
 * Commits and pushes the updated JSON payload directly to the GitHub repository file.
 */
async function pushToGitHubDatabase(commitSummary = 'Update studio CRM state', isRetry = false) {
  const cfg = crmState.githubConfig || DEFAULT_GITHUB_CONFIG;
  const owner = (cfg.owner || DEFAULT_GITHUB_CONFIG.owner).trim();
  const repo = (cfg.repo || DEFAULT_GITHUB_CONFIG.repo).trim();
  const path = (cfg.path || DEFAULT_GITHUB_CONFIG.path).trim().replace(/^\/+/, '');
  const branch = (cfg.branch || DEFAULT_GITHUB_CONFIG.branch).trim() || 'main';
  const token = (cfg.token || '').trim();

  if (!token || !owner || !repo || !path) {
    return { status: 'no_token', message: 'Configure Database Security Key in Settings to enable direct GitHub commits.' };
  }

  const baseUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path}`;
  const headers = {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  try {
    crmState.isGitHubPushing = true;
    updateSyncBadge('syncing');

    // Ensure we have the latest file SHA before committing
    let currentSha = cfg.lastSha || '';
    if (!currentSha || isRetry) {
      const getRes = await fetch(`${baseUrl}?ref=${encodeURIComponent(branch)}&_t=${Date.now()}`, {
        method: 'GET',
        headers,
        cache: 'no-store'
      });
      if (getRes.ok) {
        const meta = await getRes.json();
        currentSha = meta.sha || '';
        crmState.githubConfig.lastSha = currentSha;
      }
    }

    const dbPayload = buildGitHubDatabasePayload_();
    const jsonString = JSON.stringify(dbPayload, null, 2);
    const encodedContent = encodeBase64Utf8_(jsonString);

    const putBody = {
      message: `[CRM Sync] ${commitSummary}`,
      content: encodedContent,
      branch
    };
    if (currentSha) {
      putBody.sha = currentSha;
    }

    const putRes = await fetch(baseUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify(putBody)
    });

    if (putRes.status === 409 && !isRetry) {
      // Automatic conflict resolution: refresh SHA and retry once
      crmState.isGitHubPushing = false;
      return await pushToGitHubDatabase(commitSummary, true);
    }

    if (!putRes.ok) {
      const errData = await putRes.json().catch(() => ({}));
      throw new Error(errData.message || `HTTP ${putRes.status}`);
    }

    const putData = await putRes.json();
    if (putData && putData.content && putData.content.sha) {
      crmState.githubConfig.lastSha = putData.content.sha;
      saveGitHubConfig();
    }

    updateSyncBadge('github_live');
    return { status: 'success', sha: crmState.githubConfig.lastSha };
  } catch (err) {
    console.warn('GitHub PUT notice:', err);
    updateSyncBadge('connected');
    return { status: 'error', message: err.message };
  } finally {
    crmState.isGitHubPushing = false;
  }
}

/**
 * ============================================================================
 * 1B. GOOGLE APPS SCRIPT FETCH() API CLIENT (GET & POST BACKUP)
 * ============================================================================
 */

function applyCloudGlobalConfig_(cloudCfg) {
  if (!cloudCfg || typeof cloudCfg !== 'object') return;

  if (cloudCfg.branding && typeof cloudCfg.branding === 'object') {
    const aName = String(cloudCfg.branding.agencyName || '').trim();
    const aTag = String(cloudCfg.branding.agencyTagline || '').trim();
    if (aName) crmState.branding.agencyName = aName;
    if (aTag) crmState.branding.agencyTagline = aTag;
  }

  if (Array.isArray(cloudCfg.partners) && cloudCfg.partners.length > 0) {
    crmState.partners = DEFAULT_PARTNERS.map((def, idx) => {
      const item = cloudCfg.partners[idx];
      const palette = PARTNER_PALETTE[idx % PARTNER_PALETTE.length];
      return {
        id: `P${idx + 1}`,
        name: item && item.name !== undefined ? String(item.name).trim() : def.name,
        role: item && item.role !== undefined ? String(item.role).trim() : def.role,
        ...palette
      };
    });
  }

  if (cloudCfg.upiId !== undefined && String(cloudCfg.upiId).trim()) {
    crmState.upiId = String(cloudCfg.upiId).trim();
    try { localStorage.setItem(STORAGE_KEY_UPI_ID, crmState.upiId); } catch (_) {}
  }
  if (cloudCfg.paypalLink !== undefined && String(cloudCfg.paypalLink).trim()) {
    crmState.paypalLink = String(cloudCfg.paypalLink).trim();
    try { localStorage.setItem(STORAGE_KEY_PAYPAL, crmState.paypalLink); } catch (_) {}
  }
  if (cloudCfg.whatsappNumber !== undefined && String(cloudCfg.whatsappNumber).trim()) {
    crmState.whatsappNumber = normalizeIndianWhatsAppNumber(cloudCfg.whatsappNumber);
    try { localStorage.setItem(STORAGE_KEY_WHATSAPP, crmState.whatsappNumber); } catch (_) {}
  }
  if (cloudCfg.exchangeRates && typeof cloudCfg.exchangeRates === 'object') {
    crmState.exchangeRates = { ...DEFAULT_EXCHANGE_RATES, ...cloudCfg.exchangeRates };
    saveExchangeRatesConfig();
  }
  if (Array.isArray(cloudCfg.deletedLeadIds)) {
    cloudCfg.deletedLeadIds.forEach(id => crmState.deletedLeadIds.add(String(id)));
  }
  if (Array.isArray(cloudCfg.deletedToolIds)) {
    cloudCfg.deletedToolIds.forEach(id => crmState.deletedToolIds.add(String(id)));
  }
  if (Array.isArray(cloudCfg.techStack)) {
    window.__cloudConfigTools = cloudCfg.techStack
      .filter(t => t && !crmState.deletedToolIds.has(String(t.id)))
      .map(normalizeTool_);
  }
  if (Array.isArray(cloudCfg.activityLog)) {
    const existingIds = new Set(crmState.activityLog.map(a => a.id));
    const combined = [...crmState.activityLog];
    cloudCfg.activityLog.forEach(item => {
      if (item && item.id && !existingIds.has(item.id)) {
        combined.push(item);
        existingIds.add(item.id);
      }
    });
    combined.sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
    crmState.activityLog = combined.slice(0, 250);
  }

  saveBrandingAndPartnersConfig();
  saveDeletedIds_();
}

async function syncGlobalConfigToSheet() {
  const url = (crmState.apiUrl || '').trim();
  if (!url) return;

  const configPayload = {
    updatedAt: Date.now(),
    branding: crmState.branding,
    userSecurity: crmState.userSecurity || {},
    partners: crmState.partners.map(p => ({ id: p.id, name: p.name, role: p.role })),
    upiId: crmState.upiId,
    paypalLink: crmState.paypalLink,
    whatsappNumber: crmState.whatsappNumber,
    exchangeRates: crmState.exchangeRates,
    techStack: crmState.techStack,
    deletedLeadIds: Array.from(crmState.deletedLeadIds),
    deletedToolIds: Array.from(crmState.deletedToolIds),
    activityLog: crmState.activityLog.slice(0, 60)
  };

  const serializedNotes = JSON.stringify(configPayload);

  try {
    const updateRes = await postToGoogleSheets({
      action: 'updateLead',
      id: GLOBAL_CONFIG_ROW_ID,
      clientName: GLOBAL_CONFIG_ROW_ID,
      notes: serializedNotes,
      lastContacted: new Date().toISOString()
    });

    if (!updateRes || !updateRes.lead) {
      await postToGoogleSheets({
        action: 'addLead',
        lead: {
          id: GLOBAL_CONFIG_ROW_ID,
          clientName: GLOBAL_CONFIG_ROW_ID,
          handle: '@system_config',
          service: 'Global Studio Config',
          stage: 'System',
          dealValue: 0,
          notes: serializedNotes
        }
      });
    }
    crmState.hasGlobalConfigRowInSheet = true;
  } catch (err) {
    console.warn('Global config sync notice:', err);
  }
}

function sheetOrCloudPick_(localItem, incomingItem) {
  if (!localItem || !localItem.id) return incomingItem;
  if (!incomingItem || !incomingItem.id) return localItem;
  const localTs = Number(localItem.updatedAt) || 0;
  const incomingTs = Number(incomingItem.updatedAt) || 0;
  return localTs > incomingTs ? { ...incomingItem, ...localItem } : { ...localItem, ...incomingItem };
}

async function fetchFromGoogleSheets(showNotification = false, isSilentBackgroundPoll = false) {
  // 1. Primary Sync: Direct GitHub JSON Database (`crm-data.json` via GitHub REST API)
  const ghSuccess = await fetchFromGitHubDatabase(showNotification, isSilentBackgroundPoll);
  if (ghSuccess && crmState.githubConfig && crmState.githubConfig.token) {
    return;
  }

  const url = (crmState.apiUrl || '').trim();
  if (!isSilentBackgroundPoll) {
    updateSyncBadge('syncing');
  }

  if (!url) {
    updateSyncBadge('local');
    renderAll();
    if (showNotification) {
      showCRMToast('No Web App URL configured. Using local storage.', 'info');
    }
    return;
  }

  if (crmState.isSyncing) return;

  try {
    crmState.isSyncing = true;
    const cacheBuster = `&_t=${Date.now()}`;
    const response = await fetch(url + (url.includes('?') ? '&' : '?') + 'action=getAll' + cacheBuster, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();

    if (data && data.status === 'success') {
      const legacyLeadIds = new Set(['LEAD-101','LEAD-102','LEAD-103','LEAD-104','LEAD-105','LEAD-106','LEAD-107','LEAD-108','LEAD-109','LEAD-110','LEAD-111']);
      const legacyToolIds = new Set(['TOOL-1','TOOL-2','TOOL-3','TOOL-4','TOOL-5','TOOL-6','TOOL-7']);

      if (Array.isArray(data.leads)) {
        // 1. Check for Global Studio Config row (__STUDIO_GLOBAL_CONFIG__)
        const configRows = data.leads.filter(l => String(l.id) === GLOBAL_CONFIG_ROW_ID || String(l.clientName) === GLOBAL_CONFIG_ROW_ID);
        if (configRows.length > 0) {
          crmState.hasGlobalConfigRowInSheet = true;
          const latestConfigRow = configRows[configRows.length - 1];
          try {
            const parsedConfig = JSON.parse(latestConfigRow.notes || '{}');
            applyCloudGlobalConfig_(parsedConfig);
          } catch (_) {}
        } else if (!crmState.hasGlobalConfigRowInSheet) {
          syncGlobalConfigToSheet();
        }

        // 2. Non-Destructive Merge of Kanban Deals (local + Sheet) so newly added deals are never wiped
        const mergedLeadsMap = new Map();
        (crmState.leads || []).forEach(localLead => {
          const lid = String(localLead.id || '');
          if (lid && lid !== GLOBAL_CONFIG_ROW_ID && !legacyLeadIds.has(lid) && !crmState.deletedLeadIds.has(lid)) {
            mergedLeadsMap.set(lid, normalizeLead_(localLead));
          }
        });
        data.leads.forEach(sheetLead => {
          const lid = String(sheetLead.id || '');
          if (lid && lid !== GLOBAL_CONFIG_ROW_ID && String(sheetLead.clientName || '') !== GLOBAL_CONFIG_ROW_ID && !legacyLeadIds.has(lid) && !crmState.deletedLeadIds.has(lid)) {
            const prev = mergedLeadsMap.get(lid) || {};
            mergedLeadsMap.set(lid, normalizeLead_({ ...prev, ...sheetLead }));
          }
        });
        crmState.leads = Array.from(mergedLeadsMap.values());
      }

      // 3. Merge Tech Stack tools from Sheet + Cloud Config + Local so added subscriptions never get lost
      const mergedToolsMap = new Map();
      (crmState.techStack || []).forEach(t => {
        const tid = String(t.id || '');
        if (tid && !legacyToolIds.has(tid) && !crmState.deletedToolIds.has(tid)) {
          mergedToolsMap.set(tid, normalizeTool_(t));
        }
      });
      if (Array.isArray(data.techStack)) {
        data.techStack.forEach(t => {
          const tid = String(t.id || '');
          if (tid && !legacyToolIds.has(tid) && !crmState.deletedToolIds.has(tid)) {
            const prev = mergedToolsMap.get(tid) || {};
            mergedToolsMap.set(tid, normalizeTool_({ ...sheetOrCloudPick_(prev, t) }));
          }
        });
      }
      if (Array.isArray(window.__cloudConfigTools)) {
        window.__cloudConfigTools.forEach(t => {
          const tid = String(t.id || '');
          if (tid && !legacyToolIds.has(tid) && !crmState.deletedToolIds.has(tid)) {
            const prev = mergedToolsMap.get(tid) || {};
            mergedToolsMap.set(tid, normalizeTool_({ ...sheetOrCloudPick_(prev, t) }));
          }
        });
      }
      crmState.techStack = Array.from(mergedToolsMap.values());

      if (Array.isArray(data.revenue)) {
        const legacyInvoices = new Set(['FX-2024-089', 'F3-882', 'F3-879', 'F3-875']);
        crmState.revenue = data.revenue.filter(r => !legacyInvoices.has(String(r.invoiceId)));
      }

      saveToLocalCache();
      renderAll();
      updateSyncBadge('connected');
      if (showNotification) {
        showCRMToast('Synced live with Google Sheets across all devices!', 'cloud_done');
      }
    } else {
      throw new Error((data && data.message) || 'Invalid response from Apps Script');
    }
  } catch (err) {
    console.warn('Google Sheets GET Notice:', err);
    if (!isSilentBackgroundPoll) {
      updateSyncBadge('error');
      renderAll();
    }
    if (showNotification) {
      showCRMToast('Sheet sync notice: ' + err.message, 'warning');
    }
  } finally {
    crmState.isSyncing = false;
  }
}

async function postToGoogleSheets(payload) {
  const url = (crmState.apiUrl || '').trim();
  if (!url) {
    return { status: 'local_only', message: 'Saved locally.' };
  }

  updateSyncBadge('syncing');
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  const result = await response.json();
  updateSyncBadge('connected');
  return result;
}

/**
 * ============================================================================
 * 2. PROFIT MARGIN ENGINE BASED ON LINKED TECH STACK TOOL COSTS (INR ₹)
 * ============================================================================
 */

function calculateProfitMetrics(dealValueINR, estHours, hourlyRateINR, toolsList, costPolicy = 'absorb', customToolCostINR = 0) {
  const gross = parseFloat(dealValueINR) || 0;
  const hours = parseFloat(estHours) || 0;
  const rate = parseFloat(hourlyRateINR) || 1500;
  const laborCost = Math.round(hours * rate);
  const extraToolCost = Math.max(0, Math.round(parseFloat(customToolCostINR) || 0));

  const selectedNames = Array.isArray(toolsList)
    ? toolsList.map(t => String(t).trim()).filter(Boolean)
    : String(toolsList || '').split(',').map(t => t.trim()).filter(Boolean);

  let rawToolCost = 0;
  const itemizedTools = [];

  selectedNames.forEach(name => {
    const matched = crmState.techStack.find(t =>
      t.toolName.toLowerCase() === name.toLowerCase() ||
      name.toLowerCase().includes(t.toolName.toLowerCase()) ||
      t.toolName.toLowerCase().includes(name.toLowerCase())
    );
    const burn = matched ? (parseFloat(matched.costPerCut) || 0) : 0;
    rawToolCost += burn;
    itemizedTools.push({
      toolName: matched ? matched.toolName : name,
      planLabel: matched ? `${matched.toolName} (${formatINR(matched.monthlyCost)}/mo)` : name,
      billingModel: matched ? `Paid by: ${matched.paidBy || matched.assignedPartners || 'Studio'}` : 'Allocated Tool',
      allocationMetric: burn > 0 ? 'Per Client Project Cut' : 'Linked (₹0/cut — set custom burn below)',
      costPerCut: burn,
      dotColor: 'bg-[#34D399]',
      textColor: 'text-[#60A5FA]'
    });
  });

  if (extraToolCost > 0) {
    rawToolCost += extraToolCost;
    itemizedTools.push({
      toolName: 'Custom Project Tool / Software Burn',
      planLabel: 'Custom Client Tool / Software Burn',
      billingModel: 'Direct Client Allocation',
      allocationMetric: 'Added on Client Deal',
      costPerCut: extraToolCost,
      dotColor: 'bg-[#FBBF24]',
      textColor: 'text-[#FBBF24]'
    });
  }

  rawToolCost = Math.round(rawToolCost);
  const effectiveToolCost = costPolicy === 'passthrough' ? 0 : rawToolCost;
  const clientSurcharge = costPolicy === 'passthrough' ? Math.round(rawToolCost * 1.15) : 0;
  const totalProductionCost = laborCost + effectiveToolCost;
  const netProfit = Math.round(gross + (costPolicy === 'passthrough' ? rawToolCost * 0.15 : 0) - totalProductionCost);
  const marginPercent = gross > 0 ? Number(((netProfit / gross) * 100).toFixed(1)) : 0;
  const burnRatio = gross > 0 ? Number(((rawToolCost / gross) * 100).toFixed(2)) : 0;

  return {
    gross,
    hours,
    rate,
    laborCost,
    toolCost: rawToolCost,
    customToolCost: extraToolCost,
    clientSurcharge,
    totalProductionCost,
    netProfit,
    marginPercent,
    burnRatio,
    itemizedTools
  };
}

/**
 * ============================================================================
 * 3. WHATSAPP DAILY REPORT PUSH (https://wa.me/<number>?text=<encoded_data>)
 * ============================================================================
 */

function compileWhatsAppDailyReportText(customDailyNote = '') {
  const fullAgency = getFullAgencyTitle();
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  let closedWonRevenue = 0;
  let activePipelineValue = 0;
  let closedDealsCount = 0;
  let dealsInProgressCount = 0;
  const stageCounts = {
    'Identified': 0,
    'In Discussion': 0,
    'Sample Cut': 0,
    'Approved': 0,
    'Closed Won': 0
  };

  crmState.leads.forEach(lead => {
    const v = parseFloat(lead.dealValue) || 0;
    const st = lead.stage || 'Identified';
    if (stageCounts[st] !== undefined) stageCounts[st] += 1;

    if (String(st).toLowerCase() === 'closed won') {
      closedWonRevenue += v;
      closedDealsCount += 1;
    } else {
      activePipelineValue += v;
      dealsInProgressCount += 1;
    }
  });

  const partnerStats = calculateNameCentricPartnerStats();
  const partnerLines = partnerStats.map(s =>
    `• ${s.partner.name} (${s.partner.role}): ${formatINR(s.totalAssignedINR)} total (${formatINR(s.closedRevenueINR)} closed | ${s.dealCount} deals)`
  );

  const lines = [
    `*${fullAgency} — Daily CRM Report (${dateStr})*`,
    ``,
    `• *Total Closed Revenue:* ${formatINR(closedWonRevenue)} (${closedDealsCount} Won)`,
    `• *Active Project Value:* ${formatINR(activePipelineValue)}`,
    `• *Deals in Progress:* ${dealsInProgressCount} active deals`,
    `  ↳ Identified: ${stageCounts['Identified']} | Discussion: ${stageCounts['In Discussion']} | Sample Cut: ${stageCounts['Sample Cut']} | Approved: ${stageCounts['Approved']}`,
    ``,
    `*Name-Centric Partner Revenue:*`,
    ...(partnerLines.length > 0 ? partnerLines : ['• No partner deals logged yet'])
  ];

  if (customDailyNote && customDailyNote.trim()) {
    lines.push(``, `*Daily Focus / Targets:*`, customDailyNote.trim());
  }

  const effectiveUpiId = (crmState.upiId || 'studio@upi').trim();
  const directUpiPayUrl = `upi://pay?pa=${encodeURIComponent(effectiveUpiId)}&cu=INR`;
  const effectivePaypal = normalizePayPalUrl(crmState.paypalLink) || 'Not configured (Set in Studio Config)';

  lines.push(
    ``,
    `*Instant Payment & Settlement:*`,
    `• *UPI ID:* ${effectiveUpiId}`,
    `• *Click here to Pay:* ${directUpiPayUrl}`,
    `• *PayPal:* ${effectivePaypal}`
  );

  return lines.join('\n');
}

function openWhatsAppReportModal() {
  injectSharedModals();
  const modal = document.getElementById('crm-whatsapp-modal');
  const phoneInput = document.getElementById('wa-report-phone');
  const previewArea = document.getElementById('wa-report-preview');

  if (phoneInput) {
    phoneInput.value = crmState.whatsappNumber || '';
  }
  if (previewArea) {
    previewArea.value = compileWhatsAppDailyReportText();
  }

    const activeUser = getActiveStudioUser().trim().toLowerCase();
  const isAdmin = activeUser === 'koushik';
  const adminSection = document.getElementById('admin-pin-reset-section');
  if (adminSection) {
    if (isAdmin) {
      adminSection.classList.remove('hidden');
      renderAdminPinResetList();
    } else {
      adminSection.classList.add('hidden');
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function refreshWhatsAppPreviewText() {
  const noteEl = document.getElementById('wa-report-daily-note');
  const previewArea = document.getElementById('wa-report-preview');
  if (previewArea) {
    previewArea.value = compileWhatsAppDailyReportText(noteEl ? noteEl.value : '');
  }
}

function sendWhatsAppReportFromModal(event) {
  if (event) event.preventDefault();
  const phoneInput = document.getElementById('wa-report-phone');
  const previewArea = document.getElementById('wa-report-preview');

  const rawNumber = phoneInput ? phoneInput.value.trim() : crmState.whatsappNumber;
  const cleanDigits = normalizeIndianWhatsAppNumber(rawNumber);

  if (!cleanDigits || cleanDigits.length < 10) {
    showCRMToast('Please enter a valid 10-digit Indian WhatsApp number (e.g. 9876543210 or 919876543210)', 'warning');
    if (phoneInput) phoneInput.focus();
    return;
  }

  crmState.whatsappNumber = cleanDigits;
  if (phoneInput) phoneInput.value = cleanDigits;
  try {
    localStorage.setItem(STORAGE_KEY_WHATSAPP, cleanDigits);
  } catch (_) {}

  const reportText = (previewArea && previewArea.value) ? previewArea.value : compileWhatsAppDailyReportText();
  const waUrl = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(waSafeText(reportText))}`;

  window.open(waUrl, '_blank', 'noopener,noreferrer');
  closeModal('crm-whatsapp-modal');
  showCRMToast(`Opening WhatsApp Daily Report for +${cleanDigits}`, 'chat');
}

function quickPushWhatsAppReport() {
  let targetNumber = normalizeIndianWhatsAppNumber(crmState.whatsappNumber || '');
  if (!targetNumber || targetNumber.length < 10) {
    const prompted = window.prompt(
      'Enter 10-digit Indian WhatsApp number (+91 is added automatically):',
      ''
    );
    if (!prompted) return;
    targetNumber = normalizeIndianWhatsAppNumber(prompted);
    if (targetNumber.length < 10) {
      showCRMToast('Invalid WhatsApp number. Enter a 10-digit Indian mobile number.', 'warning');
      return;
    }
  }
  crmState.whatsappNumber = targetNumber;
  try {
    localStorage.setItem(STORAGE_KEY_WHATSAPP, targetNumber);
  } catch (_) {}

  const reportText = compileWhatsAppDailyReportText();
  const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(waSafeText(reportText))}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
  showCRMToast(`Pushing Daily Report to WhatsApp (+${targetNumber})`, 'chat');
}

/**
 * ============================================================================
 * 4. DYNAMIC UPI PAYMENT QR CODE GENERATOR, PAYPAL & NATIVE WEB SHARE ENGINE
 *    Format: upi://pay?pa=<UPI_ID>&pn=<AgencyName>&am=<AMOUNT>&cu=INR
 *    QR API: https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=...
 * ============================================================================
 */

function normalizePayPalUrl(rawUrl) {
  const trimmed = String(rawUrl || '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function openUpiQrModal(leadId = '', presetAmount = '') {
  injectSharedModals();
  const modal = document.getElementById('crm-upi-modal');
  const upiInput = document.getElementById('upi-modal-vpa');
  const paypalInput = document.getElementById('upi-modal-paypal');
  const waInput = document.getElementById('upi-modal-whatsapp');
  const amountInput = document.getElementById('upi-modal-amount');
  const clientSelect = document.getElementById('upi-modal-lead-select');

  if (clientSelect) {
    clientSelect.innerHTML = `<option value="">-- Custom / General Client Payment --</option>` +
      crmState.leads.map(l =>
        `<option value="${escapeHtml(l.id)}">${escapeHtml(l.clientName)} (${formatINR(l.dealValue)})</option>`
      ).join('');
    if (leadId) {
      clientSelect.value = leadId;
    }
  }

  if (upiInput) {
    upiInput.value = crmState.upiId || '';
  }
  if (paypalInput) {
    paypalInput.value = crmState.paypalLink || '';
  }
  if (waInput) {
    const normalizedWa = normalizeIndianWhatsAppNumber(crmState.whatsappNumber || '');
    crmState.whatsappNumber = normalizedWa;
    waInput.value = normalizedWa.startsWith('91') && normalizedWa.length === 12
      ? normalizedWa.slice(2)
      : normalizedWa;
  }

  const matchedLead = leadId ? crmState.leads.find(l => l.id === leadId) : null;
  if (amountInput) {
    if (presetAmount !== '' && !isNaN(parseFloat(presetAmount))) {
      amountInput.value = parseFloat(presetAmount);
    } else if (matchedLead) {
      amountInput.value = matchedLead.dealValue || 0;
    } else if (!amountInput.value) {
      amountInput.value = 25000;
    }
  }

  updateUpiQrCodeDisplay();

    const activeUser = getActiveStudioUser().trim().toLowerCase();
  const isAdmin = activeUser === 'koushik';
  const adminSection = document.getElementById('admin-pin-reset-section');
  if (adminSection) {
    if (isAdmin) {
      adminSection.classList.remove('hidden');
      renderAdminPinResetList();
    } else {
      adminSection.classList.add('hidden');
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function handleUpiLeadSelectChange(leadId) {
  const lead = crmState.leads.find(l => l.id === leadId);
  const amountInput = document.getElementById('upi-modal-amount');
  if (lead && amountInput) {
    amountInput.value = lead.dealValue || 0;
  }
  updateUpiQrCodeDisplay();
}

function setUpiPresetAmount(amountINR) {
  const amountInput = document.getElementById('upi-modal-amount');
  if (amountInput) {
    amountInput.value = amountINR;
    updateUpiQrCodeDisplay();
  }
}

function updateUpiQrCodeDisplay() {
  const upiInput = document.getElementById('upi-modal-vpa');
  const paypalInput = document.getElementById('upi-modal-paypal');
  const waInput = document.getElementById('upi-modal-whatsapp');
  const clientSelect = document.getElementById('upi-modal-lead-select');
  const amountInput = document.getElementById('upi-modal-amount');
  const qrImg = document.getElementById('upi-qr-image');
  const uriPreview = document.getElementById('upi-uri-string-preview');
  const amountBadge = document.getElementById('upi-qr-amount-badge');
  const payeeBadge = document.getElementById('upi-qr-payee-badge');

  const vpa = upiInput ? upiInput.value.trim() : crmState.upiId;
  const paypalVal = paypalInput ? paypalInput.value.trim() : crmState.paypalLink;
  const rawAmt = amountInput ? parseFloat(amountInput.value) : 0;
  const cleanAmt = !isNaN(rawAmt) && rawAmt > 0 ? rawAmt : 0;
  const agencyName = getFullAgencyTitle();
  const selectedLeadId = clientSelect ? clientSelect.value : '';
  const selectedLead = selectedLeadId ? crmState.leads.find(l => l.id === selectedLeadId) : null;

  if (upiInput) {
    crmState.upiId = vpa;
    try {
      localStorage.setItem(STORAGE_KEY_UPI_ID, vpa);
    } catch (_) {}
  }

  if (paypalInput) {
    crmState.paypalLink = paypalVal;
    try {
      localStorage.setItem(STORAGE_KEY_PAYPAL, paypalVal);
    } catch (_) {}
  }

  if (waInput && waInput.value.trim()) {
    const normalizedWa = normalizeIndianWhatsAppNumber(waInput.value.trim());
    crmState.whatsappNumber = normalizedWa;
    try {
      localStorage.setItem(STORAGE_KEY_WHATSAPP, normalizedWa);
    } catch (_) {}
  }

  const effectiveVpa = vpa || 'studio@upi';
  const effectivePayPal = normalizePayPalUrl(paypalVal);
  // Full URI embedded inside the Scannable QR Code matrix
  const upiUri = `upi://pay?pa=${encodeURIComponent(effectiveVpa)}&pn=${encodeURIComponent(agencyName)}&am=${cleanAmt}&cu=INR`;
  // Short, clean Direct UPI URI (no long studio name %20 clutter) that works directly when tapped in WhatsApp
  const directUpiAppLinkIndia = cleanAmt > 0
    ? `upi://pay?pa=${encodeURIComponent(effectiveVpa)}&am=${cleanAmt}&cu=INR`
    : `upi://pay?pa=${encodeURIComponent(effectiveVpa)}&cu=INR`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=12&data=${encodeURIComponent(upiUri)}`;

  if (uriPreview) {
    uriPreview.textContent = directUpiAppLinkIndia;
  }
  if (amountBadge) {
    amountBadge.textContent = formatINR(cleanAmt);
  }
  if (payeeBadge) {
    payeeBadge.textContent = `${agencyName} (${effectiveVpa})`;
  }
  window.__currentUpiUri = upiUri;
  window.__currentPaymentShareData = {
    agencyName,
    clientName: selectedLead ? selectedLead.clientName : '',
    service: selectedLead ? selectedLead.service : '',
    amountFormatted: formatINR(cleanAmt),
    amountRaw: cleanAmt,
    upiId: effectiveVpa,
    upiUri,
    qrApiUrl,
    directUpiAppLinkIndia,
    paypalLink: effectivePayPal || 'Not configured'
  };

  // Pre-fetch QR image as a local Base64 Data URL so <canvas> is NEVER tainted on file:// and Blob is ready in 0ms
  if (window.__lastPreloadedQrApiUrl !== qrApiUrl) {
    window.__lastPreloadedQrApiUrl = qrApiUrl;
    preloadCleanUpiQrAssets(qrApiUrl, qrImg);
  }
}

async function preloadCleanUpiQrAssets(qrApiUrl, qrImgEl) {
  try {
    const resp = await fetch(qrApiUrl, { mode: 'cors' });
    const qrBlob = await resp.blob();
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(qrBlob);
    });
    window.__cachedQrDataUrl = dataUrl;
    const targetImg = qrImgEl || document.getElementById('upi-qr-image');
    if (targetImg) {
      targetImg.src = dataUrl;
    }
    const cardBlob = await generateUpiQrCardBlob(true);
    if (cardBlob) {
      window.__cachedQrCardBlob = cardBlob;
    }
  } catch (err) {
    const targetImg = qrImgEl || document.getElementById('upi-qr-image');
    if (targetImg) {
      targetImg.crossOrigin = 'anonymous';
      targetImg.src = qrApiUrl;
    }
  }
}

function buildFormattedPaymentShareText(data) {
  const lines = [
    `*${data.agencyName} — Payment Request*`,
    ``
  ];
  if (data.clientName) {
    lines.push(`• *Client:* ${data.clientName}`);
  }
  if (data.service) {
    lines.push(`• *Deliverable:* ${data.service}`);
  }
  lines.push(
    `• *Amount:* ${data.amountFormatted}`,
    `• *UPI ID:* ${data.upiId}`,
    `• *Click here to Pay:* ${data.directUpiAppLinkIndia}`
  );
  if (data.paypalLink && data.paypalLink !== 'Not configured') {
    lines.push(`• *PayPal:* ${data.paypalLink}`);
  }
  return lines.join('\n');
}

/**
 * Generates a high-resolution Branded UPI QR Payment Card PNG Blob (600x760)
 * containing Studio Name, Amount in ₹, Scannable QR Code (with embedded upi://pay URI),
 * and UPI ID. Uses Base64 Data URL via fetch() so <canvas> is NEVER tainted on file://.
 */
async function generateUpiQrCardBlob(skipUpdateCall = false) {
  if (!skipUpdateCall && !window.__currentPaymentShareData) {
    updateUpiQrCodeDisplay();
  }
  const data = window.__currentPaymentShareData || {
    agencyName: getFullAgencyTitle(),
    amountFormatted: formatINR(25000),
    upiId: crmState.upiId || 'studio@upi',
    qrApiUrl: `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=12&data=${encodeURIComponent(window.__currentUpiUri || 'upi://pay')}`
  };

  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 760;
  const ctx = canvas.getContext('2d');

  // Deep Space-Blue Glass Card Background
  const bgGrad = ctx.createLinearGradient(0, 0, 600, 760);
  bgGrad.addColorStop(0, '#070B14');
  bgGrad.addColorStop(1, '#101928');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 600, 760);

  // Subtle Top Border Accent
  ctx.fillStyle = '#2DD4BF';
  ctx.fillRect(0, 0, 600, 8);

  // Agency Title & Header
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN QR WITH ANY UPI APP TO PAY (INR ₹)', 300, 56);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(String(data.agencyName).slice(0, 34), 300, 96);

  // Big Amount Pill
  ctx.fillStyle = '#2DD4BF';
  ctx.font = '700 52px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(data.amountFormatted, 300, 165);

  // White Rounded Frame for QR Code
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(110, 195, 380, 380, 24);
  } else {
    ctx.rect(110, 195, 380, 380);
  }
  ctx.fill();

  // Ensure we have a clean, untainted Base64 Data URL for the QR Code image
  let qrDataUrl = window.__cachedQrDataUrl;
  if (!qrDataUrl || window.__lastPreloadedQrApiUrl !== data.qrApiUrl) {
    try {
      const resp = await fetch(data.qrApiUrl, { mode: 'cors' });
      const qrBlob = await resp.blob();
      qrDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(qrBlob);
      });
      window.__cachedQrDataUrl = qrDataUrl;
      window.__lastPreloadedQrApiUrl = data.qrApiUrl;
    } catch (_) {}
  }

  if (qrDataUrl) {
    await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 130, 215, 340, 340);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = qrDataUrl;
    });
  }

  // UPI ID & Instructions Footer
  ctx.fillStyle = '#FBBF24';
  ctx.font = '700 22px "JetBrains Mono", monospace';
  ctx.fillText(`UPI ID: ${data.upiId}`, 300, 628);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('GPay • PhonePe • Paytm • BHIM • Any UPI App', 300, 672);

  if (data.paypalLink && data.paypalLink !== 'Not configured') {
    ctx.fillStyle = '#38BDF8';
    ctx.font = '500 15px "JetBrains Mono", monospace';
    ctx.fillText(`PayPal: ${data.paypalLink}`, 300, 712);
  }

  const finalBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (finalBlob) {
    window.__cachedQrCardBlob = finalBlob;
  }
  return finalBlob;
}

async function copyUpiQrImageToClipboard(showNotification = true) {
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      // Use pre-cached untainted Blob immediately if available (0ms synchronous user gesture)
      const blobOrPromise = window.__cachedQrCardBlob
        ? Promise.resolve(window.__cachedQrCardBlob)
        : generateUpiQrCardBlob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blobOrPromise })]);
      const statusBadge = document.getElementById('upi-qr-clipboard-status');
      if (statusBadge) {
        statusBadge.textContent = '✓ QR Image Copied! Press Ctrl+V inside WhatsApp chat to attach QR.';
        statusBadge.classList.remove('text-slate-400');
        statusBadge.classList.add('text-emerald-300');
      }
      if (showNotification) {
        showCRMToast('QR Code Image copied! Press Ctrl+V inside WhatsApp to attach the QR image.', 'qr_code_2');
      }
      return true;
    }
  } catch (err) {
    console.warn('Clipboard image write notice:', err);
  }
  if (showNotification) {
    await downloadUpiQrCardImage();
  }
  return false;
}

async function downloadUpiQrCardImage() {
  const blob = window.__cachedQrCardBlob || (await generateUpiQrCardBlob());
  if (!blob) return;
  const data = window.__currentPaymentShareData || { upiId: 'upi', amountRaw: 0 };
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `UPI-QR-${String(data.upiId).replace(/[^a-zA-Z0-9]/g, '_')}-INR-${data.amountRaw || 0}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  showCRMToast('Downloaded Branded UPI QR Card PNG!', 'download');
}

async function sendPaymentWithQrToWhatsApp() {
  if (window.__waSendInFlight) return;
  window.__waSendInFlight = true;
  setTimeout(() => { window.__waSendInFlight = false; }, 2500);

  updateUpiQrCodeDisplay();
  const data = window.__currentPaymentShareData;
  const formattedText = buildFormattedPaymentShareText(data);

  // 1. Copy the untainted Branded QR Card PNG to the clipboard so Ctrl+V in WhatsApp attaches the QR image
  const copiedImg = await copyUpiQrImageToClipboard(false);
  if (!copiedImg) {
    // Fallback: auto-download the QR PNG file so the user can drag it into WhatsApp
    await downloadUpiQrCardImage();
  }

  const waInput = document.getElementById('upi-modal-whatsapp');
  const rawPhone = (waInput && waInput.value.trim()) ? waInput.value.trim() : crmState.whatsappNumber;
  const cleanDigits = normalizeIndianWhatsAppNumber(rawPhone);

  if (cleanDigits) {
    crmState.whatsappNumber = cleanDigits;
    try {
      localStorage.setItem(STORAGE_KEY_WHATSAPP, cleanDigits);
    } catch (_) {}
  }

  const waUrl = cleanDigits.length >= 10
    ? `https://wa.me/${cleanDigits}?text=${encodeURIComponent(waSafeText(formattedText))}`
    : `https://wa.me/?text=${encodeURIComponent(waSafeText(formattedText))}`;

  window.open(waUrl, '_blank', 'noopener,noreferrer');
  if (copiedImg) {
    showCRMToast(`WhatsApp opened (+${cleanDigits || '91'}) — Press Ctrl+V in WhatsApp chat to paste the QR Image!`, 'chat');
  } else {
    showCRMToast(`WhatsApp opened (+${cleanDigits || '91'}) + QR PNG downloaded!`, 'chat');
  }
}

function copyUpiPaymentLink() {
  const uri = (window.__currentPaymentShareData && window.__currentPaymentShareData.directUpiAppLinkIndia) || window.__currentUpiUri || '';
  if (!uri) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(uri);
  }
  showCRMToast('Copied Direct UPI link (upi://pay) to clipboard!', 'content_copy');
}

function openPayPalPaymentLink() {
  const paypalInput = document.getElementById('upi-modal-paypal');
  const rawLink = (paypalInput && paypalInput.value.trim()) ? paypalInput.value.trim() : crmState.paypalLink;
  const normalizedUrl = normalizePayPalUrl(rawLink);

  if (!normalizedUrl) {
    showCRMToast('Please enter your PayPal.me link in the Payment or Studio Config modal first.', 'warning');
    if (paypalInput) paypalInput.focus();
    return;
  }

  crmState.paypalLink = rawLink;
  try {
    localStorage.setItem(STORAGE_KEY_PAYPAL, rawLink);
  } catch (_) {}

  window.open(normalizedUrl, '_blank', 'noopener,noreferrer');
  showCRMToast('Opening PayPal.me payment link...', 'open_in_new');
}

async function sharePaymentDetailsDirectly() {
  updateUpiQrCodeDisplay();
  const data = window.__currentPaymentShareData;
  const formattedShareText = buildFormattedPaymentShareText(data);

  // 1. Try Native Web Share WITH the pre-cached UPI QR Card PNG Image File attached (0ms synchronous user gesture)
  try {
    const qrBlob = window.__cachedQrCardBlob || (await generateUpiQrCardBlob());
    if (qrBlob && navigator.share) {
      const qrFile = new File([qrBlob], `UPI-QR-${data.amountRaw || 25000}-INR.png`, { type: 'image/png' });
      if (!navigator.canShare || navigator.canShare({ files: [qrFile] })) {
        await navigator.share({
          title: `${data.agencyName} — Payment (${data.amountFormatted})`,
          text: formattedShareText,
          files: [qrFile]
        });
        showCRMToast('Shared UPI QR Card image + payment details!', 'share');
        return;
      }
    }
  } catch (err) {
    if (err && err.name === 'AbortError') return;
  }

  // 2. Fallback: Copy QR image to clipboard + Native Web Share text
  await copyUpiQrImageToClipboard(false);
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${data.agencyName} — Payment (${data.amountFormatted})`,
        text: formattedShareText
      });
      showCRMToast('Shared payment details (QR image also copied to clipboard — press Ctrl+V)!', 'share');
      return;
    } catch (err) {
      if (err && err.name === 'AbortError') return;
    }
  }

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(formattedShareText);
  }
  showCRMToast('Copied clickable UPI QR & Payment request to clipboard!', 'content_copy');
}

/**
 * ============================================================================
 * 5. BULK CURRENCY CONVERTER MODAL (FOREIGN -> INR ₹)
 * ============================================================================
 */

function openCurrencyConverterModal() {
  injectSharedModals();
  renderExchangeRateInputs();
  runBulkCurrencyConversion();
  const modal = document.getElementById('crm-currency-modal');
    const activeUser = getActiveStudioUser().trim().toLowerCase();
  const isAdmin = activeUser === 'koushik';
  const adminSection = document.getElementById('admin-pin-reset-section');
  if (adminSection) {
    if (isAdmin) {
      adminSection.classList.remove('hidden');
      renderAdminPinResetList();
    } else {
      adminSection.classList.add('hidden');
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function renderExchangeRateInputs() {
  const container = document.getElementById('converter-rates-grid');
  if (!container) return;
  const foreignCurrencies = ['USD', 'EUR', 'GBP', 'AED', 'CAD', 'AUD'];
  container.innerHTML = foreignCurrencies.map(code => `
    <div class="flex flex-col gap-1 p-2.5 rounded-2xl bg-[#12121A]">
      <div class="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#8E92A4]">
        <span>1 ${code} (${CURRENCY_SYMBOLS[code].trim()})</span>
        <span class="text-[#34D399]">→ INR ₹</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-xs font-label-code text-[#8E92A4]">₹</span>
        <input type="number" step="0.01" value="${crmState.exchangeRates[code] || 85}"
          oninput="updateSingleExchangeRate('${code}', this.value)"
          class="w-full h-7 px-2 rounded-full bg-[#1F202D] text-white font-label-code text-xs font-bold focus:outline-none"/>
      </div>
    </div>
  `).join('');
}

function updateSingleExchangeRate(code, val) {
  const num = parseFloat(val);
  if (!isNaN(num) && num > 0) {
    globalState.exchangeRates[code] = num;
    saveExchangeRatesConfig();
    saveToLocalCache();
    runBulkCurrencyConversion();
    updateNewLeadMarginPreview();
    clearTimeout(window.__fxSyncTimer);
    window.__fxSyncTimer = setTimeout(() => {
      recordStudioActivity('Updated FX Exchange Rate', `Set 1 ${code} = ₹${num} INR`, false);
      pushToGitHubDatabase(`${getActiveStudioUser()}: Updated ${code} rate to ₹${num}`);
      syncGlobalConfigToSheet();
      renderAll();
    }, 600);
  }
}

function resetDefaultExchangeRates() {
  globalState.exchangeRates = { ...DEFAULT_EXCHANGE_RATES };
  saveExchangeRatesConfig();
  saveToLocalCache();
  renderExchangeRateInputs();
  runBulkCurrencyConversion();
  updateNewLeadMarginPreview();
  recordStudioActivity('Reset FX Exchange Rates', 'Reset foreign exchange rates to defaults (1 USD = ₹85)', false);
  pushToGitHubDatabase(`${getActiveStudioUser()}: Reset FX rates to default`);
  syncGlobalConfigToSheet();
  renderAll();
  showCRMToast('Exchange rates reset to defaults (1 USD = ₹85)', 'currency_rupee');
}

function runBulkCurrencyConversion() {
  const inputEl = document.getElementById('bulk-converter-input');
  const defaultCurrEl = document.getElementById('bulk-default-currency');
  const tbody = document.getElementById('bulk-converter-results-body');
  const totalInrEl = document.getElementById('bulk-converter-total-inr');
  const countEl = document.getElementById('bulk-converter-count');
  if (!inputEl || !tbody) return;

  const fallbackCurrency = defaultCurrEl ? defaultCurrEl.value : 'USD';
  const rawLines = inputEl.value.split('\n').map(l => l.trim()).filter(Boolean);

  if (rawLines.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="py-6 text-center text-[#8E92A4] text-xs">Type or paste foreign amounts on the left (one per line) to convert into INR (₹) in bulk.</td></tr>`;
    if (totalInrEl) totalInrEl.textContent = '₹0';
    if (countEl) countEl.textContent = '0 items';
    window.__lastBulkConvertedText = '';
    return;
  }

  let grandTotalINR = 0;
  const copyLines = [];

  const rowsHtml = rawLines.map((line, idx) => {
    let detectedCurr = fallbackCurrency;
    const upper = line.toUpperCase();

    if (upper.includes('AED')) detectedCurr = 'AED';
    else if (upper.includes('CAD') || upper.includes('C$')) detectedCurr = 'CAD';
    else if (upper.includes('AUD') || upper.includes('A$')) detectedCurr = 'AUD';
    else if (upper.includes('GBP') || line.includes('£')) detectedCurr = 'GBP';
    else if (upper.includes('EUR') || line.includes('€')) detectedCurr = 'EUR';
    else if (upper.includes('USD') || line.includes('$')) detectedCurr = 'USD';
    else if (upper.includes('INR') || line.includes('₹')) detectedCurr = 'INR';

    const matches = line.match(/-?\d[\d,]*(\.\d+)?/g);
    let foreignAmt = 0;
    if (matches && matches.length > 0) {
      const numStr = matches[matches.length - 1].replace(/,/g, '');
      foreignAmt = parseFloat(numStr) || 0;
    }

    let label = line
      .replace(/-?\d[\d,]*(\.\d+)?/g, '')
      .replace(/\b(USD|EUR|GBP|AED|CAD|AUD|INR)\b/gi, '')
      .replace(/[$€£₹]/g, '')
      .replace(/^[-:•\s]+|[-:•\s]+$/g, '')
      .trim();
    if (!label) label = `Item #${idx + 1}`;

    const rate = parseFloat(crmState.exchangeRates[detectedCurr]) || 1;
    const inrValue = Math.round(foreignAmt * rate);
    grandTotalINR += inrValue;

    const formattedForeign = `${CURRENCY_SYMBOLS[detectedCurr]}${foreignAmt.toLocaleString('en-US', { maximumFractionDigits: 2 })} (${detectedCurr})`;
    const formattedInr = formatINR(inrValue);
    copyLines.push(`${label}: ${formattedForeign} = ${formattedInr}`);

    return `
      <tr class="hover:bg-[#1F202D]">
        <td class="py-2 px-3 text-white font-medium truncate max-w-[160px]" title="${escapeHtml(label)}">${escapeHtml(label)}</td>
        <td class="py-2 px-3 font-label-code text-[#60A5FA]">${escapeHtml(formattedForeign)}</td>
        <td class="py-2 px-3 font-label-code text-[#8E92A4] text-[11px]">× ₹${rate}</td>
        <td class="py-2 px-3 font-label-code text-right text-[#34D399] font-bold">${formattedInr}</td>
      </tr>
    `;
  }).join('');

  tbody.innerHTML = rowsHtml;
  if (totalInrEl) totalInrEl.textContent = formatINR(grandTotalINR);
  if (countEl) countEl.textContent = `${rawLines.length} item${rawLines.length === 1 ? '' : 's'}`;
  copyLines.push(`Total in INR: ${formatINR(grandTotalINR)}`);
  window.__lastBulkConvertedText = copyLines.join('\n');
}

function copyBulkConvertedINR() {
  const text = window.__lastBulkConvertedText || '';
  if (!text) {
    showCRMToast('Nothing to copy yet. Enter amounts to convert first.', 'info');
    return;
  }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
  showCRMToast('Copied bulk INR (₹) conversion summary to clipboard!', 'content_copy');
}

/**
 * ============================================================================
 * 6. EMAIL AUTOMATION ('Send Follow-up' & 'Sample Delivered')
 * ============================================================================
 */

function updateEmailSignaturePreview() {
  const partnerSelect = document.getElementById('email-modal-partner');
  const sigPreview = document.getElementById('email-modal-signature-preview');
  if (!sigPreview) return;
  const activePartners = getActivePartners();
  const partnerName = partnerSelect ? partnerSelect.value : activePartners[0].name;
  const pObj = activePartners.find(p => p.name === partnerName) || activePartners[0];
  const fullAgency = getFullAgencyTitle();
  sigPreview.textContent = `${pObj.name} (${pObj.role}) — ${fullAgency}`;
}

function openEmailModal(leadId, emailType = 'follow_up') {
  const lead = crmState.leads.find(l => l.id === leadId) || crmState.leads[0];
  let modal = document.getElementById('crm-email-modal');
  if (!modal) {
    injectSharedModals();
    modal = document.getElementById('crm-email-modal');
  }

  const activePartners = getActivePartners();
  const partnerSelect = document.getElementById('email-modal-partner');
  if (partnerSelect) {
    partnerSelect.innerHTML = activePartners.map(p =>
      `<option value="${escapeHtml(p.name)}">${escapeHtml(p.name)} (${escapeHtml(p.role)})</option>`
    ).join('');
  }

  const fullAgency = getFullAgencyTitle();
  const isSample = emailType === 'sample_delivered';
  document.getElementById('email-modal-lead-id').value = lead ? lead.id : '';
  document.getElementById('email-modal-type').value = emailType;
  document.getElementById('email-modal-title').textContent = isSample
    ? `🎬 Trigger "Sample Delivered" Email (${fullAgency})`
    : `⚡ Trigger "Send Follow-up" Email (${fullAgency})`;
  document.getElementById('email-modal-badge').textContent = isSample ? 'SAMPLE DELIVERED' : 'FOLLOW-UP SEQUENCE';
  document.getElementById('email-modal-client-name').value = lead ? lead.clientName : '';
  document.getElementById('email-modal-client-email').value = lead ? (lead.clientEmail || '') : '';
  if (lead && partnerSelect) partnerSelect.value = lead.partner || activePartners[0].name;
  document.getElementById('email-modal-sample-url').value = lead ? (lead.sampleUrl || 'https://frame.io/') : 'https://frame.io/';

  const activePartner = partnerSelect ? partnerSelect.value : activePartners[0].name;
  document.getElementById('email-modal-note').value = lead
    ? (isSample
        ? `Hi ${lead.clientName} team — we have completed the sample cut for your ${lead.service} project (${formatINR(lead.dealValue)} retainer) at ${fullAgency}. Review the cut on Frame.io!\n\n— ${activePartner}, ${fullAgency}`
        : `Hi ${lead.clientName} team — following up from ${fullAgency} on our ${lead.service} proposal and sample reel. Let us know when you are ready to kick off!\n\n— ${activePartner}, ${fullAgency}`)
    : `Hi team — following up from ${fullAgency} regarding your upcoming video production pipeline.\n\n— ${activePartner}, ${fullAgency}`;

  updateEmailSignaturePreview();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

async function handleSendEmailSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('email-modal-submit-btn');
  const origHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="material-symbols-outlined text-[16px] animate-spin">sync</span> Sending via Gmail...';

  const leadId = document.getElementById('email-modal-lead-id').value;
  const emailType = document.getElementById('email-modal-type').value;
  const clientName = document.getElementById('email-modal-client-name').value.trim();
  const clientEmail = document.getElementById('email-modal-client-email').value.trim();
  const partner = document.getElementById('email-modal-partner').value;
  const sampleUrl = document.getElementById('email-modal-sample-url').value.trim();
  const customNote = document.getElementById('email-modal-note').value.trim();

  const activePartners = getActivePartners();
  const pObj = activePartners.find(p => p.name === partner) || activePartners[0];
  const fullAgency = getFullAgencyTitle();
  const senderSignature = `${pObj.name} (${pObj.role}) — ${fullAgency}`;

  const lead = globalState.leads.find(l => l.id === leadId);
  if (lead) {
    lead.clientEmail = clientEmail;
    lead.sampleUrl = sampleUrl;
    lead.lastContacted = new Date().toISOString().split('T')[0];
    lead.updatedAt = Date.now();
    if (emailType === 'sample_delivered') {
      lead.sampleStatus = 'Free Sample: Delivered';
      if (lead.stage === 'Identified' || lead.stage === 'In Discussion') {
        lead.stage = 'Sample Cut';
      }
    }
    saveToLocalCache();
    recordStudioActivity(
      emailType === 'sample_delivered' ? 'Dispatched Sample Cut Email' : 'Sent Client Follow-up Email',
      `Sent ${emailType === 'sample_delivered' ? 'Sample Delivered' : 'Follow-up'} email to ${clientName} (${clientEmail}) via ${partner}`,
      false
    );
    pushToGitHubDatabase(`${getActiveStudioUser()}: Email to ${clientName}`);
    syncGlobalConfigToSheet();
    renderKanban();
    renderAll();
  }

  try {
    const res = await postToGoogleSheets({
      action: 'sendEmail',
      emailType,
      leadId,
      clientName,
      clientEmail,
      partner,
      agencyName: crmState.branding.agencyName,
      agencyTagline: crmState.branding.agencyTagline,
      senderSignature,
      service: lead ? lead.service : 'Creative Production',
      sampleUrl,
      customNote
    });

    closeModal('crm-email-modal');
    if (res && res.status === 'success') {
      showCRMToast(`${emailType === 'sample_delivered' ? 'Sample Delivered' : 'Follow-up'} email sent via Gmail (${fullAgency}) to ${clientEmail}!`, 'mark_email_read');
    } else {
      showCRMToast(`Email dispatched / logged for ${clientEmail} (${fullAgency})`, 'mail');
    }
  } catch (err) {
    closeModal('crm-email-modal');
    showCRMToast('Email trigger warning: ' + err.message, 'warning');
  } finally {
    btn.disabled = false;
    btn.innerHTML = origHtml;
  }
}

/**
 * ============================================================================
 * 7. SUBMIT NEW DEAL / LEAD MODAL (WITH FOREIGN -> INR ₹ AUTO-CONVERTER)
 * ============================================================================
 */

function openNewLeadModal() {
  injectSharedModals();
  refreshNewLeadDynamicOptions();
  updateNewLeadMarginPreview();
  const modal = document.getElementById('crm-new-lead-modal');
    const activeUser = getActiveStudioUser().trim().toLowerCase();
  const isAdmin = activeUser === 'koushik';
  const adminSection = document.getElementById('admin-pin-reset-section');
  if (adminSection) {
    if (isAdmin) {
      adminSection.classList.remove('hidden');
      renderAdminPinResetList();
    } else {
      adminSection.classList.add('hidden');
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function refreshNewLeadDynamicOptions() {
  const activePartners = getActivePartners();
  const partnerSelect = document.getElementById('new-lead-partner');
  if (partnerSelect) {
    partnerSelect.innerHTML = activePartners.map(p =>
      `<option value="${escapeHtml(p.name)}">${escapeHtml(p.name)} (${escapeHtml(p.role)})</option>`
    ).join('');
  }

  const toolsContainer = document.getElementById('new-lead-tools-checkboxes');
  if (toolsContainer) {
    if (crmState.techStack.length === 0) {
      toolsContainer.innerHTML = `<span class="text-xs text-[#8E92A4]">No software subscriptions added yet. Add subscriptions on the <a href="tech-stack.html" class="text-[#34D399] underline">Tech Stack page</a> (or enter custom tool burn below / at last in Dossier).</span>`;
    } else {
      toolsContainer.innerHTML = crmState.techStack.map(t => {
        const cutTxt = (parseFloat(t.costPerCut) || 0) > 0 ? `${formatINR(t.costPerCut)}/cut` : 'Set cut at last';
        return `
          <label class="flex items-center gap-1.5 text-xs font-label-code text-slate-800 font-medium cursor-pointer">
            <input type="checkbox" class="new-lead-tool-checkbox accent-[#34D399]" value="${escapeHtml(t.toolName)}" onchange="updateNewLeadMarginPreview()"/>
            <span>${escapeHtml(t.toolName)} (${cutTxt})</span>
          </label>
        `;
      }).join('');
    }
  }
  const customToolBurnInput = document.getElementById('new-lead-custom-tool-cost');
  if (customToolBurnInput) customToolBurnInput.value = '';
}

function updateNewLeadMarginPreview() {
  const valEl = document.getElementById('new-lead-value');
  const currEl = document.getElementById('new-lead-currency');
  if (!valEl || !currEl) return;

  const rawEnteredAmount = parseFloat(valEl.value) || 0;
  const selectedCurrency = currEl.value || 'INR';
  const rate = parseFloat(crmState.exchangeRates[selectedCurrency]) || 1;
  const convertedINR = convertToINR(rawEnteredAmount, selectedCurrency);

  const convHint = document.getElementById('new-lead-conversion-badge');
  if (convHint) {
    if (selectedCurrency === 'INR') {
      convHint.textContent = `Project Value: ${formatINR(convertedINR)}`;
    } else {
      convHint.textContent = `${CURRENCY_SYMBOLS[selectedCurrency]}${rawEnteredAmount.toLocaleString()} ${selectedCurrency} × ₹${rate} = ${formatINR(convertedINR)}`;
    }
  }

  const estHours = parseFloat(document.getElementById('new-lead-hours').value) || 0;
  const hourlyRate = parseFloat(document.getElementById('new-lead-rate').value) || 0;
  const customToolCost = parseFloat(document.getElementById('new-lead-custom-tool-cost')?.value) || 0;
  const checkedTools = Array.from(document.querySelectorAll('.new-lead-tool-checkbox:checked')).map(cb => cb.value);

  const calc = calculateProfitMetrics(convertedINR, estHours, hourlyRate, checkedTools, 'absorb', customToolCost);
  document.getElementById('new-lead-preview-gross').textContent = formatINR(calc.gross);
  document.getElementById('new-lead-preview-labor').textContent = `-${formatINR(calc.laborCost)}`;
  document.getElementById('new-lead-preview-tools').textContent = `-${formatINR(calc.toolCost)}`;
  document.getElementById('new-lead-preview-profit').textContent = `${calc.netProfit >= 0 ? '+' : ''}${formatINR(calc.netProfit)}`;
  document.getElementById('new-lead-preview-margin').textContent = `${calc.marginPercent}% Net Margin`;
}

async function handleNewLeadSubmit(event) {
  event.preventDefault();
  const btn = document.getElementById('new-lead-submit-btn');
  const origText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span class="material-symbols-outlined text-[16px] animate-spin">sync</span> Saving Deal in ₹...';

  const activePartners = getActivePartners();
  const clientName = document.getElementById('new-lead-name').value.trim();
  const handle = document.getElementById('new-lead-handle').value.trim() || ('@' + clientName.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const clientEmail = document.getElementById('new-lead-email').value.trim();
  const phoneEl = document.getElementById('new-lead-phone');
  const contactPhone = phoneEl ? phoneEl.value.trim() : '';
  const country = document.getElementById('new-lead-country').value;
  const service = document.getElementById('new-lead-service').value.trim();
  const source = document.getElementById('new-lead-source').value;

  const rawQuoteAmount = parseFloat(document.getElementById('new-lead-value').value) || 0;
  const quoteCurrency = document.getElementById('new-lead-currency').value || 'INR';
  const dealValueINR = convertToINR(rawQuoteAmount, quoteCurrency);

  const billingLabel = quoteCurrency === 'INR'
    ? `${formatINR(dealValueINR)} / mo`
    : `${formatINR(dealValueINR)} (${CURRENCY_SYMBOLS[quoteCurrency]}${rawQuoteAmount.toLocaleString()} ${quoteCurrency})`;

  const partner = document.getElementById('new-lead-partner').value || activePartners[0].name;
  const stage = document.getElementById('new-lead-stage').value;
  const sampleStatus = document.getElementById('new-lead-sample').value;
  const sampleUrl = document.getElementById('new-lead-sample-url').value.trim() || 'https://frame.io/';
  const estHours = parseFloat(document.getElementById('new-lead-hours').value) || 0;
  const hourlyRate = parseFloat(document.getElementById('new-lead-rate').value) || 0;
  const customToolCost = parseFloat(document.getElementById('new-lead-custom-tool-cost')?.value) || 0;
  const checkedTools = Array.from(document.querySelectorAll('.new-lead-tool-checkbox:checked')).map(cb => cb.value);

  const calc = calculateProfitMetrics(dealValueINR, estHours, hourlyRate, checkedTools, 'absorb', customToolCost);

  const newLead = {
    id: 'LEAD-' + Date.now(),
    clientName,
    handle,
    clientEmail,
    contactPhone,
    lastInteractionAt: Date.now(),
    lastInteractionType: 'created',
    videoDelivery: {
      version: 'v1.0 First Cut',
      driveUrl: '',
      previewUrl: '',
      notes: '',
      deliveredAt: null
    },
    country,
    service,
    serviceIcon: 'movie_edit',
    source,
    dealValue: dealValueINR,
    originalQuoteAmount: rawQuoteAmount,
    originalQuoteCurrency: quoteCurrency,
    billingLabel,
    partner,
    stage,
    sampleStatus,
    sampleUrl,
    toolsUsed: checkedTools.join(', '),
    estHours,
    hourlyRate,
    customToolCost,
    laborCost: calc.laborCost,
    toolCost: calc.toolCost,
    netProfit: calc.netProfit,
    marginPercent: calc.marginPercent,
    scope: `${service}`,
    pipeline: `${getFullAgencyTitle()} Pipeline`,
    lastContacted: new Date().toISOString().split('T')[0],
    payments: [],
    notes: customToolCost > 0 ? `[CUSTOM_BURN:${customToolCost}]` : '',
    updatedAt: Date.now()
  };

  globalState.leads.unshift(newLead);
  if (stage === 'Closed Won') {
    globalState.revenue.unshift({
      invoiceId: 'INV-' + Math.floor(1000 + Math.random() * 9000),
      clientName,
      partner,
      grossAmount: dealValueINR,
      laborCost: calc.laborCost,
      toolCost: calc.toolCost,
      netProfit: calc.netProfit,
      marginPercent: calc.marginPercent,
      status: 'Paid',
      date: new Date().toISOString().split('T')[0]
    });
  }
  saveToLocalCache();
  clearFormDraft_('new-lead-form');
  recordStudioActivity(
    'Added Client Deal',
    `Added "${clientName}" (${formatINR(dealValueINR)} • ${stage}) assigned to ${partner}`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Added deal ${clientName} (${formatINR(dealValueINR)})`);
  syncGlobalConfigToSheet();
  renderKanban();
  renderAll();

  try {
    const res = await postToGoogleSheets({ action: 'addLead', lead: newLead });
    closeModal('crm-new-lead-modal');
    document.getElementById('new-lead-form').reset();
    if (res && res.status === 'success') {
      showCRMToast(`Added "${clientName}" (${formatINR(dealValueINR)}) & synced to GitHub/Cloud!`, 'check_circle');
    } else {
      showCRMToast(`Added "${clientName}" (${formatINR(dealValueINR)}) to ${partner}'s pipeline!`, 'add_task');
    }
  } catch (err) {
    closeModal('crm-new-lead-modal');
    showCRMToast(`Added "${clientName}" (${formatINR(dealValueINR)}) & logged to Team History.`, 'info');
  } finally {
    btn.disabled = false;
    btn.innerHTML = origText;
  }
}

function deleteLeadCard(leadId) {
  const idx = globalState.leads.findIndex(l => l.id === leadId);
  if (idx < 0) return;
  const removed = globalState.leads.splice(idx, 1)[0];
  globalState.deletedLeadIds.add(String(leadId));
  saveDeletedIds_();
  saveToLocalCache();
  closeModal('client-dossier-modal');
  recordStudioActivity(
    'Removed Client Deal',
    `Deleted deal "${removed.clientName}" (${formatINR(removed.dealValue)})`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Removed deal ${removed.clientName}`);
  syncGlobalConfigToSheet();
  renderKanban();
  renderAll();
  showCRMToast(`Removed "${removed.clientName}" across all devices`, 'delete');
}

/**
 * ============================================================================
 * 8. CLIENT DOSSIER & INTERACTIVE PROFIT MARGIN CALCULATOR MODAL (INR ₹)
 * ============================================================================
 */

/* ==========================================================================
   PAYMENT LOGGING & CASH FLOW ENGINE (LIQUID CASH TELEMETRY)
   ========================================================================== */

/* ==========================================================================
   LOCAL OFFLINE RECEIPT OCR SCANNER & AUTO-FILL ENGINE (TESSERACT.JS)
   100% Client-Side In-Browser Processing — Zero Data Leak / Zero API Calls
   ========================================================================== */

function triggerReceiptFileInput(leadId) {
  const input = document.getElementById(`receipt-file-input-${leadId}`);
  if (input) input.click();
}

function handleReceiptDragOver(event, leadId) {
  event.preventDefault();
  event.stopPropagation();
  const dropzone = document.getElementById(`receipt-scanner-dropzone-${leadId}`);
  if (dropzone) dropzone.classList.add('drag-active');
}

function handleReceiptDragLeave(event, leadId) {
  event.preventDefault();
  event.stopPropagation();
  const dropzone = document.getElementById(`receipt-scanner-dropzone-${leadId}`);
  if (dropzone) dropzone.classList.remove('drag-active');
}

function handleReceiptDrop(event, leadId) {
  event.preventDefault();
  event.stopPropagation();
  const dropzone = document.getElementById(`receipt-scanner-dropzone-${leadId}`);
  if (dropzone) dropzone.classList.remove('drag-active');

  const files = event.dataTransfer ? event.dataTransfer.files : null;
  if (files && files.length > 0) {
    processReceiptImage(files[0], leadId);
  }
}

function handleReceiptFileSelect(event, leadId) {
  const files = event.target ? event.target.files : null;
  if (files && files.length > 0) {
    processReceiptImage(files[0], leadId);
  }
}

/**
 * Robust Regex parsing for Indian & International Payment Receipts
 * Extracts: Amount (₹ / Rs / INR), Txn ID / UPI Ref / UTR, and Payment Method
 */
function parseReceiptText(ocrText) {
  if (!ocrText || typeof ocrText !== 'string') {
    return { amount: null, txnId: null, method: null, detectedText: '' };
  }

  const cleanText = ocrText.replace(/\r\n/g, '\n');

  // 1. AMOUNT EXTRACTION
  let detectedAmount = null;

  const currencyPatterns = [
    // Matches ₹, Rs., Rs, INR followed by numbers with optional commas & decimals
    /(?:₹|rs\.?|inr)\s*[:=-]?\s*([0-9]{1,3}(?:,[0-9]{2,3})*(?:\.[0-9]{1,2})?|[0-9]+(?:\.[0-9]{1,2})?)/i,
    // Matches Paid of, Amount:, Total:, Sent:, Transferred: followed by number
    /(?:paid|amount|total|transferred|debited|sent)\s*(?:of)?\s*[:=-]?\s*(?:₹|rs\.?|inr)?\s*([0-9]{1,3}(?:,[0-9]{2,3})*(?:\.[0-9]{1,2})?|[0-9]+(?:\.[0-9]{1,2})?)/i,
    // Standard Indian currency comma formatting: e.g. 25,000 or 1,50,000
    /\b([1-9][0-9]{0,2}(?:,[0-9]{2})*(?:,[0-9]{3})(?:\.[0-9]{2})?)\b/,
    // Standard 3-digit comma formatting: e.g. 25,000.00
    /\b([1-9][0-9]{0,2}(?:,[0-9]{3})+(?:\.[0-9]{2})?)\b/
  ];

  for (const pattern of currencyPatterns) {
    const match = cleanText.match(pattern);
    if (match && match[1]) {
      const rawNum = match[1].replace(/,/g, '');
      const val = parseFloat(rawNum);
      if (!isNaN(val) && val >= 10 && val < 50000000 && val !== 2024 && val !== 2025 && val !== 2026) {
        detectedAmount = val;
        break;
      }
    }
  }

  // 2. TRANSACTION ID / UPI REF / UTR EXTRACTION
  let detectedTxnId = null;
  const txnPatterns = [
    /(?:upi\s*ref(?:\s*no)?|utr(?:\s*no)?|txn(?:\s*id)?|transaction\s*id|ref(?:\s*no)?)\s*[:#-]?\s*([A-Za-z0-9]{8,35})/i,
    /(?:google\s*transaction\s*id)\s*[:#-]?\s*([A-Za-z0-9_-]{10,40})/i,
    /\b(T[0-9]{18,28})\b/,
    /\b([0-9]{12})\b/
  ];

  for (const pattern of txnPatterns) {
    const match = cleanText.match(pattern);
    if (match && match[1]) {
      detectedTxnId = match[1].trim();
      break;
    }
  }

  // 3. PAYMENT METHOD RECOGNITION
  let detectedMethod = null;
  const lower = cleanText.toLowerCase();
  if (lower.includes('upi') || lower.includes('gpay') || lower.includes('google pay') || lower.includes('phonepe') || lower.includes('paytm') || lower.includes('bhim')) {
    detectedMethod = 'UPI';
  } else if (lower.includes('paypal')) {
    detectedMethod = 'PayPal';
  } else if (lower.includes('imps') || lower.includes('neft') || lower.includes('rtgs') || lower.includes('bank transfer') || lower.includes('state bank') || lower.includes('hdfc') || lower.includes('icici')) {
    detectedMethod = 'Bank Transfer';
  }

  return {
    amount: detectedAmount,
    txnId: detectedTxnId,
    method: detectedMethod,
    detectedText: cleanText.slice(0, 300)
  };
}

/**
 * 100% Local In-Browser OCR Processor
 * Uses Tesseract.js client-side. The image is never sent to any external server.
 * Discards image from memory immediately after OCR completes.
 */
async function processReceiptImage(file, leadId) {
  if (!file) return;

  if (!file.type || !file.type.startsWith('image/')) {
    showCRMToast('Please upload a valid receipt screenshot (PNG, JPG, WebP).', 'warning');
    return;
  }

  const statusBox = document.getElementById(`receipt-scanner-status-${leadId}`);
  const statusLabel = document.getElementById(`receipt-scanner-label-${leadId}`);
  const statusPct = document.getElementById(`receipt-scanner-pct-${leadId}`);
  const statusBar = document.getElementById(`receipt-scanner-bar-${leadId}`);
  const amtInput = document.getElementById(`payment-input-amount-${leadId}`);
  const refInput = document.getElementById(`payment-input-ref-${leadId}`);
  const methodSelect = document.getElementById(`payment-input-method-${leadId}`);
  const recordBtn = document.getElementById(`payment-btn-record-${leadId}`);

  if (typeof Tesseract === 'undefined') {
    showCRMToast('Offline OCR library is still loading. Please try again in 5 seconds...', 'info');
    return;
  }

  if (statusBox) {
    statusBox.classList.remove('hidden');
    statusBox.classList.add('flex');
  }
  if (statusLabel) statusLabel.textContent = 'Scanning receipt pixels securely (100% Offline)...';
  if (statusPct) statusPct.textContent = '0%';
  if (statusBar) statusBar.style.width = '0%';

  if (amtInput) amtInput.disabled = true;
  if (refInput) refInput.disabled = true;
  if (recordBtn) recordBtn.disabled = true;

  try {
    const result = await Tesseract.recognize(
      file,
      'eng',
      {
        logger: m => {
          if (m.status === 'recognizing text' && typeof m.progress === 'number') {
            const pct = Math.min(100, Math.round(m.progress * 100));
            if (statusBar) statusBar.style.width = `${pct}%`;
            if (statusPct) statusPct.textContent = `${pct}%`;
            if (statusLabel) {
              statusLabel.textContent = pct < 100
                ? `Reading receipt pixels offline (${pct}%)...`
                : 'Extracting payment data...';
            }
          }
        }
      }
    );

    const ocrText = (result && result.data && result.data.text) ? result.data.text : '';
    const parsed = parseReceiptText(ocrText);

    // Re-enable inputs for manual verification
    if (amtInput) amtInput.disabled = false;
    if (refInput) refInput.disabled = false;
    if (recordBtn) recordBtn.disabled = false;

    // Auto-fill Amount
    if (parsed.amount && amtInput) {
      amtInput.value = parsed.amount;
      amtInput.classList.add('ring-2', 'ring-[#34D399]');
      setTimeout(() => amtInput.classList.remove('ring-2', 'ring-[#34D399]'), 3000);
    }

    // Auto-fill Txn ID / Reference
    if (parsed.txnId && refInput) {
      refInput.value = parsed.txnId;
      refInput.classList.add('ring-2', 'ring-[#34D399]');
      setTimeout(() => refInput.classList.remove('ring-2', 'ring-[#34D399]'), 3000);
    }

    // Auto-select Method if identified
    if (parsed.method && methodSelect) {
      methodSelect.value = parsed.method;
    }

    if (statusBar) statusBar.style.width = '100%';
    if (statusPct) statusPct.textContent = '100%';

    if (parsed.amount || parsed.txnId) {
      const summaryParts = [];
      if (parsed.amount) summaryParts.push(`Amount: ${formatINR(parsed.amount)}`);
      if (parsed.txnId) summaryParts.push(`Txn: ${parsed.txnId}`);
      if (statusLabel) {
        statusLabel.innerHTML = `<span class="text-[#34D399] font-semibold">✓ Extracted: ${escapeHtml(summaryParts.join(' • '))}</span>`;
      }
      showCRMToast(`Extracted ${summaryParts.join(', ')}! Please verify and click Record.`, 'check_circle');
    } else {
      if (statusLabel) {
        statusLabel.textContent = 'Scan complete. No clear amount found — please enter manually.';
      }
      showCRMToast('Receipt scanned, but figures were unclear. Please enter manually.', 'info');
    }

    setTimeout(() => {
      if (statusBox) {
        statusBox.classList.add('hidden');
        statusBox.classList.remove('flex');
      }
    }, 6000);

  } catch (err) {
    console.error('Offline OCR Scanner Error:', err);
    if (amtInput) amtInput.disabled = false;
    if (refInput) refInput.disabled = false;
    if (recordBtn) recordBtn.disabled = false;
    if (statusLabel) statusLabel.textContent = 'Scanner error. Please enter details manually.';
    showCRMToast('OCR could not parse receipt. Please enter amount manually.', 'warning');
  } finally {
    // CRITICAL PRIVACY & ZERO DATA-LEAK ENFORCEMENT:
    // Discard file reference and reset file input immediately from browser memory
    const fileInput = document.getElementById(`receipt-file-input-${leadId}`);
    if (fileInput) fileInput.value = '';
    file = null;
  }
}

function recordDealPayment(leadId) {
  const lead = crmState.leads.find(l => l.id === leadId);
  if (!lead) return;

  const amtInput = document.getElementById(`payment-input-amount-${leadId}`);
  const refInput = document.getElementById(`payment-input-ref-${leadId}`);
  const phaseSelect = document.getElementById(`payment-input-phase-${leadId}`);
  const methodSelect = document.getElementById(`payment-input-method-${leadId}`);

  const amount = parseFloat(amtInput ? amtInput.value : 0) || 0;
  if (amount <= 0) {
    showCRMToast('Please enter a valid payment amount (> 0)', 'error');
    if (amtInput) amtInput.focus();
    return;
  }

  const phase = phaseSelect ? phaseSelect.value : '50% Advance';
  const method = methodSelect ? methodSelect.value : 'UPI';
  const reference = refInput ? refInput.value.trim() : '';
  const recordedBy = getActiveStudioUser();

  if (!Array.isArray(lead.payments)) {
    lead.payments = [];
  }

  const paymentRecord = {
    id: 'PAY-' + Math.random().toString(36).slice(2, 8),
    amount,
    phase,
    method,
    reference,
    timestamp: new Date().toISOString(),
    recordedBy
  };

  lead.payments.push(paymentRecord);
  lead.updatedAt = Date.now();

  recalculateSingleLead_(lead);
  saveToLocalCache();

  const refMsg = reference ? ` (Ref: ${reference})` : '';
  recordStudioActivity(
    'Recorded Payment',
    `Recorded ${formatINR(amount)} (${phase} via ${method}${refMsg}) for "${lead.clientName}"`,
    false
  );
  pushToGitHubDatabase(`${recordedBy}: Recorded ${formatINR(amount)} ${phase} for ${lead.clientName}`);
  syncGlobalConfigToSheet();

  renderDossierModalContent(lead);
  renderHeaderAndMetrics();
  renderKanbanBoard();
  renderAll();

  showCRMToast(`Recorded ${formatINR(amount)} payment for ${lead.clientName}!`, 'payments');
}

function deleteDealPayment(leadId, paymentId) {
  const lead = crmState.leads.find(l => l.id === leadId);
  if (!lead || !Array.isArray(lead.payments)) return;

  const pIdx = lead.payments.findIndex(p => p.id === paymentId);
  if (pIdx < 0) return;

  const removed = lead.payments.splice(pIdx, 1)[0];
  lead.updatedAt = Date.now();

  recalculateSingleLead_(lead);
  saveToLocalCache();

  recordStudioActivity(
    'Removed Payment Record',
    `Removed payment of ${formatINR(removed.amount)} (${removed.phase}) from "${lead.clientName}"`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Removed payment ${formatINR(removed.amount)} for ${lead.clientName}`);
  syncGlobalConfigToSheet();

  renderDossierModalContent(lead);
  renderHeaderAndMetrics();
  renderKanbanBoard();
  renderAll();

  showCRMToast('Payment record removed.', 'delete');
}

/* ==========================================================================
   CLIENT RESPONSE SLA, VIDEO DELIVERY DRAWER & WHATSAPP SMART DRAFTER (PHASE 1)
   ========================================================================== */

function cleanWhatsAppPhone(phone) {
  if (!phone) return '';
  let cleaned = String(phone).replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }
  // Standard Indian 10-digit mobile auto-prefix with 91
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned;
}

function formatInteractionTime(ts) {
  if (!ts) return 'Never';
  const num = Number(ts);
  if (isNaN(num) || num <= 0) return 'Never';
  const diffMs = Math.max(0, Date.now() - num);
  const diffMin = Math.floor(diffMs / (1000 * 60));
  if (diffMin < 2) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(num).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

function getLeadWaitingMetrics(lead) {
  const lastAt = Number(lead.lastInteractionAt) || Number(lead.updatedAt) || Number(lead.createdAt) || Date.now();
  const diffMs = Math.max(0, Date.now() - lastAt);
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = Math.floor(diffHours / 24);

  const isClosed = lead.stage === 'Closed Won' || lead.stage === 'Closed Lost' || lead.status === 'Won' || lead.status === 'Lost';
  if (isClosed) {
    return {
      badgeClass: 'badge-waiting-closed',
      icon: 'check_circle',
      label: 'Closed',
      hours: diffHours,
      days: diffDays,
      status: 'closed'
    };
  }

  if (diffHours < 2) {
    return {
      badgeClass: 'badge-waiting-ok',
      icon: 'verified',
      label: 'Replied • Up to date',
      hours: diffHours,
      days: diffDays,
      status: 'ok'
    };
  }

  if (diffHours < 24) {
    const h = Math.round(diffHours);
    return {
      badgeClass: 'badge-waiting-warn',
      icon: 'schedule',
      label: `Waiting ${h}h`,
      hours: diffHours,
      days: diffDays,
      status: 'warn'
    };
  }

  const d = diffDays > 0 ? `${diffDays}d` : `${Math.round(diffHours)}h`;
  return {
    badgeClass: 'badge-waiting-urgent',
    icon: 'warning',
    label: `Waiting ${d} • Overdue!`,
    hours: diffHours,
    days: diffDays,
    status: 'urgent'
  };
}

function renderWaitingSlaBadgeHtml(lead, compact = true) {
  const m = getLeadWaitingMetrics(lead);
  return `
    <span class="${m.badgeClass} ${compact ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[11px]'} rounded-full font-label-code font-bold inline-flex items-center gap-1 min-w-0" title="Client Response SLA: ${m.label}">
      <span class="material-symbols-outlined ${compact ? 'text-[11px]' : 'text-[13px]'} flex-shrink-0">${m.icon}</span>
      <span class="truncate">${m.label}</span>
    </span>
  `;
}

function logLeadTouchpoint(leadId, note = 'Replied to client') {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;

  lead.lastInteractionAt = Date.now();
  lead.lastInteractionType = 'touchpoint';
  lead.updatedAt = Date.now();

  saveToLocalCache();
  recordStudioActivity(
    'Logged Client Touchpoint',
    `${getActiveStudioUser()}: ${note} for "${lead.clientName}" (SLA timer reset)`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Logged touchpoint for ${lead.clientName}`);
  syncGlobalConfigToSheet();

  const modal = document.getElementById('client-dossier-modal');
  if (modal && !modal.classList.contains('hidden') && crmState.activeDossierLeadId === leadId) {
    renderDossierModalContent(lead);
  }
  renderKanban();
  showCRMToast(`Touchpoint logged for "${lead.clientName}" • SLA timer reset!`, 'timer');
}

function updateLeadPhone(leadId, phone) {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;
  lead.contactPhone = String(phone || '').trim();
  lead.updatedAt = Date.now();
  saveToLocalCache();
  pushToGitHubDatabase(`${getActiveStudioUser()}: Updated contact phone for ${lead.clientName}`);
}

function saveLeadVideoDelivery(leadId) {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;

  const versionEl = document.getElementById(`video-cut-version-${leadId}`);
  const driveUrlEl = document.getElementById(`video-drive-url-${leadId}`);
  const previewUrlEl = document.getElementById(`video-preview-url-${leadId}`);
  const notesEl = document.getElementById(`video-notes-${leadId}`);

  const version = versionEl ? versionEl.value : 'v1.0 First Cut';
  const driveUrl = driveUrlEl ? driveUrlEl.value.trim() : '';
  const previewUrl = previewUrlEl ? previewUrlEl.value.trim() : '';
  const notes = notesEl ? notesEl.value.trim() : '';

  lead.videoDelivery = {
    version,
    driveUrl,
    previewUrl,
    notes,
    deliveredAt: Date.now()
  };
  lead.updatedAt = Date.now();

  saveToLocalCache();
  recordStudioActivity(
    'Saved Video Delivery Links',
    `${getActiveStudioUser()}: Saved ${version} links for "${lead.clientName}"`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Saved video delivery links for ${lead.clientName}`);
  syncGlobalConfigToSheet();
  showCRMToast(`Saved ${version} delivery links for "${lead.clientName}"!`, 'video_file');
}

function dispatchWhatsAppVideoReview(leadId) {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;

  saveLeadVideoDelivery(leadId);

  const phoneInput = document.getElementById(`wa-phone-${leadId}`);
  const rawPhone = phoneInput ? phoneInput.value.trim() : (lead.contactPhone || lead.phone || '');
  const cleanPhone = cleanWhatsAppPhone(rawPhone);

  const agencyName = getFullAgencyTitle();
  const vd = lead.videoDelivery || {};
  const version = vd.version || 'v1.0 First Cut';
  const driveUrl = vd.driveUrl || 'Drive folder link will be attached';
  const previewUrl = vd.previewUrl ? `\n\n📱 Quick Stream Preview:\n${vd.previewUrl}` : '';
  const notes = vd.notes ? `\n\n📝 Editor Notes:\n${vd.notes}` : '';

  const msg = `Hi ${lead.clientName}! 🎬\n\nYour *${version}* for the project *${lead.service || 'Creative Cut'}* is ready for review from ${agencyName}! 🚀\n\n📁 High-Res Cloud Drive Master:\n${driveUrl}${previewUrl}${notes}\n\nPlease take a look and let us know your feedback or timestamps for any tweaks! 🙌`;

  lead.lastInteractionAt = Date.now();
  lead.lastInteractionType = 'review_sent';
  lead.updatedAt = Date.now();
  saveToLocalCache();
  recordStudioActivity(
    'Sent WhatsApp Video Review',
    `${getActiveStudioUser()}: Dispatched ${version} review to "${lead.clientName}"`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Sent WhatsApp video review to ${lead.clientName}`);
  syncGlobalConfigToSheet();

  const waUrl = cleanPhone 
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waSafeText(msg))}`
    : `https://wa.me/?text=${encodeURIComponent(waSafeText(msg))}`;

  window.open(waUrl, '_blank');
  renderKanban();
  showCRMToast(`WhatsApp review dispatched & SLA timer reset!`, 'send');
}

function applyWhatsAppTemplate(leadId, templateType) {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;

  const agencyName = getFullAgencyTitle();
  const payments = Array.isArray(lead.payments) ? lead.payments : [];
  const collected = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const quoteVal = parseFloat(lead.dealValue) || 0;
  const balance = Math.max(0, quoteVal - collected);
  const vd = lead.videoDelivery || {};
  const upiId = (crmState.branding && crmState.branding.upiId) ? crmState.branding.upiId : 'studio@upi';

  let text = '';
  switch (templateType) {
    case 'welcome':
      text = `Hi ${lead.clientName}! 👋\n\nWelcome to ${agencyName}! We're thrilled to partner with you on *${lead.service || 'Creative Project'}*.\n\nOur team has initiated your project workspace and our lead editor (*${lead.partner}*) is assigned. We'll share our first progress milestone soon!\n\nFeel free to ping here anytime if you have any references or notes. 🚀`;
      break;

    case 'video_cut':
      text = `Hi ${lead.clientName}! 🎬\n\nExciting news! Your *${vd.version || 'v1.0 First Cut'}* for *${lead.service || 'Video Project'}* is ready for review.\n\n📁 Review Folder:\n${vd.driveUrl || '[Insert Google Drive Link]'}${vd.previewUrl ? `\n\n📱 Quick Stream:\n${vd.previewUrl}` : ''}${vd.notes ? `\n\n📝 Notes: ${vd.notes}` : ''}\n\nLooking forward to your thoughts! ✨`;
      break;

    case 'payment_request':
      text = `Hi ${lead.clientName}! 💳\n\nHere are the billing details for *${lead.service || 'Creative Project'}*:\n\n• Quoted Total: ${formatINR(quoteVal)}\n• Received to Date: ${formatINR(collected)}\n• Outstanding Balance: *${formatINR(balance)}*\n\n📲 UPI ID: *${upiId}*\n\nPlease share the transaction receipt or screenshot once completed so our accounting ledger is updated. Thank you! 🙏`;
      break;

    case 'follow_up':
      text = `Hi ${lead.clientName}! 👋\n\nHope you're having a productive week! Just following up to see if you had a chance to check our latest update on *${lead.service || 'your project'}*.\n\nLet us know if you need any adjustments or if we should lock the cut and move to the next phase! 😊`;
      break;

    default:
      text = `Hi ${lead.clientName}! Reaching out regarding *${lead.service || 'your project'}* at ${agencyName}.`;
      break;
  }

  const draftEl = document.getElementById(`wa-draft-text-${leadId}`);
  if (draftEl) {
    draftEl.value = text;
    draftEl.focus();
  }
}

function generateAiCustomDraft(leadId) {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;

  const agencyName = getFullAgencyTitle();
  const payments = Array.isArray(lead.payments) ? lead.payments : [];
  const collected = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const quoteVal = parseFloat(lead.dealValue) || 0;
  const balance = Math.max(0, quoteVal - collected);
  const stage = lead.stage || 'In Discussion';

  let aiDraft = '';
  if (stage === 'Identified' || stage === 'In Discussion') {
    aiDraft = `Hi ${lead.clientName}! Hope you're doing well. Just wanted to touch base regarding the video editing & creative direction we discussed for your brand. We have immediate bandwidth this week to take on your cut. Would you like to finalize the scope and kick things off?`;
  } else if (stage === 'Sample Cut') {
    aiDraft = `Hi ${lead.clientName}! Quick update on your sample cut for ${lead.service}: our lead editor ${lead.partner} is putting the finishing touches on the color and pacing. We'll drop the preview link right here shortly!`;
  } else if (stage === 'Approved') {
    if (balance > 0) {
      aiDraft = `Hi ${lead.clientName}! Fantastic to hear you loved the approved cut! 🎉 To package and release your full high-res 4K master files, please settle the outstanding balance of ${formatINR(balance)}. UPI ID: ${(crmState.branding && crmState.branding.upiId) || 'studio@upi'}. Let us know once sent!`;
    } else {
      aiDraft = `Hi ${lead.clientName}! Fantastic to hear you loved the cut! 🎉 Everything is locked and fully paid. Delivering all your final master renders and source files now. A pleasure working together!`;
    }
  } else {
    aiDraft = `Hi ${lead.clientName}! Touching base from ${agencyName} regarding your project. Please let us know if there is anything we can assist you with today!`;
  }

  const draftEl = document.getElementById(`wa-draft-text-${leadId}`);
  if (draftEl) {
    draftEl.value = aiDraft;
    draftEl.focus();
    showCRMToast('AI crafted a tailored message based on project stage & cash flow!', 'auto_awesome');
  }
}

function copyWhatsAppDraft(leadId) {
  const draftEl = document.getElementById(`wa-draft-text-${leadId}`);
  const text = draftEl ? draftEl.value.trim() : '';
  if (!text) {
    showCRMToast('Nothing to copy. Select a template or draft a message first.', 'warning');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    const feedback = document.getElementById(`wa-copy-feedback-${leadId}`);
    if (feedback) {
      feedback.classList.remove('hidden');
      setTimeout(() => feedback.classList.add('hidden'), 2500);
    }
    showCRMToast('Draft copied to clipboard!', 'content_copy');
  }).catch(() => {
    showCRMToast('Failed to copy to clipboard', 'error');
  });
}

function sendWhatsAppDraft(leadId) {
  const lead = crmState.leads.find(l => l.id === leadId);
  if (!lead) return;

  const draftEl = document.getElementById(`wa-draft-text-${leadId}`);
  const text = draftEl ? draftEl.value.trim() : '';
  if (!text) {
    showCRMToast('Please enter or generate a message draft before launching WhatsApp.', 'warning');
    return;
  }

  const phoneInput = document.getElementById(`wa-phone-${leadId}`);
  const rawPhone = phoneInput ? phoneInput.value.trim() : (lead.contactPhone || lead.phone || '');
  const cleanPhone = cleanWhatsAppPhone(rawPhone);

  if (!Array.isArray(lead.chatHistory)) lead.chatHistory = [];
  const senderName = crmState.activeUser || lead.partner || 'beRich Studio';
  lead.chatHistory.push({
    direction: 'OUTGOING',
    author: senderName,
    text: text,
    timestamp: new Date().toISOString()
  });

  lead.lastInteractionAt = Date.now();
  lead.lastInteractionType = 'whatsapp_sent';
  lead.updatedAt = Date.now();
  saveToLocalCache();
  recordStudioActivity(
    'Dispatched WhatsApp Message',
    `${getActiveStudioUser()}: Sent WhatsApp message to "${lead.clientName}"`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Sent WhatsApp to ${lead.clientName}`);
  syncGlobalConfigToSheet();

  // Forward to local 24/7 bridge dispatcher if running
  try {
    fetch('http://localhost:3030/api/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: cleanPhone || lead.clientName,
        text: text,
        leadId: lead.id
      })
    }).catch(() => {});
  } catch (e) {}

  const waUrl = cleanPhone 
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waSafeText(text))}`
    : `https://wa.me/?text=${encodeURIComponent(waSafeText(text))}`;

  window.open(waUrl, '_blank');
  if (crmState.activeDossierLeadId === lead.id) {
    renderDossierModalContent(lead);
  }
  renderKanban();
  renderHeaderAndMetrics();
  showCRMToast(`WhatsApp launched & SLA timer reset for "${lead.clientName}"!`, 'chat');
}

function logIncomingWhatsAppMessage(leadId, customText) {
  const lead = crmState.leads.find(l => l.id === leadId);
  if (!lead) return;

  let msgText = customText;
  if (!msgText) {
    msgText = prompt(`Enter or paste WhatsApp reply received from "${lead.clientName}":`);
  }
  if (!msgText || !msgText.trim()) return;

  if (!Array.isArray(lead.chatHistory)) lead.chatHistory = [];
  lead.chatHistory.push({
    direction: 'INCOMING',
    author: lead.clientName,
    text: msgText.trim(),
    owner: chatUser_(),
    timestamp: new Date().toISOString()
  });

  lead.lastInteractionAt = Date.now();
  lead.lastInteractionType = 'whatsapp_received';
  lead.updatedAt = Date.now();

  saveToLocalCache();
  recordStudioActivity(
    'Received WhatsApp Reply',
    `Incoming reply from "${lead.clientName}": "${msgText.trim().slice(0, 60)}${msgText.trim().length > 60 ? '...' : ''}"`,
    false
  );
  try { notifyIncoming_(lead, msgText.trim()); } catch (e) { pushToGitHubDatabase(`WhatsApp reply from ${lead.clientName}`); }

  // Notify local bridge webhook if running
  try {
    fetch('http://localhost:3030/api/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: lead.phone || lead.clientName,
        text: msgText.trim()
      })
    }).catch(() => {});
  } catch (e) {}

  if (crmState.activeDossierLeadId === lead.id) {
    renderDossierModalContent(lead);
  }
  renderKanban();
  renderHeaderAndMetrics();
  showCRMToast(`Incoming WhatsApp reply logged & SLA timer reset for "${lead.clientName}"!`, 'chat');
}

function openWhatsAppChatQuick(leadId) {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;

  const rawPhone = lead.contactPhone || lead.phone || '';
  const cleanPhone = cleanWhatsAppPhone(rawPhone);
  const agencyName = getFullAgencyTitle();
  const defaultText = `Hi ${lead.clientName}! Touching base from ${agencyName} regarding *${lead.service || 'your video project'}*.`;

  lead.lastInteractionAt = Date.now();
  lead.lastInteractionType = 'whatsapp_opened';
  lead.updatedAt = Date.now();
  saveToLocalCache();
  pushToGitHubDatabase(`${getActiveStudioUser()}: Opened WhatsApp chat for ${lead.clientName}`);

  const waUrl = cleanPhone 
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waSafeText(defaultText))}`
    : `https://wa.me/?text=${encodeURIComponent(waSafeText(defaultText))}`;

  window.open(waUrl, '_blank');
  renderKanban();
  showCRMToast(`Opened WhatsApp chat for "${lead.clientName}"!`, 'chat');
}

/* ==========================================================================
   WHATSAPP CRM COMMAND CENTER (TOP-HEADER & GLOBAL ACCESS)
   ========================================================================== */

function openWhatsAppCommandModal(selectedLeadId = null) {
  injectSharedModals();
  const modal = document.getElementById('crm-whatsapp-command-modal');
  if (!modal) return;

  const clientSelect = document.getElementById('wa-cmd-client-select');
  if (clientSelect) {
    const leads = globalState.leads || [];
    if (leads.length === 0) {
      clientSelect.innerHTML = '<option value="">(No deals in pipeline — Enter custom phone number below)</option>';
    } else {
      clientSelect.innerHTML = `
        <option value="">-- Choose Client Project to Auto-Fill Data --</option>
        ${leads.map(l => `<option value="${escapeHtml(l.id)}"${l.id === selectedLeadId ? ' selected' : ''}>${escapeHtml(l.clientName)} (${escapeHtml(l.stage)} • ${escapeHtml(l.service)})</option>`).join('')}
      `;
    }
  }

  if (selectedLeadId) {
    handleWhatsAppCmdClientChange(selectedLeadId);
  } else if ((globalState.leads || []).length > 0) {
    handleWhatsAppCmdClientChange(globalState.leads[0].id);
  } else {
    const phoneInput = document.getElementById('wa-cmd-phone');
    if (phoneInput) phoneInput.value = '';
    const draftInput = document.getElementById('wa-cmd-draft');
    if (draftInput) draftInput.value = `Hi! Reaching out from ${getFullAgencyTitle()} regarding your video editing project.`;
    const slaBadge = document.getElementById('wa-cmd-sla-badge');
    if (slaBadge) slaBadge.innerHTML = '<span class="text-slate-400 font-label-code text-[11px]">Ready to message</span>';
  }

  const waPrefs = loadWaPrefs_();
  const pf = document.getElementById('wa-cmd-portfolio-url');
  if (pf && !pf.value) pf.value = waPrefs.portfolio || '';
  document.querySelectorAll('[data-wa-tone]').forEach(b => b.classList.toggle('wa-chip-on', b.getAttribute('data-wa-tone') === (waPrefs.tone || 'friendly')));
  document.querySelectorAll('[data-wa-type]').forEach(b => b.classList.toggle('wa-chip-on', b.getAttribute('data-wa-type') === (waPrefs.lastType || 'welcome')));

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  renderWaThread();
  try { renderSenderControls_(); } catch (e) {}
}

function handleWhatsAppCmdClientChange(leadId) {
  const lead = (globalState.leads || []).find(l => l.id === leadId);
  const phoneInput = document.getElementById('wa-cmd-phone');
  const slaBadge = document.getElementById('wa-cmd-sla-badge');
  const driveInput = document.getElementById('wa-cmd-drive-url');
  const previewInput = document.getElementById('wa-cmd-preview-url');
  const cutSelect = document.getElementById('wa-cmd-cut-version');

  if (!lead) {
    if (slaBadge) slaBadge.innerHTML = '<span class="text-slate-400 font-label-code text-[11px]">Direct Message Mode</span>';
    return;
  }

  if (phoneInput) phoneInput.value = lead.contactPhone || lead.phone || '';
  if (slaBadge) slaBadge.innerHTML = renderWaitingSlaBadgeHtml(lead, true);
  if (driveInput) driveInput.value = lead.videoDelivery?.driveUrl || '';
  if (previewInput) previewInput.value = lead.videoDelivery?.previewUrl || '';
  if (cutSelect) cutSelect.value = lead.videoDelivery?.version || 'v1.0 First Cut';

  applyWhatsAppCmdTemplate('welcome');
  renderWaThread();
}

/* ===== WhatsApp Message Studio: tone-based drafts, links, AI refine, emoji-safe sending ===== */
const WA_PREFS_KEY = 'beRich_wa_prefs_v1';
const WA_TONES = {
  genz: 'Gen Z / Creator',
  ceo: 'Founder / CEO',
  pro: 'Professional',
  friendly: 'Warm & Friendly'
};

function loadWaPrefs_() {
  try { return JSON.parse(localStorage.getItem(WA_PREFS_KEY) || '{}') || {}; } catch (e) { return {}; }
}
function saveWaPrefs_(patch) {
  try { localStorage.setItem(WA_PREFS_KEY, JSON.stringify({ ...loadWaPrefs_(), ...patch })); } catch (e) {}
}

/* Astral-plane emoji get corrupted into "?" boxes on some WhatsApp Web redirects, so the sent text keeps only safe characters. */
function waSafeText(text) {
  return String(text || '')
    .replace(/[\p{Extended_Pictographic}\u{1F000}-\u{1FFFF}]/gu, '')
    .replace(/[︎️‍]/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
function waLink_(phone, text) {
  const t = encodeURIComponent(waSafeText(text));
  return phone ? `https://wa.me/${phone}?text=${t}` : `https://wa.me/?text=${t}`;
}

function setWaTone(tone) {
  if (!WA_TONES[tone]) tone = 'friendly';
  saveWaPrefs_({ tone });
  document.querySelectorAll('[data-wa-tone]').forEach(b => {
    const on = b.getAttribute('data-wa-tone') === tone;
    b.classList.toggle('wa-chip-on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  const type = loadWaPrefs_().lastType || 'welcome';
  applyWhatsAppCmdTemplate(type);
}

function waCtx_(leadIdOverride) {
  const clientSelect = document.getElementById('wa-cmd-client-select');
  const leadId = leadIdOverride !== undefined ? leadIdOverride : (clientSelect ? clientSelect.value : null);
  const lead = (globalState.leads || []).find(l => l.id === leadId) || {
    clientName: 'there', service: 'your video project', partner: getActiveStudioUser(), dealValue: 0, payments: []
  };
  const payments = Array.isArray(lead.payments) ? lead.payments : [];
  const collected = payments.reduce((s, p) => s + (parseFloat(p.amount) || 0), 0);
  const quote = parseFloat(lead.dealValue) || 0;
  const val = id => leadIdOverride !== undefined ? '' : (document.getElementById(id)?.value || '').trim();
  const prefs = loadWaPrefs_();
  return {
    n: lead.clientName || 'there',
    service: lead.service || 'your video project',
    partner: lead.partner || getActiveStudioUser(),
    agency: getFullAgencyTitle(),
    version: val('wa-cmd-cut-version') || lead.videoDelivery?.version || 'v1.0 First Cut',
    drive: val('wa-cmd-drive-url') || lead.videoDelivery?.driveUrl || '',
    preview: val('wa-cmd-preview-url') || lead.videoDelivery?.previewUrl || '',
    portfolio: val('wa-cmd-portfolio-url') || prefs.portfolio || '',
    reference: val('wa-cmd-reference-url'),
    quote: formatINR(quote),
    collected: formatINR(collected),
    balance: formatINR(Math.max(0, quote - collected)),
    owing: Math.max(0, quote - collected) > 0,
    upi: (crmState.branding && crmState.branding.upiId) ? crmState.branding.upiId : 'studio@upi'
  };
}

function buildWaMessage(type, tone, leadId) {
  const c = waCtx_(leadId);
  const link = (label, url) => url ? `\n\n${label}\n${url}` : '';
  const port = link(tone === 'genz' ? 'Our work, check it out:' : 'Our portfolio:', c.portfolio);
  const ref = link('Reference:', c.reference);
  const cut = link(tone === 'ceo' ? 'Review folder:' : 'Watch / download here:', c.drive) + link('Quick preview:', c.preview);
  const T = {
    welcome: {
      genz: `Hey ${c.n}! Welcome to ${c.agency}\n\nSo hyped to work on ${c.service} with you. ${c.partner} is your editor and the first update lands soon. Drop any refs, vibes or inspo here and we'll run with it.${port}${ref}`,
      ceo: `Hello ${c.n},\n\nThank you for choosing ${c.agency}. ${c.partner} will lead ${c.service} and share the first milestone shortly.\n\nIf you have a brief, brand guidelines or references, send them here and we will build to your standard.${port}${ref}`,
      pro: `Hello ${c.n},\n\nWelcome to ${c.agency}. We have opened your workspace for ${c.service}, and ${c.partner} is assigned as lead editor. You will get the first progress update soon.\n\nPlease share any reference files or notes here.${port}${ref}`,
      friendly: `Hi ${c.n}! Welcome to ${c.agency}.\n\nWe're really happy to be working on ${c.service} with you. ${c.partner} is your lead editor and will share the first update soon.\n\nFeel free to send any references or ideas here, anytime.${port}${ref}`
    },
    video_cut: {
      genz: `${c.n}, your ${c.version} for ${c.service} is READY\n${cut}\n\nWatch it and tell us what hits and what needs a tweak. Timestamps help a lot.`,
      ceo: `${c.n}, the ${c.version} for ${c.service} is ready for your review.${cut}\n\nPlease send consolidated feedback with timestamps so we can close the next revision in one pass.`,
      pro: `Hello ${c.n},\n\nYour ${c.version} for ${c.service} is ready for review.${cut}\n\nPlease share your feedback with timestamps for any changes.`,
      friendly: `Hi ${c.n}! Your ${c.version} for ${c.service} is ready${cut}\n\nTake a look and tell us what you think. Timestamps for any changes are super helpful. Can't wait to hear it!`
    },
    payment_request: {
      genz: `Hey ${c.n}! Quick one on payment for ${c.service}:\n\nTotal: ${c.quote}\nReceived: ${c.collected}\nLeft: ${c.balance}\n\nUPI: ${c.upi}\n\nSend a screenshot once it's done and we'll lock everything in. Thank you!`,
      ceo: `${c.n}, billing summary for ${c.service}:\n\nQuoted: ${c.quote}\nReceived: ${c.collected}\nOutstanding: ${c.balance}\n\nUPI ID: ${c.upi}\n\nKindly share the transaction confirmation once settled. Thank you.`,
      pro: `Hello ${c.n},\n\nBilling details for ${c.service}:\n\n• Quoted total: ${c.quote}\n• Received to date: ${c.collected}\n• Outstanding balance: ${c.balance}\n\nUPI ID: ${c.upi}\n\nPlease share the payment receipt once completed so we can update our records. Thank you.`,
      friendly: `Hi ${c.n}! Here are the payment details for ${c.service}:\n\nQuoted: ${c.quote}\nReceived so far: ${c.collected}\nBalance: ${c.balance}\n\nUPI ID: ${c.upi}\n\nWhen you've paid, just send us a screenshot. Thank you so much!`
    },
    follow_up: {
      genz: `Hey ${c.n}! Just checking in on ${c.service}. Did you get a chance to look at the last update? Tell us what to change and we'll move fast.`,
      ceo: `${c.n}, a brief follow-up on ${c.service}. A decision from you on the latest update lets us stay on schedule. Happy to jump on a quick call if easier.`,
      pro: `Hello ${c.n},\n\nFollowing up on ${c.service}. Have you had a chance to review the latest update? Let us know if you need adjustments or if we should lock the cut and move to the next phase.`,
      friendly: `Hi ${c.n}! Hope your week is going well. Just checking in on ${c.service}. Let us know if you'd like any changes, or if we're good to move to the next step!`
    },
    pitch: {
      genz: `Hey ${c.n}! We're ${c.agency}. We make reels, edits and brand videos that actually get watched.\n\nWe have a slot open this week for ${c.service}. Want us to send a quick sample?${port}`,
      ceo: `Hello ${c.n},\n\n${c.agency} produces video that moves business outcomes: launch films, founder stories and ad creatives, delivered on a fixed timeline.\n\nWe have capacity this week for ${c.service}. Can we send a relevant sample?${port}`,
      pro: `Hello ${c.n},\n\n${c.agency} is a video production and post-production studio. We would like to support ${c.service} with an editing plan and a sample cut.\n\nMay we share a short proposal?${port}`,
      friendly: `Hi ${c.n}! We're ${c.agency}, a small team that loves making great videos.\n\nWe'd love to help with ${c.service}. Want to see a few examples of our work?${port}`
    }
  };
  return (T[type] && (T[type][tone] || T[type].friendly)) || '';
}

function applyWhatsAppCmdTemplate(type) {
  const tone = loadWaPrefs_().tone || 'friendly';
  saveWaPrefs_({ lastType: type });
  document.querySelectorAll('[data-wa-type]').forEach(b => b.classList.toggle('wa-chip-on', b.getAttribute('data-wa-type') === type));
  const text = buildWaMessage(type, tone);
  const draftEl = document.getElementById('wa-cmd-draft');
  if (draftEl && text) { draftEl.value = text; }
  updateWaPreview();
}

function renderWaThread() {
  const box = document.getElementById('wa-cmd-thread');
  if (!box) return;
  const leadId = document.getElementById('wa-cmd-client-select')?.value;
  const lead = (globalState.leads || []).find(l => l.id === leadId);
  if (!lead) { box.innerHTML = '<span class="wa-help">Choose a client above to see and track the conversation.</span>'; return; }
  const hist = visibleChat_(lead.chatHistory).slice(-5);
  const esc = t => String(t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  box.innerHTML = hist.length ? hist.map(m => {
    const mine = m.direction === 'OUTGOING';
    const when = m.timestamp ? new Date(m.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
    return `<div class="wa-msg ${mine ? 'wa-msg-out' : 'wa-msg-in'}"><div class="wa-msg-who">${mine ? 'You' : esc(lead.clientName)} <span>${esc(when)}</span></div><div>${esc(String(m.text).slice(0, 220))}</div></div>`;
  }).join('') : '<span class="wa-help">No messages saved yet for this client.</span>';
  const st = document.getElementById('wa-bridge-status');
  if (st) {
    st.textContent = 'Checking live reply tracking...';
    const ctrl = new AbortController(); setTimeout(() => ctrl.abort(), 1500);
    fetch('http://localhost:3030/api/status', { cache: 'no-store', signal: ctrl.signal })
      .then(r => { st.textContent = r.ok ? 'Live reply tracking is ON. New replies are saved here automatically.' : 'Live reply tracking is OFF.'; })
      .catch(() => { st.textContent = 'Live reply tracking is OFF. Replies on your phone are not seen here. Run start-whatsapp-bridge.bat to turn it on, or tap Log a reply I received.'; });
  }
}

function logWaReplyFromModal() {
  const leadId = document.getElementById('wa-cmd-client-select')?.value;
  if (!leadId) { showCRMToast('Choose a client first.', 'warning'); return; }
  logIncomingWhatsAppMessage(leadId);
  renderWaThread();
}

function savePortfolioLink() {
  const v = (document.getElementById('wa-cmd-portfolio-url')?.value || '').trim();
  saveWaPrefs_({ portfolio: v });
  applyWhatsAppCmdTemplate(loadWaPrefs_().lastType || 'welcome');
}

async function pasteIntoField(id) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const text = (await navigator.clipboard.readText() || '').trim();
    if (!text) { showCRMToast('Clipboard is empty. Copy a link first.', 'warning'); return; }
    el.value = text;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    showCRMToast('Link pasted.', 'content_paste');
  } catch (e) {
    showCRMToast('Your browser blocked clipboard access. Press Ctrl+V in the box instead.', 'warning');
  }
}

function buildAiRefinePrompt_() {
  const tone = WA_TONES[loadWaPrefs_().tone || 'friendly'];
  const draft = (document.getElementById('wa-cmd-draft')?.value || '').trim();
  return `Rewrite this WhatsApp message from a video production studio to a client.\nTone and audience: ${tone}.\nKeep every link, amount and name exactly as written. Keep it short, warm and persuasive, with no emojis, and end with one clear next step.\nReturn only the final message.\n\nMessage:\n${draft}`;
}

function refineWithAi(which) {
  const prompt = buildAiRefinePrompt_();
  if (prompt.endsWith('Message:\n')) { showCRMToast('Write or pick a message first.', 'warning'); return; }
  const hint = document.getElementById('wa-ai-hint');
  const copied = navigator.clipboard ? navigator.clipboard.writeText(prompt).then(() => true).catch(() => false) : Promise.resolve(false);
  copied.then(ok => {
    if (hint) {
      hint.classList.remove('hidden');
      hint.textContent = which === 'gemini'
        ? (ok ? 'Prompt copied. Gemini cannot be pre-filled by a link, so click its message box and press Ctrl+V, then send.' : 'Gemini opened. Copy your message, click its box and paste.')
        : (ok ? 'Claude opened with your prompt filled in. Press send there. Claude may show a caution note for any pre-filled prompt; that is normal.' : 'Claude opened with your prompt filled in. Press send there.');
    }
    showCRMToast(which === 'gemini' ? 'Prompt copied. Press Ctrl+V in Gemini.' : 'Prompt sent to Claude.', 'auto_awesome');
  });
  const url = which === 'gemini' ? 'https://gemini.google.com/app' : `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
  window.open(url, '_blank', 'noopener');
}

function updateWaPreview() {
  const draft = document.getElementById('wa-cmd-draft')?.value || '';
  const box = document.getElementById('wa-cmd-preview');
  const note = document.getElementById('wa-cmd-note');
  if (!box) return;
  const safe = waSafeText(draft);
  const esc = safe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  box.innerHTML = esc
    .replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<span class="wa-link">$1</span>')
    .replace(/\n/g, '<br>') || '<span class="wa-help">Your message appears here.</span>';
  const removed = (draft.match(/[\p{Extended_Pictographic}\u{1F000}-\u{1FFFF}]/gu) || []).length;
  if (note) {
    const msgs = [];
    if (removed) msgs.push(`${removed} emoji will be dropped when sending, because WhatsApp Web shows them as broken boxes.`);
    const type = loadWaPrefs_().lastType || 'welcome';
    const hasLink = /https?:\/\//.test(safe);
    if (!hasLink && (type === 'pitch' || type === 'welcome')) msgs.push('No link in this message. Paste your portfolio link above so the client does not have to ask for it.');
    if (!hasLink && type === 'video_cut') msgs.push('No Drive or preview link in this message. Paste it above before sending.');
    note.classList.toggle('hidden', msgs.length === 0);
    note.textContent = msgs.join(' ');
  }
  const lbl = document.querySelector('.wa-preview-label');
  if (lbl) lbl.textContent = `What your client will see (${safe.length} characters)`;
}

async function pasteAiReply() {
  const el = document.getElementById('wa-cmd-draft');
  if (!el) return;
  try {
    const text = (await navigator.clipboard.readText() || '').trim();
    if (!text) { showCRMToast('Clipboard is empty. Copy the AI reply first.', 'warning'); return; }
    el.value = text;
    updateWaPreview();
    showCRMToast('AI reply placed in the message. Edit it before sending.', 'check_circle');
  } catch (e) {
    showCRMToast('Clipboard blocked. Click the message box and press Ctrl+V.', 'warning');
  }
}

function generateAiCmdDraft() {
  const clientSelect = document.getElementById('wa-cmd-client-select');
  const lead = (globalState.leads || []).find(l => l.id === (clientSelect ? clientSelect.value : null));
  const stage = String((lead && lead.stage) || 'Identified');
  let type = 'pitch';
  if (/sample/i.test(stage)) type = 'follow_up';
  else if (/approved|won/i.test(stage)) type = ctxOwing_() ? 'payment_request' : 'follow_up';
  applyWhatsAppCmdTemplate(type);
  showCRMToast('Draft written for this client and stage. Pick a tone to restyle it.', 'auto_awesome');
}
function ctxOwing_() { try { return waCtx_().owing; } catch (e) { return false; } }

function sendWhatsAppCmdDispatch() {
  const phoneInput = document.getElementById('wa-cmd-phone');
  const rawPhone = phoneInput ? phoneInput.value.trim() : '';
  const cleanPhone = cleanWhatsAppPhone(rawPhone);
  const draftEl = document.getElementById('wa-cmd-draft');
  const text = draftEl ? draftEl.value.trim() : '';

  if (!text) {
    showCRMToast('Please enter or select a message to send.', 'warning');
    return;
  }

  const clientSelect = document.getElementById('wa-cmd-client-select');
  const leadId = clientSelect ? clientSelect.value : null;
  const lead = (globalState.leads || []).find(l => l.id === leadId);

  if (lead && rawPhone && !lead.contactPhone) { lead.contactPhone = rawPhone; lead.updatedAt = Date.now(); }
  commandCenterSendNoted_(lead || null, rawPhone, text);

  const waUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waSafeText(text))}`
    : `https://wa.me/?text=${encodeURIComponent(waSafeText(text))}`;

  window.open(waUrl, '_blank');
  closeModal('crm-whatsapp-command-modal');
  renderKanban();
  showCRMToast('Launched WhatsApp & updated SLA timer!', 'chat');
}

function copyWhatsAppCmdDraft() {
  const draftEl = document.getElementById('wa-cmd-draft');
  const text = draftEl ? draftEl.value.trim() : '';
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showCRMToast('Message copied to clipboard!', 'content_copy');
  });
}

function openClientDossier(leadId) {
  const lead = leadId ? crmState.leads.find(l => l.id === leadId) : crmState.leads[0];
  if (!lead) {
    showCRMToast('Add your first client lead using "+ New Lead" to open the Profit Margin Calculator!', 'info');
    openNewLeadModal();
    return;
  }
  crmState.activeDossierLeadId = lead.id;

  let modal = document.getElementById('client-dossier-modal');
  if (!modal) {
    injectSharedModals();
    modal = document.getElementById('client-dossier-modal');
  }

  renderDossierModalContent(lead);
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function renderDossierModalContent(lead) {
  const modal = document.getElementById('client-dossier-modal');
  if (!modal) return;

  const selectedTools = String(lead.toolsUsed || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const calc = calculateProfitMetrics(
    lead.dealValue,
    lead.estHours || 0,
    lead.hourlyRate || 1500,
    selectedTools,
    crmState.costPolicy,
    lead.customToolCost || 0
  );

  const initials = lead.clientName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'CL';
  const partnerStyle = getPartnerStyle(lead.partner);

  const toolPillsHtml = crmState.techStack.length > 0
    ? crmState.techStack.map(tool => {
        const isSelected = selectedTools.some(name =>
          name.toLowerCase().includes(tool.toolName.toLowerCase()) ||
          tool.toolName.toLowerCase().includes(name.toLowerCase())
        );
        const cutLabel = (parseFloat(tool.costPerCut) || 0) > 0 ? formatINR(tool.costPerCut) : '₹0 (set below)';
        return `
          <button type="button" onclick="toggleDossierTool('${lead.id}', '${escapeHtml(tool.toolName)}')"
            class="px-3 py-1 rounded-full ${isSelected ? 'bg-[#34D399] text-[#051B11] font-bold' : 'bg-[#232433] text-[#B8BCCF] hover:text-white'} font-label-code text-xs flex items-center gap-1.5 transition">
            <span class="material-symbols-outlined text-[13px]">${isSelected ? 'check' : 'add'}</span>
            <span>${escapeHtml(tool.toolName)}</span>
            <span class="px-1.5 py-0.2 rounded-full bg-black/25 font-bold text-[10px]">${cutLabel}</span>
          </button>
        `;
      }).join('')
    : `<span class="text-xs text-[#8E92A4]">No software subscriptions added yet. <a href="tech-stack.html" class="text-[#34D399] underline">Add your tools in ₹ here</a> or enter custom burn below.</span>`;

  const ledgerRowsHtml = calc.itemizedTools.length > 0
    ? calc.itemizedTools.map(item => `
      <div class="grid grid-cols-12 items-center px-3 py-2 rounded-2xl bg-[#1A1A24]">
        <div class="col-span-5 flex items-center gap-2 text-white font-medium">
          <span class="w-2 h-2 rounded-full bg-[#34D399]"></span>
          <span>${escapeHtml(item.planLabel)}</span>
        </div>
        <span class="col-span-4 text-[#8E92A4] text-[11px]">${escapeHtml(item.billingModel)}</span>
        <span class="col-span-3 text-right text-[#FBBF24] font-bold">${formatINR(item.costPerCut)}</span>
      </div>
    `).join('')
    : `<div class="px-3 py-3 text-center text-[#8E92A4] text-xs">No tools linked or custom tool burn added yet. Toggle tools above or enter final client tool burn below.</div>`;

  modal.innerHTML = `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity" onclick="closeModal('client-dossier-modal')"></div>
    <div class="relative w-full max-w-4xl neo-modal overflow-hidden z-10 flex flex-col my-8">
      <!-- Header -->
      <div class="dossier-modal-header p-5 sm:p-6 bg-[#212230] flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 border-b border-[#2C2E42]">
        <div class="dossier-header-lead flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <div class="w-12 h-12 rounded-full bg-[#34D399] flex-shrink-0 flex items-center justify-center text-[#051B11] font-bold text-lg">${escapeHtml(initials)}</div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-xl sm:text-2xl text-white font-semibold truncate">${escapeHtml(lead.clientName)}</h2>
              <span class="font-label-code text-xs text-[#8E92A4]">${escapeHtml(lead.handle)}</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-[#2B2D3E] text-white font-medium">${escapeHtml(lead.country)}</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-[#13131C] text-[#60A5FA] font-label-code">${escapeHtml(lead.clientEmail || '')}</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 mt-1.5">
              <span class="px-3 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-[11px] font-semibold">
                ${escapeHtml(lead.stage)} (${escapeHtml(lead.sampleStatus)})
              </span>
              <span class="text-[#8E92A4]">•</span>
              <span class="text-xs text-[#8E92A4]">Assigned Partner: <strong class="text-white">${escapeHtml(lead.partner)}</strong> (${escapeHtml(partnerStyle.role)})</span>
              <span class="text-[#8E92A4]">•</span>
              <span class="font-label-code text-xs text-[#FBBF24] font-bold">${formatINR(lead.dealValue)} Retainer</span>
            </div>
          </div>
        </div>
        <div class="dossier-header-actions flex items-center gap-2 flex-shrink-0 self-center">
          <select onchange="updateDossierStage('${lead.id}', this.value)" class="h-9 px-3 rounded-full bg-[#13131C] text-[#34D399] font-label-code text-xs font-bold focus:outline-none border border-teal-500/30">
            ${['Identified', 'In Discussion', 'Sample Cut', 'Approved', 'Closed Won'].map(st => `<option value="${st}" ${lead.stage === st ? 'selected' : ''}>Stage: ${st}</option>`).join('')}
          </select>
          <button onclick="deleteLeadCard('${lead.id}')" class="w-9 h-9 rounded-full bg-[#13131C] hover:bg-[#4C1323] text-[#8E92A4] hover:text-[#FF6B8B] flex items-center justify-center transition-colors flex-shrink-0" title="Delete Project">
            <span class="material-symbols-outlined text-[17px]">delete</span>
          </button>
          <button onclick="closeModal('client-dossier-modal')" class="w-9 h-9 rounded-full bg-[#13131C] hover:bg-[#2B2D3E] text-[#8E92A4] hover:text-white flex items-center justify-center transition-colors flex-shrink-0" title="Close modal">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6 flex flex-col gap-5 max-h-[72vh] overflow-y-auto">
        <div class="p-5 rounded-[24px] bg-[#13131C] flex flex-col gap-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px] text-[#34D399]">calculate</span>
              <h3 class="text-sm font-semibold text-white">${escapeHtml(getFullAgencyTitle())} — Name-Centric Profit Engine (INR ₹)</h3>
            </div>
            <div class="flex items-center gap-2">
              <label class="font-label-code text-[11px] text-[#8E92A4]">Deal Retainer (₹):</label>
              <input type="number" value="${lead.dealValue}" onchange="updateDossierNumbers('${lead.id}', 'dealValue', this.value)"
                class="w-32 h-8 px-3 rounded-full bg-[#1F202D] text-white font-label-code text-xs font-bold focus:outline-none"/>
            </div>
          </div>

          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Tech Stack Tools Linked To This Deal</span>
              <span class="font-label-code text-[11px] text-[#FBBF24] font-semibold">Total Linked Burn: ${formatINR(calc.toolCost)}</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 pt-1">
              ${toolPillsHtml}
            </div>
          </div>

          <div class="p-4 rounded-[20px] bg-[#1A1A24] flex flex-col gap-2">
            <div class="flex flex-wrap items-center justify-between gap-2 pb-1">
              <span class="text-[10px] uppercase tracking-[0.14em] text-white font-semibold">Itemized Tool Cost Ledger (₹)</span>
              <div class="flex items-center gap-1 bg-[#12121A] p-1 rounded-full">
                <button type="button" onclick="setDossierCostPolicy('${lead.id}', 'absorb')"
                  class="px-3 py-1 rounded-full ${crmState.costPolicy === 'absorb' ? 'bg-[#34D399] text-[#051B11] font-bold' : 'text-[#8E92A4]'} font-label-code text-[10px]">Absorb in Retainer</button>
                <button type="button" onclick="setDossierCostPolicy('${lead.id}', 'passthrough')"
                  class="px-3 py-1 rounded-full ${crmState.costPolicy === 'passthrough' ? 'bg-[#34D399] text-[#051B11] font-bold' : 'text-[#8E92A4]'} font-label-code text-[10px]">Pass-through (+15%)</button>
              </div>
            </div>
            <div class="flex flex-col gap-1.5 text-xs font-label-code">
              ${ledgerRowsHtml}
            </div>
            <div class="mt-2 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-col">
                <span class="text-[11px] font-semibold text-[#FBBF24]">Custom / Final Client Tool Burn (₹) — Decide While Adding or At Last:</span>
                <span class="text-[10px] text-[#8E92A4]">Don't know exact per-client cut upfront? Enter or adjust this client's total software/API burn here anytime.</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-label-code text-xs text-[#FBBF24] font-bold">₹</span>
                <input type="number" step="50" min="0" value="${lead.customToolCost || 0}"
                  onchange="updateDossierNumbers('${lead.id}', 'customToolCost', this.value)"
                  placeholder="0"
                  class="w-32 h-8 px-3 rounded-full bg-[#12121A] border border-[#FBBF24]/40 text-[#FBBF24] font-label-code font-bold text-xs text-right focus:outline-none"/>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2 p-4 rounded-[20px] bg-[#1A1A24]">
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#8E92A4] text-[10px] uppercase tracking-[0.14em]">Estimated Editing Hours:</span>
                <input type="number" step="0.5" value="${calc.hours}" onchange="updateDossierNumbers('${lead.id}', 'estHours', this.value)"
                  class="w-24 h-7 px-3 rounded-full bg-[#12121A] text-white font-label-code font-bold text-xs text-right"/>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#8E92A4] text-[10px] uppercase tracking-[0.14em]">Partner Hourly Rate (₹/hr):</span>
                <input type="number" step="100" value="${calc.rate}" onchange="updateDossierNumbers('${lead.id}', 'hourlyRate', this.value)"
                  class="w-24 h-7 px-3 rounded-full bg-[#12121A] text-[#60A5FA] font-label-code font-semibold text-xs text-right"/>
              </div>
              <div class="flex items-center justify-between text-xs font-label-code pt-1">
                <span class="text-[#8E92A4]">Labor Subtotal:</span>
                <span class="text-white font-bold">${formatINR(calc.laborCost)}</span>
              </div>
            </div>

            <div class="flex flex-col gap-2 p-4 rounded-[20px] bg-[#1A1A24] justify-between">
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#8E92A4] text-[10px] uppercase tracking-[0.14em]">Credited Partner (100% Name-Centric):</span>
                <span class="font-label-code text-[#34D399] font-bold text-sm">${escapeHtml(lead.partner)}</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#8E92A4]">Partner Role:</span>
                <span class="font-label-code text-white">${escapeHtml(partnerStyle.role)}</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#8E92A4]">Partner Net Profit Generated:</span>
                <span class="font-label-code text-[#34D399] font-bold">${formatINR(calc.netProfit)} (${calc.marginPercent}%)</span>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-[20px] bg-[#212230] grid grid-cols-2 sm:grid-cols-5 gap-3 text-center items-center">
            <div class="flex flex-col">
              <span class="text-[10px] text-[#8E92A4] uppercase tracking-[0.14em]">Gross Retainer</span>
              <span class="metric-thin-hero text-xl mt-0.5">${formatINR(calc.gross)}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] text-[#8E92A4] uppercase tracking-[0.14em]">Labor</span>
              <span class="metric-thin-hero text-xl text-[#B8BCCF] mt-0.5">-${formatINR(calc.laborCost)}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] text-[#FBBF24] uppercase tracking-[0.14em]">Tool Overhead</span>
              <span class="metric-thin-hero text-xl text-[#FBBF24] mt-0.5">-${formatINR(calc.toolCost)}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] text-[#34D399] uppercase tracking-[0.14em]">Net Profit</span>
              <span class="metric-thin-hero text-xl text-[#34D399] mt-0.5">${calc.netProfit >= 0 ? '+' : ''}${formatINR(calc.netProfit)}</span>
            </div>
            <div class="flex flex-col items-center justify-center">
              <span class="px-3 py-1 rounded-full bg-[#34D399] text-[#051B11] font-label-code text-xs font-bold">${calc.marginPercent}% Margin</span>
            </div>
          </div>

          <!-- OPTIONAL PAYMENT LOGGING & CASH FLOW TRACKER -->
          <div class="flex flex-col gap-3 p-4 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-[#10131A] to-slate-900/40 border border-emerald-500/20 shadow-lg">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#34D399] animate-pulse"></span>
                <h4 class="text-xs font-bold text-white uppercase tracking-wider">Log Payment Received (Optional)</h4>
              </div>
              <div class="flex items-center gap-2">
                ${(() => {
                  const payments = Array.isArray(lead.payments) ? lead.payments : [];
                  const collected = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
                  const quoteVal = parseFloat(lead.dealValue) || 0;
                  const balance = Math.max(0, quoteVal - collected);
                  if (quoteVal > 0 && collected >= quoteVal) {
                    return `<span class="badge-fully-paid px-2.5 py-0.5 rounded-full font-label-code text-[10px] font-bold">✨ Fully Paid (${formatINR(collected)})</span>`;
                  }
                  return `
                    <span class="text-[10px] font-label-code text-[#34D399] font-semibold">${formatINR(collected)} Paid</span>
                    <span class="text-slate-500">•</span>
                    <span class="text-[10px] font-label-code text-amber-200 font-semibold">${formatINR(balance)} Due</span>
                  `;
                })()}
              </div>
            </div>

            <!-- OFFLINE RECEIPT OCR SCANNER DROPZONE & UPLOAD BUTTON (100% Client-Side Privacy) -->
            <div id="receipt-scanner-dropzone-${lead.id}"
                 class="receipt-dropzone p-3 rounded-xl bg-black/30 border border-dashed border-emerald-500/30 hover:border-emerald-400/70 transition cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
                 onclick="triggerReceiptFileInput('${escapeHtml(lead.id)}')"
                 ondragover="handleReceiptDragOver(event, '${escapeHtml(lead.id)}')"
                 ondragleave="handleReceiptDragLeave(event, '${escapeHtml(lead.id)}')"
                 ondrop="handleReceiptDrop(event, '${escapeHtml(lead.id)}')">
              <input type="file" id="receipt-file-input-${lead.id}" accept="image/*" class="hidden" onchange="handleReceiptFileSelect(event, '${escapeHtml(lead.id)}')" />
              
              <div class="flex items-center gap-3 min-w-0 pointer-events-none">
                <div class="w-9 h-9 rounded-xl bg-emerald-500/15 text-[#34D399] flex items-center justify-center flex-shrink-0 shadow-inner">
                  <span class="material-symbols-outlined text-[20px]">document_scanner</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-xs font-bold text-white">Scan Receipt Screenshot</span>
                    <span class="px-2 py-0.5 rounded-full bg-emerald-400/15 text-[#34D399] text-[9px] font-label-code font-bold uppercase tracking-wider flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#34D399]"></span>
                      <span>100% Offline / Secure</span>
                    </span>
                  </div>
                  <span class="text-[11px] text-slate-400 mt-0.5">Click or drag &amp; drop UPI, GPay, PhonePe, or Bank screenshot to auto-fill Amount &amp; Txn ID</span>
                </div>
              </div>

              <div class="flex items-center gap-2 flex-shrink-0 pointer-events-none">
                <span class="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-label-code font-semibold flex items-center gap-1.5 border border-white/10 transition-colors">
                  <span class="material-symbols-outlined text-[14px] text-emerald-400">upload_file</span>
                  <span>Upload Screenshot</span>
                </span>
              </div>
            </div>

            <!-- SCANNER PROGRESS & STATUS BANNER (100% In-Browser) -->
            <div id="receipt-scanner-status-${lead.id}" class="hidden p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex-col gap-2 transition">
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <div class="scanner-spinner w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                  <span id="receipt-scanner-label-${lead.id}" class="text-white font-medium">Scanning receipt pixels securely (100% Offline)...</span>
                </div>
                <span id="receipt-scanner-pct-${lead.id}" class="font-label-code text-xs text-[#34D399] font-bold">0%</span>
              </div>
              <div class="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div id="receipt-scanner-bar-${lead.id}" class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition duration-200" style="width: 0%;"></div>
              </div>
            </div>

            <!-- Payment Input Row -->
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
              <div class="sm:col-span-3 flex flex-col gap-1">
                <label class="text-[10px] uppercase font-bold text-slate-400">Amount Received (₹) *</label>
                <div class="relative">
                  <span class="absolute left-3 top-2.5 text-slate-400 font-label-code text-xs">₹</span>
                  <input id="payment-input-amount-${lead.id}" type="number" step="100" min="1" placeholder="e.g. 10000"
                    class="w-full h-9 pl-7 pr-3 rounded-xl bg-black/40 border border-white/10 text-white font-label-code text-xs focus:outline-none focus:border-emerald-400 transition" />
                </div>
              </div>

              <div class="sm:col-span-3 flex flex-col gap-1">
                <label class="text-[10px] uppercase font-bold text-slate-400">Txn ID / UTR / Note</label>
                <input id="payment-input-ref-${lead.id}" type="text" placeholder="e.g. UPI Ref, UTR, or Txn ID"
                  class="w-full h-9 px-3 rounded-xl bg-black/40 border border-white/10 text-slate-200 font-label-code text-xs focus:outline-none focus:border-emerald-400 transition" />
              </div>

              <div class="sm:col-span-2 flex flex-col gap-1">
                <label class="text-[10px] uppercase font-bold text-slate-400">Phase</label>
                <select id="payment-input-phase-${lead.id}" class="w-full h-9 px-2 rounded-xl bg-black/40 border border-white/10 text-slate-200 font-label-code text-xs focus:outline-none focus:border-emerald-400">
                  <option value="50% Advance">50% Advance</option>
                  <option value="Paid Sample">Paid Sample</option>
                  <option value="Final Payment">Final Payment</option>
                  <option value="Retainer">Retainer</option>
                  <option value="Milestone Payment">Milestone Payment</option>
                </select>
              </div>

              <div class="sm:col-span-2 flex flex-col gap-1">
                <label class="text-[10px] uppercase font-bold text-slate-400">Method</label>
                <select id="payment-input-method-${lead.id}" class="w-full h-9 px-2 rounded-xl bg-black/40 border border-white/10 text-slate-200 font-label-code text-xs focus:outline-none focus:border-emerald-400">
                  <option value="UPI">UPI</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash / Other">Cash / Other</option>
                </select>
              </div>

              <div class="sm:col-span-2 flex items-end">
                <button type="button" id="payment-btn-record-${lead.id}" onclick="recordDealPayment('${escapeHtml(lead.id)}')"
                  class="w-full h-9 px-3 rounded-xl bg-[#34D399] hover:bg-[#34D399]/80 text-[#051B11] font-bold font-label-code text-xs flex items-center justify-center gap-1 shadow-md transition cursor-pointer">
                  <span class="material-symbols-outlined text-[15px]">add</span>
                  <span>Record</span>
                </button>
              </div>
            </div>

            <!-- Previous Payments Mini-Table / List -->
            <div class="mt-1 flex flex-col gap-1.5">
              <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Logged Payments for this Deal</span>
              ${(() => {
                const payments = Array.isArray(lead.payments) ? lead.payments : [];
                if (payments.length === 0) {
                  return `<div class="py-2 px-3 rounded-xl bg-black/20 border border-white/[0.05] text-[11px] text-slate-400 italic">No payments logged yet. Enter advance or milestone payment above.</div>`;
                }
                return `
                  <div class="flex flex-col gap-1 max-h-36 overflow-y-auto pr-1">
                    ${payments.map(p => {
                      const dateFormatted = p.timestamp ? new Date(p.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Logged';
                      return `
                        <div class="payment-history-item flex items-center justify-between py-1.5 px-3 rounded-xl bg-black/30 border border-white/[0.05] text-xs font-label-code">
                          <div class="flex items-center gap-2 min-w-0">
                            <span class="material-symbols-outlined text-[14px] text-[#34D399]">check_circle</span>
                            <span class="text-white font-bold">${formatINR(p.amount)}</span>
                            <span class="text-slate-400">•</span>
                            <span class="px-2 py-0.5 rounded-full bg-white/5 text-slate-300 text-[10px]">${escapeHtml(p.phase || 'Payment')}</span>
                            <span class="text-slate-500">•</span>
                            <span class="text-[10px] text-slate-400">${escapeHtml(p.method || 'UPI')}</span>
                            ${p.reference ? `<span class="text-slate-500">•</span><span class="text-[10px] text-emerald-300 font-mono truncate max-w-[140px]" title="Ref / Txn ID: ${escapeHtml(p.reference)}">Ref: ${escapeHtml(p.reference)}</span>` : ''}
                          </div>
                          <div class="flex items-center gap-2 flex-shrink-0">
                            <span class="text-[10px] text-slate-500">${escapeHtml(dateFormatted)} (${escapeHtml(p.recordedBy || 'Studio')})</span>
                            <button type="button" onclick="deleteDealPayment('${escapeHtml(lead.id)}', '${escapeHtml(p.id)}')"
                              class="w-5 h-5 rounded-full hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors cursor-pointer" title="Delete payment record">
                              <span class="material-symbols-outlined text-[13px]">close</span>
                            </button>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                `;
              })()}
            </div>
          </div>

          <!-- CLIENT WAITING TIME & RESPONSE SLA STATUS BANNER -->
          <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#171825] border border-white/10 shadow-md">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined text-[20px] text-emerald-400">timer</span>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-white uppercase tracking-wider">Client Response SLA</span>
                  ${renderWaitingSlaBadgeHtml(lead, false)}
                </div>
                <span class="text-[11px] text-[#8E92A4] mt-0.5">
                  Last touchpoint: <strong class="text-slate-200">${formatInteractionTime(lead.lastInteractionAt)}</strong> • Keeps client from waiting unattended
                </span>
              </div>
            </div>
            <button type="button" onclick="logLeadTouchpoint('${escapeHtml(lead.id)}')"
              class="px-4 py-2 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-[#34D399] font-label-code text-xs font-bold flex items-center gap-1.5 transition cursor-pointer">
              <span class="material-symbols-outlined text-[15px]">chat</span>
              <span>Log Touchpoint / Reset SLA Timer</span>
            </button>
          </div>

          <!-- VIDEO DELIVERY & GOOGLE DRIVE REVIEW DRAWER (HEAVY VIDEO FILES) -->
          <div class="flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br from-indigo-950/20 via-[#10131A] to-slate-900/40 border border-indigo-500/20 shadow-lg">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-indigo-400">video_file</span>
                <h4 class="text-xs font-bold text-white uppercase tracking-wider">Video Delivery &amp; Google Drive Review (Heavy Video Files)</h4>
              </div>
              <span class="text-[10px] font-label-code text-indigo-300 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                ${escapeHtml(lead.videoDelivery?.version || 'v1.0 First Cut')}
              </span>
            </div>
            <p class="text-[11px] text-slate-400">
              Attach high-res Google Drive / Dropbox folders for heavy raw cuts, plus lightweight preview links. 1-click formats a client review message for WhatsApp.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div class="sm:col-span-4 flex flex-col gap-1">
                <label class="text-[10px] uppercase font-bold text-slate-400">Cut Version</label>
                <select id="video-cut-version-${lead.id}" class="w-full h-9 px-3 rounded-xl bg-black/40 border border-white/10 text-white font-label-code text-xs focus:outline-none focus:border-indigo-400">
                  ${['v1.0 First Cut', 'v1.1 Client Revisions', 'v1.2 Sound & Color Pass', 'v2.0 Locked Cut', 'Final Master 4K'].map(v => `
                    <option value="${v}" ${(lead.videoDelivery?.version || 'v1.0 First Cut') === v ? 'selected' : ''}>${v}</option>
                  `).join('')}
                </select>
              </div>

              <div class="sm:col-span-8 flex flex-col gap-1">
                <label class="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                  <span>Google Drive / Cloud Review Folder URL *</span>
                  ${lead.videoDelivery?.driveUrl ? `<a href="${escapeHtml(lead.videoDelivery.driveUrl)}" target="_blank" rel="noopener" class="text-indigo-400 hover:underline inline-flex items-center gap-0.5">Open Drive ↗</a>` : ''}
                </label>
                <input id="video-drive-url-${lead.id}" type="url" value="${escapeHtml(lead.videoDelivery?.driveUrl || '')}" placeholder="https://drive.google.com/drive/folders/..."
                  class="w-full h-9 px-3 rounded-xl bg-black/40 border border-white/10 text-white font-label-code text-xs focus:outline-none focus:border-indigo-400" />
              </div>

              <div class="sm:col-span-12 flex flex-col gap-1">
                <label class="text-[10px] uppercase font-bold text-slate-400">Lightweight Stream Preview URL (Optional - Vimeo, Loom, Drive MP4)</label>
                <input id="video-preview-url-${lead.id}" type="url" value="${escapeHtml(lead.videoDelivery?.previewUrl || '')}" placeholder="https://... (fast mobile stream for quick phone viewing)"
                  class="w-full h-9 px-3 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-label-code text-xs focus:outline-none focus:border-indigo-400" />
              </div>

              <div class="sm:col-span-12 flex flex-col gap-1">
                <label class="text-[10px] uppercase font-bold text-slate-400">Editor Notes / Feedback Request for Client</label>
                <textarea id="video-notes-${lead.id}" rows="2" placeholder="e.g. Rough color pass applied, audio balanced. Please review pacing and title animation."
                  class="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-indigo-400 resize-none">${escapeHtml(lead.videoDelivery?.notes || '')}</textarea>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
              <button type="button" onclick="saveLeadVideoDelivery('${escapeHtml(lead.id)}')"
                class="px-4 py-2 rounded-xl bg-[#232433] hover:bg-[#2F3145] text-white font-label-code text-xs font-semibold flex items-center gap-1.5 transition">
                <span class="material-symbols-outlined text-[15px] text-indigo-400">save</span>
                <span>Save Delivery Links</span>
              </button>
              <button type="button" onclick="dispatchWhatsAppVideoReview('${escapeHtml(lead.id)}')"
                class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#051B11] font-label-code text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer">
                <span class="material-symbols-outlined text-[16px]">send</span>
                <span>Send Cut for Review on WhatsApp 🚀</span>
              </button>
            </div>
          </div>

          <!-- 2-WAY WHATSAPP LIVE STREAM & SMART AI DRAFTER DRAWER -->
          <div class="flex flex-col gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div class="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <span class="material-symbols-outlined text-[18px]">forum</span>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">2-Way WhatsApp Live Stream &amp; Drafter</h4>
                  <span class="text-[11px] text-slate-500">Live conversation history with instant sync &amp; SLA tracking</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] text-slate-500 font-bold uppercase">Client WhatsApp:</span>
                <input id="wa-phone-${lead.id}" type="text" value="${escapeHtml(lead.contactPhone || lead.phone || '')}" placeholder="e.g. +91 9876543210"
                  onchange="updateLeadPhone('${escapeHtml(lead.id)}', this.value)"
                  class="w-36 h-7 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-emerald-700 font-mono text-xs font-bold focus:outline-none focus:border-emerald-500" />
              </div>
            </div>

            <!-- LIVE 2-WAY MESSAGE STREAM BUBBLES -->
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Conversation History (${Array.isArray(lead.chatHistory) ? lead.chatHistory.length : 0} messages)</span>
                </span>
                <button type="button" onclick="logIncomingWhatsAppMessage('${escapeHtml(lead.id)}')"
                  class="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-1 transition shadow-xs cursor-pointer"
                  title="Record an incoming reply you received on WhatsApp">
                  <span class="material-symbols-outlined text-[13px] text-emerald-600">input</span>
                  <span>+ Log Client Reply</span>
                </button>
              </div>

              <div class="w-full max-h-52 overflow-y-auto p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                ${(() => {
                  const history = Array.isArray(lead.chatHistory) ? lead.chatHistory : [];
                  if (history.length === 0) {
                    return `
                      <div class="py-6 px-4 text-center flex flex-col items-center justify-center gap-1 text-slate-400">
                        <span class="material-symbols-outlined text-[24px] text-slate-300">chat_bubble_outline</span>
                        <span class="text-xs font-medium">No messages in stream yet.</span>
                        <span class="text-[11px]">Use the quick templates below to dispatch first message or log a client reply.</span>
                      </div>
                    `;
                  }
                  return history.map(msg => {
                    const isOut = String(msg.direction).toUpperCase() === 'OUTGOING';
                    const timeStr = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                    if (isOut) {
                      return `
                        <div class="flex flex-col items-end self-end max-w-[85%]">
                          <div class="p-2.5 rounded-2xl rounded-tr-xs bg-indigo-600 text-white text-xs shadow-xs leading-relaxed">
                            <span class="block text-[9px] uppercase font-bold text-indigo-200 mb-0.5">You (${escapeHtml(msg.author || 'beRich')})</span>
                            <span>${escapeHtml(msg.text)}</span>
                          </div>
                          <span class="text-[9px] text-slate-400 mt-0.5 font-mono mr-1">${escapeHtml(timeStr)} • Sent ✓✓</span>
                        </div>
                      `;
                    } else {
                      return `
                        <div class="flex flex-col items-start self-start max-w-[85%]">
                          <div class="p-2.5 rounded-2xl rounded-tl-xs bg-white border border-slate-200 text-slate-800 text-xs shadow-xs leading-relaxed">
                            <span class="block text-[9px] uppercase font-bold text-emerald-600 mb-0.5">${escapeHtml(msg.author || lead.clientName)}</span>
                            <span>${escapeHtml(msg.text)}</span>
                          </div>
                          <span class="text-[9px] text-slate-400 mt-0.5 font-mono ml-1">${escapeHtml(timeStr)} • Received</span>
                        </div>
                      `;
                    }
                  }).join('');
                })()}
              </div>
            </div>

            <!-- Quick Templates & AI Drafter Row -->
            <div class="flex flex-wrap items-center gap-1.5 pt-1">
              <span class="text-[10px] uppercase font-bold text-slate-500 mr-1">Quick Templates:</span>
              <button type="button" onclick="applyWhatsAppTemplate('${escapeHtml(lead.id)}', 'welcome')"
                class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium text-[11px] border border-slate-200 transition">
                👋 Kickoff / Welcome
              </button>
              <button type="button" onclick="applyWhatsAppTemplate('${escapeHtml(lead.id)}', 'video_cut')"
                class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-medium text-[11px] border border-slate-200 transition">
                🎬 Video Cut Ready
              </button>
              <button type="button" onclick="applyWhatsAppTemplate('${escapeHtml(lead.id)}', 'payment_request')"
                class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 font-medium text-[11px] border border-slate-200 transition">
                💳 Payment / UPI Due
              </button>
              <button type="button" onclick="applyWhatsAppTemplate('${escapeHtml(lead.id)}', 'follow_up')"
                class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 font-medium text-[11px] border border-slate-200 transition">
                ⏰ Follow-up Nudge
              </button>
              <button type="button" onclick="generateAiCustomDraft('${escapeHtml(lead.id)}')"
                class="px-2.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium text-[11px] border border-purple-200 transition flex items-center gap-1 font-bold">
                <span class="material-symbols-outlined text-[13px] text-purple-600">auto_awesome</span>
                <span>AI Smart Drafter</span>
              </button>
            </div>

            <!-- Editable Message Textarea -->
            <div class="flex flex-col gap-1">
              <textarea id="wa-draft-text-${lead.id}" rows="3"
                placeholder="Type your message or click a template above..."
                class="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-sans focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"></textarea>
            </div>

            <!-- Dispatch Actions -->
            <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div class="flex items-center gap-2">
                <button type="button" onclick="copyWhatsAppDraft('${escapeHtml(lead.id)}')"
                  class="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-200">
                  <span class="material-symbols-outlined text-[14px]">content_copy</span>
                  <span>Copy Message</span>
                </button>
                <span id="wa-copy-feedback-${lead.id}" class="text-[11px] text-emerald-600 font-semibold hidden">Copied to clipboard!</span>
              </div>

              <div class="flex items-center gap-2">
                <button type="button" onclick="logIncomingWhatsAppMessage('${escapeHtml(lead.id)}')"
                  class="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 border border-emerald-200 transition cursor-pointer">
                  <span class="material-symbols-outlined text-[15px] text-emerald-600">input</span>
                  <span>Log Client Reply</span>
                </button>
                <button type="button" onclick="sendWhatsAppDraft('${escapeHtml(lead.id)}')"
                  class="px-5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer">
                  <span class="material-symbols-outlined text-[16px]">chat</span>
                  <span>Launch WhatsApp Chat 🚀</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
<!-- Footer Actions -->
      <div class="p-5 bg-[#212230] flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" onclick="reassignPartnerCycle('${lead.id}')" class="px-3.5 py-2 rounded-full bg-[#13131C] hover:bg-[#2B2D3E] text-white text-xs flex items-center gap-1.5 transition">
            <span class="material-symbols-outlined text-[15px] text-[#34D399]">swap_horiz</span>
            <span>Reassign (${escapeHtml(lead.partner)})</span>
          </button>
          <button type="button" onclick="openUpiQrModal('${lead.id}', '${lead.dealValue}')" class="px-3.5 py-2 rounded-full bg-[#FBBF24] hover:bg-[#FFF58C] text-[#1F1B00] text-xs font-bold flex items-center gap-1.5 transition">
            <span class="material-symbols-outlined text-[15px]">qr_code_2</span>
            <span>Collect UPI (${formatINR(lead.dealValue)})</span>
          </button>
          <button type="button" onclick="openWhatsAppChatQuick('${escapeHtml(lead.id)}')" class="px-3.5 py-2 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-semibold flex items-center gap-1.5 transition" title="1-Click WhatsApp Chat">
            <span class="material-symbols-outlined text-[15px]">chat</span>
            <span>WhatsApp</span>
          </button>
          <button type="button" onclick="openEmailModal('${lead.id}', 'follow_up')" class="px-3.5 py-2 rounded-full bg-[#13131C] hover:bg-[#2B2D3E] text-[#60A5FA] text-xs font-semibold flex items-center gap-1.5 transition">
            <span class="material-symbols-outlined text-[15px]">mail</span>
            <span>Follow-up</span>
          </button>
          <button type="button" onclick="openEmailModal('${lead.id}', 'sample_delivered')" class="px-3.5 py-2 rounded-full bg-[#34D399]/15 hover:bg-[#34D399]/25 text-[#34D399] text-xs font-semibold flex items-center gap-1.5 transition">
            <span class="material-symbols-outlined text-[15px]">play_circle</span>
            <span>Sample Delivered</span>
          </button>
        </div>
        <div class="flex items-center gap-2">
          <a href="receipt.html?leadId=${encodeURIComponent(lead.id)}" class="px-4 py-2 rounded-full bg-[#13131C] hover:bg-[#2B2D3E] text-white text-xs flex items-center gap-1.5 transition">
            <span class="material-symbols-outlined text-[15px]">picture_as_pdf</span>
            <span>PDF Receipt</span>
          </a>
          <button type="button" onclick="saveDossierToSheet('${lead.id}')" class="px-5 py-2 rounded-full bg-[#34D399] hover:bg-[#26FF9A] text-[#051B11] text-xs font-bold flex items-center gap-1.5 shadow-[0_6px_20px_rgba(0,255,135,0.3)] transition">
            <span class="material-symbols-outlined text-[16px]">cloud_upload</span>
            <span>Save &amp; Sync Sheet</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function toggleDossierTool(leadId, toolName) {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;
  let list = String(lead.toolsUsed || '').split(',').map(s => s.trim()).filter(Boolean);
  const existsIdx = list.findIndex(t => t.toLowerCase() === toolName.toLowerCase());
  const actionVerb = existsIdx >= 0 ? 'Unlinked' : 'Linked';
  if (existsIdx >= 0) {
    list.splice(existsIdx, 1);
  } else {
    list.push(toolName);
  }
  lead.toolsUsed = list.join(', ');
  lead.updatedAt = Date.now();
  recalculateSingleLead_(lead);
  saveToLocalCache();
  recordStudioActivity(
    `${actionVerb} Deal Tool`,
    `${actionVerb} "${toolName}" on "${lead.clientName}" (Tool burn: ${formatINR(lead.toolCost)})`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: ${actionVerb} ${toolName} on ${lead.clientName}`);
  syncGlobalConfigToSheet();
  renderDossierModalContent(lead);
  renderKanban();
  renderAll();
}

function updateDossierNumbers(leadId, field, value) {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;
  lead[field] = parseFloat(value) || 0;
  if (field === 'dealValue') {
    lead.billingLabel = `${formatINR(lead.dealValue)} / mo`;
  }
  if (field === 'customToolCost') {
    const cleanNotes = String(lead.notes || '').replace(/\[CUSTOM_BURN:[\d.]+\]/g, '').trim();
    lead.notes = lead.customToolCost > 0 ? `${cleanNotes} [CUSTOM_BURN:${lead.customToolCost}]`.trim() : cleanNotes;
  }
  lead.updatedAt = Date.now();
  recalculateSingleLead_(lead);
  saveToLocalCache();
  recordStudioActivity(
    'Updated Deal Metrics',
    `Updated ${field} on "${lead.clientName}" → Net Profit: ${formatINR(lead.netProfit)} (${lead.marginPercent}%)`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Updated ${field} on ${lead.clientName}`);
  syncGlobalConfigToSheet();
  renderDossierModalContent(lead);
  renderKanban();
  renderAll();
}

function setDossierCostPolicy(leadId, policy) {
  globalState.costPolicy = policy;
  const lead = globalState.leads.find(l => l.id === leadId);
  if (lead) {
    lead.updatedAt = Date.now();
    recalculateSingleLead_(lead);
    saveToLocalCache();
    recordStudioActivity(
      'Changed Tool Cost Policy',
      `Set "${lead.clientName}" tool cost policy to ${policy === 'passthrough' ? 'Pass-through (+15%)' : 'Absorb in Retainer'}`,
      false
    );
    pushToGitHubDatabase(`${getActiveStudioUser()}: Set cost policy ${policy} on ${lead.clientName}`);
    renderDossierModalContent(lead);
    renderKanban();
    renderAll();
  }
}

async function updateDossierStage(leadId, newStage) {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;
  const oldStage = lead.stage;
  lead.stage = newStage;
  lead.updatedAt = Date.now();
  recalculateSingleLead_(lead);
  if (newStage === 'Closed Won') {
    const alreadyInRev = (globalState.revenue || []).some(r => String(r.clientName || '').toLowerCase() === String(lead.clientName || '').toLowerCase());
    if (!alreadyInRev) {
      globalState.revenue.unshift({
        invoiceId: 'INV-' + Math.floor(1000 + Math.random() * 9000),
        clientName: lead.clientName,
        partner: lead.partner,
        grossAmount: lead.dealValue,
        laborCost: lead.laborCost,
        toolCost: lead.toolCost,
        netProfit: lead.netProfit,
        marginPercent: lead.marginPercent,
        status: 'Paid',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }
  saveToLocalCache();
  recordStudioActivity(
    'Moved Deal Stage',
    `Moved "${lead.clientName}" from "${oldStage}" → "${newStage}" (${formatINR(lead.dealValue)})`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Moved ${lead.clientName} to ${newStage}`);
  syncGlobalConfigToSheet();
  renderDossierModalContent(lead);
  renderKanban();
  renderAll();
  try {
    await postToGoogleSheets({ action: 'updateLead', id: lead.id, clientName: lead.clientName, stage: newStage });
  } catch (_) {}
  showCRMToast(`${lead.clientName} moved to "${newStage}"`, 'view_kanban');
}

async function saveDossierToSheet(leadId) {
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead) return;
  lead.updatedAt = Date.now();
  recalculateSingleLead_(lead);
  saveToLocalCache();
  recordStudioActivity(
    'Saved Client File',
    `Saved "${lead.clientName}" dossier — Retainer: ${formatINR(lead.dealValue)}, Net Profit: ${formatINR(lead.netProfit)} (${lead.marginPercent}%)`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Saved dossier for ${lead.clientName}`);
  syncGlobalConfigToSheet();
  renderKanban();
  renderAll();
  try {
    const res = await postToGoogleSheets({
      action: 'updateLead',
      id: lead.id,
      clientName: lead.clientName,
      dealValue: lead.dealValue,
      estHours: lead.estHours,
      hourlyRate: lead.hourlyRate,
      toolsUsed: lead.toolsUsed,
      customToolCost: lead.customToolCost || 0,
      laborCost: lead.laborCost,
      toolCost: lead.toolCost,
      netProfit: lead.netProfit,
      marginPercent: lead.marginPercent,
      stage: lead.stage,
      partner: lead.partner,
      sampleStatus: lead.sampleStatus,
      notes: lead.notes || ''
    });
    if (res && res.status === 'success') {
      showCRMToast(`Saved ${lead.clientName} dossier (${lead.marginPercent}% margin) to GitHub & Cloud!`, 'cloud_done');
    } else {
      showCRMToast(`Saved ${lead.clientName} dossier (${formatINR(lead.netProfit)} net profit).`, 'check_circle');
    }
  } catch (err) {
    showCRMToast(`Saved ${lead.clientName} dossier (${formatINR(lead.netProfit)} net profit).`, 'check_circle');
  }
}

async function reassignPartnerCycle(leadId) {
  const active = getActivePartners();
  const order = active.map(p => p.name);
  const lead = globalState.leads.find(l => l.id === leadId);
  if (!lead || order.length === 0) return;
  const prevPartner = lead.partner;
  const currIdx = order.findIndex(n => n.toLowerCase() === String(lead.partner || '').toLowerCase());
  const nextPartner = order[(currIdx + 1) % order.length];
  lead.partner = nextPartner;
  lead.updatedAt = Date.now();
  saveToLocalCache();
  recordStudioActivity(
    'Reassigned Deal Partner',
    `Reassigned "${lead.clientName}" from ${prevPartner} → ${nextPartner}`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Reassigned ${lead.clientName} to ${nextPartner}`);
  syncGlobalConfigToSheet();
  renderKanban();
  renderAll();
  const modal = document.getElementById('client-dossier-modal');
  if (modal && !modal.classList.contains('hidden')) {
    renderDossierModalContent(lead);
  }
  showCRMToast(`Reassigned ${lead.clientName} to ${nextPartner}`, 'swap_horiz');
  try {
    await postToGoogleSheets({ action: 'updateLead', id: lead.id, clientName: lead.clientName, partner: nextPartner });
  } catch (_) {}
}

/**
 * ============================================================================
 * 9. DYNAMIC UI RENDERING (10-PARTNER NAME-CENTRIC METRICS, KANBAN, TECH STACK)
 * ============================================================================
 */

function renderTechStack() {
  upgradeTechStackPageDom_();
  globalState.leads.forEach(recalculateSingleLead_);
  renderTechStackStrip();
  renderTechStackFullTable();
  renderTechStackPaidByOptions();
  renderHeaderAndMetrics();
  renderKanbanBoard();
}

function renderKanban() {
  globalState.leads.forEach(recalculateSingleLead_);
  renderPartnerFilterPills();
  renderHeaderAndMetrics();
  renderKanbanBoard();
}

function renderAll() {
  globalState.leads.forEach(recalculateSingleLead_);
  renderAgencyBranding();
  renderUserPresenceBar();
  renderPartnerFilterPills();
  renderHeaderAndMetrics();
  renderKanbanBoard();
  renderTechStackStrip();
  renderTechStackFullTable();
  renderTechStackPaidByOptions();
  renderActivityLedgerUI();
}

function showHeatmapDetail(kind, idx) {
  const hd = window.__heatData;
  if (!hd || !hd.heat[kind]) return;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const d = hd.heat[kind][idx];
  const what = kind === 'leads' ? 'new deals added' : kind === 'cuts' ? 'deals at sample cut or beyond' : 'payments received';
  const msg = d.n === 0 ? `${MONTHS[idx]} ${hd.year}: nothing recorded yet.` : `${MONTHS[idx]} ${hd.year}: ${d.n} ${what}, worth ${formatINR(d.amt)}.`;
  showCRMToast(msg, 'calendar_month');
}

function renderAgencyBranding() {
  let agencyName = (crmState.branding.agencyName || DEFAULT_BRANDING.agencyName).trim();
  if (agencyName.toLowerCase().includes('koubha') || agencyName === 'Frame3') {
    agencyName = 'beRich';
    crmState.branding.agencyName = 'beRich';
  }
  let agencyTagline = sanitizeTagline_(crmState.branding.agencyTagline);
  if (!agencyTagline) {
    crmState.branding.agencyTagline = '';
  }
  const fullTitle = agencyTagline ? `${agencyName} ${agencyTagline}` : agencyName;
  const activePartners = getActivePartners();

  if (document.title) {
    document.title = `${agencyName} — Agency CRM (INR ₹)`;
  }

  document.querySelectorAll('[data-brand-name]').forEach(el => {
    el.textContent = agencyName;
  });

  // Clean Header Tagline and Bullet Separator (Removes stray dot)
  const headerTaglineEl = document.getElementById('header-agency-tagline');
  const headerDotEl = document.getElementById('header-agency-dot');
  if (headerTaglineEl) {
    if (!agencyTagline) {
      headerTaglineEl.style.display = 'none';
      if (headerDotEl) headerDotEl.style.display = 'none';
    } else {
      headerTaglineEl.style.display = '';
      headerTaglineEl.textContent = agencyTagline;
      if (headerDotEl) headerDotEl.style.display = '';
    }
  }

  // Clean Sidebar Tagline (Removes solitary dot under beRich)
  const sidebarTaglineEl = document.getElementById('sidebar-agency-tagline');
  if (sidebarTaglineEl) {
    if (!agencyTagline) {
      sidebarTaglineEl.style.display = 'none';
    } else {
      sidebarTaglineEl.style.display = '';
      sidebarTaglineEl.textContent = agencyTagline;
    }
  }

  document.querySelectorAll('[data-brand-tagline]').forEach(el => {
    if (el.id !== 'header-agency-tagline' && el.id !== 'sidebar-agency-tagline') {
      if (!agencyTagline) {
        el.style.display = 'none';
      } else {
        el.style.display = '';
        el.textContent = agencyTagline;
      }
    }
  });

  document.querySelectorAll('[data-brand-full]').forEach(el => {
    el.textContent = fullTitle;
  });

  const activeCountBadge = document.getElementById('sidebar-active-partner-count');
  if (activeCountBadge) {
    activeCountBadge.textContent = `${activePartners.length} Active`;
  }

  const rcptPartnersLine = document.getElementById('rcpt-partners-line');
  if (rcptPartnersLine) {
    rcptPartnersLine.textContent = activePartners.map(p => `${p.name} (${p.role})`).join(' • ');
  }
}

function recalculateSingleLead_(lead) {
  const calc = calculateProfitMetrics(
    lead.dealValue,
    lead.estHours || 0,
    lead.hourlyRate || 1500,
    lead.toolsUsed,
    crmState.costPolicy,
    lead.customToolCost || 0
  );
  lead.laborCost = calc.laborCost;
  lead.toolCost = calc.toolCost;
  lead.netProfit = calc.netProfit;
  lead.marginPercent = calc.marginPercent;

  if (!Array.isArray(lead.payments)) {
    lead.payments = [];
  }
  const totalCollected = lead.payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  lead.totalCollected = totalCollected;
  const quoteVal = parseFloat(lead.dealValue) || 0;
  lead.balanceDue = Math.max(0, quoteVal - totalCollected);
  lead.isFullyPaid = quoteVal > 0 && totalCollected >= quoteVal;
}

function renderPartnerFilterPills() {
  const container = document.getElementById('partner-filter-pills-container');
  if (!container) return;

  const activePartners = getActivePartners();
  const countFor = (name) => crmState.leads.filter(l => String(l.partner || '').toLowerCase() === name.toLowerCase()).length;

  const buttons = [
    { key: 'ALL', label: `All ${crmState.branding.agencyName} Deals`, dotHex: '#4F46E5', count: crmState.leads.length },
    ...activePartners.map((p, idx) => ({
      key: p.name,
      label: `${p.name} (${p.role})`,
      dotHex: PARTNER_PALETTE[idx % PARTNER_PALETTE.length].dotHex,
      count: countFor(p.name)
    }))
  ];

  container.innerHTML = buttons.map(b => {
    const isActive = crmState.filters.partner.toLowerCase() === b.key.toLowerCase();
    const isLoggedUser = crmState.activeUser && crmState.activeUser.toLowerCase() === b.key.toLowerCase();

    let cls = '';
    if (isActive) {
      cls = 'px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition';
    } else {
      cls = 'px-4 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs flex items-center gap-2 transition shadow-xs';
    }

    return `
      <button type="button" onclick="setPartnerFilter('${escapeHtml(b.key)}')" class="${cls}">
        <span class="w-2 h-2 rounded-full flex-shrink-0" style="background-color: ${isActive ? '#FFFFFF' : b.dotHex};"></span>
        <span>${escapeHtml(b.label)}</span>
        ${isLoggedUser ? `<span class="px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'} text-[9px] font-bold uppercase tracking-wider">YOU</span>` : ''}
        <span class="px-2 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-white' : 'bg-slate-100 text-slate-600'} font-mono text-[10px] font-bold">${b.count}</span>
      </button>
    `;
  }).join('');
}

function renderHeaderAndMetrics() {
  const isDark = getThemeMode() === 'dark';
  let unpaidValue = 0;
  let unpaidCount = 0;
  let closedWonValue = 0;
  let samplePhaseCount = 0;
  let totalPipelineVolume = 0;

  crmState.leads.forEach(l => {
    const v = parseFloat(l.dealValue) || 0;
    totalPipelineVolume += v;

    if (String(l.stage).toLowerCase() === 'closed won') {
      closedWonValue += v;
    } else {
      unpaidValue += v;
      unpaidCount += 1;
    }
    if (String(l.stage).toLowerCase() === 'sample cut' || String(l.sampleStatus).toLowerCase().includes('sample')) {
      samplePhaseCount += 1;
    }
  });

  const setTxt = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  // Liquid Cash Telemetry
  let totalCashCollected = 0;
  let totalPaymentsCount = 0;
  crmState.leads.forEach(l => {
    if (Array.isArray(l.payments)) {
      l.payments.forEach(p => {
        const amt = parseFloat(p.amount) || 0;
        if (amt > 0) {
          totalCashCollected += amt;
          totalPaymentsCount += 1;
        }
      });
    }
  });

  setTxt('metric-ytd-header', `${formatINR(closedWonValue)} Closed`);
  setTxt('metric-cash-header', `${formatINR(totalCashCollected)} Cash Collected`);
  setTxt('metric-mtd-header', `${formatINR(totalPipelineVolume)} Total Closed Revenue`);
  setTxt('metric-unpaid-header', formatINR(unpaidValue));
  setTxt('metric-unpaid-count-header', `(${unpaidCount} Deals)`);
  setTxt('metric-hero-cash', formatINR(totalCashCollected));
  setTxt('metric-hero-cash-count', `${totalPaymentsCount} Payment${totalPaymentsCount === 1 ? '' : 's'}`);
  setTxt('metric-hero-ytd', formatINR(closedWonValue));
  setTxt('metric-hero-unpaid', formatINR(unpaidValue));
  setTxt('metric-hero-unpaid-count', `${unpaidCount} Deals`);
  setTxt('metric-hero-sample-count', `${samplePhaseCount} in sample prep & review`);

  // =========================================================================
  // VISUAL WIDGET 1: Semi-Circle Radial Speedometer Gauge (Goals & Cash)
  // =========================================================================
  const cashTarget = closedWonValue > 0 ? closedWonValue : 50000;
  const goalPct = Math.min(100, Math.round((totalCashCollected / Math.max(1, cashTarget)) * 100));
  const speedometerArc = document.getElementById('visual-speedometer-arc');
  const speedometerVal = document.getElementById('visual-speedometer-val');
  const speedometerTarget = document.getElementById('visual-speedometer-target');
  const goalPctBadge = document.getElementById('visual-goal-pct-badge');
  if (speedometerArc) {
    const effectivePct = totalCashCollected > 0 ? goalPct : 2;
    const offset = 251 - (251 * (effectivePct / 100));
    speedometerArc.setAttribute('stroke-dashoffset', offset);
    speedometerArc.setAttribute('stroke', isDark ? 'url(#speedometerGradientDark)' : 'url(#speedometerGradientLight)');
    if (isDark) {
      speedometerArc.style.filter = 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))';
    } else {
      speedometerArc.style.filter = 'drop-shadow(0 2px 4px rgba(79, 70, 229, 0.25))';
    }
  }
  const speedoTrack = document.getElementById('visual-speedometer-track');
  if (speedoTrack) speedoTrack.setAttribute('stroke', isDark ? '#1F242D' : '#E2E8F0');
  const speedoTicks = document.getElementById('visual-speedometer-ticks');
  if (speedoTicks) speedoTicks.setAttribute('stroke', isDark ? '#262C38' : '#CBD5E1');
  const donutBg = document.getElementById('visual-donut-bg-circle');
  if (donutBg) donutBg.setAttribute('stroke', isDark ? '#181C24' : '#F1F5F9');
  if (speedometerVal) speedometerVal.textContent = formatINR(totalCashCollected);
  if (speedometerTarget) speedometerTarget.textContent = `Out of ${formatINR(cashTarget)} Target`;
  if (goalPctBadge) goalPctBadge.textContent = `${goalPct}% Target`;

  // =========================================================================
  // VISUAL WIDGET 2: Pipeline Stages Donut / Pie Chart
  // =========================================================================
  const stageCounts = {
    'Identified': 0,
    'In Discussion': 0,
    'Sample Cut': 0,
    'Closed Won': 0
  };
  crmState.leads.forEach(l => {
    const st = String(l.stage || '');
    if (st.toLowerCase() === 'closed won') stageCounts['Closed Won']++;
    else if (st.toLowerCase() === 'sample cut' || st.toLowerCase().includes('sample')) stageCounts['Sample Cut']++;
    else if (st.toLowerCase().includes('discuss')) stageCounts['In Discussion']++;
    else stageCounts['Identified']++;
  });
  const totalDeals = crmState.leads.length;
  setTxt('visual-donut-total-badge', `${totalDeals} Active Deal${totalDeals === 1 ? '' : 's'}`);
  setTxt('visual-donut-center-count', totalDeals);

  const circum = 365;
  let currentOffset = 0;
  const updateSlice = (id, count) => {
    const el = document.getElementById(id);
    if (!el) return;
    const sliceLen = totalDeals > 0 ? (count / totalDeals) * circum : 0;
    el.setAttribute('stroke-dasharray', `${sliceLen} ${circum - sliceLen}`);
    el.setAttribute('stroke-dashoffset', -currentOffset);
    currentOffset += sliceLen;
  };
  updateSlice('donut-slice-identified', stageCounts['Identified']);
  updateSlice('donut-slice-discussion', stageCounts['In Discussion']);
  updateSlice('donut-slice-sample', stageCounts['Sample Cut']);
  updateSlice('donut-slice-won', stageCounts['Closed Won']);

  setTxt('donut-count-identified', stageCounts['Identified']);
  setTxt('donut-count-discussion', stageCounts['In Discussion']);
  setTxt('donut-count-sample', stageCounts['Sample Cut']);
  setTxt('donut-count-won', stageCounts['Closed Won']);

  // =========================================================================
  // VISUAL WIDGET 3: Monthly Deal Activity & Touchpoint Heatmap Matrix (Theme-Adaptive)
  // =========================================================================
  // isDark declared at function top
  // Heatmap is built only from real deals and payments already in the CRM. It never writes or syncs anything.
  const heatYear = new Date().getFullYear();
  const heat = { leads: [], cuts: [], cash: [] };
  for (let m = 0; m < 12; m++) { heat.leads.push({ n: 0, amt: 0 }); heat.cuts.push({ n: 0, amt: 0 }); heat.cash.push({ n: 0, amt: 0 }); }
  (crmState.leads || []).forEach(l => {
    const created = new Date(Number(l.createdAt) || Number(l.updatedAt) || 0);
    const value = parseFloat(l.dealValue) || 0;
    if (created.getFullYear() === heatYear) { heat.leads[created.getMonth()].n++; heat.leads[created.getMonth()].amt += value; }
    if (/sample|approved|won/i.test(String(l.stage || ''))) {
      const moved = new Date(Number(l.updatedAt) || Number(l.createdAt) || 0);
      if (moved.getFullYear() === heatYear) { heat.cuts[moved.getMonth()].n++; heat.cuts[moved.getMonth()].amt += value; }
    }
    (Array.isArray(l.payments) ? l.payments : []).forEach(p => {
      const d = new Date(String(p.date || '') + 'T00:00:00');
      if (!isNaN(d) && d.getFullYear() === heatYear) { heat.cash[d.getMonth()].n++; heat.cash[d.getMonth()].amt += parseFloat(p.amount) || 0; }
    });
  });
  window.__heatData = { year: heatYear, heat };
  const yearLabel = document.getElementById('heatmap-year-label');
  if (yearLabel) yearLabel.textContent = `${heatYear}. Tap a dot for details`;
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const rowText = (kind, idx) => {
    const d = heat[kind][idx];
    const label = kind === 'leads' ? 'new deals' : kind === 'cuts' ? 'deals at sample or beyond' : 'payments received';
    return d.n === 0 ? `${MONTHS[idx]} ${heatYear}: nothing yet` : `${MONTHS[idx]} ${heatYear}: ${d.n} ${label}, ${formatINR(d.amt)}`;
  };
  const renderHeatmapRow = (containerId, kind, lightColorHex, darkColorHex) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const activeColor = isDark ? darkColorHex : lightColorHex;
    const inactiveColor = isDark ? '#2B2342' : '#D6CEEA';
    container.innerHTML = heat[kind].map((d, idx) => {
      const px = d.n === 0 ? 8 : d.n === 1 ? 12 : d.n <= 3 ? 15 : 18;
      const bg = d.n > 0 ? `background: ${activeColor};` : `background: ${inactiveColor};`;
      const tip = rowText(kind, idx);
      return `<button type="button" onclick="showHeatmapDetail('${kind}', ${idx})" class="rounded-full inline-block p-0 border-0 cursor-pointer" style="width:${px}px;height:${px}px;${bg}" title="${tip}" aria-label="${tip}"></button>`;
    }).join('');
  };
  renderHeatmapRow('heatmap-row-leads', 'leads', '#F97316', '#FB923C');
  renderHeatmapRow('heatmap-row-cuts', 'cuts', '#6A2FEA', '#A78BFA');
  renderHeatmapRow('heatmap-row-cash', 'cash', '#059669', '#34D399');

  // Update Client Response SLA Status Pill
  const slaPill = document.getElementById('telemetry-sla-pill');
  if (slaPill) {
    const activeLeads = (crmState.leads || []).filter(l => l.stage !== 'Closed Won' && l.stage !== 'Closed Lost');
    const overdueCount = activeLeads.filter(l => {
      const diffHours = (Date.now() - (Number(l.lastInteractionAt) || Number(l.updatedAt) || Date.now())) / (1000 * 60 * 60);
      return diffHours >= 24;
    }).length;
    if (activeLeads.length === 0) {
      slaPill.innerHTML = '<span class="w-2 h-2 rounded-full bg-slate-400"></span><span class="text-slate-600 font-semibold">⚡ SLA: All Clear (0 Leads)</span>';
      slaPill.className = 'px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[11px] flex items-center gap-1.5 cursor-pointer font-semibold shadow-xs';
    } else if (overdueCount > 0) {
      slaPill.innerHTML = `<span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span><span class="text-rose-700 font-bold">⚠️ SLA: ${overdueCount} Overdue!</span>`;
      slaPill.className = 'px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 font-mono text-[11px] flex items-center gap-1.5 cursor-pointer font-semibold shadow-xs';
    } else {
      slaPill.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500"></span><span class="text-emerald-800 font-semibold">⚡ SLA: All Replied (&lt;24h)</span>';
      slaPill.className = 'px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] flex items-center gap-1.5 cursor-pointer font-semibold shadow-xs';
    }
  }

  // Calculate Name-Centric Partner Stats (Active Partners Only)
  const partnerStats = calculateNameCentricPartnerStats();

  // Top Sub-Header Telemetry Bar for Active Partners
  const subheaderPartnerEl = document.getElementById('subheader-partner-metrics');
  if (subheaderPartnerEl) {
    subheaderPartnerEl.innerHTML = partnerStats.map(s => `
      <div class="flex items-center gap-1.5 flex-shrink-0 text-xs">
        <span class="w-2 h-2 rounded-full" style="background-color: ${s.palette.dotHex};"></span>
        <span class="text-slate-600 font-medium">${escapeHtml(s.partner.name)}:</span>
        <span class="font-mono text-slate-900 font-bold">${formatINR(s.totalAssignedINR)}</span>
      </div>
    `).join('');
  }

  // Hero Name-Centric Partner Performance Grid (Dynamic Dual-Theme Porcelain / Carbon)
  const heroGridEl = document.getElementById('hero-partner-performance-grid');
  if (heroGridEl) {
    const isDarkTheme = getThemeMode() === 'dark';
    heroGridEl.innerHTML = partnerStats.map((s, idx) => {
      const isFiltered = crmState.filters.partner.toLowerCase() === s.partner.name.toLowerCase();
      const isLoggedUser = crmState.activeUser && crmState.activeUser.toLowerCase() === s.partner.name.toLowerCase();
      const pal = s.palette;
      const initial = s.partner.name.charAt(0).toUpperCase();

      const bgCard = isDarkTheme
        ? 'bg-[#14171C] border-[#262C38] text-white hover:border-[#384252] shadow-md'
        : (idx === 0 
          ? 'bg-gradient-to-br from-emerald-50/90 via-white to-white border-emerald-200 shadow-xs hover:border-emerald-300'
          : idx === 1
            ? 'bg-gradient-to-br from-amber-50/90 via-white to-white border-amber-200 shadow-xs hover:border-amber-300'
            : 'bg-gradient-to-br from-sky-50/90 via-white to-white border-sky-200 shadow-xs hover:border-sky-300');

      const ringHighlight = (isFiltered || isLoggedUser) 
        ? (isDarkTheme ? 'ring-2 ring-amber-400 shadow-lg' : 'ring-2 ring-indigo-500 shadow-sm') 
        : '';
      const textPrimary = isDarkTheme ? 'text-white' : 'text-slate-900';
      const textSecondary = isDarkTheme ? 'text-slate-400' : 'text-slate-500';
      const textSubtle = isDarkTheme ? 'text-slate-300' : 'text-slate-600';
      const borderSubtle = isDarkTheme ? 'border-white/10' : 'border-slate-200/60';
      const badgeBg = isDarkTheme ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700';

      return `
        <div onclick="setPartnerFilter('${escapeHtml(s.partner.name)}')"
             class="cursor-pointer p-4 rounded-xl border ${bgCard} ${ringHighlight} flex flex-col justify-between gap-2.5 transition hover:translate-y-[-2px]">
          <div class="flex items-center justify-between gap-1.5">
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                   style="background: ${pal.dotHex}18; color: ${pal.dotHex}; color: color-mix(in srgb, ${pal.dotHex}, var(--uv-ink) var(--uv-pmix, 0%)); border: 1px solid ${pal.dotHex}35;">
                ${initial}
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-xs font-bold ${textPrimary} truncate">${escapeHtml(s.partner.name)}</span>
                <span class="text-[9px] uppercase font-mono font-bold tracking-wider" style="color: ${pal.dotHex}; color: color-mix(in srgb, ${pal.dotHex}, var(--uv-ink) var(--uv-pmix, 0%));">${pal.accentName || s.partner.role}</span>
              </div>
            </div>
            ${isLoggedUser ? `<span class="px-1.5 py-0.2 rounded-full bg-indigo-600 text-[8px] font-bold text-white uppercase tracking-wider">YOU</span>` : ''}
          </div>

          <div>
            <span class="text-2xl font-extrabold ${textPrimary} tracking-tight">${formatINR(s.totalAssignedINR)}</span>
            <span class="text-[9px] uppercase font-mono ${textSecondary} block font-medium">Assigned Pipeline</span>
          </div>

          <div class="pt-2 border-t ${borderSubtle} flex items-center justify-between text-[11px] font-mono">
            <span class="${textSubtle}">Won: <strong class="${textPrimary}">${formatINR(s.closedRevenueINR)}</strong></span>
            <span class="px-2 py-0.5 rounded-full ${badgeBg} font-bold">${s.dealCount} deals</span>
          </div>
        </div>
      `;
    }).join('');
  }
}

function getFilteredLeads() {
  return crmState.leads.filter(lead => {
    if (crmState.filters.partner !== 'ALL' && String(lead.partner).toLowerCase() !== crmState.filters.partner.toLowerCase()) return false;
    if (crmState.filters.source !== 'ALL' && !String(lead.source).toLowerCase().includes(crmState.filters.source.toLowerCase())) return false;
    if (crmState.filters.sample === 'PREP' && !String(lead.sampleStatus).toLowerCase().includes('pending') && !String(lead.sampleStatus).toLowerCase().includes('prep') && !String(lead.sampleStatus).toLowerCase().includes('review')) return false;
    if (crmState.filters.sample === 'DELIVERED' && !String(lead.sampleStatus).toLowerCase().includes('delivered') && !String(lead.sampleStatus).toLowerCase().includes('approved')) return false;
    if (crmState.filters.search) {
      const q = crmState.filters.search.toLowerCase();
      const hay = `${lead.clientName} ${lead.handle} ${lead.service} ${lead.partner} ${lead.source} ${lead.country}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => crmState.filters.sortDesc
    ? (parseFloat(b.dealValue) - parseFloat(a.dealValue))
    : (parseFloat(a.dealValue) - parseFloat(b.dealValue))
  );
}

/**
 * ============================================================================
 * DRAGGABLE KANBAN BOARD RENDERING & COLUMN RESIZER ENGINE
 * ============================================================================
 */

function renderKanbanBoard() {
  const boardContainer = document.getElementById('kanban-board-columns');
  if (!boardContainer) return;

  const stages = [
    { key: 'Identified', title: 'Identified', sub: 'Outreach Batch', dot: 'bg-[#8E92A4]', badgeBg: 'bg-[#232433] text-white' },
    { key: 'In Discussion', title: 'In Discussion', sub: 'Active Dialogue', dot: 'bg-[#60A5FA]', badgeBg: 'bg-[#60A5FA]/15 text-[#60A5FA]' },
    { key: 'Sample Cut', title: 'Sample Cut', sub: 'Free/Paid In-Edit', dot: 'bg-[#FBBF24]', badgeBg: 'bg-[#FBBF24] text-[#1F1B00] font-bold' },
    { key: 'Approved', title: 'Approved', sub: 'Contract Signoff', dot: 'bg-[#34D399]', badgeBg: 'bg-[#34D399]/15 text-[#34D399]' },
    { key: 'Closed Won', title: 'Closed Won', sub: 'Collected / Paid', dot: 'bg-[#34D399]', badgeBg: 'bg-[#34D399] text-[#051B11] font-bold' }
  ];

  const filtered = getFilteredLeads();

  boardContainer.innerHTML = stages.map(stageObj => {
    const colLeads = filtered.filter(l => String(l.stage).toLowerCase() === stageObj.key.toLowerCase());
    const colSum = colLeads.reduce((acc, l) => acc + (parseFloat(l.dealValue) || 0), 0);
    const cardsHtml = colLeads.map(lead => renderKanbanCardHtml(lead)).join('');

    const rawWidth = crmState.columnWidths[stageObj.key] || DEFAULT_KANBAN_WIDTHS[stageObj.key] || 260;
    const colWidth = Math.max(KANBAN_MIN_COL_WIDTH, Math.min(KANBAN_MAX_COL_WIDTH, rawWidth));
    const sizeModeClass = colWidth < 225 ? 'col-compact' : (colWidth > 340 ? 'col-expanded' : '');

    return `
      <div class="kanban-resizable-col ${sizeModeClass} flex flex-col gap-3 p-3.5 min-h-[540px]"
           data-stage-col="${escapeHtml(stageObj.key)}"
           ondragover="handleKanbanColumnDragOver(event)"
           ondragleave="handleKanbanColumnDragLeave(event)"
           ondrop="handleKanbanColumnDrop(event, '${escapeHtml(stageObj.key)}')"
           style="--col-width: ${colWidth}px; width: ${colWidth}px; min-width: ${colWidth}px; max-width: ${colWidth}px; flex: 0 0 ${colWidth}px;">
        <div class="kanban-width-badge">${colWidth}px</div>

        <!-- Stage Header -->
        <div class="kanban-col-header p-3.5 rounded-[18px] flex flex-col gap-1.5 min-w-0">
          <div class="kanban-col-header-top flex items-center justify-between gap-1.5 min-w-0">
            <span class="kanban-stage-title kanban-wrap-text font-headline-sm text-sm font-semibold flex items-center gap-2 min-w-0">
              <span class="w-2.5 h-2.5 rounded-full ${stageObj.dot} flex-shrink-0"></span>
              <span class="kanban-wrap-text">${escapeHtml(stageObj.title)}</span>
            </span>
            <span class="kanban-stage-count px-2.5 py-0.5 rounded-full font-label-code text-[11px] font-bold flex-shrink-0">${colLeads.length}</span>
          </div>
          <div class="kanban-col-header-sub kanban-stage-meta flex items-center justify-between gap-1 font-label-code text-[11px] min-w-0">
            <span class="kanban-wrap-text uppercase tracking-wider text-[10px]">${escapeHtml(stageObj.sub)}</span>
            <span class="kanban-wrap-text ${stageObj.key === 'Closed Won' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'font-semibold'}">${formatINR(colSum)}</span>
          </div>
        </div>

        <!-- Deal Cards -->
        <div class="flex flex-col gap-3 min-w-0">
          ${cardsHtml || `
            <div class="kanban-empty-placeholder p-6 rounded-[20px] flex flex-col items-center justify-center gap-2 text-center text-xs py-10 min-w-0">
              <span class="material-symbols-outlined text-[24px] opacity-50">post_add</span>
              <span class="kanban-wrap-text font-medium">No deals in <strong>${escapeHtml(stageObj.title)}</strong></span>
              <button type="button" onclick="openNewLeadModal()" class="kanban-empty-add-btn mt-1.5 px-4 py-1.5 rounded-full font-label-code text-[11px] font-bold transition kanban-wrap-text cursor-pointer">+ Add Deal in ₹</button>
            </div>
          `}
        </div>

        <!-- Right-Edge Draggable Vertical Resizer Handle Bar -->
        <div class="kanban-col-resizer"
             onmousedown="startKanbanColumnResize(event, '${escapeHtml(stageObj.key)}')"
             ontouchstart="startKanbanColumnResize(event, '${escapeHtml(stageObj.key)}')"
             ondblclick="resetSingleKanbanColumnWidth('${escapeHtml(stageObj.key)}')"
             title="Drag horizontally to resize '${escapeHtml(stageObj.title)}' column (180px–500px) • Double-click to reset">
          <div class="kanban-col-resizer-pill">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderKanbanCardHtml(lead) {
  const partnerStyle = getPartnerStyle(lead.partner);

  const isDelivered = String(lead.sampleStatus).toLowerCase().includes('delivered') || String(lead.sampleStatus).toLowerCase().includes('approved');
  const sampleBadgeClass = isDelivered
    ? 'bg-[#34D399]/15 text-[#34D399] font-semibold'
    : 'bg-[#FBBF24]/15 text-[#FBBF24]';

  return `
    <div class="kanban-deal-card group p-4 flex flex-col gap-2.5 min-w-0"
         draggable="true"
         ondragstart="handleKanbanCardDragStart(event, '${escapeHtml(lead.id)}')"
         ondragend="handleKanbanCardDragEnd(event)">
      <div class="kanban-card-row flex items-start justify-between gap-1.5 cursor-pointer min-w-0" onclick="openClientDossier('${lead.id}')">
        <div class="min-w-0 flex-1">
          <h4 class="kanban-card-title kanban-wrap-text font-headline-sm text-sm font-semibold text-white group-hover:text-[#34D399] transition-colors">${escapeHtml(lead.clientName)}</h4>
          <p class="kanban-wrap-text font-label-code text-[11px] text-[#8E92A4]">${escapeHtml(lead.handle)}</p>
        </div>
        <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-[#252636] text-[#B8BCCF] font-medium flex-shrink-0">${escapeHtml(lead.country)}</span>
      </div>

      <!-- Service Pill -->
      <div onclick="openClientDossier('${lead.id}')" class="kanban-service-pill cursor-pointer flex items-start gap-1.5 px-3 py-1.5 rounded-2xl text-xs min-w-0">
        <span class="material-symbols-outlined text-[14px] flex-shrink-0 mt-0.5">movie_edit</span>
        <span class="kanban-wrap-text font-medium">${escapeHtml(lead.service)}</span>
      </div>

      <!-- Channel & INR Value -->
      <div class="kanban-card-row flex flex-wrap items-center justify-between gap-1 pt-0.5 min-w-0">
        <span class="kanban-source-pill kanban-wrap-text px-2.5 py-0.5 rounded-full font-label-code text-[10px]">${escapeHtml(lead.source)}</span>
        <span class="kanban-card-value kanban-wrap-text font-label-code text-xs font-bold">${escapeHtml(lead.billingLabel || formatINR(lead.dealValue))}</span>
      </div>

      <!-- Cash Flow Badge: Collected vs Quoted -->
      ${(() => {
        const payments = Array.isArray(lead.payments) ? lead.payments : [];
        const collected = payments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
        if (collected <= 0) return '';
        const quoteVal = parseFloat(lead.dealValue) || 0;
        const isFully = quoteVal > 0 && collected >= quoteVal;
        if (isFully) {
          return `
            <div class="kanban-card-row flex items-center gap-1.5 min-w-0">
              <span class="badge-fully-paid px-2 py-0.5 rounded-full font-label-code text-[10px] font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-[12px] text-[#FBBF24]">verified</span>
                <span>Fully Paid (${formatINR(collected)})</span>
              </span>
            </div>
          `;
        }
        return `
          <div class="kanban-card-row flex items-center gap-1.5 min-w-0">
            <span class="badge-cash-collected px-2 py-0.5 rounded-full font-label-code text-[10px] font-bold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse"></span>
              <span>${formatINR(collected)} Collected</span>
            </span>
          </div>
        `;
      })()}

      <!-- Profit Margin Chip (INR ₹) -->
      <div onclick="openClientDossier('${lead.id}')" class="kanban-margin-chip kanban-card-row cursor-pointer flex flex-wrap items-center justify-between gap-1 px-3 py-1.5 rounded-2xl text-[11px] font-label-code min-w-0">
        <span class="kanban-wrap-text opacity-75">Tools: <strong class="text-amber-600 dark:text-amber-400 font-bold">${formatINR(lead.toolCost || 0)}</strong></span>
        <span class="kanban-wrap-text text-emerald-600 dark:text-emerald-400 font-bold">${formatINR(lead.netProfit || 0)} (${lead.marginPercent}%)</span>
      </div>

      <!-- Assigned Partner (Name-Centric) & Sample Status -->
      <div class="kanban-card-row flex flex-wrap items-center justify-between gap-1.5 pt-0.5 min-w-0">
        <div class="flex items-center gap-1.5 min-w-0">
          <div class="w-5 h-5 rounded-full ${partnerStyle.badge} flex items-center justify-center font-label-code text-[10px] font-bold flex-shrink-0">${partnerStyle.letter}</div>
          <span class="kanban-card-partner kanban-wrap-text text-xs font-bold">${escapeHtml(lead.partner)}</span>
        </div>
        <span class="kanban-wrap-text px-2.5 py-0.5 rounded-full ${sampleBadgeClass} font-label-code text-[10px] flex items-center gap-1 min-w-0" title="${escapeHtml(lead.sampleStatus)}">
          <span class="material-symbols-outlined text-[12px] flex-shrink-0">${isDelivered ? 'play_circle' : 'schedule'}</span>
          <span class="kanban-wrap-text">${escapeHtml(lead.sampleStatus)}</span>
        </span>
      </div>

      <!-- Client Waiting Time SLA Tracker & 2-Way Chat Stream Pill -->
      <div class="kanban-card-row flex items-center justify-between gap-1.5 pt-0.5 min-w-0">
        <div class="flex items-center gap-1.5 min-w-0 flex-wrap">
          ${renderWaitingSlaBadgeHtml(lead, true)}
          ${(() => {
            const history = Array.isArray(lead.chatHistory) ? lead.chatHistory : [];
            const lastMsg = history.length > 0 ? history[history.length - 1] : null;
            const isLastIncoming = lastMsg && String(lastMsg.direction).toUpperCase() === 'INCOMING';
            if (isLastIncoming) {
              return `
                <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono text-[9px] font-bold flex items-center gap-1 shadow-xs animate-pulse" title="Client replied! Click card to view message">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>New Reply</span>
                </span>
              `;
            } else if (history.length > 0) {
              return `
                <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono text-[9px] font-medium flex items-center gap-1" title="${history.length} messages in conversation stream">
                  <span>💬 ${history.length}</span>
                </span>
              `;
            }
            return '';
          })()}
        </div>
        <button type="button" onclick="event.stopPropagation(); logIncomingWhatsAppMessage('${escapeHtml(lead.id)}')"
          class="btn-touchpoint-quick px-2 py-0.5 rounded-full text-[9px] font-label-code font-semibold flex items-center gap-1 transition cursor-pointer"
          title="Log client reply (resets waiting SLA timer)">
          <span class="material-symbols-outlined text-[11px] text-emerald-600">chat</span>
          <span>Log Reply</span>
        </button>
      </div>

      <!-- Pill Action Buttons (Follow-up, Sample Sent, UPI QR, Dossier) -->
      <div class="kanban-card-actions flex flex-wrap items-center gap-1.5 pt-1 min-w-0">
        <button type="button" onclick="openWhatsAppChatQuick('${escapeHtml(lead.id)}')"
          class="px-2 py-1.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-[#051B11] text-[10px] font-bold transition flex items-center justify-center gap-1 flex-shrink-0"
          title="1-Click Open WhatsApp Chat">
          <span class="material-symbols-outlined text-[13px]">chat</span>
        </button>
        <button type="button" onclick="openEmailModal('${lead.id}', 'follow_up')"
          class="flex-1 min-w-[72px] py-1.5 px-2.5 rounded-full bg-[#232433] hover:bg-[#2E3044] text-white text-[10px] font-medium flex items-center justify-center gap-1 transition"
          title="Send Follow-up Email via Gmail">
          <span class="material-symbols-outlined text-[12px] text-[#60A5FA] flex-shrink-0">mail</span>
          <span class="kanban-wrap-text">Follow-up</span>
        </button>
        <button type="button" onclick="openEmailModal('${lead.id}', 'sample_delivered')"
          class="flex-1 min-w-[78px] py-1.5 px-2.5 rounded-full bg-[#34D399]/15 hover:bg-[#34D399] text-[#34D399] hover:text-[#051B11] text-[10px] font-bold flex items-center justify-center gap-1 transition"
          title="Send Sample Delivered Email via Gmail">
          <span class="material-symbols-outlined text-[12px] flex-shrink-0">send</span>
          <span class="kanban-wrap-text">Sample Sent</span>
        </button>
        <button type="button" onclick="openUpiQrModal('${lead.id}', '${lead.dealValue}')"
          class="px-2.5 py-1.5 rounded-full bg-[#FBBF24]/15 hover:bg-[#FBBF24] text-[#FBBF24] hover:text-[#1F1B00] text-[10px] font-bold transition flex items-center justify-center gap-0.5"
          title="Generate Client UPI Payment QR (${formatINR(lead.dealValue)})">
          <span class="material-symbols-outlined text-[13px]">qr_code_2</span>
        </button>
        <button type="button" onclick="openClientDossier('${lead.id}')"
          class="px-2.5 py-1.5 rounded-full bg-[#232433] hover:bg-[#2E3044] text-[#8E92A4] hover:text-white text-[11px] transition flex items-center justify-center"
          title="Open Profit Margin Calculator & Client File">
          <span class="material-symbols-outlined text-[13px]">calculate</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Interactive Mouse & Touch Drag Handler for Resizing Kanban Stage Columns
 */
function startKanbanColumnResize(event, stageKey) {
  if (event.type === 'mousedown' && event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();

  const colEl = document.querySelector(`[data-stage-col="${stageKey}"]`);
  if (!colEl) return;

  const startX = event.touches ? event.touches[0].clientX : event.clientX;
  const startWidth = colEl.getBoundingClientRect().width || crmState.columnWidths[stageKey] || 260;
  const widthBadge = colEl.querySelector('.kanban-width-badge');

  colEl.classList.add('is-resizing');
  document.body.classList.add('kanban-resizing-active');

  let latestWidth = Math.round(startWidth);

  function onPointerMove(moveEvent) {
    const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
    const deltaX = clientX - startX;
    const clampedWidth = Math.max(KANBAN_MIN_COL_WIDTH, Math.min(KANBAN_MAX_COL_WIDTH, Math.round(startWidth + deltaX)));
    latestWidth = clampedWidth;

    colEl.style.setProperty('--col-width', `${clampedWidth}px`);
    colEl.style.width = `${clampedWidth}px`;
    colEl.style.minWidth = `${clampedWidth}px`;
    colEl.style.maxWidth = `${clampedWidth}px`;
    colEl.style.flex = `0 0 ${clampedWidth}px`;

    colEl.classList.toggle('col-compact', clampedWidth < 225);
    colEl.classList.toggle('col-expanded', clampedWidth > 340);

    if (widthBadge) {
      widthBadge.textContent = `${clampedWidth}px`;
    }
  }

  function onPointerUp() {
    document.removeEventListener('mousemove', onPointerMove);
    document.removeEventListener('mouseup', onPointerUp);
    document.removeEventListener('touchmove', onPointerMove);
    document.removeEventListener('touchend', onPointerUp);

    colEl.classList.remove('is-resizing');
    document.body.classList.remove('kanban-resizing-active');

    crmState.columnWidths[stageKey] = latestWidth;
    saveKanbanColumnWidths();
  }

  document.addEventListener('mousemove', onPointerMove);
  document.addEventListener('mouseup', onPointerUp);
  document.addEventListener('touchmove', onPointerMove, { passive: false });
  document.addEventListener('touchend', onPointerUp);
}

function resetSingleKanbanColumnWidth(stageKey) {
  crmState.columnWidths[stageKey] = DEFAULT_KANBAN_WIDTHS[stageKey] || 260;
  saveKanbanColumnWidths();
  renderKanbanBoard();
  showCRMToast(`Reset "${stageKey}" column width to ${crmState.columnWidths[stageKey]}px`, 'view_column');
}

function resetAllKanbanColumnWidths() {
  crmState.columnWidths = { ...DEFAULT_KANBAN_WIDTHS };
  saveKanbanColumnWidths();
  renderKanbanBoard();
  showCRMToast('All column widths reset to default!', 'view_column');
}

/**
 * Calculate Start Date, End Date, Days Remaining, Total Days, and Renewal Progress %
 * for any subscription tool in Tech Stack.
 */
function computeToolRenewalMetrics(tool) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let startDateStr = tool.startDate || '';
  let endDateStr = tool.endDate || '';

  if (!startDateStr || !endDateStr) {
    const fallbackDays = Math.max(0, parseInt(tool.renewalDaysLeft, 10) || 30);
    const startObj = new Date(now);
    const endObj = new Date(now);
    endObj.setDate(endObj.getDate() + fallbackDays);
    if (!startDateStr) startDateStr = startObj.toISOString().split('T')[0];
    if (!endDateStr) endDateStr = endObj.toISOString().split('T')[0];
  }

  const startMs = new Date(startDateStr + 'T00:00:00').getTime();
  const endMs = new Date(endDateStr + 'T00:00:00').getTime();
  const nowMs = now.getTime();

  const totalSpanDays = Math.max(1, Math.round((endMs - startMs) / 86400000));
  const daysLeft = Math.max(0, Math.ceil((endMs - nowMs) / 86400000));
  const elapsedDays = Math.max(0, Math.min(totalSpanDays, totalSpanDays - daysLeft));

  // Remaining bar width % (100% = full cycle remaining, shrinks as renewal approaches)
  const remainingPct = Math.max(6, Math.min(100, Math.round((daysLeft / totalSpanDays) * 100)));
  const elapsedPct = Math.max(0, Math.min(100, Math.round((elapsedDays / totalSpanDays) * 100)));

  const isExpired = endMs < nowMs;
  const isUrgent = daysLeft <= 5;
  const isWarning = daysLeft > 5 && daysLeft <= 10;

  let barColor = 'bg-[#34D399]';
  let textColor = 'text-[#34D399]';
  if (isExpired || isUrgent) {
    barColor = 'bg-[#FF6B8B]';
    textColor = 'text-[#FF6B8B] font-bold';
  } else if (isWarning) {
    barColor = 'bg-[#FBBF24]';
    textColor = 'text-[#FBBF24] font-semibold';
  }

  const formatShortDate = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return {
    startDate: startDateStr,
    endDate: endDateStr,
    startFormatted: formatShortDate(startDateStr),
    endFormatted: formatShortDate(endDateStr),
    totalSpanDays,
    daysLeft,
    elapsedDays,
    remainingPct,
    elapsedPct,
    isExpired,
    isUrgent,
    barColor,
    textColor,
    statusLabel: isExpired ? 'Expired / Renew Now' : `${daysLeft}d left of ${totalSpanDays}d (${remainingPct}%)`
  };
}

function renderTechStackPaidByOptions() {
  const selectEl = document.getElementById('add-tool-paid-by');
  if (!selectEl) return;
  const activePartners = getActivePartners();
  const currentVal = selectEl.value;
  const options = [
    ...activePartners.map(p => ({ value: p.name, label: `${p.name} (${p.role})` })),
    { value: 'Studio Shared Account', label: `Studio Shared Account (${getFullAgencyTitle()})` }
  ];
  selectEl.innerHTML = options.map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('');
  if (currentVal && options.some(o => o.value === currentVal)) {
    selectEl.value = currentVal;
  }
}

function updateToolPerCutCost(toolId, newValue) {
  const tool = globalState.techStack.find(t => t.id === toolId);
  if (!tool) return;
  tool.costPerCut = Math.max(0, parseFloat(newValue) || 0);
  tool.updatedAt = Date.now();
  saveToLocalCache();
  recordStudioActivity(
    'Updated Tool Per-Client Cut',
    `Set "${tool.toolName}" per-client cut burn to ${formatINR(tool.costPerCut)}`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Updated ${tool.toolName} cut to ${formatINR(tool.costPerCut)}`);
  syncGlobalConfigToSheet();
  renderTechStack();
  renderAll();
  showCRMToast(`Updated "${tool.toolName}" per-client cut to ${formatINR(tool.costPerCut)}`, 'tune');
}

function toggleToolAutoRenew(toolId) {
  const tool = globalState.techStack.find(t => t.id === toolId);
  if (!tool) return;
  tool.autoRenew = tool.autoRenew === false ? true : false;
  tool.updatedAt = Date.now();
  saveToLocalCache();
  const statusText = tool.autoRenew ? 'Auto-Renew Active' : 'Manual Pay';
  recordStudioActivity(
    'Updated Tool Auto-Renew',
    `Switched "${tool.toolName}" billing mode to ${statusText}`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Set ${tool.toolName} to ${statusText}`);
  syncGlobalConfigToSheet();
  renderTechStack();
  renderAll();
  showCRMToast(`"${tool.toolName}" set to ${statusText}`, tool.autoRenew ? 'autorenew' : 'pan_tool');
}

const STUDIO_TOOL_CATEGORIES = [
  'Editing & Post-Production',
  'VFX, 3D & Motion Graphics',
  'AI Video & Generative Media',
  'AI Voice, Audio & Music',
  'Thumbnails & Graphic Design',
  'Cloud Storage & File Delivery',
  'Stock Footage, Assets & LUTs',
  'Color Grading & Finishing',
  'Scriptwriting & AI Research',
  'CRM, PM & Communication',
  'Web Hosting, Domain & Server',
  'Studio Overhead & Utilities',
  'Other Production Tool'
];

function openUpgradeToolModal(toolId) {
  injectSharedModals();
  const tool = globalState.techStack.find(t => t.id === toolId);
  if (!tool) return;

  const modal = document.getElementById('crm-upgrade-tool-modal');
  if (!modal) {
    // Fallback prompt if modal element is unavailable
    const entered = window.prompt(`Upgrade "${tool.toolName}" Plan — Enter new Monthly Cost in INR (₹):`, String(tool.monthlyCost || 0));
    if (entered === null) return;
    const newCost = Math.max(0, Math.round(parseFloat(entered) || 0));
    if (newCost <= 0) return;
    applyToolPlanUpgrade_(tool.id, newCost, tool.costPerCut, tool.autoRenew !== false);
    return;
  }

  document.getElementById('upgrade-tool-id').value = tool.id;
  document.getElementById('upgrade-tool-title-name').textContent = tool.toolName;
  document.getElementById('upgrade-tool-current-cost').textContent = `${formatINR(tool.monthlyCost)}/mo`;
  document.getElementById('upgrade-tool-currency').value = 'INR';
  document.getElementById('upgrade-tool-new-cost').value = tool.monthlyCost || '';
  document.getElementById('upgrade-tool-per-cut').value = tool.costPerCut || 0;
  const categorySelect = document.getElementById('upgrade-tool-category');
  if (categorySelect) {
    categorySelect.value = tool.category || 'Editing & Post-Production';
  }
  const autoRenewCheckbox = document.getElementById('upgrade-tool-auto-renew');
  if (autoRenewCheckbox) {
    autoRenewCheckbox.checked = tool.autoRenew !== false;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => {
    const costInput = document.getElementById('upgrade-tool-new-cost');
    if (costInput) {
      costInput.focus();
      costInput.select();
    }
  }, 60);
}

function handleUpgradeToolSubmit(event) {
  if (event) event.preventDefault();
  const toolId = document.getElementById('upgrade-tool-id')?.value;
  const curr = document.getElementById('upgrade-tool-currency')?.value || 'INR';
  const rawNewCost = parseFloat(document.getElementById('upgrade-tool-new-cost')?.value);
  const rawPerCut = parseFloat(document.getElementById('upgrade-tool-per-cut')?.value) || 0;
  const autoRenewEl = document.getElementById('upgrade-tool-auto-renew');

  if (isNaN(rawNewCost) || rawNewCost < 0) {
    showCRMToast('Please enter a valid monthly cost.', 'warning');
    return;
  }

  const newMonthlyINR = convertToINR(rawNewCost, curr);
  const newPerCutINR = convertToINR(rawPerCut, curr);
  const autoRenew = autoRenewEl ? Boolean(autoRenewEl.checked) : true;
  const categoryEl = document.getElementById('upgrade-tool-category');
  const newCategory = categoryEl ? categoryEl.value : undefined;

  closeModal('crm-upgrade-tool-modal');
  applyToolPlanUpgrade_(toolId, newMonthlyINR, newPerCutINR, autoRenew, newCategory);
}

function applyToolPlanUpgrade_(toolId, newMonthlyINR, newPerCutINR, autoRenew, newCategory) {
  const tool = globalState.techStack.find(t => t.id === toolId);
  if (!tool) return;

  const previousCost = tool.monthlyCost;
  tool.monthlyCost = Math.max(0, Math.round(Number(newMonthlyINR) || 0));
  if (newPerCutINR !== undefined && !isNaN(newPerCutINR)) {
    tool.costPerCut = Math.max(0, Math.round(Number(newPerCutINR) || 0));
  }
  if (autoRenew !== undefined) {
    tool.autoRenew = Boolean(autoRenew);
  }
  if (newCategory) {
    tool.category = newCategory;
  }
  tool.updatedAt = Date.now();

  saveToLocalCache();
  recordStudioActivity(
    'Upgraded Tool Plan',
    `Upgraded ${tool.toolName} plan to ${formatINR(tool.monthlyCost)}/mo (was ${formatINR(previousCost)}/mo)`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Upgraded ${tool.toolName} plan to ${formatINR(tool.monthlyCost)}/mo`);
  syncGlobalConfigToSheet();
  renderTechStack();
  renderAll();
  showCRMToast(`Upgraded ${tool.toolName} plan to ${formatINR(tool.monthlyCost)}/mo!`, 'trending_up');
}

function initAddToolDefaultDates() {
  const startInput = document.getElementById('add-tool-start-date');
  const endInput = document.getElementById('add-tool-end-date');
  if (!startInput || !endInput) return;
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setDate(nextMonth.getDate() + 30);
  startInput.value = today.toISOString().split('T')[0];
  endInput.value = nextMonth.toISOString().split('T')[0];
  updateAddToolRenewalPreview();
  renderTechStackPaidByOptions();
}

function updateAddToolRenewalPreview() {
  const startDate = document.getElementById('add-tool-start-date')?.value || '';
  const endDate = document.getElementById('add-tool-end-date')?.value || '';
  const txtEl = document.getElementById('add-tool-renewal-preview-text');
  const barEl = document.getElementById('add-tool-renewal-preview-bar');
  if (!txtEl || !barEl) return;

  const metrics = computeToolRenewalMetrics({ startDate, endDate });
  txtEl.textContent = metrics.statusLabel;
  barEl.style.width = metrics.remainingPct + '%';
  barEl.className = 'h-full rounded-full transition ' + metrics.barColor;
}

async function handleAddToolForm(e) {
  if (e) e.preventDefault();
  const nameInput = document.getElementById('add-tool-name');
  const toolName = nameInput ? nameInput.value.trim() : '';
  if (!toolName) return;

  const curr = document.getElementById('add-tool-currency')?.value || 'INR';
  const rawMonthly = parseFloat(document.getElementById('add-tool-monthly')?.value) || 0;
  const rawPerCut = parseFloat(document.getElementById('add-tool-per-cut')?.value) || 0;

  const monthlyCost = convertToINR(rawMonthly, curr);
  const costPerCut = convertToINR(rawPerCut, curr);
  const category = document.getElementById('add-tool-category')?.value || 'Editing & VFX';
  const paidBy = document.getElementById('add-tool-paid-by')?.value || (getActivePartners()[0]?.name || 'Studio Shared Account');
  const startDate = document.getElementById('add-tool-start-date')?.value || new Date().toISOString().split('T')[0];
  const endDate = document.getElementById('add-tool-end-date')?.value || '';
  const autoRenewEl = document.getElementById('add-tool-auto-renew');
  const autoRenew = autoRenewEl ? Boolean(autoRenewEl.checked) : true;
  const renMetrics = computeToolRenewalMetrics({ startDate, endDate });

  const newTool = normalizeTool_({
    id: 'TOOL-' + Date.now(),
    toolName,
    category,
    monthlyCost,
    costPerCut,
    paidBy,
    assignedPartners: paidBy,
    startDate: renMetrics.startDate,
    endDate: renMetrics.endDate,
    renewalDaysLeft: renMetrics.daysLeft,
    autoRenew,
    status: 'Active',
    updatedAt: Date.now()
  });

  // 1. Mutate globalState.techStack immediately
  globalState.deletedToolIds.delete(String(newTool.id));
  globalState.techStack.push(newTool);
  saveToLocalCache();
  clearFormDraft_('add-tool-form');

  const cutInfo = costPerCut > 0 ? `${formatINR(costPerCut)}/cut` : 'cut burn set at last';
  const renewInfo = autoRenew ? 'Auto-Renew Active' : 'Manual Pay';

  // 2. Log to Activity Ledger
  recordStudioActivity(
    'Added Subscription Tool',
    `${toolName} • ${formatINR(monthlyCost)}/mo (${cutInfo}) • ${renewInfo} • Paid by ${paidBy} • ${renMetrics.startDate} → ${renMetrics.endDate}`,
    false
  );

  // 3. Push immediately to GitHub JSON Database + Google Sheets backup
  pushToGitHubDatabase(`${getActiveStudioUser()}: Added tool ${toolName} (${formatINR(monthlyCost)}/mo)`);
  syncGlobalConfigToSheet();

  // 4. Immediately render Tech Stack & global metrics
  renderTechStack();
  renderAll();

  if (e && e.target && typeof e.target.reset === 'function') {
    e.target.reset();
    if (autoRenewEl) autoRenewEl.checked = true;
  }
  initAddToolDefaultDates();

  try {
    await postToGoogleSheets({ action: 'addTool', tool: newTool });
    showCRMToast(`Added "${toolName}" (${formatINR(monthlyCost)}/mo • ${renewInfo} • Paid by ${paidBy})!`, 'check_circle');
  } catch (err) {
    showCRMToast(`Added "${toolName}" (${formatINR(monthlyCost)}/mo • ${renewInfo})!`, 'check_circle');
  }
}

function renderAutoRenewBadgeHtml_(tool, compact = false) {
  const isAuto = tool.autoRenew !== false;
  if (isAuto) {
    return `
      <button type="button" onclick="toggleToolAutoRenew('${escapeHtml(tool.id)}')"
        title="Click to switch between Auto-Renew Active and Manual Pay"
        class="badge-auto-renew-active ${compact ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-[10px]'} rounded-full font-label-code font-bold inline-flex items-center gap-1 transition cursor-pointer">
        <span class="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse flex-shrink-0"></span>
        <span class="truncate">Auto-Renew Active</span>
      </button>
    `;
  }
  return `
    <button type="button" onclick="toggleToolAutoRenew('${escapeHtml(tool.id)}')"
      title="Click to switch between Auto-Renew Active and Manual Pay"
      class="badge-manual-pay ${compact ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-[10px]'} rounded-full font-label-code font-semibold inline-flex items-center gap-1 transition cursor-pointer">
      <span class="w-1.5 h-1.5 rounded-full bg-[#94A3B8] flex-shrink-0"></span>
      <span class="truncate">Manual Pay</span>
    </button>
  `;
}

function renderTechStackStrip() {
  const stripGrid = document.getElementById('tech-stack-mini-grid');
  const totalMonthly = globalState.techStack.reduce((sum, t) => sum + (parseFloat(t.monthlyCost) || 0), 0);

  const burnLabel = document.getElementById('tech-stack-total-burn');
  if (burnLabel) burnLabel.textContent = `${formatINR(totalMonthly)}/mo`;
  const yrLabel = document.getElementById('tech-stack-yearly-burn');
  if (yrLabel) yrLabel.textContent = `(${formatINR(totalMonthly * 12)}/yr)`;
  const countLabel = document.getElementById('tech-stack-active-count');
  if (countLabel) countLabel.textContent = `${globalState.techStack.length} Active Tools`;
  const navBadge = document.getElementById('nav-tech-stack-burn');
  if (navBadge) navBadge.textContent = `${formatINR(totalMonthly)}/mo`;

  if (!stripGrid) return;

  if (globalState.techStack.length === 0) {
    stripGrid.innerHTML = `
      <div class="col-span-full p-5 rounded-[20px] bg-[#13131C] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8E92A4]">
        <span>Your Tech Stack inventory is clean and empty. Add your real software subscriptions in ₹ (INR) to track monthly burn &amp; renewal bars.</span>
        <a href="tech-stack.html" class="px-4 py-2 rounded-full bg-[#34D399] text-[#051B11] font-bold text-xs">+ Add Subscriptions in ₹</a>
      </div>
    `;
    return;
  }

  stripGrid.innerHTML = globalState.techStack.map(tool => {
    const ren = computeToolRenewalMetrics(tool);
    const paidBy = tool.paidBy || tool.assignedPartners || getActivePartners()[0]?.name || 'Studio';
    const cutDisplay = (parseFloat(tool.costPerCut) || 0) > 0 ? `${formatINR(tool.costPerCut)}/cut` : 'Cut: Decide at last';
    const toolCategory = tool.category || 'Production Tool';

    return `
      <div class="mini-tech-card p-4 rounded-[20px] bg-[#13131C] flex flex-col justify-between gap-3 hover:bg-[#1A1B28] transition-colors border border-white/5 shadow-md">
        <!-- Header: Tool Name, Category Tag & Monthly Burn -->
        <div class="flex items-start justify-between gap-2 min-w-0">
          <div class="flex items-center gap-2 min-w-0 flex-1">
            <div class="w-7 h-7 rounded-lg bg-[#252636] text-[#60A5FA] flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-[15px]">build</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-xs font-bold text-white truncate" title="${escapeHtml(tool.toolName)}">${escapeHtml(tool.toolName)}</span>
              <span class="text-[9px] font-label-code text-[#8E92A4] truncate mt-0.5" title="${escapeHtml(toolCategory)}">${escapeHtml(toolCategory)}</span>
            </div>
          </div>
          <span class="font-label-code text-xs text-[#FBBF24] font-bold flex-shrink-0 text-right leading-tight">${formatINR(tool.monthlyCost)}/mo</span>
        </div>

        <!-- Auto-Renew Badge & Renewal Days Left -->
        <div class="flex items-center justify-between gap-2 min-w-0">
          ${renderAutoRenewBadgeHtml_(tool, true)}
          <span class="font-label-code text-[10px] ${ren.textColor} font-semibold flex-shrink-0" title="${ren.startFormatted} → ${ren.endFormatted}">
            ${ren.daysLeft}d / ${ren.totalSpanDays}d
          </span>
        </div>

        <!-- Renewal Bar -->
        <div class="w-full h-1.5 bg-[#252636] rounded-full overflow-hidden" title="Renewal Bar: ${ren.startFormatted} → ${ren.endFormatted} (${ren.statusLabel})">
          <div class="h-full ${ren.barColor} rounded-full transition" style="width: ${ren.remainingPct}%;"></div>
        </div>

        <!-- Per Cut & Who Paid -->
        <div class="flex items-center justify-between text-[9px] font-label-code text-[#8E92A4] min-w-0">
          <span class="truncate">${escapeHtml(cutDisplay)}</span>
          <span class="text-[#34D399] font-semibold truncate ml-1">Paid: ${escapeHtml(paidBy)}</span>
        </div>

        <!-- Action Buttons: Upgrade Plan + Delete -->
        <div class="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
          <button type="button" onclick="openUpgradeToolModal('${escapeHtml(tool.id)}')"
            class="mini-card-upgrade-btn btn-upgrade-plan font-label-code font-semibold flex items-center justify-center gap-1.5 transition"
            title="Upgrade Plan or Edit Subscription Details">
            <span class="material-symbols-outlined text-[13px]">trending_up</span>
            <span>Upgrade Plan</span>
          </button>
          <button type="button" onclick="removeTechStackTool('${escapeHtml(tool.id)}')"
            class="mini-card-delete-btn"
            title="Remove Subscription">
            <span class="material-symbols-outlined text-[13px]">delete</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderTechStackFullTable() {
  const tbody = document.getElementById('tech-stack-table-body');
  if (!tbody) return;

  if (globalState.techStack.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="py-10 px-4 text-center text-[#8E92A4] text-xs">
          No software subscriptions added yet. Use the <strong>"Add Subscription to 'Tech Stack'"</strong> form on the right to add your real tools in ₹ (INR).
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = globalState.techStack.map(tool => {
    const code = tool.toolName.slice(0, 2).toUpperCase();
    const ren = computeToolRenewalMetrics(tool);
    const paidBy = tool.paidBy || tool.assignedPartners || getActivePartners()[0]?.name || 'Studio';
    const currentCut = parseFloat(tool.costPerCut) || 0;

    return `
      <tr class="transition-colors group">
        <td class="py-4 px-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-[#34D399]/15 text-[#34D399] flex items-center justify-center font-label-code text-xs font-bold flex-shrink-0">${escapeHtml(code)}</div>
            <div class="flex flex-col gap-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="tech-tool-name text-sm font-semibold transition-colors">${escapeHtml(tool.toolName)}</span>
                ${renderAutoRenewBadgeHtml_(tool, false)}
              </div>
              <span class="font-label-code text-xs opacity-75">${escapeHtml(tool.category || 'Production Tool')}</span>
            </div>
          </div>
        </td>
        <td class="py-4 px-4">
          <div class="flex flex-col gap-1.5">
            <span class="tech-tool-cost font-label-code text-xs font-semibold">${formatINR(tool.monthlyCost)} / mo</span>
            <div class="flex items-center gap-1.5" title="Optional: Set per-client cut now or change anytime at last">
              <span class="text-[10px] font-label-code opacity-75">Per Client Cut ₹:</span>
              <input type="number" step="50" min="0" value="${currentCut}"
                onchange="updateToolPerCutCost('${tool.id}', this.value)"
                placeholder="0 (at last)"
                class="w-20 h-6 px-2 rounded-full font-label-code text-[11px] font-bold text-right focus:outline-none"/>
            </div>
          </div>
        </td>
        <td class="py-4 px-4 min-w-[210px]">
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between text-[11px] font-label-code">
              <span class="${ren.textColor}">${escapeHtml(ren.statusLabel)}</span>
            </div>
            <div class="w-full h-2 rounded-full overflow-hidden p-0.5 border" style="background: var(--bg-canvas-subtle); border-color: var(--border-card);">
              <div class="h-full ${ren.barColor} rounded-full transition" style="width: ${ren.remainingPct}%;"></div>
            </div>
            <div class="flex items-center justify-between text-[10px] font-label-code opacity-75">
              <span>Start: <strong class="tech-tool-date font-bold">${escapeHtml(ren.startFormatted)}</strong></span>
              <span>End: <strong class="tech-tool-date font-bold">${escapeHtml(ren.endFormatted)}</strong></span>
            </div>
          </div>
        </td>
        <td class="py-4 px-4">
          <span class="px-3 py-1 rounded-full bg-[#34D399]/15 border border-[#34D399]/30 text-[#34D399] text-[11px] font-label-code font-bold inline-flex items-center gap-1">
            <span class="material-symbols-outlined text-[13px]">payments</span>
            <span>${escapeHtml(paidBy)}</span>
          </span>
        </td>
        <td class="py-4 px-4 text-right">
          <div class="flex items-center justify-end gap-2 whitespace-nowrap">
            <button type="button" onclick="openUpgradeToolModal('${tool.id}')"
              class="table-upgrade-btn btn-upgrade-plan font-label-code font-semibold inline-flex items-center gap-1 transition"
              title="Upgrade Plan / Change Cost">
              <span class="material-symbols-outlined text-[14px]">trending_up</span>
              <span>Upgrade Plan</span>
            </button>
            <button type="button" onclick="removeTechStackTool('${tool.id}')"
              class="table-delete-btn font-label-code font-semibold inline-flex items-center gap-1 transition-colors"
              title="Remove Subscription">
              <span class="material-symbols-outlined text-[14px]">delete</span>
              <span>Remove</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function removeTechStackTool(toolId) {
  const idx = globalState.techStack.findIndex(t => t.id === toolId);
  if (idx < 0) return;
  const removed = globalState.techStack.splice(idx, 1)[0];
  globalState.deletedToolIds.add(String(toolId));
  saveDeletedIds_();
  saveToLocalCache();
  recordStudioActivity(
    'Removed Subscription Tool',
    `Removed "${removed.toolName}" (${formatINR(removed.monthlyCost)}/mo) from Tech Stack`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Removed tool ${removed.toolName}`);
  syncGlobalConfigToSheet();
  renderTechStack();
  renderAll();
  showCRMToast(`Removed "${removed.toolName}" across all devices`, 'delete');
}

/**
 * ============================================================================
 * 9B. STUDIO ACTIVITY LEDGER (LIVE AUDIT TIMELINE) & DEBOUNCED FORM AUTO-SAVE
 * ============================================================================
 */

function formatActivityTimestamp_(isoStr) {
  if (!isoStr) return 'Just now';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return String(isoStr);
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

function getFilteredActivityLog_() {
  const filterUser = (crmState.filters.activityUser || 'ALL').toLowerCase();
  if (filterUser === 'all') return crmState.activityLog;
  return crmState.activityLog.filter(item => String(item.user || '').toLowerCase() === filterUser);
}

function setActivityUserFilter(userKey) {
  crmState.filters.activityUser = userKey || 'ALL';
  renderActivityLedgerUI();
}

function renderActivityLedgerUI() {
  renderUserPresenceBar();
  const listContainers = document.querySelectorAll('[data-activity-ledger-feed]');
  const filterBars = document.querySelectorAll('[data-activity-user-filters]');

  const uniqueUsers = Array.from(new Set([
    ...getActivePartners().map(p => p.name),
    ...crmState.activityLog.map(a => a.user).filter(Boolean)
  ]));

  filterBars.forEach(bar => {
    const activeKey = (crmState.filters.activityUser || 'ALL').toLowerCase();
    const pills = [
      { key: 'ALL', label: `All Activity (${crmState.activityLog.length})` },
      ...uniqueUsers.map(u => ({
        key: u,
        label: `${u} (${crmState.activityLog.filter(a => String(a.user || '').toLowerCase() === u.toLowerCase()).length})`
      }))
    ];
    bar.innerHTML = pills.map(p => {
      const isAct = activeKey === p.key.toLowerCase();
      return `
        <button type="button" onclick="setActivityUserFilter('${escapeHtml(p.key)}')"
          class="px-3 py-1 rounded-full ${isAct ? 'btn-glass-mint font-bold' : 'btn-glass-neutral'} text-[11px] font-label-code">
          ${escapeHtml(p.label)}
        </button>
      `;
    }).join('');
  });

  if (listContainers.length === 0) return;
  const entries = getFilteredActivityLog_();

  const html = entries.length === 0
    ? `
      <div class="p-6 rounded-[18px] bg-[#13131C] text-center text-xs text-[#94A3B8]">
        No activity recorded for this filter yet. Every deal, stage move, tool update, and config change appears here in real time.
      </div>
    `
    : entries.slice(0, 60).map(item => {
        const pStyle = getPartnerStyle(item.user);
        return `
          <div class="p-3.5 rounded-[16px] bg-[#13131C] flex flex-wrap items-center justify-between gap-3 border border-white/5 hover:border-teal-400/30 transition">
            <div class="flex items-start gap-3 min-w-0 flex-1">
              <div class="w-8 h-8 rounded-full ${pStyle.badge} flex items-center justify-center font-label-code text-xs font-bold flex-shrink-0 mt-0.5">
                ${escapeHtml(pStyle.letter)}
              </div>
              <div class="flex flex-col min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-xs font-bold text-slate-900">${escapeHtml(item.user || 'Partner')}</span>
                  <span class="px-2 py-0.5 rounded-full bg-white/[0.06] text-[#2DD4BF] font-label-code text-[10px] font-semibold">${escapeHtml(item.action || 'Action')}</span>
                  <span class="px-2 py-0.5 rounded-full bg-white/[0.04] text-[#94A3B8] font-label-code text-[10px]">${escapeHtml(item.device || 'Web')}</span>
                </div>
                <p class="text-xs text-[#94A3B8] mt-1 safe-text-wrap">${escapeHtml(item.details || '')}</p>
              </div>
            </div>
            <span class="font-label-code text-[10px] text-[#94A3B8] flex-shrink-0">${escapeHtml(formatActivityTimestamp_(item.timestamp))}</span>
          </div>
        `;
      }).join('');

  listContainers.forEach(container => {
    container.innerHTML = html;
  });
}

function openActivityLedgerModal() {
  injectSharedModals();
  renderActivityLedgerUI();
  const modal = document.getElementById('crm-activity-ledger-modal');
    const activeUser = getActiveStudioUser().trim().toLowerCase();
  const isAdmin = activeUser === 'koushik';
  const adminSection = document.getElementById('admin-pin-reset-section');
  if (adminSection) {
    if (isAdmin) {
      adminSection.classList.remove('hidden');
      renderAdminPinResetList();
    } else {
      adminSection.classList.add('hidden');
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function clearActivityLedger() {
  crmState.activityLog = [
    {
      id: 'ACT-' + Date.now(),
      timestamp: new Date().toISOString(),
      user: getActiveStudioUser(),
      device: crmState.deviceLabel,
      action: 'Cleared Team History',
      details: `Activity log reset by ${getActiveStudioUser()} (${crmState.deviceLabel})`
    }
  ];
  saveToLocalCache();
  renderActivityLedgerUI();
  pushToGitHubDatabase(`${getActiveStudioUser()}: Cleared Team History`);
  showCRMToast('Team History cleared & synced!', 'delete_sweep');
}

function exportActivityLedger(format = 'json') {
  const entries = crmState.activityLog || [];
  let blob;
  let filename;
  if (format === 'csv') {
    const header = 'Timestamp,User,Device,Action,Details\n';
    const rows = entries.map(e =>
      [e.timestamp, e.user, e.device, e.action, e.details]
        .map(v => `"${String(v || '').replace(/"/g, '""')}"`)
        .join(',')
    ).join('\n');
    blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' });
    filename = `${(crmState.branding.agencyName || 'Studio').replace(/\s+/g, '_')}_Activity_Ledger.csv`;
  } else {
    blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
    filename = `${(crmState.branding.agencyName || 'Studio').replace(/\s+/g, '_')}_Activity_Ledger.json`;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  showCRMToast(`Exported ${entries.length} activity log entries (${format.toUpperCase()})!`, 'download');
}

/**
 * Debounced Form Draft Auto-Save Engine:
 * Automatically saves typed form inputs to localStorage while typing (250ms debounce)
 * and restores them on page load so accidental refreshes never lose work.
 */
function loadAllFormDrafts_() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_FORM_DRAFTS) || '{}') || {};
  } catch (_) {
    return {};
  }
}

function saveFormDraftField_(fieldId, value) {
  if (!fieldId) return;
  try {
    const drafts = loadAllFormDrafts_();
    drafts[fieldId] = value;
    localStorage.setItem(STORAGE_KEY_FORM_DRAFTS, JSON.stringify(drafts));
  } catch (_) {}
}

function clearFormDraft_(formKey) {
  try {
    const drafts = loadAllFormDrafts_();
    if (formKey === 'new-lead-form') {
      ['new-lead-name', 'new-lead-handle', 'new-lead-email', 'new-lead-service', 'new-lead-value', 'new-lead-hours', 'new-lead-rate', 'new-lead-custom-tool-cost', 'new-lead-sample-url'].forEach(k => delete drafts[k]);
    } else if (formKey === 'add-tool-form') {
      ['add-tool-name', 'add-tool-monthly', 'add-tool-per-cut'].forEach(k => delete drafts[k]);
    }
    localStorage.setItem(STORAGE_KEY_FORM_DRAFTS, JSON.stringify(drafts));
  } catch (_) {}
}

function initDebouncedFormDrafts() {
  const watchedIds = [
    'new-lead-name', 'new-lead-handle', 'new-lead-email', 'new-lead-service',
    'new-lead-value', 'new-lead-hours', 'new-lead-rate', 'new-lead-custom-tool-cost',
    'add-tool-name', 'add-tool-monthly', 'add-tool-per-cut',
    'wa-report-daily-note', 'bulk-converter-input'
  ];
  const drafts = loadAllFormDrafts_();

  watchedIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && drafts[id] !== undefined && drafts[id] !== '') {
      el.value = drafts[id];
    }
  });

  let debounceTimer = null;
  document.addEventListener('input', (e) => {
    const target = e.target;
    if (!target || !target.id) return;
    if (target.id.startsWith('cfg-gh-token')) return;
    if (watchedIds.includes(target.id)) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        saveFormDraftField_(target.id, target.value);
      }, 250);
    }
  });
}

/**
 * ============================================================================
 * 10. SHARED MODALS (10-PARTNER CONFIG, WHATSAPP REPORT, UPI QR, FX, NEW LEAD, EMAIL)
 * ============================================================================
 */

function injectSharedModals() {
  if (document.getElementById('crm-shared-modals-root')) return;

  // Build 10 Partner configuration rows dynamically (Name & Role only, no percentages)
  const partnerConfigSlotsHtml = Array.from({ length: 10 }, (_, idx) => {
    const slotNum = idx + 1;
    const pal = PARTNER_PALETTE[idx % PARTNER_PALETTE.length];
    return `
      <div class="p-3 rounded-[18px] bg-[#13131C] flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-label-code font-bold uppercase tracking-wider" style="color: ${pal.dotHex}; color: color-mix(in srgb, ${pal.dotHex}, var(--uv-ink) var(--uv-pmix, 0%));">Partner Slot #${slotNum}</span>
          <span class="w-2 h-2 rounded-full" style="background-color: ${pal.dotHex};"></span>
        </div>
        <input id="cfg-p${slotNum}-name" type="text" placeholder="${slotNum <= 3 ? `Partner ${slotNum} Name` : 'Leave blank to hide slot'}"
          class="h-8 px-3 rounded-full bg-[#1F202D] text-white text-xs font-semibold placeholder:text-[#8E92A4]/50 focus:outline-none"/>
        <input id="cfg-p${slotNum}-role" type="text" placeholder="Role (e.g. Creative / VFX)"
          class="h-7 px-3 rounded-full bg-[#1A1A24] text-[#B8BCCF] text-[11px] placeholder:text-[#8E92A4]/50 focus:outline-none"/>
      </div>
    `;
  }).join('');

  const wrapper = document.createElement('div');
  wrapper.id = 'crm-shared-modals-root';
  wrapper.innerHTML = `
    <div id="crm-pin-login-modal" class="hidden"></div>
    <div id="crm-activity-log-modal" class="hidden"></div>

    
    <!-- WHATSAPP CRM COMMAND CENTER & QUICK DISPATCH MODAL -->
    <div id="crm-whatsapp-command-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-md" onclick="closeModal('crm-whatsapp-command-modal')"></div>
      <div class="relative w-full max-w-2xl neo-modal p-6 z-10 flex flex-col gap-4 my-8">
        <div class="flex items-center justify-between pb-2 border-b border-white/10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#25D366] text-[#051B11] flex items-center justify-center shadow-[0_0_15px_rgba(37,211,102,0.4)]">
              <span class="material-symbols-outlined text-[22px] font-bold">chat</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full bg-[#25D366]/15 text-[#25D366] font-label-code text-[10px] font-bold uppercase tracking-wider">Studio WhatsApp CRM</span>
                <span id="wa-cmd-sla-badge"></span>
              </div>
              <h3 class="text-lg font-semibold text-white mt-0.5">Quick Dispatch, Video Delivery &amp; SLA Follow-ups</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('crm-whatsapp-command-modal')" class="w-8 h-8 rounded-full bg-[#232433] text-[#8E92A4] hover:text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div class="sm:col-span-7 flex flex-col gap-1">
            <label class="text-[10px] uppercase font-bold text-slate-400">Select Client Deal</label>
            <select id="wa-cmd-client-select" onchange="handleWhatsAppCmdClientChange(this.value)"
              class="w-full h-10 px-3 rounded-xl bg-black/40 border border-white/10 text-white font-label-code text-xs focus:outline-none focus:border-emerald-400"></select>
          </div>

          <div class="sm:col-span-5 flex flex-col gap-1">
            <label class="text-[10px] uppercase font-bold text-slate-400">WhatsApp Phone (with Country Code)</label>
            <input id="wa-cmd-phone" type="tel" placeholder="+91 9876543210"
              class="w-full h-10 px-3 rounded-xl bg-black/40 border border-white/10 text-[#34D399] font-label-code text-xs font-bold focus:outline-none focus:border-emerald-400"/>
          </div>
        </div>

                <!-- PHASE 2: 24/7 AUTOMATION & LIVE HEADLESS BRIDGE -->
        <p class="wa-help chat-bridge-chip"></p>

        <!-- Video Cut & Heavy Cloud Drive Links Panel -->
        <div class="p-3 rounded-xl bg-black/30 border border-indigo-500/20 flex flex-col gap-2">
          <div class="flex items-center justify-between text-[11px]">
            <span class="font-bold text-indigo-300 flex items-center gap-1">
              <span class="material-symbols-outlined text-[15px]">video_file</span>
              <span>Heavy Video &amp; Google Drive Links</span>
            </span>
            <select id="wa-cmd-cut-version" class="h-6 px-2 rounded-lg bg-black/50 border border-indigo-500/30 text-indigo-200 font-label-code text-[10px]">
              <option value="v1.0 First Cut">v1.0 First Cut</option>
              <option value="v1.1 Client Revisions">v1.1 Revisions</option>
              <option value="v1.2 Sound & Color Pass">v1.2 Sound & Color</option>
              <option value="Final Master 4K">Final Master 4K</option>
            </select>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <input id="wa-cmd-drive-url" type="url" placeholder="Google Drive / Dropbox Folder URL"
              class="h-8 px-2.5 rounded-lg bg-black/50 border border-white/10 text-slate-200 font-label-code text-[11px] focus:outline-none focus:border-indigo-400"/>
            <input id="wa-cmd-preview-url" type="url" placeholder="Fast Stream Preview URL (Vimeo/Loom/Drive MP4)"
              class="h-8 px-2.5 rounded-lg bg-black/50 border border-white/10 text-slate-200 font-label-code text-[11px] focus:outline-none focus:border-indigo-400"/>
          </div>
        </div>

        <!-- Send from -->
        <details class="wa-panel wa-collapsible">
          <summary class="wa-panel-title">Send from</summary>
          <div class="wa-field-row">
            <select id="wa-cmd-sender" class="wa-input wa-sender-select" onchange="setActiveSender(this.value)"></select>
            <button type="button" class="wa-paste" onclick="openSendersEditor()">Manage</button>
          </div>
          <p class="wa-help wa-sender-help"></p>
        </details>

        <!-- Conversation tracking -->
        <details class="wa-panel wa-collapsible" open>
          <summary class="wa-panel-title">Conversation with this client</summary>
          <div id="wa-cmd-thread" class="wa-thread"></div>
          <div class="flex flex-wrap gap-1.5 items-center">
            <button type="button" onclick="logWaReplyFromModal()" class="wa-chip wa-chip-accent">Log a reply I received</button>
            <span id="wa-bridge-status" class="wa-help"></span>
          </div>
        </details>

        <!-- Links: portfolio, reference, with paste buttons -->
        <details class="wa-panel wa-collapsible">
          <summary class="wa-panel-title">Add links to the message</summary>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div class="wa-field-row">
              <input id="wa-cmd-portfolio-url" type="url" placeholder="Your portfolio link" onchange="savePortfolioLink()" class="wa-input"/>
              <button type="button" class="wa-paste" onclick="pasteIntoField('wa-cmd-portfolio-url'); setTimeout(savePortfolioLink, 150)">Paste</button>
            </div>
            <div class="wa-field-row">
              <input id="wa-cmd-reference-url" type="url" placeholder="Reference or website link" onchange="applyWhatsAppCmdTemplate(loadWaPrefs_().lastType||'welcome')" class="wa-input"/>
              <button type="button" class="wa-paste" onclick="pasteIntoField('wa-cmd-reference-url'); setTimeout(()=>applyWhatsAppCmdTemplate(loadWaPrefs_().lastType||'welcome'),150)">Paste</button>
            </div>
            <div class="wa-field-row">
              <button type="button" class="wa-paste" onclick="pasteIntoField('wa-cmd-drive-url'); setTimeout(()=>applyWhatsAppCmdTemplate(loadWaPrefs_().lastType||'welcome'),150)">Paste Drive link</button>
            </div>
            <div class="wa-field-row">
              <button type="button" class="wa-paste" onclick="pasteIntoField('wa-cmd-preview-url'); setTimeout(()=>applyWhatsAppCmdTemplate(loadWaPrefs_().lastType||'welcome'),150)">Paste preview link</button>
            </div>
          </div>
        </details>

        <!-- Who are you writing to? -->
        <div class="flex flex-col gap-1.5">
          <div class="wa-panel-title">Who are you writing to?</div>
          <div class="flex flex-wrap gap-1.5">
            <button type="button" data-wa-tone="genz" onclick="setWaTone('genz')" class="wa-chip">Gen Z / Creator</button>
            <button type="button" data-wa-tone="ceo" onclick="setWaTone('ceo')" class="wa-chip">Founder / CEO</button>
            <button type="button" data-wa-tone="pro" onclick="setWaTone('pro')" class="wa-chip">Professional</button>
            <button type="button" data-wa-tone="friendly" onclick="setWaTone('friendly')" class="wa-chip">Warm &amp; Friendly</button>
          </div>
        </div>

        <!-- Message type -->
        <div class="flex flex-col gap-1.5">
          <div class="wa-panel-title">What are you sending?</div>
          <div class="flex flex-wrap gap-1.5">
            <button type="button" data-wa-type="pitch" onclick="applyWhatsAppCmdTemplate('pitch')" class="wa-chip">Introduce our studio</button>
            <button type="button" data-wa-type="welcome" onclick="applyWhatsAppCmdTemplate('welcome')" class="wa-chip">Kickoff</button>
            <button type="button" data-wa-type="video_cut" onclick="applyWhatsAppCmdTemplate('video_cut')" class="wa-chip">Video ready</button>
            <button type="button" data-wa-type="payment_request" onclick="applyWhatsAppCmdTemplate('payment_request')" class="wa-chip">Payment request</button>
            <button type="button" data-wa-type="follow_up" onclick="applyWhatsAppCmdTemplate('follow_up')" class="wa-chip">Follow-up</button>
            <button type="button" onclick="generateAiCmdDraft()" class="wa-chip wa-chip-accent">Auto-pick for this client</button>
          </div>
        </div>

        <!-- Refine with Claude or Gemini -->
        <details class="wa-panel wa-collapsible">
          <summary class="wa-panel-title">Make it better with AI</summary>
          <p class="wa-help">Pick a tone above. Then send your message to Claude or Gemini to polish it. The prompt is copied for you. When the AI replies, copy its answer and press Paste AI reply.</p>
          <div class="flex flex-wrap gap-1.5">
            <button type="button" onclick="refineWithAi('claude')" class="wa-chip">Refine with Claude</button>
            <button type="button" onclick="refineWithAi('gemini')" class="wa-chip">Refine with Gemini</button>
            <button type="button" onclick="pasteAiReply()" class="wa-chip wa-chip-accent">Paste AI reply</button>
          </div>
          <p id="wa-ai-hint" class="wa-hint hidden"></p>
        </details>

        <!-- Editable Message Area -->
        <div class="flex flex-col gap-1">
          <label class="text-[10px] uppercase font-bold text-slate-400">Your message (you can edit it before sending)</label>
          <textarea id="wa-cmd-draft" rows="6" oninput="updateWaPreview()"
            class="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-emerald-400 resize-none leading-relaxed"></textarea>
        
          <div class="wa-preview-label">What your client will see</div>
          <div id="wa-cmd-preview" class="wa-bubble" aria-live="polite"></div>
          <p id="wa-cmd-note" class="wa-help hidden"></p>
        </div>

        <div class="wa-footer flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
          <button type="button" onclick="openCommandChatWindow()" class="wa-chip wa-chip-accent">Open chat window</button>
          <button type="button" onclick="sendWaDraftByEmail()" class="wa-chip">Send by email</button>
          <button type="button" onclick="copyWhatsAppCmdDraft()"
            class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-label-code text-xs font-semibold flex items-center gap-1.5 transition">
            <span class="material-symbols-outlined text-[15px]">content_copy</span>
            <span>Copy Message</span>
          </button>
          <button type="button" onclick="sendWhatsAppCmdDispatch()"
            class="px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#051B11] font-label-code text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)] transition cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">send</span>
            <span>Launch WhatsApp Web / App 🚀</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 1. WHATSAPP DAILY REPORT PUSH MODAL -->
    <div id="crm-whatsapp-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-md" onclick="closeModal('crm-whatsapp-modal')"></div>
      <div class="relative w-full max-w-xl neo-modal p-6 z-10 flex flex-col gap-4 my-8">
        <div class="flex items-center justify-between pb-2">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#34D399] text-[#051B11] flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px] font-bold">chat</span>
            </div>
            <div>
              <span class="px-2.5 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-[10px] font-bold">WHATSAPP CLICK-TO-CHAT REPORT</span>
              <h3 class="text-lg font-semibold text-white mt-0.5">WhatsApp Daily CRM Report Push</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('crm-whatsapp-modal')" class="w-8 h-8 rounded-full bg-[#232433] text-[#8E92A4] hover:text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onsubmit="sendWhatsAppReportFromModal(event)" class="flex flex-col gap-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Destination WhatsApp Number *</label>
              <input id="wa-report-phone" type="text" required placeholder="e.g. 919876543210 (with country code)"
                class="h-10 px-4 rounded-full bg-[#12121A] text-white font-label-code text-xs font-bold focus:outline-none"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Optional Daily Targets / Note</label>
              <input id="wa-report-daily-note" type="text" oninput="refreshWhatsAppPreviewText()" placeholder="e.g. Deliver 2 sample cuts before 6 PM"
                class="h-10 px-4 rounded-full bg-[#12121A] text-white text-xs focus:outline-none"/>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Compiled Daily Report Preview (Editable)</label>
            <textarea id="wa-report-preview" rows="9"
              class="w-full p-4 rounded-[20px] bg-[#12121A] text-white font-label-code text-xs leading-relaxed focus:outline-none"></textarea>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-2">
            <button type="button" onclick="closeModal('crm-whatsapp-modal')" class="px-4 py-2 rounded-full bg-[#232433] text-[#B8BCCF] hover:text-white text-xs font-semibold">Cancel</button>
            <button type="submit" class="px-5 py-2.5 rounded-full bg-[#34D399] hover:bg-[#26FF9A] text-[#051B11] text-xs font-bold flex items-center gap-1.5 shadow-[0_6px_20px_rgba(0,255,135,0.3)]">
              <span class="material-symbols-outlined text-[16px]">send</span>
              <span>Open WhatsApp &amp; Send Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 2. DYNAMIC CLIENT PAYMENT / UPI QR CODE GENERATOR MODAL -->
    <div id="crm-upi-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-md" onclick="closeModal('crm-upi-modal')"></div>
      <div class="relative w-full max-w-2xl neo-modal p-6 z-10 flex flex-col gap-5 my-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#FBBF24] text-[#1F1B00] flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px] font-bold">qr_code_2</span>
            </div>
            <div>
              <span class="px-2.5 py-0.5 rounded-full bg-[#FBBF24]/15 text-[#FBBF24] font-label-code text-[10px] font-bold">INSTANT INR (₹) UPI COLLECTION</span>
              <h3 class="text-lg font-semibold text-white mt-0.5">Dynamic Client Payment / UPI QR Generator</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('crm-upi-modal')" class="w-8 h-8 rounded-full bg-[#232433] text-[#8E92A4] hover:text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <!-- Left Controls -->
          <div class="md:col-span-7 flex flex-col gap-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Studio UPI ID (Saved) *</label>
                <input id="upi-modal-vpa" type="text" placeholder="e.g. yourstudio@okaxis"
                  oninput="updateUpiQrCodeDisplay()"
                  class="h-10 px-4 rounded-full bg-[#12121A] text-[#34D399] font-label-code text-xs font-bold focus:outline-none"/>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">PayPal.me Link (Saved)</label>
                <input id="upi-modal-paypal" type="text" placeholder="e.g. https://paypal.me/YourStudio"
                  oninput="updateUpiQrCodeDisplay()"
                  class="h-10 px-4 rounded-full bg-[#12121A] text-[#60A5FA] font-label-code text-xs font-bold focus:outline-none"/>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Prefill From Client Deal</label>
                <select id="upi-modal-lead-select" onchange="handleUpiLeadSelectChange(this.value)"
                  class="h-10 px-4 rounded-full bg-[#12121A] text-white text-xs focus:outline-none"></select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">WhatsApp Number (+91 India 10-Digit)</label>
                <div class="flex items-center gap-1.5">
                  <span class="h-10 px-3 rounded-xl bg-[#12121A] text-[#2DD4BF] font-label-code text-xs font-bold flex items-center justify-center flex-shrink-0">+91</span>
                  <input id="upi-modal-whatsapp" type="text" placeholder="10-digit number (e.g. 9876543210)"
                    oninput="updateUpiQrCodeDisplay()"
                    class="w-full h-10 px-3.5 rounded-full bg-[#12121A] text-white font-label-code text-xs font-bold focus:outline-none"/>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Payment Amount in INR (₹) *</label>
              <input id="upi-modal-amount" type="number" step="any" min="1" value="25000"
                oninput="updateUpiQrCodeDisplay()"
                class="h-11 px-4 rounded-full bg-[#12121A] text-[#FBBF24] font-label-code text-base font-bold focus:outline-none"/>
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              <span class="text-[10px] uppercase tracking-wider text-[#8E92A4] mr-1">Quick Amounts:</span>
              <button type="button" onclick="setUpiPresetAmount(10000)" class="px-3 py-1 rounded-full bg-[#232433] hover:bg-[#2E3044] text-white font-label-code text-[11px]">₹10,000</button>
              <button type="button" onclick="setUpiPresetAmount(25000)" class="px-3 py-1 rounded-full bg-[#232433] hover:bg-[#2E3044] text-white font-label-code text-[11px]">₹25,000</button>
              <button type="button" onclick="setUpiPresetAmount(50000)" class="px-3 py-1 rounded-full bg-[#232433] hover:bg-[#2E3044] text-white font-label-code text-[11px]">₹50,000</button>
              <button type="button" onclick="setUpiPresetAmount(100000)" class="px-3 py-1 rounded-full bg-[#232433] hover:bg-[#2E3044] text-white font-label-code text-[11px]">₹1,00,000</button>
            </div>

            <div class="p-3 rounded-[16px] bg-[#12121A] flex items-center justify-between gap-2">
              <code id="upi-uri-string-preview" class="font-label-code text-[10px] text-[#8E92A4] truncate">upi://pay?pa=studio@upi&amp;cu=INR</code>
              <button type="button" onclick="copyUpiPaymentLink()" class="px-3 py-1 rounded-full bg-[#232433] hover:bg-[#34D399] text-white hover:text-[#051B11] text-[10px] font-bold flex-shrink-0 transition">Copy URI</button>
            </div>

            <!-- WhatsApp QR Push, PayPal & Native Web Share Action Buttons -->
            <div class="flex flex-col gap-2.5 pt-1">
              <button type="button" onclick="sendPaymentWithQrToWhatsApp()"
                class="w-full py-2.5 px-5 rounded-full btn-glass-mint text-xs font-semibold flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-[17px]">chat</span>
                <span>Send to WhatsApp (Copies QR Image + Click to Pay)</span>
              </button>
              <p id="upi-qr-clipboard-status" class="text-[11px] font-label-code text-slate-400 text-center">
                Tip: Clicking copies the QR Card image — press <strong class="text-emerald-300">Ctrl + V</strong> inside WhatsApp chat to attach the QR!
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button type="button" onclick="openPayPalPaymentLink()"
                  class="w-full py-2.5 px-5 rounded-full btn-glass-sky text-xs font-semibold flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-[16px]">payments</span>
                  <span>Open PayPal.me</span>
                </button>
                <button type="button" onclick="sharePaymentDetailsDirectly()"
                  class="w-full py-2.5 px-5 rounded-full btn-glass-amber text-xs font-semibold flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-[16px]">share</span>
                  <span>Share QR File &amp; Info</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Scannable QR Card -->
          <div class="md:col-span-5 p-5 rounded-[24px] bg-[#12121A] flex flex-col items-center justify-center text-center gap-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
            <span class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Scan with GPay • PhonePe • Paytm</span>
            <div class="p-3 rounded-[20px] bg-white shadow-lg">
              <img id="upi-qr-image" crossorigin="anonymous" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi%3A%2F%2Fpay" alt="UPI Payment QR Code" class="w-[180px] h-[180px] object-contain"/>
            </div>
            <span id="upi-qr-amount-badge" class="metric-thin-hero text-3xl text-[#34D399]">₹25,000</span>
            <span id="upi-qr-payee-badge" class="font-label-code text-[11px] text-[#B8BCCF] truncate max-w-full">beRich Creative Studio</span>
            <div class="flex flex-wrap items-center justify-center gap-2 pt-1 w-full">
              <button type="button" onclick="copyUpiQrImageToClipboard(true)"
                class="px-3 py-1.5 rounded-full btn-glass-neutral text-[11px] font-semibold flex items-center gap-1"
                title="Copy full branded QR Card PNG to paste (Ctrl+V) in WhatsApp">
                <span class="material-symbols-outlined text-[14px]">content_copy</span>
                <span>Copy QR Image</span>
              </button>
              <button type="button" onclick="downloadUpiQrCardImage()"
                class="px-3 py-1.5 rounded-full btn-glass-neutral text-[11px] font-semibold flex items-center gap-1"
                title="Download Branded UPI QR Card PNG">
                <span class="material-symbols-outlined text-[14px]">download</span>
                <span>Download QR</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. BULK CURRENCY CONVERTER MODAL (FOREIGN -> INR ₹) -->
    <div id="crm-currency-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-md" onclick="closeModal('crm-currency-modal')"></div>
      <div class="relative w-full max-w-4xl neo-modal p-6 z-10 flex flex-col gap-4 my-8">
        <div class="flex items-center justify-between pb-2">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#60A5FA]/20 text-[#60A5FA] flex items-center justify-center">
              <span class="material-symbols-outlined text-[22px]">currency_exchange</span>
            </div>
            <div>
              <span class="px-2.5 py-0.5 rounded-full bg-[#60A5FA]/15 text-[#60A5FA] font-label-code text-[10px] font-bold">BULK FOREIGN TO INR (₹) CONVERTER</span>
              <h3 class="text-lg font-semibold text-white mt-0.5">International Client Quote &amp; Bulk Currency Converter</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('crm-currency-modal')" class="w-8 h-8 rounded-full bg-[#232433] text-[#8E92A4] hover:text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div class="p-4 rounded-[20px] bg-[#13131C] flex flex-col gap-2">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Editable Exchange Rates (1 Foreign Unit = ₹ INR)</span>
            <button type="button" onclick="resetDefaultExchangeRates()" class="text-[11px] font-label-code text-[#34D399] hover:underline">Reset Default Rates (1 USD = ₹85)</button>
          </div>
          <div id="converter-rates-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-1"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div class="lg:col-span-5 flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Paste Foreign Quotes (One Per Line)</label>
              <select id="bulk-default-currency" onchange="runBulkCurrencyConversion()" class="h-8 px-3 rounded-full bg-[#13131C] text-white font-label-code text-xs">
                <option value="USD">Default: USD ($)</option>
                <option value="EUR">Default: EUR (€)</option>
                <option value="GBP">Default: GBP (£)</option>
                <option value="AED">Default: AED</option>
                <option value="CAD">Default: CAD (C$)</option>
                <option value="AUD">Default: AUD (A$)</option>
              </select>
            </div>
            <textarea id="bulk-converter-input" rows="8" oninput="runBulkCurrencyConversion()"
              placeholder="US Client Retainer - $1,500&#10;UK Commercial Edit - £800&#10;EU VFX Shot - €650&#10;Dubai Reel Package - 3500 AED"
              class="w-full p-4 rounded-[20px] bg-[#12121A] text-white font-label-code text-xs leading-relaxed focus:outline-none"></textarea>
          </div>

          <div class="lg:col-span-7 flex flex-col justify-between rounded-[20px] bg-[#12121A] overflow-hidden">
            <div class="overflow-x-auto max-h-[240px]">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="bg-[#1F202D] text-[#8E92A4] text-[10px] uppercase tracking-wider">
                    <th class="py-2.5 px-3">Deal / Item</th>
                    <th class="py-2.5 px-3">Foreign Amount</th>
                    <th class="py-2.5 px-3">Rate</th>
                    <th class="py-2.5 px-3 text-right">Converted INR (₹)</th>
                  </tr>
                </thead>
                <tbody id="bulk-converter-results-body"></tbody>
              </table>
            </div>
            <div class="p-4 bg-[#1F202D] flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-xs uppercase tracking-wider text-[#8E92A4]">Bulk Total in INR:</span>
                <span id="bulk-converter-count" class="px-2.5 py-0.5 rounded-full bg-[#12121A] text-[#8E92A4] font-label-code text-[11px]">0 items</span>
              </div>
              <div class="flex items-center gap-3">
                <span id="bulk-converter-total-inr" class="metric-thin-hero text-2xl text-[#34D399]">₹0</span>
                <button type="button" onclick="copyBulkConvertedINR()" class="px-4 py-2 rounded-full bg-[#34D399] text-[#051B11] text-xs font-bold flex items-center gap-1">
                  <span class="material-symbols-outlined text-[15px]">content_copy</span>
                  <span>Copy All in ₹</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. SUBMIT NEW DEAL / CLIENT LEAD MODAL -->
    <div id="crm-new-lead-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-md" onclick="closeModal('crm-new-lead-modal')"></div>
      <div class="relative w-full max-w-2xl neo-modal p-6 z-10 flex flex-col gap-4 my-8">
        <div class="flex items-center justify-between pb-1">
          <div>
            <span class="px-2.5 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-[10px] font-bold">NEW PIPELINE DEAL (INR ₹)</span>
            <h3 class="text-lg font-semibold text-white mt-1">Submit New Client Deal to CRM &amp; Google Sheets</h3>
          </div>
          <button type="button" onclick="closeModal('crm-new-lead-modal')" class="w-8 h-8 rounded-full bg-[#232433] text-[#8E92A4] hover:text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <form id="new-lead-form" onsubmit="handleNewLeadSubmit(event)" class="flex flex-col gap-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Client / Brand Name *</label>
              <input id="new-lead-name" type="text" required placeholder="e.g. Acme Studios" class="h-10 px-4 rounded-full bg-[#12121A] text-white text-xs focus:outline-none"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Brand Handle</label>
              <input id="new-lead-handle" type="text" placeholder="@acmestudios" class="h-10 px-4 rounded-full bg-[#12121A] text-white font-label-code text-xs focus:outline-none"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Client Email *</label>
              <input id="new-lead-email" type="email" required placeholder="client@brand.com" class="h-10 px-4 rounded-full bg-[#12121A] text-white font-label-code text-xs focus:outline-none"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">WhatsApp Number</label>
              <input id="new-lead-phone" type="tel" placeholder="+91 9876543210" class="h-10 px-4 rounded-full bg-[#12121A] text-[#34D399] font-label-code text-xs focus:outline-none"/>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Country</label>
              <select id="new-lead-country" class="h-10 px-4 rounded-full bg-[#12121A] text-white text-xs">
                <option value="🇮🇳 IN">🇮🇳 India</option>
                <option value="🇺🇸 US">🇺🇸 United States</option>
                <option value="🇬🇧 UK">🇬🇧 United Kingdom</option>
                <option value="🇦🇪 UAE">🇦🇪 UAE (Dubai)</option>
                <option value="🇨🇦 CA">🇨🇦 Canada</option>
                <option value="🇩🇪 DE">🇩🇪 Germany / EU</option>
                <option value="🇦🇺 AU">🇦🇺 Australia</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Creative Service</label>
              <input id="new-lead-service" type="text" required value="Vertical Video Ads (Reels)" class="h-10 px-4 rounded-full bg-[#12121A] text-white text-xs"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Outreach Source</label>
              <select id="new-lead-source" class="h-10 px-4 rounded-full bg-[#12121A] text-white text-xs">
                <option value="Instagram DM">Instagram DM</option>
                <option value="Cold Email">Cold Email</option>
                <option value="LinkedIn DM">LinkedIn DM</option>
                <option value="Upwork Enterprise">Upwork Enterprise</option>
                <option value="X/Twitter Inbound">X/Twitter Inbound</option>
              </select>
            </div>
          </div>

          <div class="p-4 rounded-[20px] bg-[#13131C] flex flex-col gap-2.5">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-[10px] uppercase tracking-[0.14em] text-[#34D399] font-semibold">Deal Quote &amp; Auto-INR Currency Switch</span>
              <span id="new-lead-conversion-badge" class="px-3 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-xs font-bold">Project Value: ₹50,000</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div class="flex flex-col gap-1">
                <label class="text-[10px] uppercase text-[#8E92A4]">Quote Currency</label>
                <select id="new-lead-currency" onchange="updateNewLeadMarginPreview()" class="h-9 px-3 rounded-full bg-[#1F202D] text-[#FBBF24] font-label-code text-xs font-bold">
                  <option value="INR">INR (₹ Rupee)</option>
                  <option value="USD">USD ($ Dollar)</option>
                  <option value="EUR">EUR (€ Euro)</option>
                  <option value="GBP">GBP (£ Pound)</option>
                  <option value="AED">AED (Dirham)</option>
                  <option value="CAD">CAD (C$ Dollar)</option>
                  <option value="AUD">AUD (A$ Dollar)</option>
                </select>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] uppercase text-[#8E92A4]">Quoted Amount *</label>
                <input id="new-lead-value" type="number" step="any" required value="50000" oninput="updateNewLeadMarginPreview()" class="h-9 px-3 rounded-full bg-[#1F202D] text-white font-label-code font-bold text-xs"/>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] uppercase text-[#8E92A4]">Est. Edit Hours</label>
                <input id="new-lead-hours" type="number" step="0.5" value="15" oninput="updateNewLeadMarginPreview()" class="h-9 px-3 rounded-full bg-[#1F202D] text-white font-label-code text-xs"/>
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] uppercase text-[#8E92A4]">Labor Rate (₹/hr)</label>
                <input id="new-lead-rate" type="number" step="100" value="1000" oninput="updateNewLeadMarginPreview()" class="h-9 px-3 rounded-full bg-[#1F202D] text-white font-label-code text-xs"/>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Assigned Partner (Credited 100%)</label>
              <select id="new-lead-partner" class="h-10 px-4 rounded-full bg-[#12121A] text-[#34D399] font-semibold text-xs"></select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Project Stage</label>
              <select id="new-lead-stage" class="h-10 px-4 rounded-full bg-[#12121A] text-white text-xs">
                <option value="Identified">Identified</option>
                <option value="In Discussion">In Discussion</option>
                <option value="Sample Cut">Sample Cut</option>
                <option value="Approved">Approved</option>
                <option value="Closed Won">Closed Won</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Sample Cut Status</label>
              <select id="new-lead-sample" class="h-10 px-4 rounded-full bg-[#12121A] text-white text-xs">
                <option value="Free Sample: Pending">Free Sample: Pending</option>
                <option value="Free Sample: Delivered">Free Sample: Delivered</option>
                <option value="Paid Sample: In Review">Paid Sample: In Review</option>
                <option value="Sample Approved">Sample Approved</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Frame.io / Google Drive Sample URL</label>
            <input id="new-lead-sample-url" type="url" value="https://frame.io/" class="h-10 px-4 rounded-full bg-[#12121A] text-white font-label-code text-xs"/>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
            <div class="sm:col-span-8 flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Tools Used (From Your Tech Stack — Optional)</label>
              <div id="new-lead-tools-checkboxes" class="flex flex-wrap gap-2 p-3 rounded-[18px] bg-slate-50 border border-slate-200"></div>
            </div>
            <div class="sm:col-span-4 flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#FBBF24] font-semibold">Custom Tool Burn ₹ (Now or At Last)</label>
              <input id="new-lead-custom-tool-cost" type="number" step="50" min="0" placeholder="Optional ₹0 (or set at last)"
                oninput="updateNewLeadMarginPreview()"
                class="h-10 px-4 rounded-full bg-[#12121A] text-[#FBBF24] font-label-code text-xs font-bold focus:outline-none"/>
            </div>
          </div>

          <div class="p-3.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 flex flex-wrap items-center justify-between gap-2 px-5 font-label-code text-xs">
            <span>Gross: <strong id="new-lead-preview-gross" class="text-slate-900 font-bold">₹50,000</strong></span>
            <span>Labor: <strong id="new-lead-preview-labor" class="text-slate-600 font-bold">-₹15,000</strong></span>
            <span>Tools: <strong id="new-lead-preview-tools" class="text-[#FBBF24]">-₹0</strong></span>
            <span>Net Profit: <strong id="new-lead-preview-profit" class="text-[#34D399]">+₹35,000</strong></span>
            <span id="new-lead-preview-margin" class="px-3 py-0.5 rounded-full bg-[#34D399] text-[#051B11] font-bold">70% Net Margin</span>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-2">
            <button type="button" onclick="closeModal('crm-new-lead-modal')" class="px-4 py-2 rounded-full bg-[#232433] text-[#B8BCCF] hover:text-white text-xs font-semibold">Cancel</button>
            <button id="new-lead-submit-btn" type="submit" class="px-5 py-2.5 rounded-full bg-[#34D399] hover:bg-[#26FF9A] text-[#051B11] text-xs font-bold flex items-center gap-1.5 shadow-[0_6px_20px_rgba(0,255,135,0.3)]">
              <span class="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Submit Deal in ₹ to CRM &amp; Sheet</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 5. EMAIL AUTOMATION MODAL -->
    <div id="crm-email-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-md" onclick="closeModal('crm-email-modal')"></div>
      <div class="relative w-full max-w-lg neo-modal p-6 z-10 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <div>
            <span id="email-modal-badge" class="px-2.5 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-[10px] font-bold">EMAIL AUTOMATION</span>
            <h3 id="email-modal-title" class="text-lg font-semibold text-white mt-1">Send Client Email via Gmail</h3>
          </div>
          <button type="button" onclick="closeModal('crm-email-modal')" class="w-8 h-8 rounded-full bg-[#232433] text-[#8E92A4] hover:text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <form id="email-modal-form" onsubmit="handleSendEmailSubmit(event)" class="flex flex-col gap-3">
          <input type="hidden" id="email-modal-lead-id"/>
          <input type="hidden" id="email-modal-type"/>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Client Brand</label>
              <input id="email-modal-client-name" type="text" required class="h-10 px-4 rounded-full bg-[#12121A] text-white text-xs focus:outline-none"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Recipient Email (Gmail To:)</label>
              <input id="email-modal-client-email" type="email" required class="h-10 px-4 rounded-full bg-[#12121A] text-white font-label-code text-xs focus:outline-none"/>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Sending Partner</label>
              <select id="email-modal-partner" onchange="updateEmailSignaturePreview()" class="h-10 px-4 rounded-full bg-[#12121A] text-white text-xs focus:outline-none"></select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Sample / Reel Link</label>
              <input id="email-modal-sample-url" type="url" required class="h-10 px-4 rounded-full bg-[#12121A] text-[#60A5FA] font-label-code text-xs focus:outline-none"/>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Email Message Note</label>
            <textarea id="email-modal-note" rows="3" class="p-4 rounded-[18px] bg-[#12121A] text-white text-xs focus:outline-none"></textarea>
          </div>
          <div class="px-4 py-2 rounded-full bg-[#13131C] flex items-center justify-between text-[11px] font-label-code">
            <span class="text-[#8E92A4]">Automated Signature:</span>
            <span id="email-modal-signature-preview" class="text-[#34D399] font-semibold">Partner 1 — beRich Creative Studio</span>
          </div>
          <div class="flex items-center justify-end gap-2.5 pt-2">
            <button type="button" onclick="closeModal('crm-email-modal')" class="px-4 py-2 rounded-full bg-[#232433] text-[#B8BCCF] hover:text-white text-xs font-semibold">Cancel</button>
            <button id="email-modal-submit-btn" type="submit" class="px-5 py-2.5 rounded-full bg-[#34D399] hover:bg-[#26FF9A] text-[#051B11] text-xs font-bold flex items-center gap-1.5 shadow-[0_6px_20px_rgba(0,255,135,0.3)]">
              <span class="material-symbols-outlined text-[16px]">send</span>
              <span>Send via MailApp.sendEmail()</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 6. 10-PARTNER CONFIGURATION, BRANDING, UPI & GOOGLE SHEET API MODAL -->
    <div id="crm-api-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-md" onclick="closeModal('crm-api-modal')"></div>
      <div class="relative w-full max-w-4xl neo-modal p-6 z-10 flex flex-col gap-5 my-8 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between">
          <div>
            <span class="px-2.5 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-[10px] font-bold">UP TO 10 PARTNERS • NAME-CENTRIC REVENUE • STUDIO CONFIG</span>
            <h3 class="text-xl font-semibold text-white mt-1">Configure Studio Branding, Up to 10 Partners &amp; Integrations</h3>
          </div>
          <button type="button" onclick="closeModal('crm-api-modal')" class="w-8 h-8 rounded-full bg-[#232433] text-[#8E92A4] hover:text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Studio Branding + UPI + PayPal + WhatsApp -->
        <div class="p-4 rounded-[20px] bg-[#13131C] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Agency / Studio Name</label>
            <input id="cfg-agency-name" type="text" placeholder="e.g. beRich"
              class="h-9 px-3.5 rounded-full bg-[#1F202D] text-white text-xs font-bold focus:outline-none"/>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Studio Tagline / Subtitle</label>
            <input id="cfg-agency-tagline" type="text" placeholder="e.g. Creative Studio"
              class="h-9 px-3.5 rounded-full bg-[#1F202D] text-[#34D399] font-label-code text-xs focus:outline-none"/>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Studio UPI ID (For QR)</label>
            <input id="cfg-studio-upi" type="text" placeholder="e.g. studio@okaxis"
              class="h-9 px-3.5 rounded-full bg-[#1F202D] text-[#FBBF24] font-label-code text-xs focus:outline-none"/>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">PayPal.me Link</label>
            <input id="cfg-studio-paypal" type="text" placeholder="e.g. https://paypal.me/YourStudio"
              class="h-9 px-3.5 rounded-full bg-[#1F202D] text-[#60A5FA] font-label-code text-xs focus:outline-none"/>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">WhatsApp Report Number</label>
            <input id="cfg-studio-whatsapp" type="text" placeholder="e.g. 919876543210"
              class="h-9 px-3.5 rounded-full bg-[#1F202D] text-[#60A5FA] font-label-code text-xs focus:outline-none"/>
          </div>
        </div>

        <!-- 10-Partner Slots (Name & Role only — No percentages, empty slots hidden) -->
        <div class="flex flex-col gap-2">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-[10px] uppercase tracking-[0.14em] text-[#34D399] font-semibold">Configure Up to 10 Partners (Name &amp; Role Only — Unused / Blank Slots Are Hidden)</span>
            <span class="text-[11px] font-label-code text-[#8E92A4]">Revenue is credited 100% name-centrically per assigned deal</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            ${partnerConfigSlotsHtml}
          </div>
        </div>

        <!-- Free GitHub JSON Database Sync Configuration (Real-Time Multi-Device State) -->
        <div class="p-4 rounded-[20px] bg-[#13131C] flex flex-col gap-3 border border-teal-400/20">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse"></span>
              <span class="text-[11px] uppercase tracking-[0.14em] text-[#34D399] font-bold">Free Cloud Database Sync (Database Security Key & Location)</span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <button type="button" onclick="fetchFromGitHubDatabase(true, false)" class="px-3 py-1 rounded-full btn-glass-sky text-[11px] font-semibold">
                <span class="material-symbols-outlined text-[14px]">cloud_download</span>
                <span>Pull from GitHub</span>
              </button>
              <button type="button" onclick="pushToGitHubDatabase('Manual Studio Sync').then(r => showCRMToast(r.status==='success' ? 'Committed & pushed to GitHub!' : (r.message||'Check PAT'), r.status==='success'?'cloud_done':'info'))" class="px-3 py-1 rounded-full btn-glass-mint text-[11px] font-semibold">
                <span class="material-symbols-outlined text-[14px]">cloud_upload</span>
                <span>Commit &amp; Push to GitHub</span>
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            <div class="lg:col-span-2 flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#FBBF24] font-semibold">Database Security Key</label>
              <input id="cfg-gh-token" type="password" placeholder="ghp_... or github_pat_... (Saved locally)"
                class="h-9 px-3.5 rounded-full bg-[#1F202D] text-[#FBBF24] font-label-code text-xs focus:outline-none"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Database Location Owner</label>
              <input id="cfg-gh-owner" type="text" placeholder="e.g. koushik018"
                class="h-9 px-3.5 rounded-full bg-[#1F202D] text-white font-label-code text-xs focus:outline-none"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Database Location Name</label>
              <input id="cfg-gh-repo" type="text" placeholder="e.g. Agency-CRM"
                class="h-9 px-3.5 rounded-full bg-[#1F202D] text-white font-label-code text-xs focus:outline-none"/>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">JSON File Path</label>
              <input id="cfg-gh-path" type="text" placeholder="e.g. crm-data.json"
                class="h-9 px-3.5 rounded-full bg-[#1F202D] text-[#60A5FA] font-label-code text-xs focus:outline-none"/>
            </div>
          </div>
          <p class="text-[10px] text-[#94A3B8]">
            Uses <code class="text-[#2DD4BF]">GET / PUT https://api.github.com/repos/{owner}/{repo}/contents/{path}</code>. Every deal, card move, tool subscription, and audit log entry commits directly to your repo in real time.
          </p>
        </div>

                <!-- Admin-Only Partner PIN Reset Section -->
        <div id="admin-pin-reset-section" class="hidden p-4 rounded-[20px] bg-[#1A1317] border border-[#FF6B8B]/30 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full bg-[#FF6B8B]/15 text-[#FF6B8B] flex items-center justify-center">
                <span class="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              </div>
              <div>
                <span class="px-2 py-0.5 rounded-full bg-[#FF6B8B]/15 text-[#FF6B8B] font-label-code text-[10px] font-bold">ADMIN ONLY — KOUSHIK</span>
                <h4 class="text-sm font-semibold text-white mt-0.5">Reset Partner Security PINs</h4>
              </div>
            </div>
          </div>
          <p class="text-xs text-[#94A3B8]">
            If Bhargav or Kiran forget their 4-digit PIN, click Reset below. They will be prompted to create a fresh 4-digit PIN on their next login.
          </p>
          <div id="admin-pin-reset-partner-list" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5"></div>
        </div>

        <!-- Deployed Google Apps Script Web App URL (Secondary Backup) -->
        <div class="flex flex-col gap-1">
          <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Deployed Google Apps Script Web App URL (Optional Secondary Backup)</label>
          <input id="crm-api-url-input" type="url" value="${escapeHtml(crmState.apiUrl)}"
            class="h-10 px-4 rounded-full bg-[#12121A] text-white font-label-code text-xs focus:outline-none"/>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2">
          <button type="button" onclick="wipeAllLocalDataCleanSlate()" class="px-4 py-2 rounded-full bg-[#4C1323] text-[#FF6B8B] text-xs font-semibold">Wipe Local Data (Clean Slate)</button>
          <div class="flex items-center gap-2.5">
            <button type="button" onclick="closeModal('crm-api-modal')" class="px-4 py-2 rounded-full bg-[#232433] text-[#B8BCCF] hover:text-white text-xs font-semibold">Close</button>
            <button type="button" onclick="savePartnerAndApiSettings()" class="px-5 py-2.5 rounded-full bg-[#34D399] hover:bg-[#26FF9A] text-[#051B11] text-xs font-bold flex items-center gap-1.5 shadow-[0_6px_20px_rgba(0,255,135,0.3)]">
              <span class="material-symbols-outlined text-[16px]">save</span>
              <span>Save Partners, GitHub DB &amp; Sync</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 7. SECURE STUDIO LOGIN & IDENTITY MODAL -->
    <div id="crm-user-identity-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/85 backdrop-blur-xl" onclick="if(crmState.currentUser) closeModal('crm-user-identity-modal')"></div>
      <div class="relative w-full max-w-md neo-modal p-6 z-10 flex flex-col gap-4 my-8 border border-emerald-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#34D399]/15 text-[#34D399] flex items-center justify-center">
              <span class="material-symbols-outlined text-[22px]">shield_person</span>
            </div>
            <div>
              <span class="px-2.5 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-[10px] font-bold">SECURE STUDIO LOGIN</span>
              <h3 id="identity-modal-heading" class="text-lg font-semibold text-white mt-0.5">Select Partner Profile</h3>
            </div>
          </div>
          <button id="identity-modal-x-btn" type="button" onclick="closeModal('crm-user-identity-modal')" class="w-8 h-8 rounded-full bg-[#232433] text-[#8E92A4] hover:text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p id="identity-modal-subtext" class="text-xs text-[#94A3B8] leading-relaxed">
          Choose your studio partner profile to log in securely with your private 4-digit PIN.
        </p>

        <!-- STEP 1: SELECT PARTNER -->
        <div id="login-step-select-partner" class="flex flex-col gap-3">
          <span class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Active Studio Partners:</span>
          <div id="identity-quick-partner-pills" class="grid grid-cols-1 sm:grid-cols-2 gap-2"></div>
          
          <div class="pt-2 border-t border-white/5 flex flex-col gap-1.5">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Or Enter Custom Name</label>
            <div class="flex gap-2">
              <input id="studio-user-name-input" type="text" placeholder="Enter custom name..."
                class="flex-1 h-10 px-4 rounded-full bg-[#12121A] text-white font-semibold text-xs focus:outline-none border border-white/10"/>
              <button type="button" onclick="selectPartnerForLogin(document.getElementById('studio-user-name-input').value)"
                class="px-4 py-2 rounded-full btn-glass-neutral text-xs font-semibold">Continue</button>
            </div>
          </div>

          <!-- Setup Database Key Link for New Devices -->
          <div class="pt-2.5 border-t border-white/5 flex items-center justify-center">
            <button type="button" onclick="showLoginDbKeySetup()" class="text-xs text-[#2DD4BF] hover:text-[#34D399] transition-colors flex items-center gap-1.5 py-1 font-semibold">
              <span>🔌</span>
              <span class="underline">Setup Database Key (New Device)</span>
            </button>
          </div>
        </div>

        <!-- STEP 2: PIN ENTRY / PIN CREATION -->
        <div id="login-step-enter-pin" class="hidden flex flex-col gap-3">
          <div class="p-3 rounded-2xl bg-[#12121A] border border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse"></span>
              <div>
                <span class="text-[10px] uppercase tracking-[0.12em] text-[#8E92A4] font-bold">Selected Partner:</span>
                <div id="login-selected-partner-name" class="text-sm font-bold text-white"></div>
              </div>
            </div>
            <button type="button" onclick="backToPartnerSelection()" class="text-xs text-[#2DD4BF] hover:underline flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">swap_horiz</span>
              <span>Change</span>
            </button>
          </div>

          <div id="login-pin-prompt-box" class="flex flex-col gap-1.5">
            <label id="login-pin-label" class="text-[10px] uppercase tracking-[0.14em] text-[#FBBF24] font-semibold">Enter 4-Digit PIN</label>
            <input id="login-pin-input" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="4" placeholder="• • • •"
              class="h-12 px-4 rounded-xl bg-[#12121A] text-center text-2xl tracking-[0.4em] font-mono font-bold text-[#34D399] border border-white/20 focus:outline-none focus:border-[#34D399]"
              onkeydown="if(event.key==='Enter') submitPartnerPinLogin()"/>
            <span id="login-pin-hint" class="text-[11px] text-[#94A3B8]">Enter your 4 numbers to access your studio profile.</span>
          </div>

          <!-- Error Alert Banner -->
          <div id="login-pin-error-banner" class="hidden p-2.5 rounded-xl bg-[#4C1323] border border-[#FF6B8B]/40 text-[#FF6B8B] text-xs flex items-center gap-2">
            <span class="material-symbols-outlined text-[16px]">error</span>
            <span id="login-pin-error-text">Incorrect PIN. Please try again or ask admin (koushik) to reset it.</span>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button id="identity-modal-cancel-btn" type="button" onclick="closeModal('crm-user-identity-modal')" class="px-4 py-2 rounded-full btn-glass-neutral text-xs">Cancel</button>
            <button id="login-pin-submit-btn" type="button" onclick="submitPartnerPinLogin()" class="px-6 py-2.5 rounded-full btn-glass-mint text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,255,135,0.25)]">
              <span class="material-symbols-outlined text-[16px]">lock_open</span>
              <span id="login-pin-submit-text">Verify &amp; Enter</span>
            </button>
          </div>

          <div class="pt-2 border-t border-white/5 flex items-center justify-center">
            <button type="button" onclick="showLoginDbKeySetup()" class="text-[11px] text-[#8E92A4] hover:text-[#2DD4BF] transition-colors flex items-center gap-1 py-0.5">
              <span>🔌</span>
              <span class="underline">Setup Database Key (New Device)</span>
            </button>
          </div>
        </div>

        <!-- STEP 3: DATABASE SECURITY KEY VIEW (NEW DEVICE SETUP) -->
        <div id="login-step-setup-key" class="hidden flex flex-col gap-3">
          <div class="p-3.5 rounded-2xl bg-[#12121A] border border-teal-500/20 flex flex-col gap-1.5">
            <div class="flex items-center gap-2 text-[#34D399] font-semibold text-xs">
              <span class="material-symbols-outlined text-[16px]">vpn_key</span>
              <span>Connect to Studio Cloud Database</span>
            </div>
            <p class="text-[11px] text-[#94A3B8] leading-relaxed">
              Paste the studio's Database Security Key (GitHub PAT) below to download current projects, partner profiles, and security PINs to this device.
            </p>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#FBBF24] font-semibold">Database Security Key (GitHub PAT) *</label>
            <input id="login-db-token-input" type="password" placeholder="ghp_... or github_pat_..."
              class="h-11 px-4 rounded-xl bg-[#12121A] text-white font-mono text-xs focus:outline-none border border-white/10 focus:border-[#34D399]"
              onkeydown="if(event.key==='Enter') saveLoginDbKeyAndConnect()"/>
            <span class="text-[10px] text-[#8E92A4]">Saved securely to this browser's local storage.</span>
          </div>

          <!-- Status / Error Box -->
          <div id="login-db-key-status" class="hidden p-2.5 rounded-xl text-xs flex items-center gap-2"></div>

          <div class="flex items-center justify-between gap-2 pt-2">
            <button type="button" onclick="backToPartnerSelection()" class="px-4 py-2 rounded-full btn-glass-neutral text-xs font-semibold flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">arrow_back</span>
              <span>Back</span>
            </button>
            <button id="login-db-save-connect-btn" type="button" onclick="saveLoginDbKeyAndConnect()" class="px-5 py-2.5 rounded-full btn-glass-mint text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,255,135,0.25)]">
              <span class="material-symbols-outlined text-[16px]">cloud_download</span>
              <span id="login-db-save-connect-text">Save &amp; Connect</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 8. STUDIO ACTIVITY LEDGER MODAL (LIVE AUDIT TIMELINE) -->
    <div id="crm-activity-ledger-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-md" onclick="closeModal('crm-activity-ledger-modal')"></div>
      <div class="relative w-full max-w-3xl neo-modal p-6 z-10 flex flex-col gap-4 my-8 max-h-[88vh]">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#34D399]/15 text-[#34D399] flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">history</span>
            </div>
            <div>
              <span class="px-2.5 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-[10px] font-bold">REAL-TIME GITHUB AUDIT LOG</span>
              <h3 class="text-lg font-semibold text-white mt-0.5">Team History — Live History of Changes</h3>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button type="button" onclick="exportActivityLedger('csv')" class="px-3 py-1.5 rounded-full btn-glass-sky text-xs font-semibold">
              <span class="material-symbols-outlined text-[15px]">download</span>
              <span>Export CSV</span>
            </button>
            <button type="button" onclick="exportActivityLedger('json')" class="px-3 py-1.5 rounded-full btn-glass-neutral text-xs font-semibold">
              <span class="material-symbols-outlined text-[15px]">data_object</span>
              <span>Export JSON</span>
            </button>
            <button type="button" onclick="clearActivityLedger()" class="px-3 py-1.5 rounded-full bg-[#4C1323] text-[#FF6B8B] text-xs font-semibold">
              <span class="material-symbols-outlined text-[15px]">delete_sweep</span>
              <span>Clear Log</span>
            </button>
            <button type="button" onclick="closeModal('crm-activity-ledger-modal')" class="w-8 h-8 rounded-full bg-[#232433] text-[#8E92A4] hover:text-white flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <div data-activity-user-filters class="flex flex-wrap items-center gap-2"></div>

        <div data-activity-ledger-feed class="flex flex-col gap-2.5 overflow-y-auto pr-1 max-h-[56vh]"></div>
      </div>
    </div>

    <!-- 8B. UPGRADE SUBSCRIPTION PLAN MINI-MODAL -->
    <div id="crm-upgrade-tool-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/80 backdrop-blur-md" onclick="closeModal('crm-upgrade-tool-modal')"></div>
      <div class="relative w-full max-w-md neo-modal p-6 z-10 flex flex-col gap-4 my-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#34D399]/15 text-[#34D399] flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">trending_up</span>
            </div>
            <div>
              <span class="px-2.5 py-0.5 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-[10px] font-bold">TECH STACK PLAN UPGRADE</span>
              <h3 class="text-lg font-semibold text-white mt-0.5">Upgrade <span id="upgrade-tool-title-name" class="text-[#34D399]">Tool</span> Plan</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('crm-upgrade-tool-modal')" class="w-8 h-8 rounded-full bg-[#232433] text-[#8E92A4] hover:text-white flex items-center justify-center">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onsubmit="handleUpgradeToolSubmit(event)" class="flex flex-col gap-3.5 text-xs">
          <input type="hidden" id="upgrade-tool-id"/>
          <div class="p-3 rounded-[16px] bg-[#12121A] flex items-center justify-between">
            <span class="text-[#94A3B8] text-[11px]">Current Monthly Burn:</span>
            <span id="upgrade-tool-current-cost" class="font-label-code text-sm text-[#FBBF24] font-bold">₹0/mo</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Currency</label>
              <select id="upgrade-tool-currency" class="h-10 px-3 rounded-full bg-[#12121A] text-[#60A5FA] font-label-code font-bold text-xs">
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div class="sm:col-span-2 flex flex-col gap-1">
              <label class="text-[10px] uppercase tracking-[0.14em] text-[#34D399] font-semibold">New Monthly Cost *</label>
              <input id="upgrade-tool-new-cost" type="number" step="any" min="0" required placeholder="e.g. 2500"
                class="h-10 px-4 rounded-full bg-[#12121A] text-white font-label-code font-bold text-sm focus:outline-none"/>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Category</label>
            <select id="upgrade-tool-category" class="h-10 px-4 rounded-full bg-[#12121A] text-white font-label-code text-xs focus:outline-none border border-white/10">
              <option value="Editing &amp; Post-Production">Editing &amp; Post-Production (Premiere, DaVinci, FCP)</option>
              <option value="VFX, 3D &amp; Motion Graphics">VFX, 3D &amp; Motion Graphics (After Effects, Blender, C4D)</option>
              <option value="AI Video &amp; Generative Media">AI Video &amp; Generative Media (Runway, Midjourney, Kling)</option>
              <option value="AI Voice, Audio &amp; Music">AI Voice, Audio &amp; Music (ElevenLabs, Epidemic, Artlist)</option>
              <option value="Thumbnails &amp; Graphic Design">Thumbnails &amp; Graphic Design (Photoshop, Figma, Illustrator)</option>
              <option value="Cloud Storage &amp; File Delivery">Cloud Storage &amp; File Delivery (Google Drive, Dropbox, Frame.io)</option>
              <option value="Stock Footage, Assets &amp; LUTs">Stock Footage, Assets &amp; LUTs (Storyblocks, Envato, MotionArray)</option>
              <option value="Color Grading &amp; Finishing">Color Grading &amp; Finishing (Studio LUTs, FilmConvert, Dehancer)</option>
              <option value="Scriptwriting &amp; AI Research">Scriptwriting &amp; AI Research (ChatGPT, Claude, Gemini, Notion)</option>
              <option value="CRM, PM &amp; Communication">CRM, PM &amp; Communication (Slack, Discord, Linear, Asana)</option>
              <option value="Web Hosting, Domain &amp; Server">Web Hosting, Domain &amp; Server (Vercel, AWS, Cloudflare)</option>
              <option value="Studio Overhead &amp; Utilities">Studio Overhead &amp; Utilities (High-Speed Fiber, Electricity)</option>
              <option value="Other Production Tool">Other Production Tool</option>
            </select>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase tracking-[0.14em] text-[#8E92A4] font-semibold">Per Client Cut Burn ₹ (Optional)</label>
            <input id="upgrade-tool-per-cut" type="number" step="any" min="0" placeholder="0 (or decide at last)"
              class="h-10 px-4 rounded-full bg-[#12121A] text-[#FBBF24] font-label-code font-bold text-xs focus:outline-none"/>
          </div>

          <label class="p-3 rounded-[16px] bg-[#12121A] flex items-center justify-between gap-3 cursor-pointer border border-white/5 hover:border-[#34D399]/40 transition">
            <div class="flex flex-col">
              <span class="text-xs font-semibold text-white">Auto-Renewing (Auto-Pay)</span>
              <span class="text-[10px] text-[#94A3B8]">Automatically renews subscription on cycle end date</span>
            </div>
            <input id="upgrade-tool-auto-renew" type="checkbox" checked class="w-4 h-4 accent-[#34D399] rounded cursor-pointer"/>
          </label>

          <div class="flex items-center justify-end gap-2 pt-1">
            <button type="button" onclick="closeModal('crm-upgrade-tool-modal')" class="px-4 py-2 rounded-full btn-glass-neutral text-xs">Cancel</button>
            <button type="submit" class="px-5 py-2.5 rounded-full btn-glass-mint text-xs font-bold flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">trending_up</span>
              <span>Confirm Plan Upgrade</span>
            </button>
          </div>
        </form>
      </div>
    </div>

        <!-- 10. QUICK START GUIDE MODAL (8 PLAIN-WORDS STEPS) -->
    <div id="crm-quick-start-modal" class="fixed inset-0 z-50 hidden items-center justify-center p-4 overflow-y-auto">
      <div class="fixed inset-0 bg-black/85 backdrop-blur-md" onclick="closeModal('crm-quick-start-modal')"></div>
      <div class="relative w-full max-w-4xl neo-modal p-6 z-10 flex flex-col gap-4 my-6 max-h-[90vh]">
        <!-- Header -->
        <div class="flex items-center justify-between border-b pb-4 flex-shrink-0" style="border-color: var(--border-card);">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400/20 to-emerald-400/20 text-amber-500 flex items-center justify-center text-xl flex-shrink-0 border border-amber-400/30">
              <span class="material-symbols-outlined text-[24px]">menu_book</span>
            </div>
            <div>
              <span class="guide-badge">Quick Start Guide</span>
              <h3 class="text-xl font-bold mt-0.5">How to use beRich Studio CRM</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('crm-quick-start-modal')" class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition opacity-80 hover:opacity-100">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Scrollable Content Area: plain-words steps -->
        <div class="quick-start-scroll-container flex flex-col gap-4 pr-1" style="max-height: 70vh; overflow-y: auto;">

          <!-- STEP 1 -->
          <div class="guide-step-card p-5 rounded-2xl flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <span class="guide-step-num w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-base flex items-center justify-center flex-shrink-0 border border-emerald-500/40">1</span>
              <h4 class="text-lg font-bold">Step 1. Sign in the first time</h4>
            </div>
            <p class="guide-body leading-relaxed pl-12">Open the CRM link. On a brand-new computer, click the underlined link <strong>Setup Database Key (New Device)</strong> on the login screen and paste the studio access code (a long text that the studio admin sends you). It connects this computer to the studio's shared data. Then pick your name and choose a private 4-digit PIN. This computer remembers the code, so next time you only type your PIN. On another computer, do this step again.</p>
            <p class="guide-tip pl-12">Tip: Never share your PIN. If you forget it, or your name is not in the list, ask the studio admin.</p>
          </div>

          <!-- STEP 2 -->
          <div class="guide-step-card p-5 rounded-2xl flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <span class="guide-step-num w-9 h-9 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 font-bold text-base flex items-center justify-center flex-shrink-0 border border-sky-500/40">2</span>
              <h4 class="text-lg font-bold">Step 2. Find your way around</h4>
            </div>
            <p class="guide-body leading-relaxed pl-12">The <strong>left menu</strong> has Project Board, Software Subscriptions, Expense &amp; PDF Receipt and Team History. The <strong>top bar</strong> has search, your name (click it to switch person) and the <strong>Theme</strong> button. The three cards at the top show Actual Cash Collected, Won Deals and Active Production Pipeline.</p>
            <p class="guide-tip pl-12">Tip: Not sure what a button does? Hover over it for a short hint.</p>
          </div>

          <!-- STEP 3 -->
          <div class="guide-step-card p-5 rounded-2xl flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <span class="guide-step-num w-9 h-9 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-base flex items-center justify-center flex-shrink-0 border border-amber-500/40">3</span>
              <h4 class="text-lg font-bold">Step 3. Add a new client</h4>
            </div>
            <p class="guide-body leading-relaxed pl-12">Click <strong>+ New Lead (₹)</strong> at the top right (or <strong>+ New Client Lead</strong> above the board). Type the client's name, the kind of video, and the price in ₹, then save. A new card appears on the Project Board, in the first column (Identified) unless the form lets you pick another.</p>
            <p class="guide-tip pl-12">Tip: Write the price as a plain number, for example 25000. The ₹ sign is added for you.</p>
          </div>

          <!-- STEP 4 -->
          <div class="guide-step-card p-5 rounded-2xl flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <span class="guide-step-num w-9 h-9 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 font-bold text-base flex items-center justify-center flex-shrink-0 border border-sky-500/40">4</span>
              <h4 class="text-lg font-bold">Step 4. Move work along the Project Board</h4>
            </div>
            <p class="guide-body leading-relaxed pl-12">The board has 5 columns: <strong>Identified, In Discussion, Sample Cut, Approved, Closed Won</strong>. Drag a client's card to the next column when that stage is done. Identified = new contact. In Discussion = talking about the job and price. Sample Cut = a short sample is being made or sent. Approved = the client said yes. Closed Won = the deal is done. An empty column shows <strong>+ Add Deal in ₹</strong>, which opens the same form as + New Lead. Drag the thin bar at a column's right edge to resize it, or click <strong>Reset Column Widths</strong> to undo.</p>
            <p class="guide-tip pl-12">Tip: Dropped a card in the wrong column? Just drag it back.</p>
          </div>

          <!-- STEP 5 -->
          <div class="guide-step-card p-5 rounded-2xl flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <span class="guide-step-num w-9 h-9 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold text-base flex items-center justify-center flex-shrink-0 border border-purple-500/40">5</span>
              <h4 class="text-lg font-bold">Step 5. Open the Client File</h4>
            </div>
            <p class="guide-body leading-relaxed pl-12">Click any card to open that client's <strong>Client File</strong>. It holds their details, notes, payments and WhatsApp chat in one place. Change what you need, then close it. Changes save on their own.</p>
            <p class="guide-tip pl-12">Tip: Use the Client File instead of paper notes so the whole team sees the same thing.</p>
          </div>

          <!-- STEP 6 -->
          <div class="guide-step-card p-5 rounded-2xl flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <span class="guide-step-num w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold text-base flex items-center justify-center flex-shrink-0 border border-emerald-500/40">6</span>
              <h4 class="text-lg font-bold">Step 6. Record money and scan receipts</h4>
            </div>
            <p class="guide-body leading-relaxed pl-12">Inside the Client File, scroll down to log cash received. Or drag a payment screenshot (UPI or bank) into <strong>Scan Receipt Screenshot</strong>. The picture stays on your computer and is not sent anywhere. Check the amount it found, then save.</p>
            <p class="guide-tip pl-12">Tip: Always compare the amount with the original receipt before saving.</p>
          </div>

          <!-- STEP 7 -->
          <div class="guide-step-card p-5 rounded-2xl flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <span class="guide-step-num w-9 h-9 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-base flex items-center justify-center flex-shrink-0 border border-amber-500/40">7</span>
              <h4 class="text-lg font-bold">Step 7. Software Subscriptions and receipts</h4>
            </div>
            <p class="guide-body leading-relaxed pl-12">Open <strong>Software Subscriptions</strong> from the left menu to see every paid tool, its monthly cost and when you must pay for it again. Open <strong>Expense &amp; PDF Receipt</strong> and choose a client to see what the job cost, your profit and a printable PDF.</p>
            <p class="guide-tip pl-12">Tip: Per Client Cut ₹ is the part of a tool's cost charged to one client. Leave it at 0 if you do not know it yet and fill it in later.</p>
          </div>

          <!-- STEP 8 -->
          <div class="guide-step-card p-5 rounded-2xl flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <span class="guide-step-num w-9 h-9 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold text-base flex items-center justify-center flex-shrink-0 border border-rose-500/40">8</span>
              <h4 class="text-lg font-bold">Step 8. Team History, saving and themes</h4>
            </div>
            <p class="guide-body leading-relaxed pl-12">Everything saves to the shared database automatically. Open <strong>Team History</strong> (left menu) to see who changed what and when. The other top-bar buttons (Sync Sheet, UPI &amp; PayPal, FX → ₹) are optional: ask the studio admin before using Sync Sheet. Use the <strong>theme button</strong> in the top bar to switch between the light and dark look. Pick whichever is easier on your eyes.</p>
            <p class="guide-tip pl-12">Tip: If numbers look old, wait a few seconds or reload the page (press F5). If two people change the same client at the same time, one change can be lost.</p>
          </div>

        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-3 border-t flex-shrink-0" style="border-color: var(--border-card);">
          <span class="text-xs opacity-75">beRich Creative Studio, Quick Start Guide</span>
          <button type="button" onclick="closeModal('crm-quick-start-modal')" class="px-6 py-2.5 rounded-full btn-glass-mint text-xs font-bold cursor-pointer">
            Got it, let's start
          </button>
        </div>
      </div>
    </div>

    <!-- 9. GLOBAL TOAST NOTIFICATION -->
    <div id="crm-global-toast" class="fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 transition duration-300 pointer-events-none">
      <div class="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#222332] text-white shadow-[0_16px_40px_rgba(0,0,0,0.65)]">
        <span id="crm-toast-icon" class="material-symbols-outlined text-[20px] text-[#34D399]">check_circle</span>
        <span id="crm-toast-msg" class="text-xs font-semibold">Action completed</span>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);
}

function openQuickStartModal() {
  injectSharedModals();
  const modal = document.getElementById('crm-quick-start-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function renderAdminPinResetList() {
  const container = document.getElementById('admin-pin-reset-partner-list');
  if (!container) return;

  const partners = getActivePartners().filter(p => p.name.trim().toLowerCase() !== 'koushik');
  if (partners.length === 0) {
    container.innerHTML = `<span class="text-xs text-[#8E92A4]">No other active partners configured.</span>`;
    return;
  }

  container.innerHTML = partners.map(p => {
    const pKey = p.name.trim().toLowerCase();
    const hasPin = Boolean(crmState.userSecurity && crmState.userSecurity[pKey]);
    return `
      <div class="p-3 rounded-xl bg-[#12121A] border border-white/5 flex items-center justify-between gap-3">
        <div>
          <div class="text-xs font-bold text-white">${escapeHtml(p.name)}</div>
          <div class="text-[10px] ${hasPin ? 'text-[#34D399]' : 'text-[#8E92A4]'} font-medium">
            ${hasPin ? '🔒 PIN Active' : '🔓 No PIN Set'}
          </div>
        </div>
        <button type="button" onclick="adminResetPartnerPin('${escapeHtml(p.name)}')"
          class="px-3 py-1.5 rounded-full ${hasPin ? 'bg-[#4C1323] hover:bg-[#66182E] text-[#FF6B8B]' : 'bg-[#232433] text-[#8E92A4] cursor-not-allowed'} text-xs font-semibold flex items-center gap-1 transition"
          ${hasPin ? '' : 'disabled'}>
          <span class="material-symbols-outlined text-[14px]">lock_reset</span>
          <span>Reset PIN</span>
        </button>
      </div>
    `;
  }).join('');
}

async function adminResetPartnerPin(partnerName) {
  const activeUser = getActiveStudioUser().trim().toLowerCase();
  if (activeUser !== 'koushik') {
    showCRMToast('Only admin Koushik can reset partner PINs.', 'error');
    return;
  }

  const cleanName = String(partnerName || '').trim();
  const partnerKey = cleanName.toLowerCase();
  if (!confirm(`Are you sure you want to reset the security PIN for ${cleanName}? They will be prompted to create a new 4-digit PIN on next login.`)) {
    return;
  }

  if (crmState.userSecurity && crmState.userSecurity[partnerKey]) {
    delete crmState.userSecurity[partnerKey];
  }
  saveUserSecurity_();
  saveToLocalCache();

  recordStudioActivity('Admin PIN Reset', `koushik reset security PIN for ${cleanName}`, true);
  await pushToGitHubDatabase(`Admin koushik reset PIN for ${cleanName}`);

  renderAdminPinResetList();
  showCRMToast(`PIN for ${cleanName} has been cleared!`, 'lock_open');
}

function openApiSettingsModal() {
  injectSharedModals();
  const modal = document.getElementById('crm-api-modal');
  document.getElementById('crm-api-url-input').value = crmState.apiUrl || DEFAULT_WEB_APP_URL;

  document.getElementById('cfg-agency-name').value = crmState.branding.agencyName || DEFAULT_BRANDING.agencyName;
  document.getElementById('cfg-agency-tagline').value = crmState.branding.agencyTagline || DEFAULT_BRANDING.agencyTagline;
  document.getElementById('cfg-studio-upi').value = crmState.upiId || '';
  const paypalCfgEl = document.getElementById('cfg-studio-paypal');
  if (paypalCfgEl) paypalCfgEl.value = crmState.paypalLink || '';
  document.getElementById('cfg-studio-whatsapp').value = crmState.whatsappNumber || '';

  const ghCfg = crmState.githubConfig || DEFAULT_GITHUB_CONFIG;
  const ghTokenEl = document.getElementById('cfg-gh-token');
  const ghOwnerEl = document.getElementById('cfg-gh-owner');
  const ghRepoEl = document.getElementById('cfg-gh-repo');
  const ghPathEl = document.getElementById('cfg-gh-path');
  if (ghTokenEl) ghTokenEl.value = ghCfg.token || '';
  if (ghOwnerEl) ghOwnerEl.value = ghCfg.owner || DEFAULT_GITHUB_CONFIG.owner;
  if (ghRepoEl) ghRepoEl.value = ghCfg.repo || DEFAULT_GITHUB_CONFIG.repo;
  if (ghPathEl) ghPathEl.value = ghCfg.path || DEFAULT_GITHUB_CONFIG.path;

  for (let i = 0; i < 10; i++) {
    const slotNum = i + 1;
    const p = crmState.partners[i] || { name: '', role: '' };
    const nameEl = document.getElementById(`cfg-p${slotNum}-name`);
    const roleEl = document.getElementById(`cfg-p${slotNum}-role`);
    if (nameEl) nameEl.value = p.name || '';
    if (roleEl) roleEl.value = p.role || '';
  }

    const activeUser = getActiveStudioUser().trim().toLowerCase();
  const isAdmin = activeUser === 'koushik';
  const adminSection = document.getElementById('admin-pin-reset-section');
  if (adminSection) {
    if (isAdmin) {
      adminSection.classList.remove('hidden');
      renderAdminPinResetList();
    } else {
      adminSection.classList.add('hidden');
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function savePartnerAndApiSettings() {
  const url = document.getElementById('crm-api-url-input').value.trim() || DEFAULT_WEB_APP_URL;
  crmState.apiUrl = url;
  localStorage.setItem(STORAGE_KEY_API_URL, url);

  const ghTokenEl = document.getElementById('cfg-gh-token');
  const ghOwnerEl = document.getElementById('cfg-gh-owner');
  const ghRepoEl = document.getElementById('cfg-gh-repo');
  const ghPathEl = document.getElementById('cfg-gh-path');
  crmState.githubConfig = {
    ...crmState.githubConfig,
    token: ghTokenEl ? ghTokenEl.value.trim() : crmState.githubConfig.token,
    owner: (ghOwnerEl ? ghOwnerEl.value.trim() : '') || DEFAULT_GITHUB_CONFIG.owner,
    repo: (ghRepoEl ? ghRepoEl.value.trim() : '') || DEFAULT_GITHUB_CONFIG.repo,
    path: ((ghPathEl ? ghPathEl.value.trim() : '') || DEFAULT_GITHUB_CONFIG.path).replace(/^\/+/, ''),
    branch: crmState.githubConfig.branch || 'main'
  };
  saveGitHubConfig();

  crmState.branding.agencyName = document.getElementById('cfg-agency-name').value.trim() || DEFAULT_BRANDING.agencyName;
  crmState.branding.agencyTagline = document.getElementById('cfg-agency-tagline').value.trim() || DEFAULT_BRANDING.agencyTagline;

  const upiVal = document.getElementById('cfg-studio-upi').value.trim();
  const paypalCfgEl = document.getElementById('cfg-studio-paypal');
  const paypalVal = paypalCfgEl ? paypalCfgEl.value.trim() : crmState.paypalLink;
  const waVal = normalizeIndianWhatsAppNumber(document.getElementById('cfg-studio-whatsapp').value.trim());
  crmState.upiId = upiVal;
  crmState.paypalLink = paypalVal;
  crmState.whatsappNumber = waVal;
  try {
    localStorage.setItem(STORAGE_KEY_UPI_ID, upiVal);
    localStorage.setItem(STORAGE_KEY_PAYPAL, paypalVal);
    localStorage.setItem(STORAGE_KEY_WHATSAPP, waVal);
  } catch (_) {}

  const oldNames = crmState.partners.map(p => p.name);
  const updatedPartners = [];

  for (let i = 0; i < 10; i++) {
    const slotNum = i + 1;
    const nameEl = document.getElementById(`cfg-p${slotNum}-name`);
    const roleEl = document.getElementById(`cfg-p${slotNum}-role`);
    const newName = nameEl ? nameEl.value.trim() : '';
    const newRole = roleEl ? roleEl.value.trim() : (DEFAULT_PARTNERS[i] ? DEFAULT_PARTNERS[i].role : 'Partner');

    updatedPartners.push({
      id: `P${slotNum}`,
      name: newName,
      role: newRole || 'Partner',
      ...PARTNER_PALETTE[i % PARTNER_PALETTE.length]
    });
  }

  // Ensure at least Partner Slot #1 has a name so the CRM always has at least 1 active partner
  if (!updatedPartners.some(p => p.name.length > 0)) {
    updatedPartners[0].name = 'koushik';
  }

  // Automatically update existing leads if a partner was renamed in the same slot
  crmState.leads.forEach(lead => {
    const idx = oldNames.findIndex(oldN => oldN && oldN.toLowerCase() === String(lead.partner || '').toLowerCase());
    if (idx >= 0 && updatedPartners[idx] && updatedPartners[idx].name) {
      lead.partner = updatedPartners[idx].name;
    }
  });

  globalState.partners = updatedPartners;
  saveBrandingAndPartnersConfig();
  saveToLocalCache();
  closeModal('crm-api-modal');
  recordStudioActivity(
    'Updated Studio & GitHub Config',
    `Saved "${getFullAgencyTitle()}" (${getActivePartners().map(p => p.name).join(', ')}) & synced to ${globalState.githubConfig.owner}/${globalState.githubConfig.repo}/${globalState.githubConfig.path}`,
    false
  );
  pushToGitHubDatabase(`${getActiveStudioUser()}: Updated studio & partner config`);
  syncGlobalConfigToSheet();
  renderTechStack();
  renderKanban();
  renderAll();
  showCRMToast(`Saved "${getFullAgencyTitle()}" & pushed to GitHub JSON DB!`, 'cloud_done');
}

async function wipeAllLocalDataCleanSlate() {
  localStorage.removeItem(STORAGE_KEY_CACHE);
  localStorage.removeItem(STORAGE_KEY_DELETED_IDS);
  globalState.deletedLeadIds = new Set();
  globalState.deletedToolIds = new Set();
  globalState.leads = [];
  globalState.techStack = [];
  globalState.revenue = [];
  saveToLocalCache();
  closeModal('crm-api-modal');
  recordStudioActivity('Wiped Studio Data to Clean Slate', `Cleared deals & subscriptions from ${globalState.deviceLabel}`, false);
  pushToGitHubDatabase(`${getActiveStudioUser()}: Wiped studio data to clean slate`);
  syncGlobalConfigToSheet();
  renderTechStack();
  renderKanban();
  renderAll();
  try {
    await postToGoogleSheets({ action: 'clearAllData' });
  } catch (_) {}
  showCRMToast('All local, GitHub DB & Google Sheet cards wiped to a clean slate!', 'delete_sweep');
}

function closeModal(modalId) {
  const modal = getModalElement(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function openModal(modalId) {
  const modal = getModalElement(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}
window.openModal = openModal;
window.closeModal = closeModal;

function updateSyncBadge(status) {
  const badge = document.getElementById('sheets-sync-status-badge');
  if (!badge) return;
  if (status === 'github_live') {
    badge.className = 'h-10 px-4 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-xs font-semibold inline-flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap';
    badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-[#34D399] animate-pulse flex-shrink-0"></span><span>GitHub DB Live (₹)</span>';
  } else if (status === 'connected') {
    badge.className = 'h-10 px-4 rounded-full bg-[#34D399]/15 text-[#34D399] font-label-code text-xs font-semibold inline-flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap';
    badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-[#34D399] animate-pulse flex-shrink-0"></span><span>Sheets Live (₹)</span>';
  } else if (status === 'syncing') {
    badge.className = 'h-10 px-4 rounded-full bg-[#60A5FA]/15 text-[#60A5FA] font-label-code text-xs font-semibold inline-flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap';
    badge.innerHTML = '<span class="material-symbols-outlined text-[14px] animate-spin flex-shrink-0">sync</span><span>Syncing...</span>';
  } else {
    badge.className = 'h-10 px-4 rounded-full bg-[#1A1A24] hover:bg-[#242535] text-white font-label-code text-xs inline-flex items-center gap-2 cursor-pointer flex-shrink-0 whitespace-nowrap shadow-[0_8px_20px_rgba(0,0,0,0.35)]';
    badge.innerHTML = '<span class="material-symbols-outlined text-[15px] text-[#34D399] flex-shrink-0">groups</span><span>10-Partners &amp; Config</span>';
  }
}

function showCRMToast(message, icon = 'check_circle') {
  injectSharedModals();
  const toast = document.getElementById('crm-global-toast');
  const msgEl = document.getElementById('crm-toast-msg');
  const iconEl = document.getElementById('crm-toast-icon');
  if (!toast || !msgEl || !iconEl) return;

  msgEl.textContent = message;
  iconEl.textContent = icon;
  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(window.__crmToastTimer);
  window.__crmToastTimer = setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 3400);
}

/**
 * ============================================================================
 * 11. FILTER HANDLERS & INITIALIZATION
 * ============================================================================
 */

function setPartnerFilter(partnerKey) {
  crmState.filters.partner = partnerKey;
  renderPartnerFilterPills();
  renderKanbanBoard();
}

function setSourceFilter(source, btnEl) {
  crmState.filters.source = source;
  if (btnEl && btnEl.parentElement) {
    Array.from(btnEl.parentElement.querySelectorAll('button')).forEach(b => {
      b.className = 'px-3.5 py-1.5 rounded-full bg-[#232433] text-[#B8BCCF] hover:text-white hover:bg-[#2E3044] transition text-xs flex items-center gap-1.5';
    });
    btnEl.className = 'px-3.5 py-1.5 rounded-full bg-[#34D399] text-[#051B11] font-bold text-xs flex items-center gap-1.5';
  }
  renderKanbanBoard();
}

function setSampleFilter(sampleMode) {
  crmState.filters.sample = sampleMode;
  renderKanbanBoard();
}

function toggleValueSort() {
  crmState.filters.sortDesc = !crmState.filters.sortDesc;
  const label = document.getElementById('sort-direction-label');
  if (label) {
    label.textContent = crmState.filters.sortDesc ? 'Sort: Value (High-Low)' : 'Sort: Value (Low-High)';
  }
  renderKanbanBoard();
}

function normalizeLead_(raw) {
  const val = parseFloat(raw.dealValue) || 0;
  const active = getActivePartners();
  const rawNotes = String(raw.notes || '');
  let customToolCost = parseFloat(raw.customToolCost) || 0;
  if (!customToolCost && rawNotes.includes('[CUSTOM_BURN:')) {
    const m = rawNotes.match(/\[CUSTOM_BURN:([\d.]+)\]/);
    if (m && m[1]) customToolCost = parseFloat(m[1]) || 0;
  }
  const rawPayments = Array.isArray(raw.payments) ? raw.payments : [];
  const payments = rawPayments.map(p => ({
    id: p.id || ('PAY-' + Math.random().toString(36).slice(2, 8)),
    amount: parseFloat(p.amount) || 0,
    phase: p.phase || '50% Advance',
    method: p.method || 'UPI',
    reference: String(p.reference || p.txnId || p.note || '').trim(),
    timestamp: p.timestamp || new Date().toISOString(),
    recordedBy: p.recordedBy || 'Studio'
  }));

  const contactPhone = String(raw.contactPhone || raw.phone || '').trim();
  const lastInteractionAt = Number(raw.lastInteractionAt) || Number(raw.updatedAt) || Number(raw.createdAt) || Date.now();
  const lastInteractionType = raw.lastInteractionType || 'created';
  const rawVd = (raw.videoDelivery && typeof raw.videoDelivery === 'object') ? raw.videoDelivery : {};
  const videoDelivery = {
    version: rawVd.version || 'v1.0 First Cut',
    driveUrl: String(rawVd.driveUrl || '').trim(),
    previewUrl: String(rawVd.previewUrl || '').trim(),
    notes: String(rawVd.notes || '').trim(),
    deliveredAt: rawVd.deliveredAt || null
  };

  return {
    id: raw.id || ('LEAD-' + Math.random().toString(36).slice(2, 8)),
    clientName: raw.clientName || 'Unnamed Client',
    handle: raw.handle || '@brand',
    clientEmail: raw.clientEmail || '',
    contactPhone,
    lastInteractionAt,
    lastInteractionType,
    videoDelivery,
    country: raw.country || '🇮🇳 IN',
    service: raw.service || 'Creative Production',
    serviceIcon: raw.serviceIcon || 'movie_edit',
    source: raw.source || 'Instagram DM',
    dealValue: val,
    billingLabel: raw.billingLabel && String(raw.billingLabel).includes('₹') ? raw.billingLabel : `${formatINR(val)} / mo`,
    partner: raw.partner || active[0].name,
    stage: raw.stage || 'Identified',
    sampleStatus: raw.sampleStatus || 'Free Sample: Pending',
    sampleUrl: raw.sampleUrl || 'https://frame.io/',
    toolsUsed: raw.toolsUsed || '',
    estHours: parseFloat(raw.estHours) || 0,
    hourlyRate: parseFloat(raw.hourlyRate) || 1000,
    customToolCost,
    laborCost: parseFloat(raw.laborCost) || 0,
    toolCost: parseFloat(raw.toolCost) || 0,
    netProfit: parseFloat(raw.netProfit) || 0,
    marginPercent: parseFloat(raw.marginPercent) || 0,
    payments,
    notes: rawNotes,
    updatedAt: Number(raw.updatedAt) || Date.now()
  };
}

function normalizeTool_(raw) {
  const active = getActivePartners();
  const paidBy = raw.paidBy || raw.assignedPartners || active[0]?.name || 'Studio Shared Account';
  const todayIso = new Date().toISOString().split('T')[0];
  let startDate = raw.startDate || '';
  let endDate = raw.endDate || '';
  let renewalDaysLeft = parseInt(raw.renewalDaysLeft, 10);
  if (isNaN(renewalDaysLeft)) renewalDaysLeft = 30;

  if (!startDate) startDate = todayIso;
  if (!endDate) {
    const endObj = new Date(startDate + 'T00:00:00');
    endObj.setDate(endObj.getDate() + Math.max(1, renewalDaysLeft));
    endDate = endObj.toISOString().split('T')[0];
  } else {
    const nowMs = new Date(todayIso + 'T00:00:00').getTime();
    const endMs = new Date(endDate + 'T00:00:00').getTime();
    renewalDaysLeft = Math.max(0, Math.ceil((endMs - nowMs) / 86400000));
  }

  return {
    id: raw.id || ('TOOL-' + Math.random().toString(36).slice(2, 6)),
    toolName: raw.toolName || 'Subscription Tool',
    category: raw.category || 'Editing & Post-Production',
    monthlyCost: parseFloat(raw.monthlyCost) || 0,
    billingCycle: raw.billingCycle || 'Monthly',
    costPerCut: parseFloat(raw.costPerCut) || 0,
    paidBy,
    assignedPartners: paidBy,
    startDate,
    endDate,
    renewalDaysLeft,
    autoRenew: raw.autoRenew !== undefined ? Boolean(raw.autoRenew) : true,
    status: raw.status || 'Active',
    updatedAt: Number(raw.updatedAt) || Date.now()
  };
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function upgradeTechStackPageDom_() {
  // If an older cached tech-stack.html is loaded, automatically upgrade its form & table headers in-place
  const categorySelect = document.getElementById('add-tool-category');
  if (categorySelect && categorySelect.options.length <= 4) {
    const currentVal = categorySelect.value;
    categorySelect.innerHTML = STUDIO_TOOL_CATEGORIES.map(cat =>
      `<option value="${escapeHtml(cat)}"${cat === currentVal ? ' selected' : ''}>${escapeHtml(cat)}</option>`
    ).join('');
  }
  const oldPartnersInput = document.getElementById('add-tool-partners');
  const perCutInput = document.getElementById('add-tool-per-cut');
  if (perCutInput) {
    perCutInput.removeAttribute('required');
    perCutInput.placeholder = '₹0 (Optional — set now or at last)';
  }
  if (oldPartnersInput && !document.getElementById('add-tool-paid-by')) {
    const parentCol = oldPartnersInput.parentElement;
    if (parentCol) {
      parentCol.innerHTML = `
        <label class="text-[10px] uppercase font-bold text-secondary">Who Paid For This *</label>
        <select id="add-tool-paid-by" class="h-10 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-secondary font-semibold"></select>
      `;
    }
    const formEl = document.querySelector('form[onsubmit*="handleAddToolForm"]');
    if (formEl && !document.getElementById('add-tool-start-date')) {
      const submitBtn = formEl.querySelector('button[type="submit"]');
      const dateBox = document.createElement('div');
      dateBox.className = 'p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-2';
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setDate(nextMonth.getDate() + 30);
      const startIso = today.toISOString().split('T')[0];
      const endIso = nextMonth.toISOString().split('T')[0];
      dateBox.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase font-bold text-outline">Start Date *</label>
            <input id="add-tool-start-date" type="date" required value="${startIso}" class="h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-label-code text-xs"/>
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-[10px] uppercase font-bold text-outline">End / Renewal Date *</label>
            <input id="add-tool-end-date" type="date" required value="${endIso}" class="h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface font-label-code text-xs"/>
          </div>
        </div>
        <div class="flex flex-col gap-1 pt-0.5">
          <div class="flex items-center justify-between text-[10px] font-label-code">
            <span class="text-outline uppercase">Renewal Cycle Measurement:</span>
            <span id="add-tool-renewal-preview-text" class="text-tertiary font-bold">30d left of 30d (100%)</span>
          </div>
          <div class="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div id="add-tool-renewal-preview-bar" class="h-full bg-[#34D399] rounded-full transition" style="width: 100%;"></div>
          </div>
        </div>
      `;
      if (submitBtn) formEl.insertBefore(dateBox, submitBtn);
    }
  }
  const formEl = document.querySelector('form[onsubmit*="handleAddToolForm"]');
  if (formEl && !document.getElementById('add-tool-auto-renew')) {
    const submitBtn = formEl.querySelector('button[type="submit"]');
    const autoRenewBox = document.createElement('label');
    autoRenewBox.className = 'auto-renew-toggle-card p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/25 flex items-center justify-between gap-3 cursor-pointer';
    autoRenewBox.innerHTML = `
      <div class="flex flex-col">
        <span class="text-xs font-bold text-on-surface flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[15px] text-tertiary">autorenew</span>
          <span>Auto-Renewing (Auto-Pay)</span>
        </span>
        <span class="text-[10px] text-outline">Automatically renews on cycle end date</span>
      </div>
      <input id="add-tool-auto-renew" type="checkbox" checked class="w-4 h-4 accent-[#34D399] rounded cursor-pointer"/>
    `;
    if (submitBtn) formEl.insertBefore(autoRenewBox, submitBtn);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try { injectSharedModals(); } catch (e) { console.warn('injectSharedModals:', e); }
  try { upgradeTechStackPageDom_(); } catch (e) { console.warn('upgradeTechStackPageDom_:', e); }
  try { initAddToolDefaultDates(); } catch (e) { console.warn('initAddToolDefaultDates:', e); }

  const searchInput = document.getElementById('crm-global-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      globalState.filters.search = e.target.value;
      renderKanbanBoard();
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });

  try { renderTechStack(); } catch (e) { console.warn('renderTechStack:', e); }
  try { renderKanban(); } catch (e) { console.warn('renderKanban:', e); }
  try { renderAll(); } catch (e) { console.warn('renderAll:', e); }
  try { ensureUserIdentityPrompt(); } catch (e) { console.warn('ensureUserIdentityPrompt:', e); }
  try { initDebouncedFormDrafts(); } catch (e) { console.warn('initDebouncedFormDrafts:', e); }
  try { fetchFromGoogleSheets(false); } catch (e) { console.warn('fetchFromGoogleSheets:', e); }

  // Privacy guard: warn when the shared database still lives in the public code repository.
  setTimeout(() => {
    try {
      const c = crmState.githubConfig || {};
      if (c.token && String(c.repo || '').toLowerCase() === 'agency-crm') {
        showCRMToast('Privacy warning: your client data is saved in the PUBLIC Agency-CRM repository. Move it to a private repository (Partners & Sheet Config, Database Location Name).', 'warning');
      }
    } catch (e) {}
  }, 4000);

  // Real-Time Multi-Device Sync Engine: Poll GitHub JSON DB + Google Sheets every 8s + on tab focus/visibility
  setInterval(() => {
    if (!document.hidden && !crmState.isSyncing) {
      fetchFromGoogleSheets(false, true);
    }
  }, 8000);

  window.addEventListener('focus', () => {
    if (!crmState.isSyncing) {
      fetchFromGoogleSheets(false, true);
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !crmState.isSyncing) {
      fetchFromGoogleSheets(false, true);
    }
  });
});

window.logIncomingWhatsAppMessage = logIncomingWhatsAppMessage;

// Lightweight background polling for 2-Way WhatsApp Bridge updates (Every 15s)
if (typeof window !== 'undefined') {
  setInterval(async () => {
    return; // replaced by pollBridge_()
    try {
      const res = await fetch('http://localhost:3030/api/status', { method: 'GET', cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const ledger = data.state?.messageLedger || [];
        if (ledger.length > 0 && Array.isArray(crmState.leads)) {
          let updated = false;
          ledger.forEach(item => {
            if (item.direction === 'INCOMING') {
              const matched = crmState.leads.find(l => 
                (l.phone && l.phone.replace(/\D/g, '') === String(item.from).replace(/\D/g, '')) ||
                (l.clientName && String(item.text).toLowerCase().includes(l.clientName.toLowerCase()))
              );
              if (matched) {
                if (!Array.isArray(matched.chatHistory)) matched.chatHistory = [];
                const exists = matched.chatHistory.some(m => m.timestamp === item.timestamp || m.text === item.text);
                if (!exists) {
                  matched.chatHistory.push({
                    direction: 'INCOMING',
                    author: matched.clientName,
                    text: item.text,
                    timestamp: item.timestamp
                  });
                  matched.lastInteractionAt = Date.now();
                  matched.updatedAt = Date.now();
                  updated = true;
                  try { notifyIncoming_(matched, item.text); } catch (e) {}
                }
              }
            }
          });
          if (updated) {
            saveToLocalCache();
            renderKanban();
            renderHeaderAndMetrics();
            if (crmState.activeDossierLeadId) {
              const lead = crmState.leads.find(l => l.id === crmState.activeDossierLeadId);
              if (lead) renderDossierModalContent(lead);
            }
          }
        }
      }
    } catch (e) {
      // Bridge not currently running locally - silent fallback
    }
  }, 15000);
}

/* ==========================================================================
   PRIVATE CHATS, SEND-FROM PROFILES, FLOATING MULTI-CHAT WINDOWS, REPLY ALERTS
   Privacy model:
   - Deals are shared with the team. Chat messages are NOT. They are stored only in this
     browser (localStorage) and are removed from everything pushed to GitHub.
   - Every message and every send-from profile is tagged with the signed-in partner. A partner
     only sees and uses their own, even on a shared computer.
   - Team History only records "Chat started" and "Chat ended" per conversation, not every message.
   ========================================================================== */
const SENDERS_KEY = 'beRich_senders_v1';
const CHAT_STORE_KEY = 'beRich_chats_v2';
const NUM_CHAT_KEY = 'beRich_numchats_v1';
const CHAT_SYNC_DELAY_MS = 30000;
const CHAT_IDLE_END_MS = 20 * 60 * 1000;
const MAX_CHAT_WINDOWS = 4;
let chatSyncTimer = null;
const chatSessions = new Map();
let chatBridge = { status: 'OFF', number: '', ready: false };

/* ---------- identity ---------- */
function chatUser_() {
  return (sessionStorage.getItem('FRAME3_PIN_VERIFIED_USER') || getActiveStudioUser() || '').trim();
}
function sameUser_(a, b) { return String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase(); }

/* ---------- private chat store (never pushed) ---------- */
function readJson_(key) { try { return JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (e) { return {}; } }
function mergeChats_(a, b) {
  const seen = new Set(); const out = [];
  [...(a || []), ...(b || [])].forEach(m => {
    const k = (m.timestamp || '') + '|' + (m.direction || '') + '|' + String(m.text || '').slice(0, 40);
    if (!seen.has(k)) { seen.add(k); out.push(m); }
  });
  out.sort((x, y) => new Date(x.timestamp || 0) - new Date(y.timestamp || 0));
  return out.slice(-300);
}
function persistChats_() {
  try {
    const store = readJson_(CHAT_STORE_KEY);
    (crmState.leads || []).forEach(l => {
      if (Array.isArray(l.chatHistory) && l.chatHistory.length) store[l.id] = mergeChats_(store[l.id], l.chatHistory);
    });
    localStorage.setItem(CHAT_STORE_KEY, JSON.stringify(store));
  } catch (e) {}
}
function rehydrateChats_() {
  const store = readJson_(CHAT_STORE_KEY);
  (crmState.leads || []).forEach(l => { if (store[l.id]) l.chatHistory = mergeChats_(l.chatHistory, store[l.id]); });
}
function visibleChat_(history) {
  const me = chatUser_();
  return (Array.isArray(history) ? history : []).filter(m => !m.owner || sameUser_(m.owner, me));
}

/* ---------- send-from profiles (each partner sees only their own) ---------- */
function allSenders_() {
  try { const l = JSON.parse(localStorage.getItem(SENDERS_KEY) || '[]'); return Array.isArray(l) ? l : []; } catch (e) { return []; }
}
function loadSenders_() {
  const me = chatUser_();
  const mine = allSenders_().filter(s => sameUser_(s.owner, me));
  return mine.length ? mine : [{ id: 'S-' + me, owner: me, label: me || 'Me', phone: '', email: '', port: 3030 }];
}
function saveSenders_(mine) {
  const me = chatUser_();
  const others = allSenders_().filter(s => !sameUser_(s.owner, me));
  const stamped = mine.map((s, i) => ({ ...s, owner: me, id: 'S-' + me + '-' + (i + 1) }));
  try { localStorage.setItem(SENDERS_KEY, JSON.stringify([...others, ...stamped])); } catch (e) {}
}
function getActiveSender_() {
  const list = loadSenders_();
  const prefs = loadWaPrefs_();
  const id = prefs['senderId_' + chatUser_()];
  return list.find(s => s.id === id) || list[0];
}
function setActiveSender(id) {
  saveWaPrefs_({ ['senderId_' + chatUser_()]: id });
  renderSenderControls_();
}
function renderSenderControls_() {
  const list = loadSenders_();
  const active = getActiveSender_();
  document.querySelectorAll('.wa-sender-select').forEach(sel => {
    sel.innerHTML = list.map(s => `<option value="${escapeHtml(s.id)}"${s.id === active.id ? ' selected' : ''}>${escapeHtml(s.label)}${s.phone ? ' (' + escapeHtml(s.phone) + ')' : ''}</option>`).join('');
  });
  document.querySelectorAll('.wa-sender-help').forEach(el => {
    el.textContent = active.phone
      ? `Sending as ${chatUser_()} from ${active.label} (${active.phone}). You only see your own numbers and chats.`
      : `Signed in as ${chatUser_()}. Add your own WhatsApp number and email with Manage.`;
  });
}
function openSendersEditor() {
  let modal = document.getElementById('crm-senders-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'crm-senders-modal';
    modal.className = 'fixed inset-0 z-[60] hidden items-center justify-center p-4 overflow-y-auto';
    document.body.appendChild(modal);
  }
  const list = loadSenders_();
  modal.innerHTML = `
    <div class="fixed inset-0 bg-black/70" onclick="closeModal('crm-senders-modal')"></div>
    <div class="relative w-full max-w-2xl neo-modal p-6 z-10 flex flex-col gap-4 my-8">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold">Your send-from profiles (${escapeHtml(chatUser_())})</h3>
        <button type="button" class="wa-chip" onclick="closeModal('crm-senders-modal')">Close</button>
      </div>
      <p class="wa-help">These are yours only. Other partners cannot see or use them, and they are never synced to GitHub. Add a number or an email for each way you contact clients, such as your own Gmail or a company mail.</p>
      <div id="senders-rows" class="flex flex-col gap-3">
        ${list.map((s, i) => `
          <div class="wa-panel flex flex-col gap-2" data-sender-row="${i}">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input class="wa-input" data-f="label" placeholder="Name for this profile" value="${escapeHtml(s.label)}"/>
              <input class="wa-input" data-f="phone" placeholder="WhatsApp number with country code" value="${escapeHtml(s.phone)}"/>
              <input class="wa-input" data-f="email" placeholder="Gmail or company email" value="${escapeHtml(s.email)}"/>
              <input class="wa-input" data-f="port" placeholder="Bridge port (default 3030)" value="${escapeHtml(String(s.port || 3030))}"/>
            </div>
            <div><button type="button" class="wa-paste" onclick="removeSenderRow(${i})">Remove</button></div>
          </div>`).join('')}
      </div>
      <div class="flex flex-wrap gap-2 justify-between">
        <button type="button" class="wa-chip" onclick="addSenderRow()">Add another</button>
        <button type="button" class="wa-chip wa-chip-on" onclick="saveSendersFromEditor()">Save</button>
      </div>
    </div>`;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}
function readSenderRows_() {
  return [...document.querySelectorAll('#senders-rows [data-sender-row]')].map((row, i) => {
    const get = f => (row.querySelector(`[data-f="${f}"]`)?.value || '').trim();
    return { label: get('label') || ('Profile ' + (i + 1)), phone: get('phone').replace(/[^\d+]/g, ''), email: get('email'), port: parseInt(get('port'), 10) || 3030 };
  });
}
function addSenderRow() { const l = readSenderRows_(); l.push({ label: '', phone: '', email: '', port: 3030 }); saveSenders_(l); openSendersEditor(); }
function removeSenderRow(i) {
  const l = readSenderRows_(); if (l.length <= 1) { showCRMToast('Keep at least one profile.', 'warning'); return; }
  l.splice(i, 1); saveSenders_(l); openSendersEditor();
}
function saveSendersFromEditor() { saveSenders_(readSenderRows_()); renderSenderControls_(); closeModal('crm-senders-modal'); showCRMToast('Saved on this computer for you only.', 'check_circle'); }

/* ---------- threads: deal chats live on the lead (local only), number chats in a local store ---------- */
function threadOf_(s) {
  if (s.leadId) { const l = (globalState.leads || []).find(x => x.id === s.leadId); return l ? (l.chatHistory = Array.isArray(l.chatHistory) ? l.chatHistory : []) : []; }
  const store = readJson_(NUM_CHAT_KEY); return store[s.key] || [];
}
function pushThread_(s, msg) {
  msg.owner = chatUser_();
  msg.timestamp = msg.timestamp || new Date().toISOString();
  if (s.leadId) {
    const l = (globalState.leads || []).find(x => x.id === s.leadId); if (!l) return;
    if (!Array.isArray(l.chatHistory)) l.chatHistory = [];
    l.chatHistory.push(msg);
    l.lastInteractionAt = Date.now(); l.updatedAt = Date.now();
    l.lastInteractionType = msg.direction === 'INCOMING' ? 'whatsapp_received' : 'whatsapp_sent';
    saveToLocalCache();
  } else {
    const store = readJson_(NUM_CHAT_KEY); store[s.key] = mergeChats_(store[s.key], [msg]);
    try { localStorage.setItem(NUM_CHAT_KEY, JSON.stringify(store)); } catch (e) {}
  }
}

/* ---------- sessions: one Team History line when a chat starts, one when it ends ---------- */
function sessionKey_(lead, phone) { return lead ? 'L:' + lead.id : 'N:' + String(phone || '').replace(/\D/g, ''); }
function getSession_(lead, phone) {
  const key = sessionKey_(lead, phone);
  let s = chatSessions.get(key);
  if (!s) {
    const num = cleanWhatsAppPhone(phone || (lead && (lead.contactPhone || lead.phone)) || '');
    s = { key, leadId: lead ? lead.id : '', name: lead ? lead.clientName : (num ? '+' + num : 'Unknown number'), phone: num,
          sender: getActiveSender_().label, startedAt: Date.now(), lastAt: Date.now(), sent: 0, received: 0, unread: 0, logged: false };
    chatSessions.set(key, s);
  }
  return s;
}
function noteChatEvent_(s, kind) {
  s.lastAt = Date.now();
  if (kind === 'sent') s.sent += 1;
  if (kind === 'received') s.received += 1;
  if (!s.logged) {
    s.logged = true;
    recordStudioActivity('Chat started', `${chatUser_()} started a chat with ${s.name}${s.phone ? ' (' + s.phone + ')' : ''} from ${s.sender}`, false);
  }
  scheduleChatSync_();
  updateChatLauncher_();
}
function scheduleChatSync_() {
  clearTimeout(chatSyncTimer);
  chatSyncTimer = setTimeout(() => { try { pushToGitHubDatabase(`${chatUser_()}: chat activity`); } catch (e) {} }, CHAT_SYNC_DELAY_MS);
}
function endChat_(key, opts) {
  opts = opts || {};
  const s = chatSessions.get(key); if (!s) return;
  chatSessions.delete(key);
  document.getElementById(winId_(key))?.remove();
  if (s.logged) {
    const mins = Math.max(1, Math.round((Date.now() - s.startedAt) / 60000));
    recordStudioActivity(opts.auto ? 'Chat ended (idle)' : 'Chat ended',
      `${chatUser_()} ended the chat with ${s.name}${s.phone ? ' (' + s.phone + ')' : ''} from ${s.sender}: ${s.sent} sent, ${s.received} received, ${mins} min`, false);
    if (!opts.skipPush) { clearTimeout(chatSyncTimer); try { pushToGitHubDatabase(`${chatUser_()}: chat with ${s.name} ended`); } catch (e) {} }
  }
  updateChatLauncher_();
  if (!opts.silent) showCRMToast(`Chat with ${s.name} ended and saved.`, 'check_circle');
}
function endAllChats() {
  const keys = [...chatSessions.keys()];
  if (!keys.length) { showCRMToast('No chats are open.', 'info'); return; }
  keys.forEach(k => endChat_(k, { silent: true, skipPush: true }));
  try { pushToGitHubDatabase(`${chatUser_()}: ended ${keys.length} chat(s)`); } catch (e) {}
  showCRMToast(`${keys.length} chat(s) ended and saved.`, 'check_circle');
}
setInterval(() => {
  const now = Date.now();
  [...chatSessions.values()].forEach(s => { if (s.logged && now - s.lastAt > CHAT_IDLE_END_MS) endChat_(s.key, { auto: true, silent: true }); });
}, 60000);

/* ---------- reply alerts ---------- */
function notifyIncoming_(lead, text, phone) {
  const s = getSession_(lead || null, phone || (lead && (lead.contactPhone || lead.phone)) || '');
  s.unread += 1;
  noteChatEvent_(s, 'received');
  showCRMToast(`New reply from ${s.name}: ${String(text || '').slice(0, 60)}`, 'chat');
  try { if ('Notification' in window && Notification.permission === 'granted') new Notification(`Reply from ${s.name}`, { body: String(text || '').slice(0, 120) }); } catch (e) {}
  renderWin_(s.key);
}
function enableReplyAlerts() {
  if (!('Notification' in window)) { showCRMToast('This browser does not support alerts.', 'warning'); return; }
  Notification.requestPermission().then(p => showCRMToast(p === 'granted' ? 'Reply alerts are on.' : 'Alerts are blocked in your browser settings.', p === 'granted' ? 'notifications_active' : 'warning'));
}

/* ---------- send mode: official WhatsApp (default) or the linked bridge ---------- */
function getSendMode_() { return loadWaPrefs_().sendMode === 'bridge' ? 'bridge' : 'official'; }
function setSendMode(v) { saveWaPrefs_({ sendMode: v === 'bridge' ? 'bridge' : 'official' }); showCRMToast(v === 'bridge' ? 'Sending through the linked bridge.' : 'Sending with official WhatsApp (you press send).', 'check_circle'); }

/* ---------- bridge status and incoming messages ---------- */
function trackedNumbers_() {
  const set = new Set();
  (crmState.leads || []).forEach(l => { const d = String(l.contactPhone || l.phone || '').replace(/\D/g, ''); if (d.length >= 7) set.add(d); });
  chatSessions.forEach(s => { if (s.phone) set.add(s.phone); });
  return [...set];
}
function senderPort_() { return getActiveSender_().port || 3030; }
async function pollBridge_() {
  const port = senderPort_();
  try {
    const ctrl = new AbortController(); setTimeout(() => ctrl.abort(), 1500);
    const r = await fetch(`http://localhost:${port}/api/status`, { cache: 'no-store', signal: ctrl.signal });
    const data = await r.json();
    try { fetch(`http://localhost:${port}/api/track`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ numbers: trackedNumbers_() }) }).catch(() => {}); } catch (e) {}
    const wa = (data.state && data.state.wa) || {};
    chatBridge = { status: wa.status || 'ON', number: wa.number || '', ready: wa.status === 'READY' };
    (data.state?.messageLedger || []).filter(m => m.direction === 'INCOMING').forEach(item => ingestIncoming_(item));
  } catch (e) { chatBridge = { status: 'OFF', number: '', ready: false }; }
  document.querySelectorAll('.chat-bridge-chip').forEach(el => { el.textContent = bridgeText_(); el.dataset.state = chatBridge.ready ? 'ok' : 'off'; });
  updateChatLauncher_();
}
function bridgeText_() {
  if (chatBridge.ready) return getSendMode_() === 'bridge' ? `Bridge linked (+${chatBridge.number}). Sending automatically; only your CRM clients are tracked.` : `Sending with official WhatsApp. Bridge is linked (+${chatBridge.number}) and tracks only your CRM clients' replies.`;
  if (chatBridge.status === 'QR') return 'Scan the QR code on the Link page to finish linking.';
  if (chatBridge.status === 'NOT_INSTALLED') return 'Bridge needs a one-time install. Run start-whatsapp-bridge.bat.';
  if (chatBridge.status === 'OFF') return 'Official WhatsApp opens with your message. Replies are logged by hand, or turn on the bridge.';
  if (chatBridge.status === 'ON') return 'Old bridge is running. Run start-whatsapp-bridge.bat again to update it.';
  return `Bridge: ${chatBridge.status}`;
}
const seenIncoming_ = new Set();
function ingestIncoming_(item) {
  const id = item.timestamp + '|' + String(item.text).slice(0, 30) + '|' + item.from;
  if (seenIncoming_.has(id)) return; seenIncoming_.add(id);
  const digits = String(item.from || '').replace(/\D/g, '');
  const lead = (crmState.leads || []).find(l => { const p = String(l.contactPhone || l.phone || '').replace(/\D/g, ''); return p && (p === digits || p.slice(-10) === digits.slice(-10)); });
  if (!lead && !chatSessions.has('N:' + digits)) return; // not a CRM contact and not a chat you opened: ignore completely
  const s = getSession_(lead || null, digits);
  const hist = threadOf_(s);
  if (hist.some(m => m.timestamp === item.timestamp || (m.direction === 'INCOMING' && m.text === item.text))) return;
  pushThread_(s, { direction: 'INCOMING', author: s.name, text: item.text, timestamp: item.timestamp });
  notifyIncoming_(lead || null, item.text, digits);
}
setInterval(() => { if (!document.hidden) pollBridge_(); }, 6000);

/* ---------- email from a chosen account ---------- */
function mailUrl_(s, text, lead) {
  const q = new URLSearchParams({ view: 'cm', fs: '1', to: (lead && (lead.clientEmail || lead.email)) || '', su: `${getFullAgencyTitle()}${lead ? ' - ' + (lead.service || 'your project') : ''}`, body: waSafeText(text) });
  const em = getActiveSender_().email; if (em) q.set('authuser', em);
  return 'https://mail.google.com/mail/?' + q.toString();
}
function sendWaDraftByEmail() {
  const draft = (document.getElementById('wa-cmd-draft')?.value || '').trim();
  if (!draft) { showCRMToast('Write or pick a message first.', 'warning'); return; }
  const leadId = document.getElementById('wa-cmd-client-select')?.value;
  const lead = (globalState.leads || []).find(l => l.id === leadId) || null;
  window.open(mailUrl_(getActiveSender_(), draft, lead), '_blank', 'noopener');
  const s = getSession_(lead, document.getElementById('wa-cmd-phone')?.value || '');
  pushThread_(s, { direction: 'OUTGOING', author: chatUser_(), via: 'Email from ' + (getActiveSender_().email || getActiveSender_().label), text: waSafeText(draft) });
  noteChatEvent_(s, 'sent');
  renderWaThread();
  showCRMToast('Gmail opened as ' + (getActiveSender_().email || 'your default account') + '.', 'mail');
}
function commandCenterSendNoted_(lead, rawPhone, text) {
  const s = getSession_(lead || null, rawPhone);
  pushThread_(s, { direction: 'OUTGOING', author: chatUser_(), via: getActiveSender_().label, text: waSafeText(text) });
  noteChatEvent_(s, 'sent');
}
function openCommandChatWindow() {
  const leadId = document.getElementById('wa-cmd-client-select')?.value || '';
  const phone = document.getElementById('wa-cmd-phone')?.value || '';
  openChatWindow(leadId, phone);
}

/* ---------- floating chat windows ---------- */
function winId_(key) { return 'chatwin-' + String(key).replace(/[^a-z0-9]/gi, '_'); }
function ensureChatLayer_() {
  if (document.getElementById('crm-chat-fab')) return;
  const fab = document.createElement('div');
  fab.id = 'crm-chat-fab';
  fab.innerHTML = `
    <button type="button" class="chat-fab-btn" onclick="toggleChatLauncher()" aria-label="Chats">
      <span class="material-symbols-outlined">forum</span><span>Chats</span><span id="chat-fab-count" class="chat-fab-badge hidden">0</span>
    </button>`;
  document.body.appendChild(fab);
  const launcher = document.createElement('div');
  launcher.id = 'crm-chat-launcher';
  launcher.className = 'hidden';
  launcher.innerHTML = `
    <div class="chat-dock-head"><strong>Chats</strong><button type="button" class="wa-paste" onclick="toggleChatLauncher()">Hide</button></div>
    <div class="chat-dock-body">
      <p class="wa-help">Up to ${MAX_CHAT_WINDOWS} chats at once, each in its own window.</p>
      <select id="chat-launch-client" class="wa-input"></select>
      <input id="chat-launch-phone" class="wa-input" placeholder="Or type a number with country code"/>
      <div class="flex flex-wrap gap-1.5">
        <button type="button" class="wa-chip wa-chip-on" onclick="launchChatFromPanel()">Open chat</button>
        <button type="button" class="wa-chip" onclick="launchChatFromPanel(true)">Open in new tab</button>
      </div>
      <div id="chat-active-list" class="flex flex-col gap-1.5"></div>
      <label class="wa-help" for="chat-send-mode">Send with</label>
      <select id="chat-send-mode" class="wa-input" onchange="setSendMode(this.value)">
        <option value="official">Official WhatsApp (opens WhatsApp, you press send)</option>
        <option value="bridge">Linked bridge (sends by itself, needs the bridge)</option>
      </select>
      <div class="flex flex-wrap gap-1.5">
        <button type="button" class="wa-chip wa-chip-accent" onclick="endAllChats()">End all chats</button>
        <button type="button" class="wa-chip" onclick="enableReplyAlerts()">Turn on alerts</button>
        <button type="button" class="wa-chip" onclick="window.open('http://localhost:'+senderPort_()+'/link','_blank','noopener')">Link WhatsApp</button>
        <button type="button" class="wa-chip" onclick="exportMyChats()">Back up my chats</button>
      </div>
      <p class="wa-help chat-bridge-chip"></p>
      <p class="wa-help wa-sender-help"></p>
    </div>`;
  document.body.appendChild(launcher);
  const layer = document.createElement('div'); layer.id = 'crm-chat-layer'; document.body.appendChild(layer);
}
function toggleChatLauncher() {
  ensureChatLayer_();
  const el = document.getElementById('crm-chat-launcher');
  const open = el.classList.contains('hidden');
  el.classList.toggle('hidden', !open);
  if (open) {
    const sel = document.getElementById('chat-launch-client');
    sel.innerHTML = '<option value="">Choose a client</option>' + (globalState.leads || []).map(l => `<option value="${escapeHtml(l.id)}">${escapeHtml(l.clientName)}</option>`).join('');
    renderSenderControls_(); updateChatLauncher_(); pollBridge_();
    const sm = document.getElementById('chat-send-mode'); if (sm) sm.value = getSendMode_();
  }
}
function launchChatFromPanel(newTab) {
  const id = document.getElementById('chat-launch-client').value;
  const phone = document.getElementById('chat-launch-phone').value.trim();
  if (newTab && id) { window.open(location.pathname + '?chat=' + encodeURIComponent(id), '_blank', 'noopener'); return; }
  openChatWindow(id, phone);
}
function updateChatLauncher_() {
  const n = chatSessions.size;
  const unread = [...chatSessions.values()].reduce((a, s) => a + (s.unread || 0), 0);
  const badge = document.getElementById('chat-fab-count');
  if (badge) { badge.textContent = unread || n; badge.classList.toggle('hidden', n === 0 && !unread); badge.dataset.unread = unread ? '1' : '0'; }
  const list = document.getElementById('chat-active-list');
  if (list) list.innerHTML = [...chatSessions.values()].map(s => `
    <div class="chat-active-row"><button type="button" class="chat-active-name" onclick="focusChatWindow('${s.key}')">${escapeHtml(s.name)}${s.unread ? ' (' + s.unread + ' new)' : ''}</button>
    <button type="button" class="wa-paste" onclick="endChat_('${s.key}')">End</button></div>`).join('') || '<span class="wa-help">No chats open.</span>';
}
function openChatWindow(leadId, phone, opts) {
  ensureChatLayer_();
  const lead = (globalState.leads || []).find(l => l.id === leadId) || null;
  const digits = String(phone || '').replace(/\D/g, '');
  if (!lead && !digits) { showCRMToast('Choose a client or type a number.', 'warning'); return; }
  const s = getSession_(lead, digits);
  let win = document.getElementById(winId_(s.key));
  if (!win) {
    if (document.querySelectorAll('.chat-win').length >= MAX_CHAT_WINDOWS) { showCRMToast(`You can have ${MAX_CHAT_WINDOWS} chat windows open. End or close one first.`, 'warning'); return; }
    win = document.createElement('div');
    win.id = winId_(s.key); win.className = 'chat-win'; win.dataset.key = s.key;
    const idx = document.querySelectorAll('.chat-win').length;
    win.style.right = (24 + idx * 372) + 'px'; win.style.bottom = '84px';
    const tone = loadWaPrefs_().tone || 'friendly';
    win.innerHTML = `
      <div class="chat-win-head" data-drag>
        <div class="chat-win-title"><strong class="chat-win-name"></strong><span class="chat-win-sub"></span></div>
        <div class="chat-win-btns">
          <button type="button" class="wa-paste" title="Open in a new tab" onclick="openChatTab('${s.key}')">New tab</button>
          <button type="button" class="wa-paste" title="Shrink" onclick="toggleMinChat('${s.key}')">Min</button>
          <button type="button" class="wa-paste chat-end" onclick="endChat_('${s.key}')">End chat</button>
          <button type="button" class="wa-paste" title="Hide window, chat stays open" onclick="hideChatWindow('${s.key}')">X</button>
        </div>
      </div>
      <div class="chat-win-body">
        <p class="wa-help chat-bridge-chip"></p>
        <div class="wa-thread chat-thread"></div>
        <details class="chat-more">
          <summary>Writing helper, AI and email</summary>
          <div class="chat-more-body">
        <div class="grid grid-cols-2 gap-1.5">
              <select class="wa-input" data-role="tone" onchange="saveWaPrefs_({tone:this.value})">
                ${Object.entries(WA_TONES).map(([k, v]) => `<option value="${k}"${k === tone ? ' selected' : ''}>${v}</option>`).join('')}
              </select>
              <select class="wa-input" data-role="tpl" onchange="winTemplate_('${s.key}', this.value); this.value=''">
                <option value="">Write for me...</option><option value="pitch">Introduce our studio</option><option value="welcome">Kickoff</option>
                <option value="video_cut">Video ready</option><option value="payment_request">Payment request</option><option value="follow_up">Follow-up</option>
              </select>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <button type="button" class="wa-paste" onclick="winRefine_('${s.key}','claude')">Refine with Claude</button>
              <button type="button" class="wa-paste" onclick="winRefine_('${s.key}','gemini')">Refine with Gemini</button>
              <button type="button" class="wa-paste" onclick="winPasteAi_('${s.key}')">Paste AI reply</button>
            </div>
          </div>
        </details>
        <textarea class="wa-input chat-input" data-role="input" rows="3" placeholder="Type your message"></textarea>
        <div class="flex flex-wrap gap-1.5">
          <button type="button" class="wa-chip wa-chip-on" onclick="winSend_('${s.key}')">Send</button>
          <button type="button" class="wa-chip" onclick="winLogReply_('${s.key}')">Log client reply</button>
          <button type="button" class="wa-chip" onclick="winEmail_('${s.key}')">Email</button>
          <button type="button" class="wa-chip wa-chip-accent chat-save-client hidden" onclick="saveChatAsClient_('${s.key}')">Save as client</button>
        </div>
      </div>`;
    document.getElementById('crm-chat-layer').appendChild(win);
    makeDraggable_(win);
  }
  win.classList.remove('chat-hidden', 'chat-min');
  if (opts && opts.full) win.classList.add('chat-win-full');
  s.unread = 0;
  renderWin_(s.key);
  win.querySelector('[data-role="input"]').focus();
  document.getElementById('crm-chat-launcher')?.classList.add('hidden');
  updateChatLauncher_();
  pollBridge_();
}
function focusChatWindow(key) { const w = document.getElementById(winId_(key)); if (w) { w.classList.remove('chat-hidden', 'chat-min'); const s = chatSessions.get(key); if (s) s.unread = 0; renderWin_(key); updateChatLauncher_(); } }
function hideChatWindow(key) { document.getElementById(winId_(key))?.classList.add('chat-hidden'); }
function toggleMinChat(key) { document.getElementById(winId_(key))?.classList.toggle('chat-min'); }
function openChatTab(key) { const s = chatSessions.get(key); if (s && s.leadId) window.open(location.pathname + '?chat=' + encodeURIComponent(s.leadId), '_blank', 'noopener'); else showCRMToast('New tab works for saved clients. Save this number as a deal first.', 'info'); }
function makeDraggable_(win) {
  const head = win.querySelector('[data-drag]'); let sx, sy, ox, oy, drag = false;
  head.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; drag = true; const r = win.getBoundingClientRect(); sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top; head.setPointerCapture(e.pointerId); });
  head.addEventListener('pointermove', e => { if (!drag) return; win.style.left = Math.max(0, ox + e.clientX - sx) + 'px'; win.style.top = Math.max(0, oy + e.clientY - sy) + 'px'; win.style.right = 'auto'; win.style.bottom = 'auto'; });
  head.addEventListener('pointerup', () => { drag = false; });
}
function renderWin_(key) {
  const s = chatSessions.get(key), win = document.getElementById(winId_(key)); if (!s || !win) return;
  win.querySelector('.chat-win-name').textContent = s.name;
  win.querySelector('.chat-win-sub').textContent = (s.phone ? '+' + s.phone + ' | ' : '') + 'from ' + s.sender;
  const box = win.querySelector('.chat-thread');
  const esc = t => String(t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const hist = visibleChat_(threadOf_(s)).slice(-40);
  box.innerHTML = hist.length ? hist.map(m => {
    const mine = m.direction === 'OUTGOING';
    const when = m.timestamp ? new Date(m.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
    return `<div class="wa-msg ${mine ? 'wa-msg-out' : 'wa-msg-in'}"><div class="wa-msg-who">${mine ? esc(m.author || 'You') : esc(s.name)} <span>${esc(when)}${m.via ? ' | ' + esc(m.via) : ''}</span></div><div>${esc(String(m.text).slice(0, 600))}</div></div>`;
  }).join('') : '<span class="wa-help">No messages yet. Your chat history is stored only on this computer.</span>';
  box.scrollTop = box.scrollHeight;
  win.querySelector('.chat-bridge-chip').textContent = bridgeText_();
  win.querySelector('.chat-save-client')?.classList.toggle('hidden', !!s.leadId);
}
function winTemplate_(key, type) {
  if (!type) return; const s = chatSessions.get(key), win = document.getElementById(winId_(key)); if (!s || !win) return;
  const tone = win.querySelector('[data-role="tone"]').value;
  win.querySelector('[data-role="input"]').value = buildWaMessage(type, tone, s.leadId || '');
}
function winRefine_(key, which) {
  const win = document.getElementById(winId_(key)); if (!win) return;
  const draft = win.querySelector('[data-role="input"]').value.trim();
  const tone = WA_TONES[win.querySelector('[data-role="tone"]').value] || '';
  if (!draft) { showCRMToast('Write or pick a message first.', 'warning'); return; }
  const prompt = `Rewrite this WhatsApp message from a video production studio to a client.\nTone and audience: ${tone}.\nKeep every link, amount and name exactly as written. Keep it short, warm and persuasive, with no emojis, and end with one clear next step.\nReturn only the final message.\n\nMessage:\n${draft}`;
  (navigator.clipboard ? navigator.clipboard.writeText(prompt).catch(() => {}) : Promise.resolve()).then(() =>
    showCRMToast(which === 'gemini' ? 'Prompt copied. Press Ctrl+V in Gemini, then copy its answer and press Paste AI reply.' : 'Claude opened with your prompt. Copy its answer, then press Paste AI reply.', 'auto_awesome'));
  window.open(which === 'gemini' ? 'https://gemini.google.com/app' : 'https://claude.ai/new?q=' + encodeURIComponent(prompt), '_blank', 'noopener');
}
async function winPasteAi_(key) {
  const win = document.getElementById(winId_(key)); if (!win) return;
  try {
    const text = (await navigator.clipboard.readText() || '').trim();
    if (!text) { showCRMToast('Clipboard is empty. Copy the AI answer first.', 'warning'); return; }
    win.querySelector('[data-role="input"]').value = waSafeText(text);
    showCRMToast('AI answer placed in the box. Edit it, then press Send.', 'check_circle');
  } catch (e) { showCRMToast('Clipboard blocked. Click the box and press Ctrl+V.', 'warning'); }
}
async function winSend_(key) {
  const s = chatSessions.get(key), win = document.getElementById(winId_(key)); if (!s || !win) return;
  const input = win.querySelector('[data-role="input"]');
  const text = waSafeText(input.value);
  if (!text) { showCRMToast('Type a message first.', 'warning'); return; }
  if (!s.phone) { showCRMToast('This chat has no WhatsApp number. Add the number to the client or type it in Chats.', 'warning'); return; }
  const sender = getActiveSender_();
  let delivered = false;
  if (chatBridge.ready && getSendMode_() === 'bridge') {
    try {
      const r = await fetch(`http://localhost:${sender.port || 3030}/api/send-message`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: s.phone, text, leadId: s.leadId }) });
      const j = await r.json().catch(() => ({}));
      delivered = r.ok && j.status === 'SENT';
    } catch (e) {}
  }
  if (!delivered) window.open(waLink_(s.phone, text), '_blank', 'noopener');
  pushThread_(s, { direction: 'OUTGOING', author: chatUser_(), via: delivered ? 'WhatsApp (linked)' : 'WhatsApp Web', text });
  noteChatEvent_(s, 'sent');
  input.value = '';
  renderWin_(key);
  showCRMToast(delivered ? 'Sent through the linked bridge.' : 'WhatsApp opened with your message. Press send there.', delivered ? 'check_circle' : 'chat');
}
function winLogReply_(key) {
  const s = chatSessions.get(key), win = document.getElementById(winId_(key)); if (!s || !win) return;
  const input = win.querySelector('[data-role="input"]');
  const text = input.value.trim() || prompt(`Paste the reply from ${s.name}:`);
  if (!text || !text.trim()) return;
  pushThread_(s, { direction: 'INCOMING', author: s.name, text: text.trim() });
  noteChatEvent_(s, 'received'); input.value = ''; renderWin_(key);
  showCRMToast('Reply saved. The waiting timer was reset.', 'check_circle');
}
function winEmail_(key) {
  const s = chatSessions.get(key), win = document.getElementById(winId_(key)); if (!s || !win) return;
  const input = win.querySelector('[data-role="input"]'); const text = input.value.trim();
  if (!text) { showCRMToast('Type a message first.', 'warning'); return; }
  const lead = (globalState.leads || []).find(l => l.id === s.leadId) || null;
  window.open(mailUrl_(getActiveSender_(), text, lead), '_blank', 'noopener');
  pushThread_(s, { direction: 'OUTGOING', author: chatUser_(), via: 'Email from ' + (getActiveSender_().email || getActiveSender_().label), text: waSafeText(text) });
  noteChatEvent_(s, 'sent'); input.value = ''; renderWin_(key);
}


/* ---------- turn a prospect (number only) into a saved client ---------- */
function saveChatAsClient_(key) {
  const s = chatSessions.get(key); if (!s || s.leadId) return;
  const name = (prompt('Client or brand name for ' + (s.phone ? '+' + s.phone : 'this number') + ':') || '').trim();
  if (!name) return;
  const service = (prompt('What do they need? (for example Reel editing)', 'Creative Video Project') || 'Creative Video Project').trim();
  const partners = (typeof getActivePartners === 'function' ? getActivePartners() : []) || [];
  const mine = partners.find(p => sameUser_(p.name, chatUser_())) || partners[0];
  const lead = normalizeLead_({
    id: 'LEAD-' + Date.now(), clientName: name, contactPhone: s.phone, service, stage: 'Identified', source: 'WhatsApp',
    country: 'India', dealValue: 0, partner: mine ? mine.name : chatUser_(), payments: [],
    lastInteractionAt: Date.now(), lastInteractionType: 'whatsapp_sent', updatedAt: Date.now(), createdAt: Date.now()
  });
  lead.chatHistory = threadOf_(s).slice();
  globalState.leads.unshift(lead);
  const store = readJson_(NUM_CHAT_KEY); delete store[s.key]; try { localStorage.setItem(NUM_CHAT_KEY, JSON.stringify(store)); } catch (e) {}
  saveToLocalCache();
  recordStudioActivity('Added Client Deal', `${chatUser_()} saved ${name} (+${s.phone}) as a new lead from a WhatsApp chat`, false);
  try { pushToGitHubDatabase(`${chatUser_()}: saved ${name} as a lead`); } catch (e) {}
  endChat_(key, { silent: true, skipPush: true });
  try { renderKanban(); renderHeaderAndMetrics(); } catch (e) {}
  openChatWindow(lead.id, '');
  showCRMToast(`${name} is now a client in the Project Board (Identified).`, 'person_add');
}

/* ---------- back up this partner's chats to a file ---------- */
function exportMyChats() {
  const me = chatUser_();
  const out = { exportedBy: me, exportedAt: new Date().toISOString(), deals: [], numbers: [] };
  (crmState.leads || []).forEach(l => { const m = visibleChat_(l.chatHistory); if (m.length) out.deals.push({ client: l.clientName, phone: l.contactPhone || l.phone || '', messages: m }); });
  const nums = readJson_(NUM_CHAT_KEY); Object.keys(nums).forEach(k => { const m = visibleChat_(nums[k]); if (m.length) out.numbers.push({ number: k.replace('N:', ''), messages: m }); });
  const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `beRich-chats-${me || 'me'}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  showCRMToast('Chat backup saved to your Downloads folder. Keep it private.', 'download');
}

/* ---------- keep chats out of GitHub, and keep them after a pull ---------- */
const __origBuildPayload_ = buildGitHubDatabasePayload_;
buildGitHubDatabasePayload_ = function () {
  const p = __origBuildPayload_();
  p.leads = (p.leads || []).map(l => { const c = { ...l }; c.chatCount = Array.isArray(l.chatHistory) ? l.chatHistory.length : 0; c.chatHistory = []; return c; });
  return p;
};
const __origApplyPayload_ = applyGitHubDatabasePayload_;
applyGitHubDatabasePayload_ = function (p) { persistChats_(); const r = __origApplyPayload_(p); rehydrateChats_(); return r; };

function purgeUntrackedChats_() {
  try {
    if (localStorage.getItem('beRich_purge_v1')) return;
    const store = readJson_(NUM_CHAT_KEY); let removed = 0;
    Object.keys(store).forEach(k => { const msgs = store[k] || []; if (msgs.length && msgs.every(m => m.direction === 'INCOMING')) { delete store[k]; removed++; } });
    localStorage.setItem(NUM_CHAT_KEY, JSON.stringify(store));
    localStorage.setItem('beRich_purge_v1', '1');
    [...chatSessions.keys()].forEach(k => { const s = chatSessions.get(k); if (s && !s.leadId && s.sent === 0) { chatSessions.delete(k); document.getElementById(winId_(k))?.remove(); } });
    updateChatLauncher_();
    if (removed) console.info('Removed ' + removed + ' captured chats from numbers that are not CRM clients.');
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(purgeUntrackedChats_, 1500);
  try { rehydrateChats_(); ensureChatLayer_(); renderSenderControls_(); } catch (e) { console.warn('chat init:', e); }
  const want = new URLSearchParams(location.search).get('chat');
  if (want) setTimeout(() => { try { openChatWindow(want, '', { full: true }); } catch (e) {} }, 1800);
});
window.addEventListener('beforeunload', () => { try { persistChats_(); } catch (e) {} });

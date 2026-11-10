/**
 * ============================================================================
 * Frame3 CutCraft Studio — 3-Partner Agency CRM Backend (Google Apps Script)
 * ============================================================================
 * Primary Currency: Indian Rupee (₹ / INR)
 * Tabs in Google Sheet:
 *   1. 'Leads'
 *   2. 'Tech Stack'
 *   3. 'Revenue'
 *
 * Run `setupDatabase()` in the Apps Script editor to initialize clean-slate
 * tabs with headers (and wipe any old demo data using `clearAllDemoData()`).
 * ============================================================================
 */

const SHEET_NAMES = {
  LEADS: 'Leads',
  TECH_STACK: 'Tech Stack',
  REVENUE: 'Revenue'
};

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'getAll';

    // Instant Mobile UPI Deep-Link & QR Payment Page for WhatsApp Clickable Links (India)
    if (action === 'pay') {
      const pa = (e.parameter.pa || 'studio@upi').trim();
      const pn = (e.parameter.pn || 'Studio Payment').trim();
      const am = parseFloat(e.parameter.am) || 0;
      const upiUri = 'upi://pay?pa=' + encodeURIComponent(pa) + '&pn=' + encodeURIComponent(pn) + (am > 0 ? '&am=' + am : '') + '&cu=INR';
      const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=16&data=' + encodeURIComponent(upiUri);
      const html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<title>Pay ' + pn + ' (₹' + am.toLocaleString('en-IN') + ')</title>' +
        '<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#060913;color:#fff;font-family:sans-serif;padding:20px;box-sizing:border-box}' +
        '.card{max-width:400px;width:100%;background:#101928;border:1px solid rgba(255,255,255,0.12);border-radius:24px;padding:28px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,0.7)}' +
        '.amt{font-size:40px;font-weight:700;color:#2DD4BF;margin:10px 0}.qr{background:#fff;padding:14px;border-radius:16px;display:inline-block;margin:14px 0}' +
        '.btn{display:block;width:100%;padding:14px;border-radius:999px;background:#2DD4BF;color:#041311;font-weight:700;text-decoration:none;margin-top:14px;box-sizing:border-box}</style>' +
        '<script>window.onload=function(){setTimeout(function(){window.location.href=' + JSON.stringify(upiUri) + ';},300);};</script></head>' +
        '<body><div class="card"><div style="font-size:12px;color:#94A3B8;letter-spacing:0.12em">INSTANT UPI PAYMENT (INR ₹)</div>' +
        '<h2 style="margin:8px 0 4px">' + pn + '</h2><div class="amt">₹' + am.toLocaleString('en-IN') + '</div>' +
        '<div class="qr"><img src="' + qrUrl + '" width="220" height="220" alt="UPI QR"></div>' +
        '<div style="font-family:monospace;color:#FBBF24;font-size:14px;margin-bottom:8px">UPI ID: ' + pa + '</div>' +
        '<a class="btn" href="' + upiUri + '">Open GPay / PhonePe / Paytm</a></div></body></html>';
      return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }

    if (!isAuthorized_(e && e.parameter && e.parameter.key)) {
      return jsonResponse_({ status: 'error', message: 'Not authorized' });
    }

    ensureSheetsExist_();
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === 'getLeads') {
      return jsonResponse_({ status: 'success', leads: getSheetRowsAsObjects_(ss.getSheetByName(SHEET_NAMES.LEADS)) });
    }
    if (action === 'getTechStack') {
      return jsonResponse_({ status: 'success', techStack: getSheetRowsAsObjects_(ss.getSheetByName(SHEET_NAMES.TECH_STACK)) });
    }
    if (action === 'getRevenue') {
      return jsonResponse_({ status: 'success', revenue: getSheetRowsAsObjects_(ss.getSheetByName(SHEET_NAMES.REVENUE)) });
    }

    const leads = getSheetRowsAsObjects_(ss.getSheetByName(SHEET_NAMES.LEADS));
    const techStack = getSheetRowsAsObjects_(ss.getSheetByName(SHEET_NAMES.TECH_STACK));
    const revenue = getSheetRowsAsObjects_(ss.getSheetByName(SHEET_NAMES.REVENUE));
    const metrics = calculateSummaryMetrics_(leads, techStack, revenue);

    return jsonResponse_({
      status: 'success',
      currency: 'INR',
      timestamp: new Date().toISOString(),
      leads: leads,
      techStack: techStack,
      revenue: revenue,
      metrics: metrics
    });
  } catch (err) {
    return jsonResponse_({ status: 'error', message: err.toString() });
  }
}

function doPost(e) {
  try {
    const rawBody = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    const payload = JSON.parse(rawBody);
    if (!isAuthorized_(payload.key)) {
      return jsonResponse_({ status: 'error', message: 'Not authorized' });
    }
    delete payload.key;
    ensureSheetsExist_();
    const action = payload.action || '';
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    switch (action) {
      case 'addLead': {
        const result = addLeadToSheet_(ss.getSheetByName(SHEET_NAMES.LEADS), payload.lead || payload);
        if (String(result.stage).toLowerCase() === 'closed won') {
          addRevenueEntry_(ss.getSheetByName(SHEET_NAMES.REVENUE), {
            invoiceId: 'INV-' + Math.floor(1000 + Math.random() * 9000),
            clientName: result.clientName,
            partner: result.partner,
            grossAmount: result.dealValue,
            laborCost: result.laborCost,
            toolCost: result.toolCost,
            netProfit: result.netProfit,
            marginPercent: result.marginPercent,
            status: 'Paid',
            date: new Date().toISOString().split('T')[0]
          });
        }
        return jsonResponse_({ status: 'success', message: 'Lead added in INR (₹)', lead: result });
      }

      case 'updateLead': {
        const updated = updateLeadInSheet_(ss.getSheetByName(SHEET_NAMES.LEADS), payload);
        return jsonResponse_({ status: 'success', message: 'Lead updated successfully', lead: updated });
      }

      case 'sendEmail':
      case 'sendFollowUp':
      case 'sampleDelivered': {
        const emailResult = sendAutomatedClientEmail(payload);
        return jsonResponse_({ status: 'success', message: emailResult.message, emailResult: emailResult });
      }

      case 'addTool': {
        const tool = addToolToSheet_(ss.getSheetByName(SHEET_NAMES.TECH_STACK), payload.tool || payload);
        return jsonResponse_({ status: 'success', message: 'Tool added in INR (₹)', tool: tool });
      }

      case 'addRevenue': {
        const rev = addRevenueEntry_(ss.getSheetByName(SHEET_NAMES.REVENUE), payload.revenue || payload);
        return jsonResponse_({ status: 'success', message: 'Revenue recorded in INR (₹)', revenue: rev });
      }

      case 'clearAllData': {
        clearAllDemoData();
        return jsonResponse_({ status: 'success', message: 'All sheet tabs wiped to a clean slate' });
      }

      default:
        return jsonResponse_({ status: 'error', message: 'Unknown POST action: ' + action });
    }
  } catch (err) {
    return jsonResponse_({ status: 'error', message: err.toString() });
  }
}

/**
 * ============================================================================
 * EMAIL AUTOMATION (MailApp.sendEmail)
 * ============================================================================
 */
function sendAutomatedClientEmail(payload) {
  const emailType = payload.emailType || (payload.action === 'sampleDelivered' ? 'sample_delivered' : 'follow_up');
  const clientName = payload.clientName || 'Valued Client';
  const clientEmail = (payload.clientEmail || '').trim();
  const partner = payload.partner || 'Partner 1';
  const service = payload.service || 'Cinematic Video & Audio Production';
  const sampleUrl = payload.sampleUrl || 'https://frame.io/';
  const customNote = payload.customNote || '';
  const agencyName = (payload.agencyName || 'Frame3').trim();
  const agencyTagline = (payload.agencyTagline || 'CutCraft Studio').trim();
  const fullAgencyTitle = (agencyName + ' ' + agencyTagline).trim();

  if (!clientEmail) {
    throw new Error('Client email address is required to send an email.');
  }

  const senderSignature = payload.senderSignature || (partner + ' — ' + fullAgencyTitle);
  let subject = '';
  let plainBody = '';
  let htmlBody = '';

  if (emailType === 'sample_delivered') {
    subject = '🎬 Your Custom Sample Cut is Ready — ' + clientName + ' x ' + fullAgencyTitle;
    plainBody = [
      'Hi ' + clientName + ' team,',
      '',
      'Your custom sample cut for ' + service + ' is officially rendered and ready for review!',
      '',
      '🔗 Review Link: ' + sampleUrl,
      customNote ? ('\nCreative Note: ' + customNote) : '',
      '',
      'Let us know your thoughts or drop frame-accurate comments directly on the timeline.',
      '',
      'Best regards,',
      senderSignature
    ].join('\n');

    htmlBody = '<div style="font-family:Inter,Segoe UI,sans-serif;background:#0f131d;color:#dfe2f1;padding:28px;border-radius:14px;max-width:600px;border:1px solid #313540;">' +
      '<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#4cd7f6;font-weight:700;">' + escapeHtml_(agencyName) + ' • ' + escapeHtml_(agencyTagline) + '</div>' +
      '<h2 style="color:#ffffff;margin:8px 0 16px;font-size:20px;">Your Custom Sample Cut is Ready for Review 🎬</h2>' +
      '<p style="color:#cbc3d7;line-height:1.6;">Hi <strong>' + escapeHtml_(clientName) + '</strong> team,</p>' +
      '<p style="color:#cbc3d7;line-height:1.6;">We have finished rendering your sample cut for <strong style="color:#d0bcff;">' + escapeHtml_(service) + '</strong>.</p>' +
      (customNote ? '<div style="background:#171b26;padding:12px 16px;border-left:3px solid #a078ff;border-radius:6px;margin:16px 0;color:#dfe2f1;font-size:13px;">' + escapeHtml_(customNote) + '</div>' : '') +
      '<div style="margin:24px 0;">' +
      '<a href="' + escapeHtml_(sampleUrl) + '" style="background:#a078ff;color:#23005c;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700;display:inline-block;">▶ Watch Sample Cut</a>' +
      '</div>' +
      '<hr style="border:none;border-top:1px solid #262a35;margin:20px 0;"/>' +
      '<p style="color:#cbc3d7;font-size:13px;margin:0;"><strong>' + escapeHtml_(senderSignature) + '</strong></p>' +
      '</div>';
  } else {
    subject = 'Quick follow-up: ' + clientName + ' x ' + fullAgencyTitle + ' (' + service + ')';
    plainBody = [
      'Hi ' + clientName + ' team,',
      '',
      'Wanted to quickly follow up regarding our ' + service + ' pipeline for ' + clientName + '.',
      customNote ? ('\n' + customNote + '\n') : '',
      '🔗 Portfolio / Sample Link: ' + sampleUrl,
      '',
      'Best regards,',
      senderSignature
    ].join('\n');

    htmlBody = '<div style="font-family:Inter,Segoe UI,sans-serif;background:#0f131d;color:#dfe2f1;padding:28px;border-radius:14px;max-width:600px;border:1px solid #313540;">' +
      '<div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#d0bcff;font-weight:700;">' + escapeHtml_(agencyName) + ' • ' + escapeHtml_(agencyTagline) + '</div>' +
      '<h2 style="color:#ffffff;margin:8px 0 16px;font-size:20px;">Creative Pipeline Follow-Up ⚡</h2>' +
      '<p style="color:#cbc3d7;line-height:1.6;">Hi <strong>' + escapeHtml_(clientName) + '</strong> team,</p>' +
      '<p style="color:#cbc3d7;line-height:1.6;">Following up on our <strong style="color:#4cd7f6;">' + escapeHtml_(service) + '</strong> proposal for your brand.</p>' +
      (customNote ? '<div style="background:#171b26;padding:12px 16px;border-left:3px solid #4cd7f6;border-radius:6px;margin:16px 0;color:#dfe2f1;font-size:13px;">' + escapeHtml_(customNote) + '</div>' : '') +
      '<div style="margin:24px 0;">' +
      '<a href="' + escapeHtml_(sampleUrl) + '" style="background:#03b5d3;color:#001f26;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700;display:inline-block;">View Creative Reel / Dossier</a>' +
      '</div>' +
      '<hr style="border:none;border-top:1px solid #262a35;margin:20px 0;"/>' +
      '<p style="color:#cbc3d7;font-size:13px;margin:0;"><strong>' + escapeHtml_(senderSignature) + '</strong></p>' +
      '</div>';
  }

  MailApp.sendEmail({
    to: clientEmail,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    name: fullAgencyTitle + ' (' + partner + ')'
  });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const leadsSheet = ss.getSheetByName(SHEET_NAMES.LEADS);
  if (leadsSheet) {
    const updatePayload = {
      leadId: payload.leadId,
      clientName: clientName,
      lastContacted: new Date().toISOString()
    };
    if (emailType === 'sample_delivered') {
      updatePayload.sampleStatus = 'Free Sample: Delivered';
      if (!payload.keepStage) {
        updatePayload.stage = 'Sample Cut';
      }
    }
    updateLeadInSheet_(leadsSheet, updatePayload);
  }

  return {
    sentTo: clientEmail,
    emailType: emailType,
    subject: subject,
    timestamp: new Date().toISOString(),
    message: (emailType === 'sample_delivered' ? 'Sample Delivered email' : 'Follow-up email') + ' sent to ' + clientEmail
  };
}

/**
 * ============================================================================
 * SHEET CRUD & PROFIT MARGIN HELPERS (INR ₹)
 * ============================================================================
 */

function addLeadToSheet_(sheet, data) {
  const dealValue = parseFloat(data.dealValue) || 0;
  const estHours = parseFloat(data.estHours) || 0;
  const hourlyRate = parseFloat(data.hourlyRate) || 1000;
  const laborCost = Math.round(estHours * hourlyRate);
  const toolCost = Math.round(parseFloat(data.toolCost) || 0);
  const totalCost = laborCost + toolCost;
  const netProfit = Math.round(dealValue - totalCost);
  const marginPercent = dealValue > 0 ? Number(((netProfit / dealValue) * 100).toFixed(1)) : 0;

  const newLead = {
    id: data.id || ('LEAD-' + new Date().getTime()),
    clientName: data.clientName || 'Unnamed Brand',
    handle: data.handle || '@brand',
    clientEmail: data.clientEmail || '',
    country: data.country || '🇮🇳 IN',
    service: data.service || 'Vertical Video Ads (Reels)',
    source: data.source || 'Instagram DM',
    dealValue: dealValue,
    billingLabel: data.billingLabel || ('₹' + dealValue.toLocaleString('en-IN') + ' / mo'),
    partner: data.partner || 'Partner 1',
    stage: data.stage || 'Identified',
    sampleStatus: data.sampleStatus || 'Free Sample: Pending',
    sampleUrl: data.sampleUrl || 'https://frame.io/',
    toolsUsed: Array.isArray(data.toolsUsed) ? data.toolsUsed.join(', ') : (data.toolsUsed || ''),
    estHours: estHours,
    hourlyRate: hourlyRate,
    laborCost: laborCost,
    toolCost: toolCost,
    netProfit: netProfit,
    marginPercent: marginPercent,
    lastContacted: data.lastContacted || new Date().toISOString(),
    notes: data.notes || ''
  };

  const headers = getHeaders_(sheet);
  const row = headers.map(function(h) {
    return newLead[h] !== undefined ? newLead[h] : '';
  });
  sheet.appendRow(row);
  return newLead;
}

function updateLeadInSheet_(sheet, payload) {
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return null;
  const headers = data[0];
  const idIdx = headers.indexOf('id');
  const nameIdx = headers.indexOf('clientName');

  for (let r = 1; r < data.length; r++) {
    const rowId = idIdx >= 0 ? String(data[r][idIdx]) : '';
    const rowName = nameIdx >= 0 ? String(data[r][nameIdx]).toLowerCase() : '';
    const matchById = payload.id && rowId === String(payload.id);
    const matchByLeadId = payload.leadId && rowId === String(payload.leadId);
    const matchByName = payload.clientName && rowName === String(payload.clientName).toLowerCase();

    if (matchById || matchByLeadId || matchByName) {
      const currentObj = {};
      headers.forEach(function(h, i) { currentObj[h] = data[r][i]; });

      Object.keys(payload).forEach(function(k) {
        if (k !== 'action' && payload[k] !== undefined && headers.indexOf(k) >= 0) {
          currentObj[k] = Array.isArray(payload[k]) ? payload[k].join(', ') : payload[k];
        }
      });

      const dealValue = parseFloat(currentObj.dealValue) || 0;
      const estHours = parseFloat(currentObj.estHours) || 0;
      const hourlyRate = parseFloat(currentObj.hourlyRate) || 1000;
      const toolCost = parseFloat(currentObj.toolCost) || 0;
      const laborCost = Math.round(estHours * hourlyRate);
      const netProfit = Math.round(dealValue - (laborCost + toolCost));
      currentObj.laborCost = laborCost;
      currentObj.netProfit = netProfit;
      currentObj.marginPercent = dealValue > 0 ? Number(((netProfit / dealValue) * 100).toFixed(1)) : 0;

      const updatedRow = headers.map(function(h) { return currentObj[h]; });
      sheet.getRange(r + 1, 1, 1, headers.length).setValues([updatedRow]);
      return currentObj;
    }
  }
  return null;
}

function addToolToSheet_(sheet, toolData) {
  const newTool = {
    id: toolData.id || ('TOOL-' + new Date().getTime()),
    toolName: toolData.toolName || 'Production Tool',
    category: toolData.category || 'Editing & VFX',
    monthlyCost: parseFloat(toolData.monthlyCost) || 0,
    billingCycle: toolData.billingCycle || 'Monthly',
    costPerCut: parseFloat(toolData.costPerCut) || 0,
    assignedPartners: toolData.assignedPartners || 'Partner 1, Partner 2, Partner 3',
    renewalDaysLeft: parseInt(toolData.renewalDaysLeft, 10) || 30,
    status: toolData.status || 'Active',
    notes: toolData.notes || ''
  };
  const headers = getHeaders_(sheet);
  const row = headers.map(function(h) { return newTool[h] !== undefined ? newTool[h] : ''; });
  sheet.appendRow(row);
  return newTool;
}

function addRevenueEntry_(sheet, revData) {
  const entry = {
    invoiceId: revData.invoiceId || ('INV-' + Math.floor(1000 + Math.random() * 9000)),
    clientName: revData.clientName || 'Client',
    partner: revData.partner || 'Partner 1',
    grossAmount: parseFloat(revData.grossAmount) || 0,
    laborCost: parseFloat(revData.laborCost) || 0,
    toolCost: parseFloat(revData.toolCost) || 0,
    netProfit: parseFloat(revData.netProfit) || 0,
    marginPercent: parseFloat(revData.marginPercent) || 0,
    status: revData.status || 'Paid',
    date: revData.date || new Date().toISOString().split('T')[0]
  };
  const headers = getHeaders_(sheet);
  const row = headers.map(function(h) { return entry[h] !== undefined ? entry[h] : ''; });
  sheet.appendRow(row);
  return entry;
}

function calculateSummaryMetrics_(leads, techStack, revenue) {
  let unpaidPipeline = 0;
  let unpaidDealsCount = 0;
  let closedWonTotal = 0;
  const partnerTotals = {};

  leads.forEach(function(lead) {
    const val = parseFloat(lead.dealValue) || 0;
    const partner = lead.partner || 'Partner 1';
    partnerTotals[partner] = (partnerTotals[partner] || 0) + val;
    if (String(lead.stage).toLowerCase() === 'closed won') {
      closedWonTotal += val;
    } else {
      unpaidPipeline += val;
      unpaidDealsCount += 1;
    }
  });

  let monthlyToolBurn = 0;
  techStack.forEach(function(t) {
    monthlyToolBurn += (parseFloat(t.monthlyCost) || 0);
  });

  return {
    currency: 'INR',
    totalRevenueYTD: closedWonTotal,
    unpaidPipeline: unpaidPipeline,
    unpaidDealsCount: unpaidDealsCount,
    partnerSplit: partnerTotals,
    monthlyToolBurn: Math.round(monthlyToolBurn),
    activeToolsCount: techStack.length
  };
}

/**
 * ============================================================================
 * CLEAN SLATE DATABASE INITIALIZATION (No Dummy Data)
 * ============================================================================
 */
function setupDatabase() {
  ensureSheetsExist_();
  return 'Clean-slate tabs (Leads, Tech Stack, Revenue) initialized for INR (₹)!';
}

function clearAllDemoData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  [SHEET_NAMES.LEADS, SHEET_NAMES.TECH_STACK, SHEET_NAMES.REVENUE].forEach(function(name) {
    const sheet = ss.getSheetByName(name);
    if (sheet && sheet.getLastRow() > 1) {
      sheet.deleteRows(2, sheet.getLastRow() - 1);
    }
  });
  return 'All rows cleared! Headers preserved.';
}

function ensureSheetsExist_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let leadsSheet = ss.getSheetByName(SHEET_NAMES.LEADS);
  if (!leadsSheet) {
    leadsSheet = ss.insertSheet(SHEET_NAMES.LEADS);
    const leadHeaders = [
      'id', 'clientName', 'handle', 'clientEmail', 'country', 'service', 'source',
      'dealValue', 'billingLabel', 'partner', 'stage', 'sampleStatus', 'sampleUrl',
      'toolsUsed', 'estHours', 'hourlyRate', 'laborCost', 'toolCost', 'netProfit',
      'marginPercent', 'lastContacted', 'notes'
    ];
    leadsSheet.appendRow(leadHeaders);
    leadsSheet.getRange(1, 1, 1, leadHeaders.length).setFontWeight('bold');
  }

  let techSheet = ss.getSheetByName(SHEET_NAMES.TECH_STACK);
  if (!techSheet) {
    techSheet = ss.insertSheet(SHEET_NAMES.TECH_STACK);
    const techHeaders = [
      'id', 'toolName', 'category', 'monthlyCost', 'billingCycle',
      'costPerCut', 'assignedPartners', 'renewalDaysLeft', 'status', 'notes'
    ];
    techSheet.appendRow(techHeaders);
    techSheet.getRange(1, 1, 1, techHeaders.length).setFontWeight('bold');
  }

  let revSheet = ss.getSheetByName(SHEET_NAMES.REVENUE);
  if (!revSheet) {
    revSheet = ss.insertSheet(SHEET_NAMES.REVENUE);
    const revHeaders = [
      'invoiceId', 'clientName', 'partner', 'grossAmount', 'laborCost',
      'toolCost', 'netProfit', 'marginPercent', 'status', 'date'
    ];
    revSheet.appendRow(revHeaders);
    revSheet.getRange(1, 1, 1, revHeaders.length).setFontWeight('bold');
  }
}

function getHeaders_(sheet) {
  const lastCol = sheet.getLastColumn();
  if (lastCol === 0) return [];
  return sheet.getRange(1, 1, 1, lastCol).getValues()[0];
}

function getSheetRowsAsObjects_(sheet) {
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  const results = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row.join('').trim() === '') continue;
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    results.push(obj);
  }
  return results;
}

// Fails closed: with no CRM_SHARED_KEY script property, every data request is refused.
function isAuthorized_(supplied) {
  const expected = PropertiesService.getScriptProperties().getProperty('CRM_SHARED_KEY');
  return !!expected && expected.length >= 24 && String(supplied || '') === expected;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml_(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

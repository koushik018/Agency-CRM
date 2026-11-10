// Extra CRM addresses the local WhatsApp bridge may answer.
// Put one https address per line in allowed-origins.local.txt. Nothing else is accepted.
const fs = require('fs');

function loadExtraOrigins(file) {
  let text = '';
  try { text = fs.readFileSync(file, 'utf8'); } catch (e) { return []; }
  return text.split(/\r?\n/)
    .map(line => line.trim().toLowerCase())
    .filter(line => /^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)+(:\d+)?$/.test(line));
}

module.exports = { loadExtraOrigins };

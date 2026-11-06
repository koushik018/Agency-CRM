/**
 * Turns a WhatsApp id into a real phone number.
 * WhatsApp now often gives a long internal id ending in @lid instead of the phone number.
 * A reply from a client then looks like a different number and would be thrown away.
 * This resolves it, and remembers what it learned.
 */
function makeResolver(getClient) {
  const cache = new Map(); // internal id user part -> phone digits

  const digitsOf = v => String(v || '').replace(/@.*/, '').replace(/\D/g, '');

  async function resolveNumber(rawId, fallbackContactNumber) {
    const raw = String(rawId || '');
    const user = raw.replace(/@.*/, '');
    if (raw.endsWith('@c.us')) return digitsOf(raw);
    if (cache.has(user)) return cache.get(user);
    const client = getClient();
    if (client && typeof client.getContactLidAndPhone === 'function') {
      try {
        const res = await client.getContactLidAndPhone([raw]);
        const pn = res && res[0] && res[0].pn;
        if (pn) { const d = digitsOf(pn); if (d) { cache.set(user, d); return d; } }
      } catch (e) { /* fall through */ }
    }
    if (fallbackContactNumber) { const d = digitsOf(fallbackContactNumber); if (d && d !== user) { cache.set(user, d); return d; } }
    return digitsOf(raw);
  }

  // When we send to a phone number, WhatsApp may answer from an internal id. Remember the pair.
  function learn(internalId, digits) {
    const user = String(internalId || '').replace(/@.*/, '');
    const d = digitsOf(digits);
    if (user && d && user !== d) cache.set(user, d);
  }

  // Instant answer from memory (no WhatsApp round trip). Returns '' when not known yet.
  function peek(rawId) {
    const raw = String(rawId || '');
    if (raw.endsWith('@c.us')) return digitsOf(raw);
    return cache.get(raw.replace(/@.*/, '')) || '';
  }

  return { resolveNumber, learn, peek, cache };
}

module.exports = { makeResolver };

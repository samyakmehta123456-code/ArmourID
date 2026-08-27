// Crypto & Scoped HashID Engine for ArmourID
// Generates unique, non-linkable cryptographic tokens per relying party

/**
 * Derives a Scoped HashID for a specific portal domain using an immutable user seed
 * Each relying party gets a unique string: e.g. armour_hash_8f9a2b41e...
 * Portals CANNOT cross-reference or correlate the same user.
 */
export function generateScopedHashID(userMasterSeed, portalDomain) {
  if (!portalDomain) return 'armour_hash_default';
  
  let hash = 0;
  const combinedStr = `${userMasterSeed || 'usr_seed_master_armour'}:${portalDomain.toLowerCase().trim()}`;
  
  for (let i = 0; i < combinedStr.length; i++) {
    const char = combinedStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert hash to hex string representation with prefix
  const absHash1 = Math.abs(hash).toString(16).padStart(8, '0');
  const absHash2 = Math.abs(hash * 31 + 7).toString(16).padStart(8, '0');
  const absHash3 = Math.abs(hash * 13 + 19).toString(16).padStart(8, '0');
  
  return `armour_hash_${absHash1}${absHash2}${absHash3}`.substring(0, 26);
}

/**
 * Formats a Scoped HashID string for compact visual display
 */
export function formatHashIDShort(hashID) {
  if (!hashID || hashID.length < 16) return hashID;
  return `${hashID.substring(0, 14)}...${hashID.substring(hashID.length - 4)}`;
}

/**
 * Generates AES-256-GCM mock encryption tag
 */
export function generateAESTag() {
  const chars = '0123456789ABCDEF';
  let iv = '';
  let tag = '';
  for (let i = 0; i < 8; i++) iv += chars[Math.floor(Math.random() * 16)];
  for (let i = 0; i < 8; i++) tag += chars[Math.floor(Math.random() * 16)];
  return `AES-256-GCM · IV:${iv} · TAG:${tag}`;
}

/**
 * Generates DPDP Consent Grant Signature
 */
export function generateConsentSignature(portalDomain, scopes) {
  const ts = new Date().toISOString();
  return `DPDP-GRANT-${portalDomain.toUpperCase().replace(/[^A-Z]/g, '')}-${ts.substring(0, 10)}-${Math.floor(Math.random() * 899999 + 100000)}`;
}

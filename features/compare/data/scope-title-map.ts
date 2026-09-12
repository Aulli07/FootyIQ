/**
 * Display labels for scope IDs stored in comparison data. Add a new ID here
 * whenever a competition or league needs a shorter UI label.
 */
export const SCOPE_TITLE_BY_ID: Record<string, string> = {
  "epl": "EPL",
  "spl": "SPL",
  "mls": "MLS",
  "laliga": "La Liga",
  "ligue1": "Ligue 1",
  "brasileirao": "Brasileirão",
  "ucl": "UCL",
  "uel": "UEL",
  "acl": "ACL",
  "acl-elite": "ACLE",
  "fifa-club-world-cup": "CWC",
  "world-cup": "WC",
  "euro": "EURO",
  "fa-cup": "FA Cup",
  "carabao-cup": "Carabao Cup",
  "uefa-super-cup": "USC",
};

export function getScopeTitle(scopeId?: string): string | undefined {
  if (!scopeId) return undefined;
  return SCOPE_TITLE_BY_ID[scopeId] ?? scopeId;
}

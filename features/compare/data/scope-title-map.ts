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
  "acl-elite": "ACL Elite",
  "arab-club-champions-cup": "ACC",
  "saudi-super-cup": "SSC",
  "copa-del-rey": "Copa Del Rey",
  "spanish-super-cup": "SSC",
  "concacaf-champions-cup": "CCC",
  "leagues-cup":"Leagues Cup",
  "us-open-cup": "US Open",
  "campeonato-paulista": "CP",
  "copa-do-brasil": "CB",
  "coupe-de-france": "French's Cup",
  "kings-cup": "Kings Cup",
  "fifa-club-world-cup": "CWC",
  "world-cup": "World Cup",
  "euro": "EURO",
  "fa-cup": "FA Cup",
  "carabao-cup": "Carabao Cup",
  "uefa-super-cup": "Super Cup",
  "bundesliga": "Bundesliga",
  "dfb-pokal": "DFB Pokal"
};

export function getScopeTitle(scopeId?: string): string | undefined {
  if (!scopeId) return undefined;
  return SCOPE_TITLE_BY_ID[scopeId] ?? scopeId;
}

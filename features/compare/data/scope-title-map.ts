/**
 * Display labels for scope IDs stored in comparison data. Add a new ID here
 * whenever a competition or league needs a shorter UI label.
 */
export const SCOPE_TITLE_BY_ID: Record<string, string> = {
  "39": "EPL",
  "spl": "SPL",
  "mls": "MLS",
  "140": "La Liga",
  "61": "Ligue 1",
  "brasileirao": "Brasileirão",
  "1": "WC",
  "2": "UCL",
  "3": "UEL",
  "4": "Euro",
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
  "78": "Bundesliga",
  "dfb-pokal": "DFB Pokal",
  "45": "Fa Cup",
  "135": "Seria A",
  "48": "Carabao Cup",
  "143": "Copa Del Rey",
};

export function getScopeTitle(scopeId?: string): string | undefined {
  if (!scopeId) return undefined;
  return SCOPE_TITLE_BY_ID[scopeId] ?? scopeId;
}

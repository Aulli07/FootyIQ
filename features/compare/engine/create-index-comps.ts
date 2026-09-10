import { initializeComparisonAnalytics } from "../services/analytics-storage";
import { ComparisonThemeType } from "../types/comparison-theme-type";
import { SYSTEM_COMPARISON_THEMES } from "../types/comparison-themes";
import { filterBaseComparisons, playersById} from "./filter-base-comps";
import { generateAllBaseComparisons } from "./generate-base-comps";
import { QualityComparisonType, ComparisonScope } from "../types/comparison-main-type";


export function buildIndexedComparisonsForPlayers(
  hydratedComparisons: QualityComparisonType[],
) {
  const playerIndexedComparisons: Record<string, string[]> = {};

  hydratedComparisons.forEach((cmp) => {
    if (!playerIndexedComparisons[cmp.playerA]) {
      playerIndexedComparisons[cmp.playerA] = [];
    }
    playerIndexedComparisons[cmp.playerA].push(cmp.id);

    if (!playerIndexedComparisons[cmp.playerB]) {
      playerIndexedComparisons[cmp.playerB] = [];
    }
    playerIndexedComparisons[cmp.playerB].push(cmp.id);
  });

  return playerIndexedComparisons;
}

export function buildThemeIndexedComparisons(
  baseComparisons: QualityComparisonType[]
) {
  
  const themeIndexedComparisons: Record<string, string[]> = {};
  for (const theme of SYSTEM_COMPARISON_THEMES) {
    themeIndexedComparisons[theme.id] = baseComparisons
      .filter((cmp) => (cmp.context === theme.context) && matchesTheme(cmp, theme))
      .map(cmp => cmp.id);
  }

  return themeIndexedComparisons;
}

function matchesTheme(
  cmp: QualityComparisonType,
  theme: ComparisonThemeType
) {
  const { positions, leagueIds, competitionIds, seasonId, nationalities } = theme.filters;

  if (seasonId && seasonId.length) {
    if (!cmp.scopeA.seasonId || !cmp.scopeB.seasonId || !seasonId.includes(cmp.scopeA.seasonId) || !seasonId.includes(cmp.scopeB.seasonId)) return false;
  }

  if ((leagueIds && leagueIds.length) || (competitionIds && competitionIds.length)) {
    const scopeAId = getScopeIdForContext(theme.context, cmp.scopeA);
    const scopeBId = getScopeIdForContext(theme.context, cmp.scopeB);
    const relevantIds = leagueIds ?? competitionIds;
    if (!scopeAId || !scopeBId || !relevantIds?.includes(scopeAId) || !relevantIds?.includes(scopeBId)) return false;
  }

  if (positions || nationalities) {
    const idForPlayerA = playersById.get(cmp.playerA);
    const idForPlayerB = playersById.get(cmp.playerB);

    if (!idForPlayerA || !idForPlayerB) return false;

    if (positions && (!positions.includes(idForPlayerA.primaryPosition) || !positions.includes(idForPlayerB.primaryPosition))) return false;
    if (nationalities && (!nationalities.includes(idForPlayerA.nationality) || !nationalities.includes(idForPlayerB.nationality))) return false;
  }

  return true;
}

function getScopeIdForContext(
  context: string,
  scope: ComparisonScope
) {
  switch (context) {
    case "CTX-LEAGUE-SEASON":
    case "CTX-LEAGUE-CAREER":
      return scope.leagueId;

    case "CTX-COMPETITION-SEASON":
    case "CTX-COMPETITION-CAREER":
      return scope.competitionId;
   
    case "CTX-SEASON":
    case "CTX-OVERALL-CAREER":
      return undefined;

    default:
      return undefined;
  }
}

export function buildComparisons() {
  const baseComparisons = generateAllBaseComparisons();
  const qualityComparisons = filterBaseComparisons(baseComparisons);

  const indexedComparisons: Record<string, QualityComparisonType> = {};
  qualityComparisons.forEach((cmp) => {
    indexedComparisons[cmp.id] = cmp;
  })

  return indexedComparisons;
}

export function buildIndexedComparisons() {
  const plainComparisons = buildComparisons();

  const hydratedComparisons = Object.values(plainComparisons).flat();

  // const hydratedComparisons = Array.from(
  //   Object.values(plainComparisons),
  // );
  // initializeComparisonAnalytics(hydratedComparisons);

  const themeIndexedComparisons = buildThemeIndexedComparisons(hydratedComparisons);
  const playerIndexedComparisons = buildIndexedComparisonsForPlayers(hydratedComparisons);

  return { plainComparisons, themeIndexedComparisons, playerIndexedComparisons }
}

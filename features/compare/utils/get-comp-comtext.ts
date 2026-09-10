import { getCanonicalPlayerSeasonStats, getCanonicalSeasonById } from "@/shared/utils/canonical-lookups";
import { ComparisonContext, ComparisonScope } from "../types/comparison-main-type";
import { SelectedComparisonContext } from "../types/comp-save-type";

/** Returns the stat-selector-compatible label for one player's scope. */
export function getContext(
  seasonId?: string,
  competitionId?: string,
  leagueId?: string,
): string {
  const seasonLabel = seasonId
    ? getCanonicalSeasonById(seasonId)?.label ?? seasonId
    : "";
  const competition = competitionId ?? leagueId;

  return [competition, seasonLabel].filter(Boolean).join(" ") || "All-time";
}

export function getScopeLabel(scope: ComparisonScope): string {
  return getContext(scope.seasonId, scope.competitionId, scope.leagueId);
}

export function createSelectedContext(
  playerId: string,
  seasonId: string,
  competitionId?: string,
): SelectedComparisonContext {
  if (!competitionId) {
    const scope = { seasonId };
    return { context: "CTX-SEASON", scope, label: getScopeLabel(scope) };
  }

  const row = getCanonicalPlayerSeasonStats(playerId).find(
    (stat) => stat.seasonId === seasonId && stat.competitionId === competitionId,
  );
  const isLeague = row?.competitionType === "league";
  const scope = isLeague
    ? { seasonId, leagueId: competitionId }
    : { seasonId, competitionId };
  const context: ComparisonContext = isLeague
    ? "CTX-LEAGUE-SEASON"
    : "CTX-COMPETITION-SEASON";

  return { context, scope, label: getScopeLabel(scope) };
}

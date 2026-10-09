import { aggregateStats } from "@/features/compare/utils/aggregate-stat";
import { SelectedComparisonContext } from "@/features/compare/types/comp-save-type";
import { Player, PlayerSeasonStats } from "@/shared/types/stats-schema";
import {
  getCanonicalClubDisplayNameById,
  getCanonicalPlayerSeasonStats,
} from "@/shared/utils/canonical-lookups";



export function computeStatRows(
  rows: PlayerSeasonStats[],
  identifier: string,
): number {
  return rows.reduce<number>((total, row) => {
    const value = row[identifier as keyof PlayerSeasonStats];
    return total + (typeof value === "number" ? value : 0);
  }, 0);
}

/** Returns a player's stat rows for the selected comparison scope. */
export function getRowsForContext(
  playerId: string,
  selection: SelectedComparisonContext,
): PlayerSeasonStats[] {
  const playerRows = getCanonicalPlayerSeasonStats(playerId);
  const { context, scope } = selection;
  const competitionId = scope.leagueId ?? scope.competitionId;

  switch (context) {
    case "CTX-OVERALL-CAREER":
      return playerRows;
    case "CTX-SEASON":
      return scope.seasonId
        ? playerRows.filter((row) => row.seasonId === scope.seasonId)
        : [];
    case "CTX-LEAGUE-SEASON":
    case "CTX-COMPETITION-SEASON":
      return scope.seasonId && competitionId
        ? playerRows.filter(
            (row) =>
              row.seasonId === scope.seasonId &&
              row.competitionId === competitionId,
          )
        : [];
    case "CTX-LEAGUE-CAREER":
    case "CTX-COMPETITION-CAREER":
      return competitionId
        ? playerRows.filter((row) => row.competitionId === competitionId)
        : [];
    default:
      return [];
  }
}



export function getAgeOfPlayer(player: Player | null): string | number {
  const age = player?.dateOfBirth
    ? Math.floor(
        (Date.now() - new Date(player.dateOfBirth).getTime()) /
          (1000 * 60 * 60 * 24 * 365.25),
      )
    : null;

  return age ?? "-";
}

export function getClubNameOfPlayer(player: Player | null): string {
  const clubId = player?.currentClubId;
  return clubId ? getCanonicalClubDisplayNameById(clubId) : "-";
}

export function getPositionOfPlayer(player: Player | null): string {
  return player?.primaryPosition ?? "-";
}

export function getNationalityOfPlayer(player: Player | null): string {
  return player?.nationality ?? "-";
}

export function getHeightOfPlayer(player: Player | null): string | number {
  const height = player?.heightCm;
  return typeof height === "number" ? height : "-";
}

export function getAverageRatingForContext(
  player: Player | null,
  selection: SelectedComparisonContext,
): string | number {
  if (!player) return "-";

  const rows = getRowsForContext(player.id, selection);
  if (rows.length === 0) return "-";

  const agg = aggregateStats(rows);
  return agg.minutes > 0 ? agg.rating : "-";
}

export function getStatValueForContext(
  player: Player | null,
  selection: SelectedComparisonContext,
  identifier: string,
): string | number {
  if (!player) return "-";

  const rows = getRowsForContext(player.id, selection);
  return rows.length > 0 ? computeStatRows(rows, identifier) : "-";
}

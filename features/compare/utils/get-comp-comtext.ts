export function getContext(seasonId: string | undefined, competitionId: string | undefined, leagueId: string | undefined): string {
  return competitionId || "" + leagueId || "" + seasonId || "";
}
  
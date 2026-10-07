import { LegacyPlayer, LegacyPlayerDetails, LegacyPlayerStat } from "@/shared/types/legacy-schema";


export function resolvePlayerName(player: LegacyPlayerDetails) {
  const firstName = player.firstname.split(" ")[0];
  const lastName = player.lastname.split(" ").at(-1);
  return firstName + " " + lastName;
}

export function resolveCompetitionType(competitionId: string) {
  switch (competitionId) {
    case "2": case "3": case "848": case "531": case "13": case "11": case "12": case "20": case "17": case "16": case "772":
      return "continental";
    case "1": case "4": case "6": case "9": case "7": case "22": case "5": case "10": case "21": case "15": case "29": case "30": case "31": case "32": case "34":
      return "international";
    case "45": case "48": case "528": case "143": case "556": case "137": case "547": case "81": case "529": case "66": case "526": case "90": case "96": case "181":
      return "cup";
    
    default:
      return "league";
  }
}

export function resolveStatId(ply: LegacyPlayer, stat: LegacyPlayerStat) {
  const playerId = ply.player.id.toString();
  const seasonId = resolveSeasonId(stat);
  const competitionId = stat.league.id.toString();
  const clubId = stat.team.id.toString();
  return playerId + ":" + seasonId + ":" + competitionId + ":" + clubId;
}

export function resolveSeasonId(stat: LegacyPlayerStat) {
  const startYear = stat.league.season.toString();
  const endYear = (stat.league.season + 1).toString();
  return startYear.slice(2) + "/" + endYear.slice(2);
}
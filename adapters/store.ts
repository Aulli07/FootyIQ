import { LegacyDataStore } from "@/shared/types/legacy-schema";
import { Club, Competition, Player, PlayerSeasonStats, Season } from "@/shared/types/stats-schema";
import { resolveCompetitionType, resolvePlayerName, resolveSeasonId, resolveStatId } from "./utils";




export function buildCanonicalStore(players: LegacyDataStore) {
  return {
    players: buildCanonicalPlayerStore(players),
    clubs: buildCanonicalClubStore(players),
    competitions: buildCanonicalCompetitionStore(players),
    seasons: buildCanonicalSeasonStore(players),
    stats: buildCanonicalStatStore(players)
  }
}

export function buildCanonicalPlayerStore(players: LegacyDataStore) {  
  const playerMap = new Map<string, Player>();

  for (const ply of players) {
    const playerId = ply.player.id.toString();
    if (playerMap.has(playerId)) continue;

    const playerObj: Player = {
      id: playerId,
      fullName: resolvePlayerName(ply.player),
      nationality: ply.player.nationality,
      dateOfBirth: ply.player.birth.date,
      heightCm: Number(ply.player.height),
      primaryPosition: ply.statistics[0].games.position,
      imageUrl: ply.player.photo,
      currentClubId: ply.statistics[0].team.id.toString(),
    }
    playerMap.set(playerId, playerObj)
  }

  return Array.from(playerMap.values());
}


export function buildCanonicalClubStore(players: LegacyDataStore) {
  const clubMap = new Map<string, Club>();

  for (const ply of players) {
    for (const stat of ply.statistics) {
      const clubId = stat.team.id.toString();
      if (clubMap.has(clubId)) continue;

      const clubObj: Club = {
        id: clubId,
        name: stat.team.name,
        country: stat.league.country,
        leagueId: stat.league.id.toString(),
        logoUrl: stat.team.logo,
      }
      clubMap.set(clubId, clubObj)
    }
  }

  return Array.from(clubMap.values());
}


export function buildCanonicalCompetitionStore(players: LegacyDataStore) {
  const competitionMap = new Map<string, Competition>();

  for (const ply of players) {
    for (const stat of ply.statistics) {
      const competitionId = stat.league.id.toString()
      if (competitionMap.has(competitionId)) continue;

      const competitionObj: Competition = {
        id: competitionId,
        name: stat.league.name,
        country: stat.league.country,
        type: resolveCompetitionType(competitionId),
        logoUrl: stat.league.logo,
      }
      competitionMap.set(competitionId, competitionObj)
    }
  }

  return Array.from(competitionMap.values());  
}


export function buildCanonicalSeasonStore(players: LegacyDataStore) {
  const seasonMap = new Map<string, Season>();

  for (const ply of players) {
    for (const stat of ply.statistics) {
      const seasonId = resolveSeasonId(stat);
      if (seasonMap.has(seasonId)) continue;

      const seasonObj: Season = {
        id: seasonId,
        label: seasonId,
        startYear: stat.league.season,
        endYear: stat.league.season + 1,
      }
      seasonMap.set(seasonId, seasonObj)
    }
  }

  return Array.from(seasonMap.values());  
}


export function buildCanonicalStatStore(players: LegacyDataStore) {
  const statMap = new Map<string, PlayerSeasonStats>();

  for (const ply of players) {
    for (const stat of ply.statistics) {
      const statId = resolveStatId(ply, stat);
      if (statMap.has(statId)) continue;

      const seasonId = resolveSeasonId(stat);
      const competitionId = stat.league.id.toString();

      const statObj: PlayerSeasonStats = {
        id: statId,
        playerId: ply.player.id.toString(),
        seasonId,
        clubId: stat.team.id.toString(),
        competitionId,
        competitionType: resolveCompetitionType(competitionId),
        appearances: stat.games.appearences ?? 0,
        minutes: stat.games.minutes ?? 0,
        goals: stat.goals.total ?? 0,
        assists: stat.goals.assists ?? 0,
        saves: stat.goals.saves ?? 0,
        conceded: stat.goals.conceded ?? 0,
        shots: stat.shots.total ?? 0,
        shotsOnTarget: stat.shots.on ?? 0,
        passes: stat.passes.total ?? 0,
        keyPasses: stat.passes.key ?? 0,
        dribbles: stat.dribbles.attempts ?? 0,
        dribblesCompleted: stat.dribbles.success ?? 0,
        interceptions: stat.tackles.interceptions ?? 0,
        tackles: stat.tackles.total ?? 0,
        blocks: stat.tackles.blocks ?? 0,
        duels: stat.duels.total ?? 0,
        duelsWon: stat.duels.won ?? 0,
        yellowCards: stat.cards.yellow ?? 0,
        yellowToRedCards: stat.cards.yellowRed ?? 0,
        redCards: stat.cards.red ?? 0,
        source: "api-football",
        rating: Number(stat.games.rating) || 3,
        updatedAt: new Date().toISOString(),
      }
      statMap.set(statId, statObj)
    }
  }

  return Array.from(statMap.values());  
}
import type { CompetitionStats as LegacyCompetitionStats, SeasonStats as LegacySeasonStats } from "../types/stats-legacy";
import { ensureNumber } from "../utils/adapter-utils";

import { PlayerSeasonStats } from "@/shared/types/stats-schema";



export function mapSeasonStats(
  playerId: string,
  season: LegacySeasonStats,
  competition: LegacyCompetitionStats,
  clubId: string,
): PlayerSeasonStats {
  
  const stats = competition.stats ?? {};
  const appearances = ensureNumber(stats.appearances ?? stats.matchesPlayed);
  const seasonId = season.season.trim();
  const competitionId = competition.id;

  return {
    id: `${playerId}:${seasonId}:${competitionId}`,
    playerId,
    seasonId,
    clubId,
    competitionId,
    appearances,
    starts: ensureNumber(stats.matchesPlayed),
    minutes: ensureNumber(stats.minutes),
    goals: ensureNumber(stats.goals),
    assists: ensureNumber(stats.assists),
    shots: ensureNumber(stats.shots ?? stats.totalShots),
    shotsOnTarget: ensureNumber(stats.shotsOnTarget),
    keyPasses: ensureNumber(stats.keyPasses),
    chancesCreated: ensureNumber(stats.chancesCreated),
    dribbles: ensureNumber(stats.dribbles),
    dribblesCompleted:
      stats.dribblesCompleted !== undefined
        ? ensureNumber(stats.dribblesCompleted)
        : undefined,
    interceptions: ensureNumber(stats.interceptions),
    tackles: ensureNumber(stats.tackles),
    dribbledPast: ensureNumber(stats.dribbledPast),
    clearances: ensureNumber(stats.clearances),
    groundDuelsWon: ensureNumber(stats.groundDuelsWon),
    blockedShots: ensureNumber(stats.blockedShots),
    yellowCards: ensureNumber(stats.yellowCards),
    yellowToRedCards: ensureNumber(stats.yellowToRedCards),
    redCards: ensureNumber(stats.redCards),
    rating: ensureNumber(stats.footyRating),
    source: "legacy",
    updatedAt: new Date().toISOString(),
  };
}
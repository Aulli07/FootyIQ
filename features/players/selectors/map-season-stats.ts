import type { CompetitionStats as LegacyCompetitionStats, SeasonStats as LegacySeasonStats } from "../types/stats-legacy";
import { ensureNumber } from "../utils/adapter-utils";

import { PlayerSeasonStats } from "@/shared/types/stats-schema";



export function mapSeasonStats(
  playerId: string,
  season: LegacySeasonStats,
  competition: LegacyCompetitionStats,
): PlayerSeasonStats {
  
  const stats = competition.stats ?? {};
  const seasonId = season.season.trim();

  return {
    id: `${playerId}:${seasonId}:${competition.id}`,
    playerId,
    seasonId: season.season.trim(),
    clubId: season.clubId,
    competitionId: competition.id,
    competitionType: competition.type,

    appearances: ensureNumber(stats.appearances),
    minutes: ensureNumber(stats.minutes),
    goals: ensureNumber(stats.goals),
    assists: ensureNumber(stats.assists),
    shots: ensureNumber(stats.totalShots),
    shotsOnTarget: ensureNumber(stats.shotsOnTarget),
    keyPasses: ensureNumber(stats.keyPasses),
    chancesCreated: ensureNumber(stats.chancesCreated),
    dribbles: ensureNumber(stats.dribbles),
    dribblesCompleted: ensureNumber(stats.dribblesCompleted),
    interceptions: ensureNumber(stats.interceptions),
    tackles: ensureNumber(stats.tackles),
    dribbledPast: ensureNumber(stats.dribbledPast),
    clearances: ensureNumber(stats.clearances),
    groundDuelsWon: ensureNumber(stats.groundDuelsWon),
    blockedShots: ensureNumber(stats.blockedShots),
    yellowCards: ensureNumber(stats.yellowCards),
    yellowToRedCards: ensureNumber(stats.yellowToRedCards),
    redCards: ensureNumber(stats.redCards),
    source: "legacy",
    updatedAt: new Date().toISOString(),
  };
}
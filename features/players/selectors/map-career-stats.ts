import { PlayerSeasonStats, PlayerCareerStats } from "@/shared/types/stats-schema";

import { ensureNumber } from "../utils/adapter-utils";

export function aggregateCareerStats(
  playerId: string,
  seasonRows: PlayerSeasonStats[],
): PlayerCareerStats {
  const totals = seasonRows.reduce(
    (accumulator, row) => ({
      appearances: accumulator.appearances + row.appearances,
      starts: accumulator.starts + ensureNumber(row.starts),
      minutes: accumulator.minutes + row.minutes,
      goals: accumulator.goals + row.goals,
      assists: accumulator.assists + row.assists,
      shots: accumulator.shots + row.shots,
      shotsOnTarget: accumulator.shotsOnTarget + row.shotsOnTarget,
      keyPasses: accumulator.keyPasses + row.keyPasses,
      chancesCreated: accumulator.chancesCreated + row.chancesCreated,
      dribbles: accumulator.dribbles + row.dribbles,
      dribblesCompleted:
        accumulator.dribblesCompleted + ensureNumber(row.dribblesCompleted),
      interceptions: accumulator.interceptions + row.interceptions,
      tackles: accumulator.tackles + row.tackles,
      dribbledPast: accumulator.dribbledPast + row.dribbledPast,
      clearances: accumulator.clearances + row.clearances,
      groundDuelsWon: accumulator.groundDuelsWon + row.groundDuelsWon,
      blockedShots: accumulator.blockedShots + row.blockedShots,
      yellowCards: accumulator.yellowCards + row.yellowCards,
      yellowToRedCards: accumulator.yellowToRedCards + row.yellowToRedCards,
      redCards: accumulator.redCards + row.redCards,
      ratingSum:
        accumulator.ratingSum + ensureNumber(row.rating) * row.appearances,
      ratingAppearances: accumulator.ratingAppearances + row.appearances,
    }),
    {
      appearances: 0,
      starts: 0,
      minutes: 0,
      goals: 0,
      assists: 0,
      shots: 0,
      shotsOnTarget: 0,
      keyPasses: 0,
      chancesCreated: 0,
      dribbles: 0,
      dribblesCompleted: 0,
      interceptions: 0,
      tackles: 0,
      dribbledPast: 0,
      clearances: 0,
      groundDuelsWon: 0,
      blockedShots: 0,
      yellowCards: 0,
      yellowToRedCards: 0,
      redCards: 0,
      ratingSum: 0,
      ratingAppearances: 0,
    },
  );

  const averageRating =
    totals.ratingAppearances > 0
      ? totals.ratingSum / totals.ratingAppearances
      : 0;

  return {
    id: playerId,
    playerId,
    appearances: totals.appearances,
    starts: totals.starts,
    minutes: totals.minutes,
    goals: totals.goals,
    assists: totals.assists,
    shots: totals.shots,
    shotsOnTarget: totals.shotsOnTarget,
    keyPasses: totals.keyPasses,
    chancesCreated: totals.chancesCreated,
    dribbles: totals.dribbles,
    dribblesCompleted: totals.dribblesCompleted,
    interceptions: totals.interceptions,
    tackles: totals.tackles,
    dribbledPast: totals.dribbledPast,
    clearances: totals.clearances,
    groundDuelsWon: totals.groundDuelsWon,
    blockedShots: totals.blockedShots,
    yellowCards: totals.yellowCards,
    yellowToRedCards: totals.yellowToRedCards,
    redCards: totals.redCards,
    averageRating,
    source: "legacy",
    updatedAt: new Date().toISOString(),
  };
}
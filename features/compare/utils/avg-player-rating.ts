import { PlayerAggregateStats } from "@/shared/types/stats-schema";

export type PositionGroup = "Defender" | "Midfielder" | "Winger" | "Striker";

const MAX_RATING = 10;
const FULL_SAMPLE_MINUTES = 900;

type RatingMetric = {
  weight: number;
  targetPer90: number;
};

type RatingProfile = {
  goals: RatingMetric;
  assists: RatingMetric;
  chancesCreated: RatingMetric;
  dribblesCompleted: RatingMetric;
  shotAccuracy: RatingMetric;
  keyPasses: RatingMetric;
  interceptions: RatingMetric;
  tackles: RatingMetric;
  clearances: RatingMetric;
  groundDuelsWon: RatingMetric;
};

const RATING_PROFILES: Record<PositionGroup, RatingProfile> = {
  Defender: {
    goals: { weight: 0.3, targetPer90: 0.1 },
    assists: { weight: 0.5, targetPer90: 0.15 },
    chancesCreated: { weight: 0.4, targetPer90: 0.7 },
    dribblesCompleted: { weight: 0.3, targetPer90: 0.7 },
    shotAccuracy: { weight: 0.2, targetPer90: 0.35 },
    keyPasses: { weight: 0.5, targetPer90: 0.7 },
    interceptions: { weight: 1.7, targetPer90: 1.5 },
    tackles: { weight: 1.8, targetPer90: 2.1 },
    clearances: { weight: 1.4, targetPer90: 3.5 },
    groundDuelsWon: { weight: 2.9, targetPer90: 4.5 },
  },
  Midfielder: {
    goals: { weight: 1.1, targetPer90: 0.25 },
    assists: { weight: 1.1, targetPer90: 0.25 },
    chancesCreated: { weight: 1.2, targetPer90: 1.8 },
    dribblesCompleted: { weight: 0.6, targetPer90: 1.4 },
    shotAccuracy: { weight: 0.3, targetPer90: 0.4 },
    keyPasses: { weight: 1.1, targetPer90: 1.8 },
    interceptions: { weight: 1.0, targetPer90: 1.3 },
    tackles: { weight: 1.1, targetPer90: 1.8 },
    clearances: { weight: 0.4, targetPer90: 1.3 },
    groundDuelsWon: { weight: 2.1, targetPer90: 4 },
  },
  Winger: {
    goals: { weight: 1.8, targetPer90: 0.4 },
    assists: { weight: 1.4, targetPer90: 0.35 },
    chancesCreated: { weight: 1.2, targetPer90: 2 },
    dribblesCompleted: { weight: 1.4, targetPer90: 2.5 },
    shotAccuracy: { weight: 0.6, targetPer90: 0.42 },
    keyPasses: { weight: 1.0, targetPer90: 1.6 },
    interceptions: { weight: 0.3, targetPer90: 0.7 },
    tackles: { weight: 0.3, targetPer90: 0.8 },
    clearances: { weight: 0.1, targetPer90: 0.5 },
    groundDuelsWon: { weight: 1.9, targetPer90: 3.5 },
  },
  Striker: {
    goals: { weight: 2.6, targetPer90: 0.6 },
    assists: { weight: 1.2, targetPer90: 0.25 },
    chancesCreated: { weight: 0.7, targetPer90: 1.1 },
    dribblesCompleted: { weight: 0.7, targetPer90: 1.3 },
    shotAccuracy: { weight: 0.9, targetPer90: 0.45 },
    keyPasses: { weight: 0.5, targetPer90: 0.8 },
    interceptions: { weight: 0.1, targetPer90: 0.4 },
    tackles: { weight: 0.2, targetPer90: 0.6 },
    clearances: { weight: 0.1, targetPer90: 0.3 },
    groundDuelsWon: { weight: 3, targetPer90: 3.5 },
  },
};

function per90(value: number, minutes: number): number {
  return minutes > 0 ? (value / minutes) * 90 : 0;
}

function metricScore(valuePer90: number, metric: RatingMetric): number {
  return metric.weight * Math.min(valuePer90 / metric.targetPer90, 1);
}

function getProfile(position: PositionGroup): RatingProfile {
  return RATING_PROFILES[position] ?? RATING_PROFILES.Midfielder;
}

/**
 * Produces a 0–10 rating from a player's selected stat totals.
 * Each position profile distributes all ten available points across relevant
 * on-ball and defensive metrics; no default rating is added.
 */
export function getAverageRating(
  aggStats: PlayerAggregateStats,
  position: PositionGroup,
): number {
  const { minutes } = aggStats;
  if (minutes <= 0) return 0;

  const profile = getProfile(position);
  const shotAccuracy =
    aggStats.shots > 0 ? aggStats.shotsOnTarget / aggStats.shots : 0;
  const performanceScore =
    metricScore(per90(aggStats.goals, minutes), profile.goals) +
    metricScore(per90(aggStats.assists, minutes), profile.assists) +
    metricScore(
      per90(aggStats.chancesCreated, minutes),
      profile.chancesCreated,
    ) +
    metricScore(
      per90(aggStats.dribblesCompleted, minutes),
      profile.dribblesCompleted,
    ) +
    metricScore(shotAccuracy, profile.shotAccuracy) +
    metricScore(per90(aggStats.keyPasses, minutes), profile.keyPasses) +
    metricScore(
      per90(aggStats.interceptions, minutes),
      profile.interceptions,
    ) +
    metricScore(per90(aggStats.tackles, minutes), profile.tackles) +
    metricScore(per90(aggStats.clearances, minutes), profile.clearances) +
    metricScore(
      per90(aggStats.groundDuelsWon, minutes),
      profile.groundDuelsWon,
    );
  const sampleFactor = Math.min(minutes / FULL_SAMPLE_MINUTES, 1);
  const disciplineDeduction =
    aggStats.yellowCards * 0.05 +
    aggStats.yellowToRedCards * 0.2 +
    aggStats.redCards * 0.5;
  const rating = performanceScore * sampleFactor - disciplineDeduction;

  return Math.round(Math.min(MAX_RATING, Math.max(0, rating)) * 10) / 10;
}

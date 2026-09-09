import { AggregatedStatsType } from "./aggregate-stat";

export type PositionGroup = "Defender" | "Midfielder" | "Winger" | "Striker";

const BASE_RATING = 6.0;
const MIN_RATING = 0;
const MAX_RATING = 10;

type WeightSet = {
  goals: number;
  assists: number;
  chancesCreated: number;
  dribblesCompleted: number;
  shotAccuracy: number;
  keyPasses: number;
  interceptions: number;
  tackles: number;
  clearances: number;
  groundDuelsWon: number;
};

// Each position group gets its own weight set so a defender's rating is driven
// by defensive output instead of being dragged down by low goal involvement.
const WEIGHTS_BY_POSITION: Record<PositionGroup, WeightSet> = {
  Defender: {
    goals: 2.0,
    assists: 1.5,
    chancesCreated: 0.2,
    dribblesCompleted: 0.15,
    shotAccuracy: 0.8,
    keyPasses: 0.2,
    interceptions: 0.9,
    tackles: 0.8,
    clearances: 0.4,
    groundDuelsWon: 0.35,
  },
  Midfielder: {
    goals: 2.6,
    assists: 2.0,
    chancesCreated: 0.4,
    dribblesCompleted: 0.25,
    shotAccuracy: 1.2,
    keyPasses: 0.4,
    interceptions: 0.5,
    tackles: 0.45,
    clearances: 0.15,
    groundDuelsWon: 0.3,
  },
  Winger: {
    goals: 2.9,
    assists: 2.0,
    chancesCreated: 0.3,
    dribblesCompleted: 0.3,
    shotAccuracy: 1.3,
    keyPasses: 0.3,
    interceptions: 0.12,
    tackles: 0.1,
    clearances: 0.05,
    groundDuelsWon: 0.2,
  },
  Striker: {
    goals: 3.4,
    assists: 2.2,
    chancesCreated: 0.3,
    dribblesCompleted: 0.3,
    shotAccuracy: 1.6,
    keyPasses: 0.3,
    interceptions: 0.15,
    tackles: 0.1,
    clearances: 0.05,
    groundDuelsWon: 0.2,
  },
};

function per90(value: number, minutes: number): number {
  return minutes > 0 ? (value / minutes) * 90 : 0;
}

export function getAverageRating(
  aggStats: AggregatedStatsType,
  position: PositionGroup
): number {
  const {
    minutes,
    goals,
    assists,
    shots,
    shotsOnTarget,
    chancesCreated,
    dribblesCompleted,
    keyPasses,
    interceptions,
    tackles,
    clearances,
    groundDuelsWon,
  } = aggStats;

  if (minutes <= 0) return BASE_RATING;

  const w = WEIGHTS_BY_POSITION[position];
  const shotAccuracy = shots > 0 ? shotsOnTarget / shots : 0;

  const rawRating =
    BASE_RATING +
    per90(goals, minutes) * w.goals +
    per90(assists, minutes) * w.assists +
    per90(chancesCreated, minutes) * w.chancesCreated +
    per90(dribblesCompleted, minutes) * w.dribblesCompleted +
    shotAccuracy * w.shotAccuracy +
    per90(keyPasses, minutes) * w.keyPasses +
    per90(interceptions, minutes) * w.interceptions +
    per90(tackles, minutes) * w.tackles +
    per90(clearances, minutes) * w.clearances +
    per90(groundDuelsWon, minutes) * w.groundDuelsWon;

  const clamped = Math.min(MAX_RATING, Math.max(MIN_RATING, rawRating));
  return Math.round(clamped * 10) / 10;
}

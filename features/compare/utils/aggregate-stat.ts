import { PlayerSeasonStats } from "@/shared/types/stats-schema";


export type AggregatedStatsType = {
  minutes: number;
  appearances: number;
  goals: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  chancesCreated: number;
  dribbles: number;
  dribblesCompleted: number;
  keyPasses: number;
  interceptions: number;
  tackles: number;
  dribbledPast: number;
  clearances: number;
  groundDuelsWon: number;
  blockedShots: number;
  yellowCards: number;
  yellowToRedCards: number;
  redCards: number;
};

export function aggregateStats(rows: PlayerSeasonStats[]): AggregatedStatsType {
  const sum = (field: string) =>
    rows.reduce((total, row) => total + (Number(row[field as keyof PlayerSeasonStats]) || 0), 0);

  return {
    minutes: sum("minutes"),
    appearances: sum("appearances"),
    goals: sum("goals"),
    assists: sum("assists"),
    shots: sum("shots"),
    shotsOnTarget: sum("shotsOnTarget"),
    keyPasses: sum("keyPasses"),
    chancesCreated: sum("chancesCreated"),
    dribbles: sum("dribbles"),
    dribblesCompleted: sum("dribblesCompleted"),
    interceptions: sum("interceptions"),
    tackles: sum("tackles"),
    dribbledPast: sum("dribbledPast"),
    clearances: sum("clearances"),
    groundDuelsWon: sum("groundDuelsWon"),
    blockedShots: sum("blockedShots"),
    yellowCards: sum("yellowCards"),
    yellowToRedCards: sum("yellowToRedCards"),
    redCards: sum("redCards")
  };
}
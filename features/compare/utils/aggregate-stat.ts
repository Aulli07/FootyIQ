import { PlayerAggregateStats, PlayerSeasonStats } from "@/shared/types/stats-schema";



export function aggregateStats(rows: PlayerSeasonStats[]): PlayerAggregateStats {
  const sum = (field: string) =>
    rows.reduce((total, row) => total + (Number(row[field as keyof PlayerSeasonStats]) || 0), 0);
  const minutes = sum("minutes");
  const rating = minutes > 0
    ? rows.reduce(
        (total, row) => total + (Number(row.rating) || 0) * (Number(row.minutes) || 0),
        0,
      ) / minutes
    : 0;

  return {
    minutes,
    appearances: sum("appearances"),
    goals: sum("goals"),
    assists: sum("assists"),
    saves: sum("saves"),
    conceded: sum("conceded"),
    shots: sum("shots"),
    shotsOnTarget: sum("shotsOnTarget"),
    passes: sum("passes"),
    keyPasses: sum("keyPasses"),
    dribbles: sum("dribbles"),
    dribblesCompleted: sum("dribblesCompleted"),
    interceptions: sum("interceptions"),
    tackles: sum("tackles"),
    blocks: sum("blocks"),
    duels: sum("duels"),
    duelsWon: sum("duelsWon"),
    yellowCards: sum("yellowCards"),
    yellowToRedCards: sum("yellowToRedCards"),
    redCards: sum("redCards"),
    rating
  };
}
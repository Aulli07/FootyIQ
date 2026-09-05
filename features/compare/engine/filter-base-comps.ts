import canonicalStoreNew from "@/features/players/data/new/canonical-store.json"
import { FootballDataStore, Player, PlayerSeasonStats } from "@/shared/types/stats-schema";
import { BaseComparison } from "./generate-base-comps";


const canonicalStore = canonicalStoreNew as FootballDataStore;
const players = canonicalStore.players;
const stats = canonicalStore.totalPlayerStats;


const MIN_MINUTES_BY_CONTEXT: Record<string, number> = {
  CTX_SEASON: 450,
  CTX_LEAGUE_SEASON: 450,
  CTX_COMPETITION_SEASON: 180,
  CTX_LEAGUE_CAREER: 900,
  CTX_COMPETITION_CAREER: 360,
  CTX_OVERALL_CAREER: 900
};

// Broad position tiers    extend this if defenders/keepers enter the dataset.
const POSITION_TIER: Record<string, string> = {
  Striker: "attack",
  Forward: "attack",
  Winger: "attack",
  Midfielder: "midfield"
};

const QUALITY_WEIGHTS = {
  sampleAdequacy: 0.4,
  positionMatch: 0.25,
  statProximity: 0.35
};

// Metrics used for stat-proximity scoring. chancesCreated stands in for
// keyPasses since they're duplicate signals in this dataset.
const PROXIMITY_METRICS = [
  "goals",
  "assists",
  "shotsOnTarget",
  "dribblesCompleted",
  "chancesCreated"
] as const;

// ---------------------------------------------------------------------------
// Aggregation    sum every stat row matching a player's scope for this context
// ---------------------------------------------------------------------------

type AggregatedStats = {
  minutes: number;
  appearances: number;
  goals: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  chancesCreated: number;
  dribbles: number;
  dribblesCompleted: number;
};

function statsInScope(
  playerId: string,
  contextId: string,
  scope: BaseComparison["scope"]
): PlayerSeasonStats[] {

  return stats.filter(stat => {
    if (stat.playerId !== playerId) return false;
    switch (contextId) {
      case "CTX_SEASON":
        return stat.seasonId === scope.seasonId;
      case "CTX_LEAGUE_SEASON":
        return (
          stat.seasonId === scope.seasonId &&
          stat.competitionId === scope.leagueId &&
          stat.competitionType === "league"
        );
      case "CTX_COMPETITION_SEASON":
        return stat.seasonId === scope.seasonId && stat.competitionId === scope.competitionId;
      case "CTX_LEAGUE_CAREER":
        return stat.competitionId === scope.leagueId && stat.competitionType === "league";
      case "CTX_COMPETITION_CAREER":
        return stat.competitionId === scope.competitionId;
      case "CTX_OVERALL_CAREER":
        return true;
      default:
        return false;
    }
  });
}

function aggregateStats(rows: PlayerSeasonStats[]): AggregatedStats {
  const sum = (field: "dribbles" | "minutes" | "appearances" | "goals" | "assists" | "shots" | "shotsOnTarget" | "chancesCreated" | "dribblesCompleted") =>
    rows.reduce((total, row) => total + (Number(row[field]) || 0), 0);

  return {
    minutes: sum("minutes"),
    appearances: sum("appearances"),
    goals: sum("goals"),
    assists: sum("assists"),
    shots: sum("shots"),
    shotsOnTarget: sum("shotsOnTarget"),
    chancesCreated: sum("chancesCreated"),
    dribbles: sum("dribbles"),
    dribblesCompleted: sum("dribblesCompleted")
  };
}

// ---------------------------------------------------------------------------
// Scoring components
// ---------------------------------------------------------------------------

function positionMatchScore(posA: string, posB: string): number {
  const tierA = POSITION_TIER[posA];
  const tierB = POSITION_TIER[posB];
  if (!tierA || !tierB) return 0.75; // unrecognized position    neutral, don't penalize
  return tierA === tierB ? 1 : 0.5; // cross-tier is down-weighted, never excluded
}

function sampleAdequacyScore(minSharedMinutes: number, floor: number): number {
  const confidenceCeiling = floor * 3; // 3x the floor reads as "fully sampled"
  return Math.min(1, minSharedMinutes / confidenceCeiling);
}

function statProximityScore(a: AggregatedStats, b: AggregatedStats): number {
  const per90 = (stats: AggregatedStats, field: keyof AggregatedStats) =>
    stats.minutes > 0 ? (stats[field] / stats.minutes) * 90 : 0;

  const perMetricScores = PROXIMITY_METRICS.map(metric => {
    const rateA = per90(a, metric);
    const rateB = per90(b, metric);
    const maxRate = Math.max(rateA, rateB);
    if (maxRate === 0) return 1; // neither player produces this    not a differentiator
    return 1 - Math.abs(rateA - rateB) / maxRate; // 1 = identical rate, 0 = maximal gap
  });

  return perMetricScores.reduce((sum, score) => sum + score, 0) / perMetricScores.length;
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

type QualityComparison = BaseComparison & { qualityScore: number };

export function filterBaseComparisons(
  baseComparisons: BaseComparison[],
  options?: { topNPerGroup?: number; minQualityScore?: number }
): QualityComparison[] {
  const topNPerGroup = options?.topNPerGroup ?? Infinity;
  const minQualityScore = options?.minQualityScore ?? 0.4;

  const playersById = new Map(players.map(p => [p.id, p]));
  const seen = new Set<string>(); // safety net against duplicate base comparisons
  const scored: QualityComparison[] = [];

  for (const comparison of baseComparisons) {
    const dedupeKey = `${comparison.context}::${JSON.stringify(comparison.scope)}::${comparison.playerA}::${comparison.playerB}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    const floor = MIN_MINUTES_BY_CONTEXT[comparison.context] ?? 0;

    const rowsA = statsInScope(comparison.playerA, comparison.context, comparison.scope);
    const rowsB = statsInScope(comparison.playerB, comparison.context, comparison.scope);
    const aggA = aggregateStats(rowsA);
    const aggB = aggregateStats(rowsB);

    // Hard floor    below this, the sample is too small to be a real comparison
    if (aggA.minutes < floor || aggB.minutes < floor) continue;

    const playerA = playersById.get(comparison.playerA);
    const playerB = playersById.get(comparison.playerB);
    if (!playerA || !playerB) continue;

    const sampleScore = sampleAdequacyScore(Math.min(aggA.minutes, aggB.minutes), floor);
    const positionScore = positionMatchScore(playerA.primaryPosition, playerB.primaryPosition);
    const proximityScore = statProximityScore(aggA, aggB);

    const qualityScore =
      sampleScore * QUALITY_WEIGHTS.sampleAdequacy +
      positionScore * QUALITY_WEIGHTS.positionMatch +
      proximityScore * QUALITY_WEIGHTS.statProximity;

    if (qualityScore < minQualityScore) continue;

    scored.push({ ...comparison, qualityScore });
  }

  // Rank independently within each (contextId + scope) group    counts are
  // allowed to differ wildly across contexts, by design.
  const grouped = new Map<string, QualityComparison[]>();
  for (const comparison of scored) {
    const groupKey = `${comparison.context}::${JSON.stringify(comparison.scope)}`;
    if (!grouped.has(groupKey)) grouped.set(groupKey, []);
    grouped.get(groupKey)!.push(comparison);
  }

  const result: QualityComparison[] = [];
  for (const group of grouped.values()) {
    group.sort((a, b) => b.qualityScore - a.qualityScore);
    result.push(...group.slice(0, topNPerGroup));
  }

  return result;
}

export type { QualityComparison, AggregatedStats };

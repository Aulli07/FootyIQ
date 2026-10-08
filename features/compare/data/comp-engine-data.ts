import { FootballDataStore } from "@/shared/types/stats-schema";
import canonicalStoreNew from "@/data/processed/canonical-store.json";

const canonicalStore = canonicalStoreNew as FootballDataStore;
export const MULTIPLIER: { spl: number; epl: number; cl: number } = {
  spl: 1.1,
  epl: 1.8,
  cl: 2.5,
};

export const MIN_MINUTES_BY_CONTEXT: Record<string, number> = {
  "CTX-SEASON": 450,
  "CTX-LEAGUE-SEASON": 450,
  "CTX-COMPETITION-SEASON": 180,
  "CTX-LEAGUE-CAREER": 900,
  "CTX-COMPETITION-CAREER": 360,
  "CTX-OVERALL-CAREER": 900
};

export const POSITION_TIER: Record<string, string> = {
  Forward: "attack",
  Attacker: "attack",
  Midfielder: "midfield",
  Defender: "defender",
  Goalkeeper: "goalkeeper"
};

export const QUALITY_WEIGHTS = {
  notabilityPercentile: 0.3,
  minNotablePerStat: 1,
  targetTotal: 50,
  minGroup: 5
};

export const canonicalPlayers = canonicalStore.players;
export const canonicalStats = canonicalStore.stats

export const playersById = new Map(canonicalPlayers.map(p => [p.id, p]))

export const clubSeasonHistoryByPlayerId = new Map<string, Set<string>>();
for (const stat of canonicalStats) {
  if (!clubSeasonHistoryByPlayerId.has(stat.playerId)) {
    clubSeasonHistoryByPlayerId.set(stat.playerId, new Set());
  }
  clubSeasonHistoryByPlayerId.get(stat.playerId)!.add(`${stat.clubId}::${stat.seasonId}`);
}
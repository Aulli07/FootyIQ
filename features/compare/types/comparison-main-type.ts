export type ComparisonScope = {
  seasonId?: string;
  leagueId?: string;
  competitionId?: string;
};

export type ComparisonContext =
  | "CTX-SEASON"
  | "CTX-LEAGUE-SEASON"
  | "CTX-COMPETITION-SEASON"
  | "CTX-LEAGUE-CAREER"
  | "CTX-COMPETITION-CAREER"
  | "CTX-OVERALL-CAREER";

export type ComparisonAnalyticsType = { id: string; viewCount: number; searchCount: number };
export type ComparisonStoredAnalyticsType = Record<string, ComparisonAnalyticsType>;
export type ComparisonCombinedType = QualityComparisonType & ComparisonAnalyticsType;
export type ComparisonProps = { comparisonIds: string[]; title: string };

/** Both players share a comparison mode but own independent stat scopes. */
export type BaseComparisonType = {
  id: string;
  context: ComparisonContext;
  playerA: string;
  playerB: string;
  scopeA: ComparisonScope;
  scopeB: ComparisonScope;
};

export type QualityComparisonType = BaseComparisonType & { qualityScore: number };

// Compatibility aliases for older feature consumers.
export type ComparisonType = QualityComparisonType;
export type ComparisonStoredType = Record<string, QualityComparisonType>;

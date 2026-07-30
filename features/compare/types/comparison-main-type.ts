import { Player } from "@/shared/types/stats-schema";



export type ComparisonType = {
  comparisonId: string;

  themeId?: string;
  themeTitle?: string;

  matchupType?: ComparisonMatchupType;

  playerA: string;
  playerB: string;
  contextA: string;
  contextB: string;

  source: "precomputed" | "user";

  timestamp: number;
};

export type ComparisonStoredType = Record<string, ComparisonType>;

export type ComparisonMatchupType = "season" | "competition" | "career";
export type ComparisonMatchupArrayType = [
  Player,
  Player,
  ComparisonMatchupType,
];

type ComparisonAnalyticsType = {
  comparisonId: string;

  viewCount: number;
  searchCount: number;
};

export type ComparisonStoredAnalyticsType = Record<
  string,
  ComparisonAnalyticsType
>;

export type ComparisonCombinedType = {
  comparisonId: string;

  themeId?: string;
  themeTitle?: string;

  matchupType?: ComparisonMatchupType;

  playerA: string;
  playerB: string;
  contextA: string;
  contextB: string;

  source: "precomputed" | "user";

  timestamp: number;

  viewCount: number;
  searchCount: number;
};

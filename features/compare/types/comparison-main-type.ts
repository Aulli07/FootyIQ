import { Player } from "@/shared/types/stats-schema";


type ComparisonAnalyticsType = {
  id: string;

  viewCount: number;
  searchCount: number;
};

export type ComparisonStoredAnalyticsType = Record<
  string,
  ComparisonAnalyticsType
>;

export type ComparisonCombinedType = {
  id: string;
  viewCount: number;
  searchCount: number;
}

export type ComparisonProps = {
  comparisonIds: string[];
  title: string;
};

export type BaseComparisonType = {
  id: string;
  context: string;
  playerA: string;
  playerB: string;
  scope: {
    seasonId?: string;
    leagueId?: string;
    competitionId?: string;
  }
}

export type QualityComparisonType = BaseComparisonType & {
  qualityScore: number;}

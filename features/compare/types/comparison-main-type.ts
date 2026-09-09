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

export type ComparisonProps = {
  comparisonIds: string[];
  title: string;
};
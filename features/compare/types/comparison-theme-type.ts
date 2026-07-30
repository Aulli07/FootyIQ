export type RankingStrategyType = 
  | "overall"
  | "goals_heavy"
  | "creator_heavy"
  | "goals_creator_heavy"
  | "defense_heavy"
  | "career_legacy";  


export type ComparisonThemeType = {
  id: string;
  title: string;
  matchupType: string;
  filters: {
    positions?: string[];
    competitionIds?: string[];
    nationalities?: string[];
    minRating?: number;
    minSearches?: number;
    minVotes?: number;
  };
  rankingStrategy: RankingStrategyType;
};
export type ComparisonThemeType = {
  id: string;
  title: string;
  context: string;
  filters: {
    positions?: string[];
    leagueIds?: string[];
    competitionIds?: string[];
    seasonId?: string[];  
    nationalities?: string[];
  };
};
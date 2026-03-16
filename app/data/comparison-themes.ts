export type PlayerCategory = "top_prospect" | "prime" | "legend" | "best" | "good";

export type RankingStrategyType = 
  | "overall"
  | "goals_heavy"
  | "creator_heavy"
  | "goals_creator_heavy"
  | "defense_heavy"
  | "career_legacy";  

export type ComparisonTheme = {
  id: string;
  title: string;
  matchupType: string;
  filters: {
    categories?: PlayerCategory[];
    positions?: string[];
    statuses?: string[];
    competitionIds?: string[];
    nationalities?: string[];
    minRating?: number;
    minSearches?: number;
    minVotes?: number;
  };
  rankingStrategy: RankingStrategyType;
};

export const SYSTEM_COMPARISON_THEMES: ComparisonTheme[] = [
  {
    id: "premier_league_best_strikers",
    title: "Premier League Best Strikers Edition",
    matchupType: "competition",
    filters: {
      positions: ["Forward"],
      categories: ["prime", "legend", "best"],
      competitionIds: ["epl"],
      minRating: 8.5,
    },
    rankingStrategy: "goals_heavy",
  },
  {
    id: "champions_league_monsters",
    title: "Champions League Monsters",
    matchupType: "competition",
    filters: {
      categories: ["prime", "legend", "best"],
      competitionIds: ["ucl"],
      minRating: 8.7,
    },
    rankingStrategy: "overall"
  },
  {
    id: "international_kings",
    title: "International Kings Edition",
    matchupType: "competition",
    filters: {
      categories: ["prime", "legend", "best"],
      competitionIds: ["world_cup", "euros", "copa_america", "afcon"],
      minRating: 8.3,
    },
    rankingStrategy: "overall"
  },
  {
    id: "laliga_rising_forwards",
    title: "LaLiga Rising Forwards Edition",
    matchupType: "competition",
    filters: {
      positions: ["Forward"],
      categories: ["top_prospect", "prime"],
      competitionIds: ["laliga"],
      minRating: 8.3,
    },
    rankingStrategy: "goals_creator_heavy"
  },
  {
    id: "saudi_pro_league_icons",
    title: "Saudi Pro League Icons",
    matchupType: "career",
    filters: {
      positions: ["Forward"],
      categories: ["legend", "best"],
      competitionIds: ["spl"],
      minRating: 8.5,
    },
    rankingStrategy: "goals_creator_heavy"
  },
  // {
  //   id: "mls_magic_makers",
  //   title: "MLS Magic Makers",
  //   filters: {
  //     categories: ["legend", "best", "prime"],
  //     competitionIds: ["mls"],
  //     minRating: 8.5,
  //   },
  //   rankingStrategy: "overall"
  // },
];

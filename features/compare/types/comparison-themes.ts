import { ComparisonThemeType } from "@/features/compare/types/comparison-theme-type";

export const SYSTEM_COMPARISON_THEMES: ComparisonThemeType[] = [
  {
    id: "premier_league_best_strikers",
    title: "PL Best Forwards",
    matchupType: "competition",
    filters: {
      positions: ["Forward"],
      competitionIds: ["epl"],
      minRating: 8,
    },
    rankingStrategy: "goals_heavy",
  },
  {
    id: "champions_league_monsters",
    title: "UCL Monsters",
    matchupType: "competition",
    filters: {
      competitionIds: ["ucl"],
      minRating: 8,
    },
    rankingStrategy: "overall",
  },
  {
    id: "international_kings",
    title: "International Kings",
    matchupType: "competition",
    filters: {
      competitionIds: ["world_cup", "world-cup", "club_world_cup"],
      minRating: 8,
    },
    rankingStrategy: "overall",
  },
  {
    id: "laliga_rising_forwards",
    title: "LaLiga Rising Forwards",
    matchupType: "competition",
    filters: {
      positions: ["Forward"],
      competitionIds: ["laliga"],
      minRating: 8,
    },
    rankingStrategy: "goals_creator_heavy",
  },
  {
    id: "spl_pro_league_icons",
    title: "SPL Icons",
    matchupType: "career",
    filters: {
      competitionIds: ["spl"],
      minRating: 8,
    },
    rankingStrategy: "goals_creator_heavy",
  },
];

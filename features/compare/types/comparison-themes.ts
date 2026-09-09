import { ComparisonThemeType } from "@/features/compare/types/comparison-theme-type";

export const SYSTEM_COMPARISON_THEMES: ComparisonThemeType[] = [
  {
    id: "premier-league-best-players",
    title: "PL Best Players",
    context: "CTX-LEAGUE-SEASON",
    filters: {
      leagueIds: ["epl"],
    }
  },
  {
    id: "champions-league-monsters",
    title: "UCL Monsters",
    context: "CTX-COMPETITION-SEASON",
    filters: {
      competitionIds: ["ucl"]
    }
  },
  {
    id: "international-kings",
    title: "International Kings",
    context: "CTX-COMPETITION-SEASON",
    filters: {
      competitionIds: ["world-cup", "fifa-club-world-cup"],
    },
  },
  {
    id: "best-in-24-25",
    title: "Best in 24/25",
    context: "CTX-SEASON",
    filters: {
      seasonId: ["24/25"]
    },
  },
  // {
  //   id: "laliga_rising_forwards",
  //   title: "LaLiga Rising Forwards",
  //   matchupType: "competition",
  //   filters: {
  //     positions: ["Forward"],
  //     competitionIds: ["laliga"],
  //     minRating: 8,
  //   },
  //   rankingStrategy: "goals_creator_heavy",
  // },
  // {
  //   id: "spl_pro_league_icons",
  //   title: "SPL Icons",
  //   matchupType: "career",
  //   filters: {
  //     competitionIds: ["spl"],
  //     minRating: 8,
  //   },
  //   rankingStrategy: "goals_creator_heavy",
  // },
];

import { PlayerCompetitionStats } from "@/features/players/types/stats-legacy";

export const statLabelMap: Partial<Record<keyof PlayerCompetitionStats, string>> = {
  footyRating: "Footy Rating",
  shotsOnTarget: "Shots on Target",
  keyPasses: "Key Passes",
  chancesCreated: "Chances Created",
  dribblesCompleted: "Dribbles Completed",
  dribbledPast: "Dribbled Past",
  groundDuelsWon: "Ground Duels Won",
  yellowToRedCards: "Yellow to Red",
};

export function formatStatLabel(statKey: keyof PlayerCompetitionStats) {
  return (
    statLabelMap[statKey] ??
    statKey
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/^\w/, (letter) => letter.toUpperCase())
  );
}
import type { PlayerCompetitionStats } from "./stats-legacy";

export type ComparisonStatKey = Exclude<keyof PlayerCompetitionStats, "team">;

export type ComparisonStatOption = {
  key: ComparisonStatKey;
  label: string;
};

const comparisonStatLabelMap: Record<ComparisonStatKey, string> = {
  appearances: "Appearances",
  age: "Age",
  height: "Height",
  footyRating: "Footy Rating",
  matchesPlayed: "Matches Played",
  goals: "Goals",
  assists: "Assists",
  minutes: "Minutes",
  shots: "Shots",
  totalShots: "Total Shots",
  shotsOnTarget: "Shots on Target",
  keyPasses: "Key Passes",
  chancesCreated: "Chances Created",
  dribbles: "Dribbles",
  dribblesCompleted: "Dribbles Completed",
  interceptions: "Interceptions",
  tackles: "Tackles",
  dribbledPast: "Dribbled Past",
  clearances: "Clearances",
  groundDuelsWon: "Ground Duels Won",
  blockedShots: "Blocked Shots",
  yellowCards: "Yellow Cards",
  yellowToRedCards: "Yellow to Red Cards",
  redCards: "Red Cards",
};

export const comparisonStatOptions: ComparisonStatOption[] = Object.entries(
  comparisonStatLabelMap,
).map(([key, label]) => ({
  key: key as ComparisonStatKey,
  label,
}));

export function getComparisonStatLabel(statKey: ComparisonStatKey) {
  return comparisonStatLabelMap[statKey];
}

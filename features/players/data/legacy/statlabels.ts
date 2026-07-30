// Labels used to show player stat names in the UI.

export const generalStats = [
  { key: "dateOfBirth", label: "Age" },
  { key: "heightCm", label: "Height" },
  { key: "primaryPosition", label: "Position" },
  { key: "currentClubId", label: "Team" },
  { key: "averageRating", label: "Footy IQ Rating" },
];

export const attackingStats = [
  { key: "goals", label: "Goals" },
  { key: "assists", label: "Assists" },
  { key: "shots", label: "Total Shots" },
  { key: "shotsOnTarget", label: "Shots On Target" },
  { key: "chancesCreated", label: "Chances Created" },
];

export const defendingStats = [
  { key: "interceptions", label: "Interceptions" },
  { key: "tackles", label: "Tackles" },
  { key: "clearances", label: "Clearances" },
  { key: "groundDuelsWon", label: "Ground Duels Won" },
  { key: "blockedShots", label: "Blocked Shots" },
];

export const cardStats = [
  { key: "yellowCards", label: "Yellow Cards" },
  { key: "redCards", label: "Red Cards" },
];


export const compareTabs = [
  { key: "general", label: "General" },
  { key: "attacking", label: "Attacking" },
  { key: "defending", label: "Defending" },
  { key: "cards", label: "Cards" },
  { key: "insights", label: "AI Insights" },
] as const;

export type TabType = (typeof compareTabs)[number]["key"];
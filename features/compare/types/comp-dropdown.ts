import { RefObject, ReactNode } from "react";

import { ComparisonStoredType } from "./comparison-main-type";
import { ComparisonStatOption, ComparisonStatKey } from "@/features/players/types/comparison-stat-options";


export type CompDropdownPanelProps = {
  label: string;
  searchQuery: string;
  searchedComparisons: ComparisonStoredType;
  comparisonStats: ComparisonStatOption[];
  selectedComparisonStats: ComparisonStatKey[];
  selectedComparison: string | null;
  onSearchQueryChange: (value: string) => void;
  onSelectComparison: (comparisonId: string) => void;
  onToggleComparisonStat: (statKey: ComparisonStatKey) => void;
  onApplyComparison: () => void;
};

export type DropdownShellProps = {
  menuRef: RefObject<HTMLUListElement | null>;
  label: string;
  children: ReactNode;
};

export type PlayerSelectionDropdownPanelProps = {
  label: string;
  searchQuery: string;
  searchedPlayers: string[];
  selectedPlayers?: string[];
  suggestedPlayers: string[];
  placeholder: string;
  onSearchQueryChange: (value: string) => void;
  onSelectPlayer: (playerId: string) => void;
};

export type SeasonDropdownPanelProps = {
  label: string;
  players?: string[];
  playerSlot: number;
  onSelectSeason: (season: string) => void;
};


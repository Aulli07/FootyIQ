import { ComparisonStoredType } from "../../features/compare/types/comparison-main-type";
import type {
  ComparisonStatKey,
  ComparisonStatOption,
} from "@/features/players/types/comparison-stat-options";

export type DropDownPropsType =
  | {
      type: "season";
      label: string;
      setSelectedSeasonLabels: React.Dispatch<
        React.SetStateAction<Array<string>>
      >;
      playerSlot: number;
      selectedPlayers?: Array<string>;
      selectedSeasonLabels: Array<string>;
    }
  | {
      type: "player";
      label: string;
      playerSlot: number;
      setSelectedPlayers: React.Dispatch<React.SetStateAction<Array<string>>>;
      selectedPlayers: Array<string>;
      setSelectedSeasonLabels: React.Dispatch<
        React.SetStateAction<Array<string>>
      >;
      searchQuery: string;
      setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
      // onSearchQueryChange: (query: string) => void;
      searchedPlayers: Array<string>;
    }
  | {
      type: "comparison";
      label: string;
      setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
      searchQuery: string;
      searchedComparisons: ComparisonStoredType;
      selectedComparison: string | null;
      setSelectedComparison: React.Dispatch<
        React.SetStateAction<string | null>
      >;
      comparisonStats: ComparisonStatOption[];
      selectedComparisonStats: ComparisonStatKey[];
      setSelectedComparisonStats: React.Dispatch<
        React.SetStateAction<ComparisonStatKey[]>
      >;
      onApplyComparison: () => void;
    }
  | {
      type: "poll";
      label: string;
      selectedPollPlayers: Array<string>;
      setSelectedPollPlayers: React.Dispatch<
        React.SetStateAction<Array<string>>
      >;
      searchedPlayers: Array<string>;
      setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
      searchQuery: string;
    };

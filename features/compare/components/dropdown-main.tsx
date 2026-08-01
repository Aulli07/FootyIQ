import { Dispatch, RefObject, SetStateAction, useMemo } from "react";

import { DropDownPropsType } from "@/shared/types/dropdown-props";
import { ComparisonType } from "@/features/compare/types/comparison-main-type";

import { getSuggestedPlayers } from "@/features/players/utils/suggested-players";
import { getStoredComparisons } from "@/features/compare/services/comparison-storage";
import { handleToggleComparisonStat } from "@/features/compare/utils/dropdown-handler";

import { DropdownShell } from "./dropdown-shell";
import { ComparisonDropdownPanel } from "./comparison-dropdown-panel";
import { SeasonDropdownPanel } from "./season-dropdown-panel";
import { PlayerSelectionDropdownPanel } from "./player-selection-dropdown-panel";


export default function DropDownMain({
  setIsOpen,
  menuRef,
  props,
  handleSelect,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  menuRef: RefObject<HTMLUListElement | null>;
  props: DropDownPropsType;
  handleSelect: (
    value: string | ComparisonType,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    props: DropDownPropsType,
  ) => void;
}) {

  const suggestedPlayers = useMemo(() => getSuggestedPlayers(), []);
  const storedComparisons = useMemo(() => getStoredComparisons(), []);

  if (props.type === "season") {
    return (
      <DropdownShell menuRef={menuRef} label={props.label}>
        <SeasonDropdownPanel
          label={props.label}
          players={props.selectedPlayers}
          playerSlot={props.playerSlot}
          onSelectSeason={(season) => handleSelect(season, setIsOpen, props)}
        />
      </DropdownShell>
    );
  }

  if (props.type === "player") {
    return (
      <DropdownShell menuRef={menuRef} label={props.label}>
        <PlayerSelectionDropdownPanel
          label={props.label}
          searchQuery={props.searchQuery}
          searchedPlayers={props.searchedPlayers}
          suggestedPlayers={suggestedPlayers}
          placeholder="Search for players"
          onSearchQueryChange={props.setSearchQuery}
          onSelectPlayer={(playerId) =>
            handleSelect(playerId, setIsOpen, props)
          }
        />
      </DropdownShell>
    );
  }

  if (props.type === "poll") {
    return (
      <DropdownShell menuRef={menuRef} label={props.label}>
        <PlayerSelectionDropdownPanel
          label={props.label}
          searchQuery={props.searchQuery}
          searchedPlayers={props.searchedPlayers}
          selectedPlayers={props.selectedPollPlayers}
          suggestedPlayers={suggestedPlayers}
          placeholder="Search for players"
          onSearchQueryChange={props.setSearchQuery}
          onSelectPlayer={(playerId) =>
            handleSelect(playerId, setIsOpen, props)
          }
        />
      </DropdownShell>
    );
  }

  return (
    <DropdownShell menuRef={menuRef} label={props.label}>
      <ComparisonDropdownPanel
        label={props.label}
        searchQuery={props.searchQuery}
        searchedComparisons={
          props.searchQuery.trim() === ""
            ? storedComparisons
            : props.searchedComparisons
        }
        comparisonStats={props.comparisonStats}
        selectedComparisonStats={props.selectedComparisonStats}
        selectedComparison={props.selectedComparison}
        onSearchQueryChange={props.setSearchQuery}
        onSelectComparison={(comparisonId) =>
          handleSelect(comparisonId, setIsOpen, props)
        }
        onToggleComparisonStat={(statKey) =>
          handleToggleComparisonStat(statKey, props)
        }
        onApplyComparison={props.onApplyComparison}
      />
    </DropdownShell>
  );
}

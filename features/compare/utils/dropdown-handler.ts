import { Dispatch, SetStateAction } from "react";

import { ComparisonStatKey } from "@/features/players/types/comparison-stat-options";
import { ComparisonType } from "../types/comparison-main-type";

import { canonicalPlayers } from "@/shared/utils/canonical-lookups";
import { DropDownPropsType } from "@/shared/types/dropdown-props";


export const handleSelect = (
  value: string | ComparisonType,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  props: DropDownPropsType,
) => {

  if (props.type === "player") {
    props.setSearchQuery("");
    return handlePlayerSelect(value, setIsOpen, props);
  }

  if (props.type === "poll") {
    props.setSearchQuery("");
    return handlePollSelect(value, setIsOpen, props);
  }

  if (props.type === "season") {
    return handleSeasonSelect(value, setIsOpen, props);
  }

  return handleComparisonSelect(value, setIsOpen, props);
};

function resolvePlayerId(value: string) {
  return canonicalPlayers.find((player) => player.id === value)?.id ?? "";
}

function handlePlayerSelect(
  value: string | ComparisonType,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  props: Extract<DropDownPropsType, { type: "player" }>,
) {
  if (typeof value !== "string") {
    return;
  }

  const nextPlayer = resolvePlayerId(value);

  props.setSelectedPlayers((prev) => {
    const next = [...prev];
    next[props.playerSlot] = nextPlayer;
    return next;
  });

  setIsOpen(false);
}

function handlePollSelect(
  value: string | ComparisonType,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  props: Extract<DropDownPropsType, { type: "poll" }>,
) {
  if (typeof value !== "string") {
    return;
  }

  const nextPlayer = resolvePlayerId(value);

  if (!nextPlayer || props.selectedPollPlayers.includes(nextPlayer)) {
    return;
  }

  props.setSelectedPollPlayers((prev) => {
    const next = [...prev];
    const firstEmptySlot = next.findIndex((playerId) => !playerId);

    if (firstEmptySlot === -1) {
      next[0] = nextPlayer;
      next[1] = "";
      setIsOpen(true);
      return next;
    }

    next[firstEmptySlot] = nextPlayer;

    const filledSlots = next.filter(Boolean).length;

    if (filledSlots >= 2) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    return next;
  });
}

function handleSeasonSelect(
  value: string | ComparisonType,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  props: Extract<DropDownPropsType, { type: "season" }>,
) {
  if (typeof value !== "string") {
    return;
  }

  props.setSelectedSeasonLabels((prev) => {
    const next = [...prev];
    next[props.playerSlot] = value;
    return next;
  });

  setIsOpen(false);
}

function handleComparisonSelect(
  value: string | ComparisonType,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  props: Extract<DropDownPropsType, { type: "comparison" }>,
) {
  props.setSelectedComparison(
    typeof value === "string" ? value : value.comparisonId,
  );
  // setIsOpen(false);
}

export function handleToggleComparisonStat(
  statKey: ComparisonStatKey,
  props: Extract<DropDownPropsType, { type: "comparison" }>,
) {
  props.setSelectedComparisonStats((prev) =>
    prev.includes(statKey)
      ? prev.filter((item) => item !== statKey)
      : [...prev, statKey],
  );
}

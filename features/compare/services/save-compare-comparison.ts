import { manageComparisonInStorage } from "@/features/compare/services/comparison-storage";
import { ComparisonType } from "@/features/compare/types/comparison-main-type";
import {
  buildHashId,
  createComparisonKey,
  normalizeLabel as sharedNormalizeLabel,
} from "@/shared/utils/identity";

import { RefObject, useEffect } from "react";


type newComparisonType = {
  playerA: string;
  playerB: string;
  contextA: string;
  contextB: string;
};

type newComparisonTypeForPlayer = {
  player: string;
  context: string;
};

export function saveComparison({
  selectedPlayers,
  selectedSeasonLabels,
  setCurrentComparisonId,
  lastComparisonKeyRef,
}: {
  selectedPlayers: Array<string>;
  selectedSeasonLabels: Array<string>;
  setCurrentComparisonId: React.Dispatch<React.SetStateAction<string | null>>;
  lastComparisonKeyRef: RefObject<string | null>;
}) {
  const hasCompletedComparison =
    !!selectedPlayers[0] &&
    !!selectedPlayers[1] &&
    !!selectedSeasonLabels[0] &&
    !!selectedSeasonLabels[1] &&
    selectedSeasonLabels[0] !== "Season" &&
    selectedSeasonLabels[1] !== "Season";

  const newComparison = {
    playerA: selectedPlayers[0],
    playerB: selectedPlayers[1],
    contextA: selectedSeasonLabels[0],
    contextB: selectedSeasonLabels[1],
  };

  useEffect(() => {
    if (!hasCompletedComparison) {
      lastComparisonKeyRef.current = null;
      setCurrentComparisonId(null);
      return;
    }

    const comparisonKey = JSON.stringify(newComparison);

    if (lastComparisonKeyRef.current === comparisonKey) {
      return;
    }

    const currentComparison = saveComparisonFromCompare(
      hasCompletedComparison,
      newComparison,
    );
    setCurrentComparisonId(currentComparison?.comparisonId ?? null);
    lastComparisonKeyRef.current = comparisonKey;
  }, [hasCompletedComparison, newComparison]);
}

export function saveComparisonFromCompare(
  hasCompletedComparison: boolean,
  newComparison: newComparisonType,
) {
  if (hasCompletedComparison) {
    const comparisonId = createNewComparisonId(newComparison);

    const comparisonEntry = buildComparisonEntry(comparisonId, newComparison);

    const newStoredComparison = manageComparisonInStorage(comparisonEntry);
    // const viewIncrementedComparison = incrementViewCountOfComparison(newStoredComparison);
    // const searchIncrementedComparison = incrementSearchCountOfComparison(viewIncrementedComparison);

    return newStoredComparison;
  }
}

function createNewComparisonId(newComparison: newComparisonType): string {
  const comparison = [
    {
      player: newComparison.playerA,
      context: newComparison.contextA,
    },
    {
      player: newComparison.playerB,
      context: newComparison.contextB,
    },
  ];

  const normalizedComparison = normalizeNewComparison(comparison);

  const id = createComparisonKey(normalizedComparison);

  return buildHashId(id);
}

function normalizeNewComparison(comparison: newComparisonTypeForPlayer[]) {
  return [...comparison].sort((a, b) => {
    const playerA = sharedNormalizeLabel(a.player);
    const playerB = sharedNormalizeLabel(b.player);

    const contextA = sharedNormalizeLabel(a.context);
    const contextB = sharedNormalizeLabel(b.context);

    const playerCompared = playerA.localeCompare(playerB);

    if (playerCompared !== 0) return playerCompared;

    return contextA.localeCompare(contextB);
  });
}

export function normalizeLabel(label: string): string {
  return sharedNormalizeLabel(label);
}

function buildComparisonEntry(
  id: string,
  comparison: newComparisonType,
): ComparisonType {
  return {
    comparisonId: id,

    playerA: comparison.playerA,
    playerB: comparison.playerB,
    contextA: comparison.contextA,
    contextB: comparison.contextB,

    source: "user",

    timestamp: Date.now(),
  };
}

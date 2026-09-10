import { RefObject, useEffect } from "react";
import { buildHashId, createComparisonKey, normalizeLabel } from "@/shared/utils/identity";
import { manageComparisonInStorage } from "./comparison-storage";
import { QualityComparisonType } from "../types/comparison-main-type";
import { NewComparisonType, SelectedComparisonContext } from "../types/comp-save-type";

export function saveComparison({
  selectedPlayers,
  selectedContexts,
  setCurrentComparisonId,
  lastComparisonKeyRef,
}: {
  selectedPlayers: string[];
  selectedContexts: SelectedComparisonContext[];
  setCurrentComparisonId: React.Dispatch<React.SetStateAction<string | null>>;
  lastComparisonKeyRef: RefObject<string | null>;
}) {
  const left = selectedContexts[0];
  const right = selectedContexts[1];
  const isComplete = Boolean(
    selectedPlayers[0] && selectedPlayers[1] && left?.context && right?.context &&
      left.context === right.context,
  );

  useEffect(() => {
    if (!isComplete || !left?.context || !right?.context) {
      lastComparisonKeyRef.current = null;
      setCurrentComparisonId(null);
      return;
    }

    const comparison = {
      playerA: selectedPlayers[0], 
      playerB: selectedPlayers[1], 
      context: left.context,
      scopeA: left.scope, 
      scopeB: right.scope,
    };
    
    const key = JSON.stringify(comparison);
    if (lastComparisonKeyRef.current === key) return;

    const stored = saveComparisonFromCompare(comparison);
    setCurrentComparisonId(stored.id);
    lastComparisonKeyRef.current = key;
  }, [isComplete, left, right, selectedPlayers, setCurrentComparisonId, lastComparisonKeyRef]);
}

export function saveComparisonFromCompare(comparison: NewComparisonType): QualityComparisonType {
  const id = createNewComparisonId(comparison);
  return manageComparisonInStorage({ ...comparison, id, qualityScore: 0 });
}

function createNewComparisonId(comparison: NewComparisonType): string {
  const pairs = [
    { player: comparison.playerA, scope: comparison.scopeA },
    { player: comparison.playerB, scope: comparison.scopeB },
  ].map(({ player, scope }) => `${normalizeLabel(player)}:${normalizeLabel(JSON.stringify(scope))}`)
    .sort();
  return buildHashId(createComparisonKey(pairs.map((pair) => ({ player: comparison.context, context: pair }))));
}

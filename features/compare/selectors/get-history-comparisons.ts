import { buildIndexedComparisonsForPlayers } from "../engine/create-index-comps";
import { buildHydratedComparisonStore } from "../engine/comparison-store";
import { ComparisonStoredType } from "../types/comparison-main-type";

import { Player } from "@/shared/types/stats-schema";



export function getHistoryOfComparisons(
  foundPlayers: Player[],
): ComparisonStoredType {

  const foundPlayerIds = foundPlayers.map((player) => player.id);
  const compared: ComparisonStoredType = {};

  const hydratedComparisonStore = buildHydratedComparisonStore();
  const hydratedComparisons = Array.from(
    Object.values(hydratedComparisonStore),
  );
  const indexedPlayerComparisons = buildIndexedComparisonsForPlayers(hydratedComparisons);
  

  foundPlayerIds.forEach((id) => {
    const foundComparisons = indexedPlayerComparisons[id] ?? [];

    foundComparisons.forEach((comparisonId) => {
      const comparison = hydratedComparisonStore[comparisonId];
      if (comparison) {
        compared[comparisonId] = comparison;
      }
    });
  });
  
  return compared;
}

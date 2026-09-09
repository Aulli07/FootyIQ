import { buildIndexedComparisonsForPlayers } from "../engine/create-index-comps";
import { buildHydratedComparisonStore } from "../engine/comparison-store";

import { Player } from "@/shared/types/stats-schema";

import { QualityComparisonType } from "../types/comparison-main-type";



export function getHistoryOfComparisons(
  foundPlayers: Player[],
): Record<string, QualityComparisonType> {

  const foundPlayerIds = foundPlayers.map((player) => player.id);
  const compared: Record<string, QualityComparisonType> = {};

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

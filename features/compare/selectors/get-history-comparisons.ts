import { buildIndexedComparisonStore } from "@/features/compare/engine/comparison-store";
import { buildHydratedComparisonStore } from "@/features/compare/engine/comparison-store";

import { ComparisonStoredType } from "@/features/compare/types/comparison-main-type";
import { Player } from "@/shared/types/stats-schema";



export function getHistoryOfComparisons(
  foundPlayers: Player[],
): ComparisonStoredType {
  const foundPlayerIds = foundPlayers.map((player) => player.id);
  const compared: ComparisonStoredType = {};

  const indexedPlayerComparisons = buildIndexedComparisonStore();
  const hydratedComparisonStore = buildHydratedComparisonStore();

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

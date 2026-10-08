import { BaseComparisonType } from "@/features/compare/types/comparison-main-type";

import { buildHydratedComparisonStore } from "@/features/compare/engine/comparison-store";

export function findComparisonFromHistory(
  comparisonId: string,
): BaseComparisonType | null {
  const currentHistory = buildHydratedComparisonStore();

  if (currentHistory[comparisonId]) {
    return currentHistory[comparisonId];
  }
  return null;
}

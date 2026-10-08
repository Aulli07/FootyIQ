import { ComparisonType } from "@/features/compare/types/comparison-main-type";

import { buildHydratedComparisonStore } from "@/features/compare/engine/comparison-store";

export function findComparisonFromHistory(
  comparisonId: string,
): ComparisonType | null {
  const currentHistory = buildHydratedComparisonStore();

  if (currentHistory[comparisonId]) {
    return currentHistory[comparisonId];
  }
  return null;
}

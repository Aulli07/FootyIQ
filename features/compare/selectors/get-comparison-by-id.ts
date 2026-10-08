"use client";

import { BaseComparisonType } from "../types/comparison-main-type";
import { buildHydratedComparisonStore } from "../engine/comparison-store";

export function getComparisonById(
  comparisonId: string,
): BaseComparisonType | null {
  const hydratedComparisons = buildHydratedComparisonStore();

  return hydratedComparisons[comparisonId] ?? null;
}

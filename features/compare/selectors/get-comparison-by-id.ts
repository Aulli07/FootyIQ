"use client";

import { ComparisonType } from "../types/comparison-main-type";
import { buildHydratedComparisonStore } from "../engine/comparison-store";


export function getComparisonById(comparisonId: string): ComparisonType | null {
  const hydratedComparisons = buildHydratedComparisonStore();

  return hydratedComparisons[comparisonId] ?? null;
}

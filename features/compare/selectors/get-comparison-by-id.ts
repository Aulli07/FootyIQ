"use client";

import { QualityComparison } from "../engine/filter-base-comps";
import { buildHydratedComparisonStore } from "../engine/comparison-store";


export function getComparisonById(comparisonId: string): QualityComparison | null {
  const hydratedComparisons = buildHydratedComparisonStore();

  return hydratedComparisons[comparisonId] ?? null;
}

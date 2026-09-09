"use client";

import { QualityComparisonType } from "../types/comparison-main-type";
import { buildHydratedComparisonStore } from "../engine/comparison-store";


export function getComparisonById(comparisonId: string): QualityComparisonType | null {
  const hydratedComparisons = buildHydratedComparisonStore();

  return hydratedComparisons[comparisonId] ?? null;
}

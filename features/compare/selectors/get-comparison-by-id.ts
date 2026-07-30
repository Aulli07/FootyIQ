"use client";

import { ComparisonType } from "@/features/compare/types/comparison-main-type";

import { buildHydratedComparisonStore } from "@/features/compare/engine/comparison-store";

export function getComparisonById(comparisonId: string): ComparisonType | null {
  const hydratedComparisons = buildHydratedComparisonStore();

  return hydratedComparisons[comparisonId] ?? null;
}

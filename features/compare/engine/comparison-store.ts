import indexedComparisons from "@/features/compare/data/indexed-comparisons.json";
import { getStoredComparisons } from "../services/comparison-storage";
import { BaseComparisonType } from "../types/comparison-main-type";

const precomputedComparisonStore = indexedComparisons as Record<
  string,
  BaseComparisonType
>;

export function buildHydratedComparisonStore(): Record<
  string,
  BaseComparisonType
> {
  return { ...precomputedComparisonStore, ...getStoredComparisons() };
}

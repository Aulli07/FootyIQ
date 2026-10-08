import indexedComparisons from "@/features/compare/data/indexed-comparisons.json";
import { getStoredComparisons } from "../services/comparison-storage";
import { ComparisonType } from "../types/comparison-main-type";

const precomputedComparisonStore = indexedComparisons as Record<
  string,
  ComparisonType
>;

export function buildHydratedComparisonStore(): Record<string, ComparisonType> {
  return { ...precomputedComparisonStore, ...getStoredComparisons() };
}

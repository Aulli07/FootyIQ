import indexedComparisons from "@/features/compare/data/indexed-comparisons.json";
import { getStoredComparisons } from "../services/comparison-storage";
import { QualityComparisonType } from "../types/comparison-main-type";

const precomputedComparisonStore = indexedComparisons as Record<string, QualityComparisonType>;



export function buildHydratedComparisonStore() : Record<string, QualityComparisonType> {
  return { ...precomputedComparisonStore, ...getStoredComparisons() };
}

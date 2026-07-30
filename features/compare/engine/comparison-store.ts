import indexedComparisons from "@/features/compare/data/indexed-comparisons.json";
import { ComparisonStoredType } from "../types/comparison-main-type";
import { getStoredComparisons } from "../services/comparison-storage";



const precomputedComparisonStore = indexedComparisons as ComparisonStoredType;

export function buildHydratedComparisonStore() {
  return { ...precomputedComparisonStore, ...getStoredComparisons() };
}
import indexedComparisons from "@/features/compare/data/indexed-comparisons.json";
import { getStoredComparisons } from "../services/comparison-storage";
import { QualityComparison } from "./filter-base-comps";

const precomputedComparisonStore = indexedComparisons as Record<string, QualityComparison>;



export function buildHydratedComparisonStore() {
  return { ...precomputedComparisonStore, ...getStoredComparisons() };
}

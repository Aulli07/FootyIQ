"use client";

import { QualityComparison } from "../engine/filter-base-comps";
import {
  ANALYTICS_KEY,
  getStoredAnalyticsOfComparisons,
  incrementSearchCountOfComparison,
  incrementViewCountOfComparison,
  storeAnalyticsOfComparison,
  notifyComparisonAnalyticsChanged,
} from "./analytics-storage";

const STORAGE_KEY = "comparison_storage";




export function manageComparisonInStorage(entry: QualityComparison) {
  const comparisonHistory = getStoredComparisons();
  const analyticsHistory = getStoredAnalyticsOfComparisons();
  const existingComparison = comparisonHistory[entry.id];

  if (existingComparison) {
    incrementViewCountOfComparison(existingComparison, analyticsHistory);
  } else {
    storeComparisonInStorage(entry, comparisonHistory);
    storeAnalyticsOfComparison(entry, analyticsHistory);
    incrementViewCountOfComparison(entry, analyticsHistory);
    incrementSearchCountOfComparison(entry, analyticsHistory);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(comparisonHistory));
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analyticsHistory));

  notifyComparisonAnalyticsChanged();

  return entry;
}

export function storeComparisonInStorage(
  entry: QualityComparison,
  comparisonHistory: Record<string, QualityComparison>,
) {
  comparisonHistory[entry.id] = entry;
}

export function getStoredComparisons(): Record<string, QualityComparison> {
  if (typeof window === "undefined") {
    return {};
  }
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

export function findComparisonFromHistory(
  comparison: QualityComparison,
): QualityComparison | null {
  const currentHistory = getStoredComparisons();

  if (currentHistory[comparison.id]) {
    return comparison;
  } else {
    return null;
  }
}

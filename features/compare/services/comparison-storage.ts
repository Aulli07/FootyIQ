"use client";

import { ComparisonType, ComparisonStoredType } from "../types/comparison-main-type";

import {
  ANALYTICS_KEY,
  getStoredAnalyticsOfComparisons,
  incrementSearchCountOfComparison,
  incrementViewCountOfComparison,
  storeAnalyticsOfComparison,
  notifyComparisonAnalyticsChanged,
} from "./analytics-storage";

const STORAGE_KEY = "comparison_storage";



export function manageComparisonInStorage(entry: ComparisonType) {
  const comparisonHistory = getStoredComparisons();
  const analyticsHistory = getStoredAnalyticsOfComparisons();
  const existingComparison = comparisonHistory[entry.comparisonId];

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
  entry: ComparisonType,
  comparisonHistory: ComparisonStoredType,
) {
  comparisonHistory[entry.comparisonId] = entry;
}

export function getStoredComparisons(): ComparisonStoredType {
  if (typeof window === "undefined") {
    return {};
  }
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

export function findComparisonFromHistory(
  comparison: ComparisonType,
): ComparisonType | null {
  const currentHistory = getStoredComparisons();

  if (currentHistory[comparison.comparisonId]) {
    return comparison;
  } else {
    return null;
  }
}

"use client";

import { QualityComparisonType } from "../types/comparison-main-type";

import {
  ANALYTICS_KEY,
  getStoredAnalyticsOfComparisons,
  incrementSearchCountOfComparison,
  incrementViewCountOfComparison,
  storeAnalyticsOfComparison,
  notifyComparisonAnalyticsChanged,
} from "./analytics-storage";

const STORAGE_KEY = "comparison_storage";




export function manageComparisonInStorage(entry: QualityComparisonType) {
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
  entry: QualityComparisonType,
  comparisonHistory: Record<string, QualityComparisonType>,
) {
  comparisonHistory[entry.id] = entry;
}

export function getStoredComparisons(): Record<string, QualityComparisonType> {
  if (typeof window === "undefined") {
    return {};
  }
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return {};

  try {
    const parsed: unknown = JSON.parse(data);
    if (!parsed || typeof parsed !== "object") throw new Error("Invalid comparison history");

    const comparisons = Object.fromEntries(
      Object.entries(parsed).filter(([, comparison]) => isStoredComparison(comparison)),
    ) as Record<string, QualityComparisonType>;

    // A legacy entry has one `scope`; removing it prevents old records from
    // leaking into the new per-player scope model.
    if (Object.keys(comparisons).length !== Object.keys(parsed).length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comparisons));
    }
    return comparisons;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return {};
  }
}

function isStoredComparison(value: unknown): value is QualityComparisonType {
  if (!value || typeof value !== "object") return false;
  const comparison = value as Partial<QualityComparisonType>;
  return Boolean(
    typeof comparison.id === "string" &&
      typeof comparison.context === "string" &&
      typeof comparison.playerA === "string" &&
      typeof comparison.playerB === "string" &&
      typeof comparison.qualityScore === "number" &&
      comparison.scopeA && typeof comparison.scopeA === "object" &&
      comparison.scopeB && typeof comparison.scopeB === "object",
  );
}

export function findComparisonFromHistory(
  comparison: QualityComparisonType,
): QualityComparisonType | null {
  const currentHistory = getStoredComparisons();

  if (currentHistory[comparison.id]) {
    return comparison;
  } else {
    return null;
  }
}

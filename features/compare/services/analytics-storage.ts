"use client";

import { ComparisonType } from "@/features/compare/types/comparison-main-type";
import { ComparisonStoredAnalyticsType } from "@/features/compare/types/comparison-main-type";

export const ANALYTICS_KEY = "comparison_analytics";



export function notifyComparisonAnalyticsChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event("comparison-analytics-updated"));
}

export function initializeComparisonAnalytics(
  hydratedComparisons: ComparisonType[],
) {
  if (typeof window === "undefined") {
    return;
  }

  const analyticsHistory = getStoredAnalyticsOfComparisons();

  hydratedComparisons.forEach((comparison) => {
    manageAnalyticsOfComparisonsInStorage(comparison, analyticsHistory);
  });

  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analyticsHistory));
  notifyComparisonAnalyticsChanged();
}

export function manageAnalyticsOfComparisonsInStorage(
  entry: ComparisonType,
  analyticsHistory: ComparisonStoredAnalyticsType,
) {
  if (!analyticsHistory[entry.comparisonId]) {
    storeAnalyticsOfComparison(entry, analyticsHistory);
  }
}

export function incrementViewCountOfComparison(
  comparison: ComparisonType,
  analyticsHistory: ComparisonStoredAnalyticsType,
) {
  analyticsHistory[comparison.comparisonId].viewCount =
    (analyticsHistory[comparison.comparisonId].viewCount || 0) + 1;

  return comparison;
}

export function incrementSearchCountOfComparison(
  comparison: ComparisonType,
  analyticsHistory: ComparisonStoredAnalyticsType,
) {
  analyticsHistory[comparison.comparisonId].searchCount =
    (analyticsHistory[comparison.comparisonId].searchCount || 0) + 1;

  return comparison;
}

export function storeAnalyticsOfComparison(
  entry: ComparisonType,
  analyticsHistory: ComparisonStoredAnalyticsType,
) {
  analyticsHistory[entry.comparisonId] = {
    comparisonId: entry.comparisonId,
    searchCount: 0,
    viewCount: 0,
  };
}

export function getStoredAnalyticsOfComparisons(): ComparisonStoredAnalyticsType {
  if (typeof window === "undefined") {
    return {};
  }

  const data = localStorage.getItem(ANALYTICS_KEY);
  return data ? JSON.parse(data) : {};
}

"use client";

import { ComparisonStoredAnalyticsType } from "@/features/compare/types/comparison-main-type";
import { QualityComparisonType } from "../types/comparison-main-type";

export const ANALYTICS_KEY = "comparison_analytics";



export function notifyComparisonAnalyticsChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event("comparison-analytics-updated"));
}

export function initializeComparisonAnalytics(
  hydratedComparisons: QualityComparisonType[],
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
  entry: QualityComparisonType,
  analyticsHistory: ComparisonStoredAnalyticsType,
) {
  if (!analyticsHistory[entry.id]) {
    storeAnalyticsOfComparison(entry, analyticsHistory);
  }
}

export function incrementViewCountOfComparison(
  comparison: QualityComparisonType,
  analyticsHistory: ComparisonStoredAnalyticsType,
) {
  analyticsHistory[comparison.id].viewCount =
    (analyticsHistory[comparison.id].viewCount || 0) + 1;

  return comparison;
}

export function incrementSearchCountOfComparison(
  comparison: QualityComparisonType,
  analyticsHistory: ComparisonStoredAnalyticsType,
) {
  analyticsHistory[comparison.id].searchCount =
    (analyticsHistory[comparison.id].searchCount || 0) + 1;

  return comparison;
}

export function storeAnalyticsOfComparison(
  entry: QualityComparisonType,
  analyticsHistory: ComparisonStoredAnalyticsType,
) {
  analyticsHistory[entry.id] = {
    id: entry.id,
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

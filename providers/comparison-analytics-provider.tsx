"use client";

import React, { useEffect, useState } from "react";

import { comparisonAnalyticsContext } from "./analytics-contexts";
import { ComparisonStoredAnalyticsType } from "@/features/compare/types/comparison-main-type";
import { getStoredAnalyticsOfComparisons } from "@/features/compare/services/analytics-storage";

export function ComparisonAnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [comparisonAnalytics, setComparisonAnalytics] =
    useState<ComparisonStoredAnalyticsType>(() => {
      if (typeof window === "undefined") {
        return {};
      }

      return getStoredAnalyticsOfComparisons();
    });

  const refreshComparisonAnalytics = () => {
    setComparisonAnalytics(getStoredAnalyticsOfComparisons());
  };

  useEffect(() => {
    window.addEventListener(
      "comparison-analytics-updated",
      refreshComparisonAnalytics,
    );
    window.addEventListener("storage", refreshComparisonAnalytics);

    return () => {
      window.removeEventListener(
        "comparison-analytics-updated",
        refreshComparisonAnalytics,
      );
      window.removeEventListener("storage", refreshComparisonAnalytics);
    };
  }, []);

  return (
    <comparisonAnalyticsContext.Provider
      value={{ comparisonAnalytics, refreshComparisonAnalytics }}
    >
      {children}
    </comparisonAnalyticsContext.Provider>
  );
}

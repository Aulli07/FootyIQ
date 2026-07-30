"use client";

import { createContext, useContext } from "react";

import { ComparisonStoredAnalyticsType } from "@/features/compare/types/comparison-main-type";
import { PlayerFullAnalyticsType } from "@/features/players/types/search-analytics-type";

export type comparisonAnalyticsContextType = {
  comparisonAnalytics: ComparisonStoredAnalyticsType;
  refreshComparisonAnalytics: () => void;
};

export type playerAnalyticsContextType = {
  playerAnalytics: PlayerFullAnalyticsType;
  refreshPlayerAnalytics: () => void;
};

export const comparisonAnalyticsContext =
  createContext<comparisonAnalyticsContextType | null>(null);

export const playerAnalyticsContext =
  createContext<playerAnalyticsContextType | null>(null);

export function useComparisonAnalytics() {
  const context = useContext(comparisonAnalyticsContext);

  if (!context) {
    throw Error("This is wrongly done");
  }

  return context;
}

export function usePlayerAnalytics() {
  const context = useContext(playerAnalyticsContext);

  if (!context) {
    throw Error("This is wrongly done");
  }

  return context;
}

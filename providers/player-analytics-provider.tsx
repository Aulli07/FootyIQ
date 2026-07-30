"use client";

import React, { useEffect, useState } from "react";

import { playerAnalyticsContext } from "./analytics-contexts";
import { PlayerFullAnalyticsType } from "@/features/players/types/search-analytics-type";
import { getStoredAnalyticsOfPlayers } from "@/features/players/services/player-search-analytics";

export function PlayerAnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [playerAnalytics, setPlayerAnalytics] =
    useState<PlayerFullAnalyticsType>(() => {
      if (typeof window === "undefined") {
        return {};
      }

      return getStoredAnalyticsOfPlayers();
    });

  const refreshPlayerAnalytics = () => {
    setPlayerAnalytics(getStoredAnalyticsOfPlayers());
  };

  useEffect(() => {
    window.addEventListener("player-analytics-updated", refreshPlayerAnalytics);
    window.addEventListener("storage", refreshPlayerAnalytics);

    return () => {
      window.removeEventListener(
        "player-analytics-updated",
        refreshPlayerAnalytics,
      );
      window.removeEventListener("storage", refreshPlayerAnalytics);
    };
  }, []);

  return (
    <playerAnalyticsContext.Provider
      value={{ playerAnalytics, refreshPlayerAnalytics }}
    >
      {children}
    </playerAnalyticsContext.Provider>
  );
}

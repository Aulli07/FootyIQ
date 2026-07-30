"use client";
import fs from "fs";


import { buildHydratedComparisonStore } from "./comparison-store";
import { ComparisonType } from "@/features/compare/types/comparison-main-type";

import { initializeComparisonAnalytics } from "@/features/compare/services/analytics-storage";



export function buildIndexedComparisonStore() {
  const hydratedComparisonStore = buildHydratedComparisonStore();
  const hydratedComparisons = Array.from(
    Object.values(hydratedComparisonStore),
  );

  // initializeComparisonAnalytics(hydratedComparisons);
  
  const themeIndexedComparisons = buildThemeIndexedComparisons(hydratedComparisons);
  const playerIndexedComparisons = buildIndexedComparisonsForPlayers(hydratedComparisons);

  fs.writeFileSync(
    "features/compare/data/theme-indexed-comparisons.json",
    JSON.stringify(themeIndexedComparisons, null, 2),
  );
  fs.writeFileSync(
    "features/compare/data/player-indexed-comparisons.json",
    JSON.stringify(playerIndexedComparisons, null, 2),
  );
}

function buildIndexedComparisonsForPlayers(
  hydratedComparisons: ComparisonType[],
) {
  const playerIndexedComparisons: Record<string, string[]> = {};

  hydratedComparisons.forEach((cmp) => {
    if (!playerIndexedComparisons[cmp.playerA]) {
      playerIndexedComparisons[cmp.playerA] = [];
    }
    playerIndexedComparisons[cmp.playerA].push(cmp.comparisonId);

    if (!playerIndexedComparisons[cmp.playerB]) {
      playerIndexedComparisons[cmp.playerB] = [];
    }
    playerIndexedComparisons[cmp.playerB].push(cmp.comparisonId);
  });

  return playerIndexedComparisons;
}

function buildThemeIndexedComparisons(
  hydratedComparisons: ComparisonType[]
) {
  const themeIndexedComparisons: Record<string, string[]> = {};

  hydratedComparisons.forEach((cmp) => {
    if (!themeIndexedComparisons[cmp.themeId!]) {
      themeIndexedComparisons[cmp.themeId!] = [];
    }
    themeIndexedComparisons[cmp.themeId!].push(cmp.comparisonId);
  })

  return themeIndexedComparisons;
}

buildIndexedComparisonStore();
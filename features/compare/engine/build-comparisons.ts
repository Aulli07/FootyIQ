import fs from "fs";

import { canonicalPlayers } from "@/shared/utils/canonical-lookups";

import { SYSTEM_COMPARISON_THEMES } from "@/features/compare/types/comparison-themes";

import { getPlayersSubset } from "./player-subset";
import { generateAllComparisons } from "./comparison-generator";
import { generatePlayersMatchup } from "./player-matchups";

import {
  ComparisonStoredType,
  ComparisonType,
} from "@/features/compare/types/comparison-main-type";
import { initializeComparisonAnalytics } from "../services/analytics-storage";
import { buildComparisons, buildIndexedComparisonsForPlayers, buildThemeIndexedComparisons } from "./create-index-comps";
import { buildHydratedComparisonStore } from "./comparison-store";



function buildCompData() {
  // let COMPARISONS: ComparisonType[] = [];
  // const indexedComparisons: ComparisonStoredType = {};

  // for (let i = 0; i < SYSTEM_COMPARISON_THEMES.length; i++) {
  //   const comparisonPrecomputedId =
  //     "cmp_" + (i + 1).toString().padStart(4, "0");

  //   const currentTheme = SYSTEM_COMPARISON_THEMES[i];
  //   const playersSubset = getPlayersSubset(canonicalPlayers, currentTheme);
  //   const matchups = generatePlayersMatchup(
  //     playersSubset,
  //     currentTheme.matchupType as any,
  //   );
  //   COMPARISONS.push(
  //     ...generateAllComparisons(
  //       matchups,
  //       currentTheme,
  //       comparisonPrecomputedId,
  //     ),
  //   );
  // }

  // COMPARISONS.forEach((cmp) => {
  //   indexedComparisons[cmp.comparisonId] = cmp;
  // });

  const plainComparisons = buildComparisons();
  fs.writeFileSync(
    "features/compare/data/indexed-comparisons.json",
    JSON.stringify(plainComparisons, null, 2),
  );

  const hydratedComparisonStore = buildHydratedComparisonStore();
    const hydratedComparisons = Array.from(
      Object.values(hydratedComparisonStore),
    );
  initializeComparisonAnalytics(hydratedComparisons);

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

buildCompData();

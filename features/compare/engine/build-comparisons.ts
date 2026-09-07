import fs from "fs";

import { canonicalPlayers } from "@/shared/utils/canonical-lookups";

import { SYSTEM_COMPARISON_THEMES } from "@/features/compare/types/comparison-themes";

import {
  ComparisonStoredType,
  ComparisonType,
} from "@/features/compare/types/comparison-main-type";
import { initializeComparisonAnalytics } from "../services/analytics-storage";
// import { buildComparisons, buildIndexedComparisonsForPlayers, buildThemeIndexedComparisons } from "./create-index-comps";
import { buildComparisons } from "./create-index-comps";



function buildCompData() {

  const plainComparisons = buildComparisons();
  fs.writeFileSync(
    "features/compare/data/indexed-comparisons-new.json",
    JSON.stringify(plainComparisons, null, 2),
  );

  // const hydratedComparisons = Array.from(
  //   Object.values(plainComparisons),
  // );
  // initializeComparisonAnalytics(hydratedComparisons);

  // const themeIndexedComparisons = buildThemeIndexedComparisons(hydratedComparisons);
  // const playerIndexedComparisons = buildIndexedComparisonsForPlayers(hydratedComparisons);

  // fs.writeFileSync(
  //   "features/compare/data/theme-indexed-comparisons-new.json",
  //   JSON.stringify(themeIndexedComparisons, null, 2),
  // );
  // fs.writeFileSync(
  //   "features/compare/data/player-indexed-comparisons-new.json",
  //   JSON.stringify(playerIndexedComparisons, null, 2),
  // );
}

buildCompData();

import fs from "fs";

import { initializeComparisonAnalytics } from "../services/analytics-storage";
import { buildIndexedComparisons } from "./create-index-comps";



export function buildCompData() {

  const { plainComparisons, themeIndexedComparisons, playerIndexedComparisons } = buildIndexedComparisons();

  fs.writeFileSync(
    "features/compare/data/indexed-comparisons.json",
    JSON.stringify(plainComparisons, null, 2),
  );

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

import { ComparisonStoredType, ComparisonType } from "../types/comparison-main-type";
import { SYSTEM_COMPARISON_THEMES } from "../types/comparison-themes";
import { generateAllComparisons } from "./comparison-generator";
import { filterBaseComparisons } from "./filter-base-comps";
import { generateAllBaseComparisons } from "./generate-base-comps";
import { generatePlayersMatchup } from "./player-matchups";
import { getPlayersSubset } from "./player-subset";

import { canonicalPlayers } from "@/shared/utils/canonical-lookups";



// export function buildIndexedComparisonsForPlayers(
//   hydratedComparisons: ComparisonType[],
// ) {
//   const playerIndexedComparisons: Record<string, string[]> = {};

//   hydratedComparisons.forEach((cmp) => {
//     if (!playerIndexedComparisons[cmp.playerA]) {
//       playerIndexedComparisons[cmp.playerA] = [];
//     }
//     playerIndexedComparisons[cmp.playerA].push(cmp.comparisonId);

//     if (!playerIndexedComparisons[cmp.playerB]) {
//       playerIndexedComparisons[cmp.playerB] = [];
//     }
//     playerIndexedComparisons[cmp.playerB].push(cmp.comparisonId);
//   });

//   return playerIndexedComparisons;
// }

// export function buildThemeIndexedComparisons(
//   hydratedComparisons: ComparisonType[]
// ) {
//   const themeIndexedComparisons: Record<string, string[]> = {};

//   hydratedComparisons.forEach((cmp) => {
//     if (!themeIndexedComparisons[cmp.themeId!]) {
//       themeIndexedComparisons[cmp.themeId!] = [];
//     }
//     themeIndexedComparisons[cmp.themeId!].push(cmp.comparisonId);
//   })

//   return themeIndexedComparisons;
// }

export function buildComparisons() {
  const baseComparisons = generateAllBaseComparisons();
  console.log(baseComparisons.length);
  const qualityComparisons = filterBaseComparisons(baseComparisons);
  console.log(qualityComparisons.length)
}
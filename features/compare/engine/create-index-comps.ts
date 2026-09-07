import { ComparisonStoredType, ComparisonType } from "../types/comparison-main-type";
import { SYSTEM_COMPARISON_THEMES } from "../types/comparison-themes";
import { filterBaseComparisons, QualityComparison } from "./filter-base-comps";
import { generateAllBaseComparisons } from "./generate-base-comps";



export function buildIndexedComparisonsForPlayers(
  hydratedComparisons: QualityComparison[],
) {
  const playerIndexedComparisons: Record<string, string[]> = {};

  hydratedComparisons.forEach((cmp) => {
    if (!playerIndexedComparisons[cmp.playerA]) {
      playerIndexedComparisons[cmp.playerA] = [];
    }
    playerIndexedComparisons[cmp.playerA].push(cmp.id);

    if (!playerIndexedComparisons[cmp.playerB]) {
      playerIndexedComparisons[cmp.playerB] = [];
    }
    playerIndexedComparisons[cmp.playerB].push(cmp.id);
  });

  return playerIndexedComparisons;
}

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

  const indexedComparisons = new Map<string, QualityComparison[]>();
  qualityComparisons.forEach((cmp) => {
    if (!indexedComparisons.get(cmp.id)) indexedComparisons.set(cmp.id, []);
    indexedComparisons.get(cmp.id)!.push(cmp);
  })

  return indexedComparisons;
}
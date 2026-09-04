import { ComparisonStoredType, ComparisonType } from "../types/comparison-main-type";
import { SYSTEM_COMPARISON_THEMES } from "../types/comparison-themes";
import { generateAllComparisons } from "./comparison-generator";
import { generatePlayersMatchup } from "./player-matchups";
import { getPlayersSubset } from "./player-subset";

import { canonicalPlayers } from "@/shared/utils/canonical-lookups";



export function buildIndexedComparisonsForPlayers(
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

export function buildThemeIndexedComparisons(
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

export function buildComparisons() {
  let COMPARISONS: ComparisonType[] = [];
  const indexedComparisons: ComparisonStoredType = {};

  const baseComparisons = generateBaseComparisons();
  const qualityComparisons = filterBaseComparisons(baseComparisons);
  // let comparisonCounter = 1;

  // for (let i = 0; i < SYSTEM_COMPARISON_THEMES.length; i++) {

    // WORK BEGINS HERE
  //   const currentTheme = SYSTEM_COMPARISON_THEMES[i];
  //   const playersSubset = getPlayersSubset(canonicalPlayers, currentTheme);
  //   const matchups = generatePlayersMatchup(playersSubset, currentTheme.matchupType as any,);

  //   const generatedComparisons = generateAllComparisons(
  //     matchups,
  //     currentTheme,
  //     "",
  //   );

  //   for (const comparison of generatedComparisons) {
  //     const generatedId = "cmp_" + comparisonCounter.toString().padStart(4, "0");
  //     COMPARISONS.push({ ...comparison, comparisonId: generatedId });
  //     comparisonCounter += 1;
  //   }
  // }

  // COMPARISONS.forEach((cmp) => {
  //   indexedComparisons[cmp.comparisonId] = cmp;
  // });

  // return indexedComparisons;
}
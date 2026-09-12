import themeIndexedComparisons from "@/features/compare/data/theme-indexed-comparisons.json";


const themedComparisons = themeIndexedComparisons as Record<string, string[]>;

export function getThemeMatchups(themeId: string): string[] {
  return themedComparisons[themeId] ?? [];
}
import { useMemo } from "react";

import { buildHydratedComparisonStore } from "../engine/comparison-store";
import { ComparisonCombinedType } from "../types/comparison-main-type";
import { useComparisonAnalytics } from "@/providers/analytics-contexts";



export function getTopWeeklyComparisons() {
  const { comparisonAnalytics } = useComparisonAnalytics();
  const hydratedComparisonsList = useMemo(
    () => Object.values(buildHydratedComparisonStore()),
    [],
  );

  const COMPARISONS = useMemo(() => {
    const combined = hydratedComparisonsList.map((cmp) => ({
      ...cmp,
      viewCount: comparisonAnalytics[cmp.comparisonId]?.viewCount ?? 0,
      searchCount: comparisonAnalytics[cmp.comparisonId]?.searchCount ?? 0,
    }));

    let topWeeklyComparisons: ComparisonCombinedType[] = [];

    for (const comp of combined) {
      if (topWeeklyComparisons.length < 7) {
        topWeeklyComparisons.push(comp);

        topWeeklyComparisons.sort(
          (cmpA, cmpB) => cmpA.viewCount - cmpB.viewCount,
        );
      } else if (comp.viewCount > topWeeklyComparisons[0].viewCount) {
        topWeeklyComparisons[0] = comp;

        topWeeklyComparisons.sort(
          (cmpA, cmpB) => cmpA.viewCount - cmpB.viewCount,
        );
      }
    }

    topWeeklyComparisons.sort((cmpA, cmpB) => cmpB.viewCount - cmpA.viewCount);
    return topWeeklyComparisons;
  }, [comparisonAnalytics, hydratedComparisonsList]);

  return COMPARISONS
}

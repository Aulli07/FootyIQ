"use client";

import { poppins } from "@/app/font-icons/fonts";
import { useComparisonAnalytics } from "@/providers/providers";
import { useMemo } from "react";

import TopComparisonCard from "./top-comparison-card";

import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";
import { buildHydratedComparisonStore } from "@/features/compare/engine/comparison-store";

import { ComparisonCombinedType } from "@/features/compare/types/comparison-main-type";
import { Player } from "@/shared/types/stats-schema";



export default function TopWeeklyComparisons() {
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

  const getPlayerData = (id: string): Player | undefined => {
    return getCanonicalPlayerById(id) ?? undefined;
  };

  return (
    <section className="mt-8 mb-12">
      <div className="flex flex-col gap-1 mb-6">
        <h2
          className={`text-xl font-black ${poppins.className} tracking-wide text-light-text-primary dark:text-dark-text-primary uppercase`}
        >
          Weekly Hot Picks
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {COMPARISONS.map((comp, index) => {
          const leftPlayer = getPlayerData(comp.playerA);
          const rightPlayer = getPlayerData(comp.playerB);

          if (!leftPlayer || !rightPlayer) return null;

          return (
            <TopComparisonCard
              id={comp.comparisonId}
              comp={comp}
              themeId={comp.themeId}
              rank={index + 1}
            />
          );
        })}
      </div>
    </section>
  );
}

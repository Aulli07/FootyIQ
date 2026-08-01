"use client";

import { poppins } from "@/app/font-icons/fonts";

import TopComparisonCard from "./top-comparison-card";
import { getTopWeeklyComparisons } from "../selectors/get-weekly-comparisons";

import { getCanonicalPlayerById, getCanonicalPlayerIdByName } from "@/shared/utils/canonical-lookups";



export default function TopWeeklyComparisons() {
  const weeklyComparisons = getTopWeeklyComparisons();

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
        {weeklyComparisons.map((comp, index) => {
          const leftPlayer = getCanonicalPlayerById(comp.playerA);
          const rightPlayer = getCanonicalPlayerById(comp.playerB);

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

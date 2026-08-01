"use client";

import { poppins } from "@/app/font-icons/fonts";
import Link from "next/link";

import { Player } from "@/shared/types/stats-schema";
import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";

import { getComparisonById } from "@/features/compare/selectors/get-comparison-by-id";
import { renderPlayerUi } from "../ui/comp-card-ui";

export default function ComparisonCard({
  comparisonId,
  cardWidth = "w-55",
}: {
  comparisonId: string;
  cardWidth: string;
}) {
  
  const comparison = getComparisonById(comparisonId);

  if (!comparison) {
    return null;
  }

  const leftPlayer = getCanonicalPlayerById(
    comparison.playerA,
  ) as Player | null;
  const rightPlayer = getCanonicalPlayerById(
    comparison.playerB,
  ) as Player | null;
  const leftLabel = comparison.contextA.toUpperCase();
  const rightLabel = comparison.contextB.toUpperCase();

  if (!leftPlayer || !rightPlayer) {
    return null;
  }

  return (
    <div
      className={`flex flex-col ${cardWidth} gap-5 px-3 py-2 rounded-xl border border-light-ui-border bg-light-background-card shadow-md shadow-slate-300/30 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-sm dark:shadow-black/20`}
    >
      <div className="relative flex flex-row items-start justify-between gap-3">
        <div className="flex flex-1 flex-col justify-center items-center">
          {leftPlayer && renderPlayerUi(leftPlayer)}
          <span
            className={`text-[10px] font-medium tracking-wider ${poppins.className} text-emerald-600/80 dark:text-emerald-400/80`}
          >
            {leftLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center items-center">
          {rightPlayer && renderPlayerUi(rightPlayer)}
          <span
            className={`text-[10px] font-medium ${poppins.className} text-emerald-600/80 dark:text-emerald-400/80`}
          >
            {rightLabel}
          </span>
        </div>
      </div>

      <div className="flex justify-center bg-emerald-600 hover:bg-emerald-700 border border-emerald-700/50 dark:border-emerald-300/20 text-white w-full rounded-md transition-colors">
        <Link href={{ pathname: `/comparisons/${comparisonId}` }}>
          <span
            className={`text-xs ${poppins.className} font-semibold tracking-wide`}
          >
            View
          </span>
        </Link>
      </div>
    </div>
  );
}

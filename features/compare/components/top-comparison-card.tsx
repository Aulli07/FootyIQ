import { poppins } from "@/app/font-icons/fonts";
import Link from "next/link";

import { ComparisonCombinedType } from "../types/comparison-main-type";
import { renderPlayer } from "../ui/comp-image-card-ui";

export default function TopComparisonCard({
  id,
  comp,
  rank,
  showAnalytics = true,
}: {
  id: string;
  comp: ComparisonCombinedType;
  rank?: number;
  showAnalytics?: boolean;
}) {
  const comparisonId = comp.comparisonId;

  const playerA = comp.playerA;
  const playerB = comp.playerB;
  const contextA = comp.contextA.toUpperCase();
  const contextB = comp.contextB.toUpperCase();

  return (
    <Link
      href={{
        pathname: `/comparisons/${comparisonId}`,
        query: {
          leftPlayerId: playerA,
          rightPlayerId: playerB,
          leftMetaLabel: contextA,
          rightMetaLabel: contextB,
        },
      }}
      className="group relative flex flex-col gap-3 p-3 rounded-xl border border-light-ui-border bg-white dark:bg-dark-background-card/40 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all dark:border-white/5 overflow-hidden"
    >
      <div className="flex items-center justify-between">
        {rank !== undefined && (
          <div
            className={`flex items-center justify-center px-2 py-0.5 bg-emerald-600 text-white font-bold text-[12px] rounded-md shadow-sm ${poppins.className}`}
          >
            #{rank}
          </div>
        )}

        {showAnalytics && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/5 border border-emerald-500/10">
            <span className="flex h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            <span
              className={`text-[12px] font-bold ${poppins.className} text-emerald-600/70 dark:text-emerald-400/70`}
            >
              {comp.viewCount} VIEWS
            </span>
          </div>
        )}
      </div>

      <div className="relative flex flex-col gap-3">
        {renderPlayer(playerA, contextA)}

        {/* Connection line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500/20 via-emerald-500/40 to-emerald-500/20" />

        {renderPlayer(playerB, contextB)}
      </div>

      <div className="absolute flex flex-row gap-4 right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm text-emerald-500 font-bold ">View</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5 text-emerald-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </Link>
  );
}

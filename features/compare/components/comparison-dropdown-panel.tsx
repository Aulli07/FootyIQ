import { useState } from "react";

import { poppins } from "@/app/font-icons/fonts";
import { ComparisonStoredType } from "@/features/compare/types/comparison-main-type";

import {
  ComparisonStatKey,
  ComparisonStatOption,
  getComparisonStatLabel,
} from "../../players/types/comparison-stat-options";
import { ComparisonImageCard } from "./comp-image-card";
import { getComparisonById } from "@/features/compare/selectors/get-comparison-by-id";
import { renderPlayer } from "./top-comparison-card";

type ComparisonDropdownPanelProps = {
  label: string;
  searchQuery: string;
  searchedComparisons: ComparisonStoredType;
  comparisonStats: ComparisonStatOption[];
  selectedComparisonStats: ComparisonStatKey[];
  selectedComparison: string | null;
  onSearchQueryChange: (value: string) => void;
  onSelectComparison: (comparisonId: string) => void;
  onToggleComparisonStat: (statKey: ComparisonStatKey) => void;
  onApplyComparison: () => void;
};

export function ComparisonDropdownPanel({
  label,
  searchQuery,
  searchedComparisons,
  comparisonStats,
  selectedComparisonStats,
  selectedComparison,
  onSearchQueryChange,
  onSelectComparison,
  onToggleComparisonStat,
  onApplyComparison,
}: ComparisonDropdownPanelProps) {
  const [activeTab, setActiveTab] = useState<"comparisons" | "stats">(
    "comparisons",
  );

  const comparisonIds = Object.keys(searchedComparisons);
  const showEmptyState =
    searchQuery.trim() !== "" && comparisonIds.length === 0;
  const hasSelectedStats = selectedComparisonStats.length > 0;
  const hasSelectedComparison = Boolean(selectedComparison);

  return (
    <div className="flex flex-col gap-2">
      <div className="sticky top-0 z-10 bg-light-background-card/95 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0b1216]/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-sm p-1">
            <button
              type="button"
              onClick={() => setActiveTab("comparisons")}
              className={`rounded-sm px-2 py-2 text-[10px] font-semibold uppercase transition ${poppins.className} ${activeTab === "comparisons" ? "bg-emerald-600 text-white shadow-sm" : "text-light-text-secondary hover:bg-black/5 dark:text-dark-text-secondary dark:hover:bg-white/10"}`}
            >
              Comparisons
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("stats")}
              className={`rounded-sm px-2 py-2 text-[10px] font-semibold uppercase transition ${poppins.className} ${activeTab === "stats" ? "bg-emerald-600 text-white shadow-sm" : "text-light-text-secondary hover:bg-black/5 dark:text-dark-text-secondary dark:hover:bg-white/10"}`}
            >
              Stats
            </button>
          </div>

          <button
            type="button"
            onClick={onApplyComparison}
            disabled={!hasSelectedComparison || !hasSelectedStats}
            className={`shrink-0 rounded-lg px-4 py-2 text-[11px] font-semibold uppercase  transition ${poppins.className} ${!hasSelectedComparison || !hasSelectedStats ? "cursor-not-allowed border border-light-ui-border bg-light-background-main text-light-text-muted dark:border-white/10 dark:bg-white/5 dark:text-dark-text-muted" : "border border-emerald-500/30 bg-emerald-600 text-white hover:bg-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-500 dark:hover:bg-emerald-600"}`}
          >
            Add to Post
          </button>
        </div>
      </div>

      {activeTab === "comparisons" ? (
        <div className="flex flex-col gap-5 pt-3 border-t border-light-ui-border/50">
          <div className="rounded-2xl bg-light-background-card/95 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0b1216]/95">
            <input
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              placeholder="Search for comparisons"
              className="mt-2 h-11 w-full rounded-full border border-light-ui-border/80 bg-light-background-main px-4 text-[14px] text-light-text-primary shadow-sm shadow-slate-200/40 outline-none placeholder:text-light-text-muted dark:border-white/15 dark:bg-white/5 dark:text-dark-text-primary dark:placeholder:text-dark-text-muted dark:shadow-black/10"
            />
          </div>

          {showEmptyState ? (
            <p
              className={`${poppins.className} px-1 text-xs text-light-text-muted dark:text-dark-text-muted`}
            >
              {`No matches found for "${searchQuery}"`}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {comparisonIds.map((comparisonId, index) => {
                const comp = getComparisonById(comparisonId);

                if (!comp) {
                  return null;
                }

                const isActive = selectedComparison === comparisonId;

                return (
                  <div
                    key={`${comparisonId}-${index}`}
                    onClick={() => onSelectComparison(comparisonId)}
                    className={`group relative flex flex-col gap-3 p-3 rounded-xl border border-light-ui-border shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all dark:border-white/5 overflow-hidden ${isActive ? "border-emerald-500/30 bg-emerald-500/15" : "dark:bg-dark-background-card/40"} `}
                  >
                    <div className="relative flex flex-col gap-3">
                      {renderPlayer(comp.playerA, comp.contextA)}

                      {/* Connection line */}
                      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500/20 via-emerald-500/40 to-emerald-500/20" />

                      {renderPlayer(comp.playerB, comp.contextB)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 shadow-sm pt-5 backdrop-blur dark:bg-[#0b1216]/95 border-t border-light-ui-border/50 ">
          <div className="flex flex-wrap gap-3">
            {comparisonStats.map((stat) => {
              const isActive = selectedComparisonStats.includes(stat.key);

              return (
                <button
                  key={stat.key}
                  type="button"
                  onClick={() => onToggleComparisonStat(stat.key)}
                  className={`rounded-full border px-3 py-2 text-[12px] font-semibold transition ${poppins.className} ${isActive ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300" : "border-light-ui-border bg-white/70 text-light-text-primary hover:border-emerald-500/25 hover:bg-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-dark-text-primary dark:hover:bg-white/10"}`}
                >
                  {stat.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

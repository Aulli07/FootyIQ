import { useEffect, useState } from "react";

import { getComparisonById } from "../selectors/get-comparison-by-id";
import { ComparisonImageCardProps, compStatKeys, CompStatsForImageCardType } from "../types/comp-image-type";
import { renderStatPill, renderPlayerImage } from "../ui/comp-image-card-ui";
import { formatStatLabel } from "../utils/format-stat";

import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";


export function ComparisonImageCard({
  comparisonId,
  compStats,
}: ComparisonImageCardProps) {

  const [comparison, setComparison] = useState(
    null as ReturnType<typeof getComparisonById>,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setComparison(comparisonId ? getComparisonById(comparisonId) : null);
    setIsMounted(true);
  }, [comparisonId]);

  if (!isMounted || !comparison) {
    return null;
  }

  const leftPlayerId = comparison?.playerA;
  const rightPlayerId = comparison?.playerB;

  const leftPlayer = leftPlayerId ? getCanonicalPlayerById(leftPlayerId) : null;
  const rightPlayer = rightPlayerId
    ? getCanonicalPlayerById(rightPlayerId)
    : null;

  const leftLabel = comparison?.contextA;
  const rightLabel = comparison?.contextB;

  console.log(leftPlayer?.fullName);
  console.log(rightPlayer?.fullName)

  return (
    <div className="overflow-hidden rounded-2xl border border-light-ui-border bg-light-background-card shadow-lg shadow-slate-300/25 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
      <div className="grid grid-cols-2">
        <div className="flex h-full flex-col gap-5 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-transparent px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col items-center justify-center gap-4">
            {renderPlayerImage(leftPlayer, leftLabel)}
          </div>

          {(compStats) && CompImageStatValues(compStats)}
        </div>

        <div className="flex h-full flex-col gap-5 border-t border-light-ui-border bg-gradient-to-br from-sky-500/[0.05] via-transparent to-transparent px-4 py-5 sm:px-6 sm:py-6 md:border-l md:border-t-0 dark:border-white/10">
          <div className="flex flex-col items-center justify-center gap-4">
            {renderPlayerImage(rightPlayer, rightLabel)}
          </div>

          {(compStats) && CompImageStatValues(compStats)}
        </div>
      </div>
    </div>
  );
}

function CompImageStatValues(compStats : CompStatsForImageCardType) {
  const statRows = Object.entries(compStats)
  .filter(
    (entry): entry is compStatKeys =>
      Array.isArray(entry[1]) && entry[1].length > 0,
  )
  .slice(0, 4)
  .map(([statKey, values]) => ({
    label: formatStatLabel(statKey),
    leftValue: values[0] ?? 0,
    rightValue: values[1] ?? 0,
  }));

  return (
    <div className="mt-auto">
      <div className="space-y-2">
        {statRows.length > 0 &&
          statRows.map((stat) => (
            <div key={`left-${stat.label}`}>
              {renderStatPill(stat.label, stat.leftValue, stat.rightValue, false)}
            </div>
          ))}
      </div>
    </div>
  )
}
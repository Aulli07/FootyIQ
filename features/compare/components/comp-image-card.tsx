import Image from "next/image";
import { useEffect, useState } from "react";

import { poppins } from "@/app/font-icons/fonts";
import { getComparisonById } from "@/features/compare/selectors/get-comparison-by-id";
import {
  getCanonicalClubById,
  getCanonicalPlayerById,
} from "@/shared/utils/canonical-lookups";
import { PlayerCompetitionStats } from "@/features/players/types/stats-legacy";
import type { Player } from "@/shared/types/stats-schema";

type CompStatsForImageCardType = Partial<
  Record<keyof PlayerCompetitionStats, number[]>
>;

type ComparisonImageCardProps = {
  comparisonId?: string;
  compStats?: CompStatsForImageCardType;
};

const statLabelMap: Partial<Record<keyof PlayerCompetitionStats, string>> = {
  footyRating: "Footy Rating",
  shotsOnTarget: "Shots on Target",
  keyPasses: "Key Passes",
  chancesCreated: "Chances Created",
  dribblesCompleted: "Dribbles Completed",
  dribbledPast: "Dribbled Past",
  groundDuelsWon: "Ground Duels Won",
  yellowToRedCards: "Yellow to Red",
};

function formatStatLabel(statKey: keyof PlayerCompetitionStats) {
  return (
    statLabelMap[statKey] ??
    statKey
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/^\w/, (letter) => letter.toUpperCase())
  );
}

function renderPlayerImage(player: Player | null, label: string | undefined) {
  const imageUrl = player?.imageUrl ?? "/images/default-avatar.png";
  const name = player?.fullName ?? label ?? "Player profile";

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-24 w-24 sm:h-28 sm:w-28">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 via-transparent to-transparent blur-xl" />
        <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-black/10 shadow-md shadow-slate-300/20 dark:ring-white/10 dark:shadow-black/20">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      </div>

      <div>
        <p
          className={`text-md sm:text-xl font-semibold tracking-tight ${poppins.className} text-light-text-primary dark:text-dark-text-primary`}
        >
          {name}
        </p>
        <p
          className={`text-[11px] sm:text-xs font-medium uppercase ${poppins.className} text-emerald-600/80 dark:text-emerald-400/80`}
        >
          {label ?? "Player profile"}
        </p>
      </div>
    </div>
  );
}

function renderStatPill(
  label: string,
  leftValue: number,
  rightValue: number,
  isRightSide: boolean,
) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-light-ui-border/20">
      <div className="min-w-0">
        <p
          className={`text-[11px] font-semibold uppercase ${poppins.className} text-light-text-secondary dark:text-dark-text-secondary`}
        >
          {label}
        </p>
      </div>
      <div
        className={`text-sm font-bold ${poppins.className} ${isRightSide ? "text-sky-600 dark:text-sky-400" : "text-emerald-600 dark:text-emerald-400"}`}
      >
        {isRightSide ? rightValue : leftValue}
      </div>
    </div>
  );
}

export function ComparisonImageCard({
  comparisonId,
  compStats = {},
}: ComparisonImageCardProps = {}) {
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

  const statRows = Object.entries(compStats)
    .filter(
      (entry): entry is [keyof PlayerCompetitionStats, number[]] =>
        Array.isArray(entry[1]) && entry[1].length > 0,
    )
    .slice(0, 4)
    .map(([statKey, values]) => ({
      label: formatStatLabel(statKey),
      leftValue: values[0] ?? 0,
      rightValue: values[1] ?? 0,
    }));

  return (
    <div className="overflow-hidden rounded-2xl border border-light-ui-border bg-light-background-card shadow-lg shadow-slate-300/25 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20">
      <div className="grid grid-cols-2">
        <div className="flex h-full flex-col gap-5 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-transparent px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col items-center justify-center gap-4">
            {renderPlayerImage(leftPlayer, leftLabel)}
          </div>

          <div className="mt-auto">
            <div className="space-y-2">
              {statRows.length > 0 &&
                statRows.map((stat) => (
                  <div key={`left-${stat.label}`}>
                    {renderStatPill(
                      stat.label,
                      stat.leftValue,
                      stat.rightValue,
                      false,
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col gap-5 border-t border-light-ui-border bg-gradient-to-br from-sky-500/[0.05] via-transparent to-transparent px-4 py-5 sm:px-6 sm:py-6 md:border-l md:border-t-0 dark:border-white/10">
          <div className="flex flex-col items-center justify-center gap-4">
            {renderPlayerImage(rightPlayer, rightLabel)}
          </div>

          <div className="mt-auto space-y-3">
            <div className="space-y-2">
              {statRows.length > 0 &&
                statRows.map((stat) => (
                  <div key={`right-${stat.label}`}>
                    {renderStatPill(
                      stat.label,
                      stat.leftValue,
                      stat.rightValue,
                      true,
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

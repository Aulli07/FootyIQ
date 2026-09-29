import { Player } from "@/shared/types/stats-schema";

import {
  canonicalPlayers,
  getCanonicalPlayerById,
} from "@/shared/utils/canonical-lookups";

import { poppins } from "@/app/font-icons/fonts";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  compareTabs,
  generalStats,
  attackingStats,
  defendingStats,
  cardStats,
  TabType,
} from "@/features/players/data/legacy/statlabels";

import {
  getAgeOfPlayer,
  getAverageRatingForContext,
  getClubNameOfPlayer,
  getStatValueForContext,
} from "@/features/players/selectors/stat-getters";

import { SelectedComparisonContext } from "../types/comp-save-type";




export default function ShowFullStat({
  playerSet,
  contexts,
}: {
  playerSet: Array<string | null>;
  contexts: SelectedComparisonContext[];
}) {
  const [activeTab, setActiveTab] = useState<TabType>("general");

  const players = playerSet.map((playerId) =>
    playerId ? getCanonicalPlayerById(playerId) : null,
  );

  const compareTabContent = {
    general: (
      <StatsBoard
        players={players}
        contexts={contexts}
        stats={generalStats}
        isGeneral={true}
      />
    ),
    attacking: (
      <StatsBoard
        players={players}
        contexts={contexts}
        stats={attackingStats}
        isGeneral={false}
      />
    ),
    defending: (
      <StatsBoard
        players={players}
        contexts={contexts}
        stats={defendingStats}
        isGeneral={false}
      />
    ),
    cards: (
      <StatsBoard
        players={players}
        contexts={contexts}
        stats={cardStats}
        isGeneral={false}
      />
    ),
    insights: <div>AI Insights Coming Soon...</div>,
  } as const;

  return (
    <section
      className={`relative flex flex-col gap-4 rounded-2xl ${poppins.className}`}
    >
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex w-max min-w-full gap-2">
          {compareTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`flex h-9 items-center justify-center rounded-full border px-3 text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-emerald-500 bg-emerald-500 text-white shadow-sm shadow-emerald-600/25 dark:border-emerald-400 dark:bg-emerald-400 dark:text-slate-950"
                  : "border-light-ui-border bg-light-background-main text-light-text-secondary hover:border-emerald-500/40 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-dark-text-secondary dark:hover:text-emerald-300"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="whitespace-nowrap tracking-wide">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ x: 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -48, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative flex w-full flex-col gap-2"
          >
            {compareTabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function StatsBoard({
  players,
  contexts,
  stats,
  isGeneral,
}: {
  players: Array<Player | null>;
  contexts: SelectedComparisonContext[];
  stats: { key: string; label: string }[];
  isGeneral: boolean;
}) {
  return (
    <div className="relative flex w-full flex-col gap-2 bg-light-background-main/70 dark:bg-white/[0.03]">
      {stats.map((stat) => (
        <StatBlock
          key={stat.key}
          identifier={stat.key}
          label={stat.label}
          playerA={players[0]}
          playerB={players[1]}
          contextA={contexts[0]}
          contextB={contexts[1]}
          isGeneral={isGeneral}
        />
      ))}
    </div>
  );
}

function StatBlock({
  label,
  identifier,
  playerA,
  playerB,
  contextA,
  contextB,
  isGeneral,
}: {
  label: string;
  identifier: string;
  playerA: Player | null;
  playerB: Player | null;
  contextA: SelectedComparisonContext;
  contextB: SelectedComparisonContext;
  isGeneral: boolean;
}) {

  const detailsA = playerA
    ? canonicalPlayers.find((p) => p.id === playerA.id) || null
    : null;
  const detailsB = playerB
    ? canonicalPlayers.find((p) => p.id === playerB.id) || null
    : null;

  let valueA: string | number = "-";
  let valueB: string | number = "-";

  if (isGeneral) {
    valueA = getPlayerDetailValue(detailsA, identifier, contextA);
    valueB = getPlayerDetailValue(detailsB, identifier, contextB);
  } else {
    valueA = getStatValue(playerA, contextA, identifier);
    valueB = getStatValue(playerB, contextB, identifier);
  }

  return (
    <div className="relative grid w-full grid-cols-[minmax(0,1fr)_minmax(110px,140px)_minmax(0,1fr)] items-center gap-2 rounded-xl px-4 py-2.5 ">
      <div className="min-w-0 text-left">
        <p className="truncate text-sm font-semibold tabular-nums text-light-text-primary dark:text-dark-text-primary">
          {valueA ?? "-"}
        </p>
      </div>
      <p className="px-1 text-center text-[10px] font-semibold uppercase leading-4 tracking-wide text-light-text-secondary dark:text-dark-text-secondary">
        {label}
      </p>
      <div className="min-w-0 text-right">
        <p className="truncate text-sm font-semibold tabular-nums text-light-text-primary dark:text-dark-text-primary">
          {valueB ?? "-"}
        </p>
      </div>
    </div>
  );
}

function getPlayerDetailValue(
  player: Player | null,
  key: string,
  context: SelectedComparisonContext,
): string | number {
  if (key === "dateOfBirth") {
    return getAgeOfPlayer(player);
  }

  if (key === "currentClubId") {
    return getClubNameOfPlayer(player);
  }

  if (key === "averageRating") {
    return getAverageRatingForContext(player, context);
  }

  const value = player?.[key as keyof Player];

  if (typeof value === "function" || value === undefined) {
    return "-";
  }

  return typeof value === "string" || typeof value === "number" ? value : "-";
}

function getStatValue(
  player: Player | null,
  context: SelectedComparisonContext,
  identifier: string,
): string | number {
  return getStatValueForContext(player, context, identifier);
}

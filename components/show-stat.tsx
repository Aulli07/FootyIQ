import { PlayerType } from "../app/types/players";
import { players } from "../app/data/players";
import { getCanonicalPlayerSeasonRowsBySeasonLabel } from "../app/data/stats/canonical-store";
import { PlayerSeasonStats } from "../app/types/stats";

import { oswald, poppins } from "../app/fonts";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { generalStats } from "../app/data/player-stats/statlabels";
import { attackingStats } from "../app/data/player-stats/statlabels";
import { defendingStats } from "../app/data/player-stats/statlabels";
import { cardStats } from "../app/data/player-stats/statlabels";

function StatsBoard({
  players,
  seasons,
  stats,
  isGeneral,
}: {
  players: Array<PlayerType | null>;
  seasons: Array<string>;
  stats: { key: string; label: string }[];
  isGeneral: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 w-full relative">
      {stats.map((stat, index) => (
        <StatBlock
          key={stat.key}
          identifier={stat.key}
          label={stat.label}
          playerA={players[0]}
          playerB={players[1]}
          seasonA={seasons[0]}
          seasonB={seasons[1]}
          isGeneral={isGeneral}
        />
      ))}
    </div>
  );
}

export default function ShowFullStat({
  players,
  seasons,
}: {
  players: Array<PlayerType | null>;
  seasons: Array<string>;
}) {
  const compareTabs = [
    { key: "general", label: "General" },
    { key: "attacking", label: "Attacking" },
    { key: "defending", label: "Defending" },
    { key: "cards", label: "Cards" },
    { key: "insights", label: "AI Insights" },
  ] as const;

  type TabType = (typeof compareTabs)[number]["key"];

  const [activeTab, setActiveTab] = useState<TabType>("general");

  const compareTabContent = {
    general: (
      <StatsBoard
        players={players}
        seasons={seasons}
        stats={generalStats}
        isGeneral={true}
      />
    ),
    attacking: (
      <StatsBoard
        players={players}
        seasons={seasons}
        stats={attackingStats}
        isGeneral={false}
      />
    ),
    defending: (
      <StatsBoard
        players={players}
        seasons={seasons}
        stats={defendingStats}
        isGeneral={false}
      />
    ),
    cards: (
      <StatsBoard
        players={players}
        seasons={seasons}
        stats={cardStats}
        isGeneral={false}
      />
    ),
    insights: <div>AI Insights Coming Soon...</div>,
  } as const;

  return (
    <div className={`relative flex flex-col gap-3 ${poppins.className}`}>
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex flex-row gap-3 w-full relative overflow-x-auto pb-4">
          {compareTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`flex justify-center items-center px-3 py-1 rounded-3xl border-2 h-10 cursor-pointer transition-colors ${
                activeTab === tab.key
                  ? "bg-emerald-500/15 border-emerald-500/60 dark:border-emerald-400 text-light-text-primary dark:text-dark-text-primary"
                  : "bg-light-background-card border-light-ui-border text-light-text-secondary dark:bg-gray-200/30 dark:border-white/70 dark:text-dark-text-secondary"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="text-xs font-medium tracking-wide w-full whitespace-nowrap">
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
            className="flex flex-col gap-2 w-full relative"
          >
            {compareTabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatBlock({
  label,
  identifier,
  playerA,
  playerB,
  seasonA,
  seasonB,
  isGeneral,
}: {
  label: string;
  identifier: string;
  playerA: PlayerType | null;
  playerB: PlayerType | null;
  seasonA: string;
  seasonB: string;
  isGeneral: boolean;
}) {
  const detailsA = playerA
    ? players.find((p) => p?.id === playerA?.id) || null
    : null;
  const detailsB = playerB
    ? players.find((p) => p?.id === playerB?.id) || null
    : null;

  let valueA: string | number | null = null;
  let valueB: string | number | null = null;

  if (isGeneral) {
    valueA = getPlayerDetailValue(detailsA, identifier);
    valueB = getPlayerDetailValue(detailsB, identifier);
  } else {
    valueA = getStatValue(playerA, seasonA);
    valueB = getStatValue(playerB, seasonB);
  }

  function getPlayerDetailValue(
    player: PlayerType | null,
    key: string,
  ): string | number | null {
    const value = player?.[key as keyof PlayerType];

    if (typeof value === "function" || value === undefined) {
      return null;
    }

    return typeof value === "string" || typeof value === "number"
      ? value
      : null;
  }

  function getStatValue(player: PlayerType | null, season: string) {
    if (!player) return "-";

    const seasonRows: PlayerSeasonStats[] = getCanonicalPlayerSeasonRowsBySeasonLabel(
      player.id,
      season,
    );

    if (seasonRows.length === 0) return "-";

    const canonicalKey =
      identifier === "totalShots"
        ? "shots"
        : identifier === "footyRating"
          ? "rating"
          : identifier;

    return seasonRows.reduce<number>((total: number, row: PlayerSeasonStats) => {
      const value = row[canonicalKey as keyof PlayerSeasonStats];
      return total + (typeof value === "number" ? value : 0);
    }, 0);
  }

  return (
    <div className="relative z-0 flex items-center py-2 px-3 border-b border-light-ui-border dark:border-white/10 w-full">
      <p
        className={`text-light-text-secondary dark:text-dark-text-secondary ${poppins.className} text-sm flex-1 text-left py-1`}
      >
        {valueA ?? "-"}
      </p>
      <p
        className={`text-light-text-primary dark:text-dark-text-primary ${poppins.className} text-sm font-medium flex-1 text-center`}
      >
        {label}
      </p>
      <p
        className={`text-light-text-secondary dark:text-dark-text-secondary ${poppins.className} text-sm text-right flex-1 py-1`}
      >
        {valueB ?? "-"}
      </p>
    </div>
  );
}

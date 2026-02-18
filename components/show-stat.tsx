import { PlayerType } from "../app/types/players";
import { playerStats } from "../app/data/playerStats";
import { players } from "../app/data/players";
import { PlayerCompetitionStats, StatsType } from "../app/types/stats";

import { oswald, poppins } from "../app/fonts";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { generalStats } from "../app/data/stats/statlabels";
import { attackingStats } from "../app/data/stats/statlabels";
import { defendingStats } from "../app/data/stats/statlabels";
import { cardStats } from "../app/data/stats/statlabels";

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
                  ? "bg-emerald-500/15 border-emerald-400 text-white"
                  : "bg-gray-200/30 border-white/70 text-white/80"
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
  const statA = playerA
    ? playerStats.find((p) => p?.id === playerA?.id) || null
    : null;
  const statB = playerB
    ? playerStats.find((p) => p?.id === playerB?.id) || null
    : null;

  const detailsA = playerA
    ? players.find((p) => p?.id === playerA?.id) || null
    : null;
  const detailsB = playerB
    ? players.find((p) => p?.id === playerB?.id) || null
    : null;

  let valueA: string | number | null = null;
  let valueB: string | number | null = null;

  if (isGeneral) {
    valueA = detailsA?.[identifier as keyof PlayerType] ?? null;
    valueB = detailsB?.[identifier as keyof PlayerType] ?? null;
  } else {
    valueA = getStatValue(statA, seasonA);
    valueB = getStatValue(statB, seasonB);
  }

  function getStatValue(stat: StatsType | null, season: string) {
    const seasonData = stat?.seasons.find((s) => s.season === season);

    let total = 0;
    if (!seasonData) return "-";
    seasonData.competitions.forEach((comp) => {
      if (
        comp.stats[identifier as keyof PlayerCompetitionStats] !== undefined
      ) {
        total +=
          (comp.stats[identifier as keyof PlayerCompetitionStats] as number) ||
          0;
      }
    });

    return total;
  }

  return (
    <div className="relative z-0 flex items-center py-2 px-3 border-b border-white/10 w-full">
      <p
        className={`text-white/70 ${poppins.className} text-sm flex-1 text-left py-1`}
      >
        {valueA ?? "-"}
      </p>
      <p
        className={`text-white ${poppins.className} text-sm font-medium flex-1 text-center`}
      >
        {label}
      </p>
      <p
        className={`text-white/70 ${poppins.className} text-sm text-right flex-1 py-1`}
      >
        {valueB ?? "-"}
      </p>
    </div>
  );
}

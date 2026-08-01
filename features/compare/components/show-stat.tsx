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
  getAverageRatingOfPlayerBasedOnCareer,
  getAverageRatingOfPlayerBasedOnCompetitionAndSeason,
  getAverageRatingOfPlayerBasedOnSeason,
  getClubNameOfPlayer,
  getStatValueBasedOnCareer,
  getStatValueBasedOnCompetitionAndSeason,
  getStatValueBasedOnSeason,
} from "@/features/players/selectors/stat-getters";


export default function ShowFullStat({
  playerSet,
  seasonLabels,
}: {
  playerSet: Array<string | null>;
  seasonLabels: Array<string>;
}) {
  const [activeTab, setActiveTab] = useState<TabType>("general");

  const players: Player[] = playerSet
    .filter((player): player is string => player !== null)
    .map((player) => getCanonicalPlayerById(player))
    .filter((player): player is Player => player !== null);

  const compareTabContent = {
    general: (
      <StatsBoard
        players={players}
        seasonLabels={seasonLabels}
        stats={generalStats}
        isGeneral={true}
      />
    ),
    attacking: (
      <StatsBoard
        players={players}
        seasonLabels={seasonLabels}
        stats={attackingStats}
        isGeneral={false}
      />
    ),
    defending: (
      <StatsBoard
        players={players}
        seasonLabels={seasonLabels}
        stats={defendingStats}
        isGeneral={false}
      />
    ),
    cards: (
      <StatsBoard
        players={players}
        seasonLabels={seasonLabels}
        stats={cardStats}
        isGeneral={false}
      />
    ),
    insights: <div>AI Insights Coming Soon...</div>,
  } as const;

  return (
    <div className={`relative flex flex-col gap-5 mt-3 ${poppins.className}`}>
      <div className="flex flex-col">
        <div className="flex flex-row gap-3 w-full relative overflow-x-auto scrollbar-none">
          {compareTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`flex justify-center items-center px-3 py-1 rounded-3xl border-2 h-9 cursor-pointer transition-colors ${
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
      <div className="relative w-full min-h-65 overflow-hidden">
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

export function StatsBoard({
  players,
  seasonLabels,
  stats,
  isGeneral,
}: {
  players: Array<Player | null>;
  seasonLabels: Array<string>;
  stats: { key: string; label: string }[];
  isGeneral: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 w-full relative">
      {stats.map((stat) => (
        <StatBlock
          key={stat.key}
          identifier={stat.key}
          label={stat.label}
          playerA={players[0]}
          playerB={players[1]}
          seasonLabelA={seasonLabels[0]}
          seasonLabelB={seasonLabels[1]}
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
  seasonLabelA,
  seasonLabelB,
  isGeneral,
}: {
  label: string;
  identifier: string;
  playerA: Player | null;
  playerB: Player | null;
  seasonLabelA: string;
  seasonLabelB: string;
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
    valueA = getPlayerDetailValue(detailsA, identifier, seasonLabelA);
    valueB = getPlayerDetailValue(detailsB, identifier, seasonLabelB);
  } else {
    valueA = getStatValue(playerA, seasonLabelA, identifier);
    valueB = getStatValue(playerB, seasonLabelB, identifier);
  }

  return (
    <div className="relative z-0 flex items-center py-2 px-3 gap-3 border-b border-light-ui-border dark:border-white/10 w-full">
      <p
        className={`text-light-text-secondary dark:text-dark-text-secondary ${poppins.className} text-sm text-left py-1`}
      >
        {valueA ?? "-"}
      </p>
      <p
        className={`text-light-text-primary dark:text-dark-text-primary ${poppins.className} text-xs font-medium flex-1 text-center`}
      >
        {label}
      </p>
      <p
        className={`text-light-text-secondary dark:text-dark-text-secondary ${poppins.className} text-sm text-right py-1`}
      >
        {valueB ?? "-"}
      </p>
    </div>
  );
}

function getPlayerDetailValue(
  player: Player | null,
  key: string,
  seasonLabel: string,
): string | number {
  if (key === "dateOfBirth") {
    return getAgeOfPlayer(player);
  }

  if (key === "currentClubId") {
    return getClubNameOfPlayer(player);
  }

  if (key === "averageRating") {
    if (
      seasonLabel.trim().toLowerCase() === "career" ||
      seasonLabel.trim().toLowerCase() === "all-time"
    ) {
      return getAverageRatingOfPlayerBasedOnCareer(player);
    }

    if (seasonLabel.trim().split(/\s+/).length >= 2) {
      return getAverageRatingOfPlayerBasedOnCompetitionAndSeason(
        player,
        seasonLabel,
      );
    }

    if (seasonLabel.trim()) {
      return getAverageRatingOfPlayerBasedOnSeason(player, seasonLabel);
    }

    return "-";
  }

  const value = player?.[key as keyof Player];

  if (typeof value === "function" || value === undefined) {
    return "-";
  }

  return typeof value === "string" || typeof value === "number" ? value : "-";
}

function getStatValue(
  player: Player | null,
  seasonLabel: string,
  identifier: string,
): string | number {
  if (!player) return "-";

  if (
    seasonLabel.trim().toLowerCase() === "career" ||
    seasonLabel.trim().toLowerCase() === "all-time"
  ) {
    return getStatValueBasedOnCareer(player, identifier);
  }

  if (seasonLabel.trim().split(/\s+/).length >= 2) {
    return getStatValueBasedOnCompetitionAndSeason(
      player,
      seasonLabel,
      identifier,
    );
  }

  if (seasonLabel.trim()) {
    return getStatValueBasedOnSeason(player, seasonLabel, identifier);
  }

  return "-";
}

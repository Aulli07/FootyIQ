"use client";

import { poppins } from "@/app/font-icons/fonts";
import { useMemo } from "react";

import { canonicalPlayers, getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";

import PopularPlayerCard from "./popular-player-card";
import { PlayerCombinedType, PlayerFullAnalyticsType } from "../types/search-analytics-type";

import { usePlayerAnalytics } from "@/providers/providers";



function getPopularPlayers(
  playerAnalytics: PlayerFullAnalyticsType,
): PlayerCombinedType[] {
  const combined = canonicalPlayers.map((player) => ({
    ...player,
    searchCount: playerAnalytics[player.id]?.searchCount ?? 0,
    viewCount: playerAnalytics[player.id]?.viewCount ?? 0,
  }));

  let popularPlayers: PlayerCombinedType[] = [];

  for (const player of combined) {
    if (popularPlayers.length < 7) {
      popularPlayers.push(player);

      popularPlayers.sort(
        (playerA, playerB) => playerA.searchCount - playerB.searchCount,
      );
    } else if (player.searchCount > popularPlayers[0].searchCount) {
      popularPlayers[0] = player;

      popularPlayers.sort(
        (playerA, playerB) => playerA.searchCount - playerB.searchCount,
      );
    }

    popularPlayers.sort(
      (playerA, playerB) => playerB.searchCount - playerA.searchCount,
    );
  }

  return popularPlayers;
}

export default function PopularPlayers() {
  const { playerAnalytics } = usePlayerAnalytics();

  const POPULAR_PLAYERS = useMemo(
    () => getPopularPlayers(playerAnalytics),
    [playerAnalytics],
  );

  return (
    <section className="mt-12 mb-12">
      <div className="flex flex-col gap-1 mb-6">
        <h2
          className={`text-2xl font-black ${poppins.className} tracking-tight text-light-text-primary dark:text-dark-text-primary uppercase`}
        >
          Fan Favorites
        </h2>
        <div className="h-1.5 w-16 bg-emerald-500 rounded-full" />
        <p
          className={`text-sm ${poppins.className} text-light-text-secondary dark:text-dark-text-secondary mt-1 font-medium`}
        >
          Trending profiles this week.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {POPULAR_PLAYERS.map((item) => {
          const player = getCanonicalPlayerById(item.id);
          if (!player) return null;

          return (
            <PopularPlayerCard
              key={player.id}
              player={player}
              searchCount={item.searchCount}
            />
          );
        })}
      </div>
    </section>
  );
}

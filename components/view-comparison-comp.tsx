"use client";

import { players } from "../app/data/players";
import { oswald, poppins } from "../app/fonts";

import Image from "next/image";

import { PlayerType } from "../app/types/players";
import ShowFullStat from "./show-stat";

import ComparisonVotesSection from "./comp-votes-section";
import ComparisonTalksSection from "./comp-talks-section";
import PageTitle from "./page-title";

function FixedFieldBox({
  player,
  season,
}: {
  player: PlayerType;
  season: string;
}) {
  return (
    <div
      className={`relative z-0 h-55 flex flex-col justify-center items-center gap-3 rounded-lg px-2 border border-white/30 bg-black/20 ${poppins.className} shadow-lg backdrop-blur`}
    >
      <div className="relative flex flex-col justify-center items-center">
        <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-emerald-400/30 flex justify-center items-center bg-black/20">
          <Image
            src={player.image}
            alt={player.name}
            sizes="80px"
            fill
            className="object-cover relative"
          />
        </div>
        <p
          className={`flex justify-center items-center ${poppins.className} text-sm text-white/80 mt-3`}
        >
          {player.name}
        </p>
      </div>
      <div
        className={`w-full bg-white/5 border border-white/15 rounded-md px-3 py-2 text-left flex justify-center items-center ${poppins.className} text-sm text-white/90`}
      >
        <span className="truncate pr-2">{season}</span>
      </div>
    </div>
  );
}

export default function ViewComparison({
  leftPlayerId,
  rightPlayerId,
}: {
  leftPlayerId: string | null;
  rightPlayerId: string | null;
}) {
  const leftPlayer = players.find((p) => p.id === leftPlayerId);
  const rightPlayer = players.find((p) => p.id === rightPlayerId);

  if (!leftPlayer || !rightPlayer) {
    return <div className="p-4">Player not found</div>;
  }

  return (
    <main className="px-3 pt-5 pb-5">
      <div className="flex flex-col gap-5">
        <PageTitle
          title={
            leftPlayer.id.toUpperCase() +
            " & " +
            rightPlayer.id.toUpperCase() +
            " COMPARISON"
          }
        />
        <div className="flex flex-col gap-4 mt-6">
          <div className="grid grid-cols-2 gap-3 px-2">
            <FixedFieldBox player={leftPlayer} season="23/24" />
            <FixedFieldBox player={rightPlayer} season="23/24" />
          </div>

          <div className="px-3">
            <ShowFullStat
              players={[leftPlayer, rightPlayer]}
              seasons={["23/24", "23/24"]}
            />
          </div>

          <ComparisonVotesSection
            leftPlayer={leftPlayer}
            rightPlayer={rightPlayer}
          />

          <ComparisonTalksSection
            leftPlayer={leftPlayer}
            rightPlayer={rightPlayer}
          />
        </div>
      </div>
    </main>
  );
}
git 
"use client";

// Importing the font families, image modules, react change modules and modal modules for this page
import { oswald, poppins } from "../fonts";
import { useState } from "react";

import { DropDown } from "../components/dropdown";
import Header from "../components/header";
import ShowFullStat from "../components/show-stat";

import { PlayerType } from "../types/players";
import { StatsType } from "../types/stats";

import { playerStats } from "../data/playerStats";
import TitleSection from "../components/page-section-title";
import ComparisonVotesSection from "../components/comp-votes-section";
import ComparisonTalksSection from "../components/comp-talks-section";

export function AddFieldBox({
  playerSlot,
  selectedPlayers,
  setSelectedPlayers,
  setSelectedSeasons,
  selectedSeasons,
}: {
  playerSlot: number;
  selectedPlayers: Array<PlayerType | null>;
  setSelectedPlayers: React.Dispatch<
    React.SetStateAction<Array<PlayerType | null>>
  >;
  setSelectedSeasons: React.Dispatch<React.SetStateAction<Array<string>>>;
  selectedSeasons: Array<string>;
}) {
  return (
    <div
      className={`relative z-0 h-55 focus-within:z-[9999] flex flex-col justify-center items-center gap-3 rounded-lg px-2 border border-white/30 bg-black/20 ${poppins.className} shadow-lg backdrop-blur focus-within:border-emerald-400/40 focus-within:ring-4 focus-within:ring-emerald-400/15`}
    >
      <img
        src="/images/swap-light-fill.png"
        alt="no pic"
        className="absolute right-2 top-3 object-cover w-7 h-7"
        onClick={() => {
          setSelectedPlayers((prev) => {
            const next = [...prev];
            next[playerSlot] = null;
            return next;
          });
          setSelectedSeasons((prev) => {
            const next = [...prev];
            next[playerSlot] = "All-time";
            return next;
          });
        }}
      />
      <DropDown
        type="player"
        label="Search a Player"
        playerSlot={playerSlot}
        setSelectedPlayers={setSelectedPlayers}
        selectedPlayers={selectedPlayers}
        // selectedSeasons={selectedSeasons
        setSelectedSeasons={setSelectedSeasons}
      />

      <DropDown
        type="season"
        label="Season"
        setSelectedSeasons={setSelectedSeasons}
        playerSlot={playerSlot}
        selectedPlayers={selectedPlayers}
        selectedSeasons={selectedSeasons}
      />
    </div>
  );
}

const Compare = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<
    Array<PlayerType | null>
  >([null, null]);
  const [selectedSeasons, setSelectedSeasons] = useState<Array<string>>([
    "23/24",
    "23/24",
  ]);

  return (
    <main className="flex flex-col w-full px-3">
      <Header headerText="Compare" />
      <div className="gap-3 flex flex-col gap-4 pt-6">
        <div className="relative flex justify-center items-center mb-5">
          <p className={`text-white ${oswald.className} text-lg font-semibold`}>
            Player Comparison
          </p>
          <img
            src="/images/swap-fields.png"
            alt="no pic"
            className="absolute right-0 top-1/2 object-cover -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 px-2">
          <AddFieldBox
            playerSlot={0}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
            setSelectedSeasons={setSelectedSeasons}
            selectedSeasons={selectedSeasons}
          />
          <AddFieldBox
            playerSlot={1}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
            setSelectedSeasons={setSelectedSeasons}
            selectedSeasons={selectedSeasons}
          />
        </div>
        <div className="relative z-0 text-white/70 flex flex-col text-center gap-3 px-3">
          <div className="relative z-0 flex flex-col gap-4 p-2 w-full ">
            <ShowFullStat players={selectedPlayers} seasons={selectedSeasons} />
          </div>
        </div>

        <ComparisonVotesSection
          leftPlayer={selectedPlayers[0]}
          rightPlayer={selectedPlayers[1]}
        />

        <ComparisonTalksSection
          leftPlayer={selectedPlayers[0]}
          rightPlayer={selectedPlayers[1]}
        />
      </div>
    </main>
  );
};

export default Compare;

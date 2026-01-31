"use client";

// Importing the font families, image modules, react change modules and modal modules for this page
import { oswald, poppins } from "../fonts";
import { useState } from "react";
import { DropDown } from "../components/dropdown";

import { PlayerType } from "../types/players";
import { StatsType } from "../types/stats";

import { playerStats } from "../data/playerStats";
import { stat } from "fs/promises";


function AddFieldBox({
  // fieldBoxDetails,
  playerSlot,
  selectedPlayers,
  setSelectedPlayers,
  setSelectedSeasons
}: {
  // fieldBoxDetails: fieldBoxType;
  playerSlot: number;
  selectedPlayers: Array<PlayerType | null>;
  setSelectedPlayers: React.Dispatch<React.SetStateAction<Array<PlayerType | null>>>;
  setSelectedSeasons: React.Dispatch<React.SetStateAction<Array<string>>>;
}) {
  return (
    <div
      className={`relative z-0 focus-within:z-[9999] flex flex-col items-center gap-3 rounded-lg p-4 border border-white/30 bg-black/20 ${poppins.className} shadow-lg backdrop-blur`}
    >
      <DropDown
        type="player"
        label="Search a Player"
        playerSlot={playerSlot}
        setSelectedPlayers={setSelectedPlayers}
      />
      
      <DropDown
        type="season"
        label="Season"
        setSelectedSeasons={setSelectedSeasons}
        playerSlot={playerSlot}
        selectedPlayers={selectedPlayers}
      />
    </div>
  );
}

function ShowStat({ players, seasons }: { players: Array<PlayerType | null>, seasons: Array<string> }) {

  const statsToCompare = [
    {key: "appearances", label: "Appearances"},
    {key: "goals", label: "Goals"},
    {key: "assists", label: "Assists"},
    {key: "minutes", label: "Minutes Played"},
    {key: "shots", label: "Shots"},
    {key: "shotsOnTarget", label: "Shots On Target"},
    {key: "keyPasses", label: "Key Passes"},
    {key: "dribblesCompleted", label: "Dribbles Completed"},
    {key: "averageRating", label: "Average Rating"},
    {key: "yellowCards", label: "Yellow Cards"},
    {key: "redCards", label: "Red Cards"},
  ]

  return (
    <>
      {statsToCompare.map((stat, index) => (
        <StatBlock 
          key={stat.key}
          identifier={stat.key}
          label={stat.label}
          playerA={players[0]}
          playerB={players[1]}
          seasonA={seasons[0]}
          seasonB={seasons[1]}
        />
      ))}
    </>
  );
}

function StatBlock({
  label,
  identifier,
  playerA,  
  playerB,
  seasonA,
  seasonB
}: {
  label: string;
  identifier: string;
  playerA: PlayerType | null;
  playerB: PlayerType | null;
  seasonA: string;
  seasonB: string;
}) {
  const statA = playerA ? (playerStats.find((p) => p?.id === playerA?.id) || null) : null;
  const statB = playerB ? (playerStats.find((p) => p?.id === playerB?.id) || null) : null;
  
  const getStatValueForA = (stat: StatsType | null, season : string) => {
    if (!stat) return "-";
    if (season === "All-time") {
      return stat.career[("total" + label.replace(/\s+/g, '')) as keyof StatsType["career"]];
    } else {
      const seasonData = stat.seasons.find(s => s.season === season);
      if (!seasonData) return "-";
      let total = 0;
      seasonData.competitions.forEach(comp => {
        total += comp.stats[identifier as keyof typeof comp.stats] || 0;
      });
      return total;
    }
  };
  const valueA = getStatValueForA(statA, seasonA);
  const valueB = getStatValueForA(statB, seasonB);


  return (
    <div className="relative z-0 flex justify-between items-center py-2 px-3 border-b border-white/10">
      <p className={`text-white/70 ${poppins.className} text-sm text-center`}>
        {valueA ?? "-"}
      </p>
      <p className={`text-white ${poppins.className} text-sm font-medium text-center`}>
        {label}
      </p>
      <p className={`text-white/70 ${poppins.className} text-sm text-center`}>
        {valueB ?? "-"}
      </p>
    </div>
  )
}
const Compare = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<
    Array<PlayerType | null>
  >([null, null]);
  const [selectedSeasons, setSelectedSeasons] = useState<Array<string>>(["All-time", "All-time"]);

  return (
    <main className="flex flex-col w-full px-3 h-full pt-10 overflow-auto">
      <div className="gap-3 flex flex-col gap-4">
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
          />
          <AddFieldBox
            playerSlot={1}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
            setSelectedSeasons={setSelectedSeasons}
          />
        </div>
        <div className="relative z-0 text-white/70 flex flex-col text-center gap-3 px-3">
          <div className="relative z-0 flex flex-col gap-4 p-2 w-full border border-white/20 rounded-lg bg-white/5 shadow-lg backdrop-blur">
            <ShowStat players={selectedPlayers} seasons={selectedSeasons} />
          </div>
        </div>

        <div className="flex flex-col gap-3 h-full w-full">
          <div className="flex justify-center items-center">
            <p
              className={`text-white ${oswald.className} text-lg font-semibold`}
            >
              Comments
            </p>
          </div>

          <div className="w-full border border-white/15 rounded-xl bg-white/5 shadow-lg backdrop-blur p-4">
            <p
              className={`text-white/60 ${poppins.className} text-sm text-center`}
            >
              No comments yet.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Compare;

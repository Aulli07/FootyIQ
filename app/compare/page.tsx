"use client";

// Importing the font families, image modules, react change modules and modal modules for this page
import { oswald, poppins } from "../fonts";
import { useState } from "react";

import { DropDown } from "../../components/dropdown";
import Header from "../../components/header";
import ShowFullStat from "../../components/show-stat";

import { PlayerType } from "../types/players";

import ComparisonVotesSection from "../../components/comp-votes-section";
import ComparisonPostsSection from "../../components/comp-posts-section";
import ComparisonShareSection from "../../components/comp-share-section";

import { useParams } from "next/navigation";
import { players } from "../data/players";
import { getSearchedPlayers } from "../utils/playerFilters";

export function AddFieldBox({
  playerSlot,
  selectedPlayers,
  setSelectedPlayers,
  setSelectedSeasons,
  selectedSeasons,
  searchQuery,
  setSearchQuery,
  searchedPlayers,
}: {
  playerSlot: number;
  selectedPlayers: Array<PlayerType | null>;
  setSelectedPlayers: React.Dispatch<
    React.SetStateAction<Array<PlayerType | null>>
  >;
  setSelectedSeasons: React.Dispatch<React.SetStateAction<Array<string>>>;
  selectedSeasons: Array<string>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchedPlayers: Array<PlayerType>;
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
        setSelectedSeasons={setSelectedSeasons}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        searchedPlayers={searchedPlayers}
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const params = useParams<{ compare: string }>();
  const comparePath = params["compare"];

  const searchedPlayers = getSearchedPlayers(players, searchQuery);

  console.log(typeof selectedPlayers[0])
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
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchedPlayers={searchedPlayers}
          />
          <AddFieldBox
            playerSlot={1}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
            setSelectedSeasons={setSelectedSeasons}
            selectedSeasons={selectedSeasons}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchedPlayers={searchedPlayers}
          />
        </div>
        <div className="relative z-0 text-white/70 flex flex-col text-center gap-3 px-3">
          <div className="relative z-0 flex flex-col gap-4 p-2 w-full ">
            <ShowFullStat players={selectedPlayers} seasons={selectedSeasons} />
          </div>
        </div>

        <ComparisonShareSection
          leftPlayer={selectedPlayers[0]}
          rightPlayer={selectedPlayers[1]}
        />

        {(!(selectedPlayers[0] === null) && !(selectedPlayers[1] === null)) && (
          <div className="flex flex-col gap-5 w-full mt-7">
            

            <ComparisonVotesSection
              leftPlayer={selectedPlayers[0]}
              rightPlayer={selectedPlayers[1]}
            />

            <ComparisonPostsSection
              leftPlayer={selectedPlayers[0]}
              rightPlayer={selectedPlayers[1]}
              uniqueFullPath="/compare"
            />
          </div>
        )}
        
      </div>
    </main>
  );
};

export default Compare;

"use client";

import { poppins } from "@/app/font-icons/fonts";

import { useState } from "react";
import { useRef } from "react";

import Header from "@/shared/components/header";

import { DropDown } from "@/features/compare/components/dropdown";
import ShowFullStat from "@/features/compare/components/show-stat";
import ComparisonVotesSection from "@/features/compare/components/comp-votes-section";
import ComparisonPostsSection from "@/features/compare/components/comp-posts-section";
import ComparisonShareSection from "@/features/compare/components/comp-share-section";

import { getPlayerSearchResults } from "@/features/search/engine/search-engine";

import { saveComparison } from "@/features/compare/services/save-compare-comparison";
import { SelectedComparisonContext } from "@/features/compare/types/comp-save-type";

const Compare = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<Array<string>>([
    "",
    "",
  ]);
  const [selectedContexts, setSelectedContexts] = useState<SelectedComparisonContext[]>([
    { context: null, scope: {}, label: "Season" },
    { context: null, scope: {}, label: "Season" },
  ]);
  const selectedSeasonLabels = selectedContexts.map((selection) => selection.label);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [currentComparisonId, setCurrentComparisonId] = useState<string | null>(
    null,
  );
  const lastComparisonKeyRef = useRef<string | null>(null);

  const searchedPlayers = getPlayerSearchResults(searchQuery);

  saveComparison({
    selectedPlayers,
    selectedContexts,
    setCurrentComparisonId,
    lastComparisonKeyRef,
  });

  return (
    <main className="flex flex-col w-full gap-5 px-3 text-light-text-primary dark:text-dark-text-primary ">
      <Header headerText="Compare" />
      <div className="mt-5 gap-3 flex flex-col">
        <div className="grid grid-cols-2 gap-3 px-2">
          <AddFieldBox
            playerSlot={0}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
            setSelectedContexts={setSelectedContexts}
            selectedContexts={selectedContexts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchedPlayers={searchedPlayers}
          />
          <AddFieldBox
            playerSlot={1}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
            setSelectedContexts={setSelectedContexts}
            selectedContexts={selectedContexts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchedPlayers={searchedPlayers}
          />
        </div>

        <div className="relative z-0 text-light-text-secondary dark:text-dark-text-secondary flex flex-col text-center gap-3 px-3">
          <div className="relative z-0 flex flex-col gap-4 p-2 w-full ">
            <ShowFullStat
              playerSet={selectedPlayers}
              seasonLabels={selectedSeasonLabels}
            />
          </div>
        </div>

        <ComparisonShareSection comparisonId={currentComparisonId} />

        {!(selectedPlayers[0] === null) && !(selectedPlayers[1] === null) && (
          <div className="flex flex-col gap-5 w-full">
            <ComparisonVotesSection
              leftPlayerId={selectedPlayers[0]}
              rightPlayerId={selectedPlayers[1]}
            />

            <ComparisonPostsSection
              leftPlayerId={selectedPlayers[0]}
              rightPlayerId={selectedPlayers[1]}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export function AddFieldBox({
  playerSlot,
  selectedPlayers,
  setSelectedPlayers,
  setSelectedContexts,
  selectedContexts,
  searchQuery,
  setSearchQuery,
  searchedPlayers,
}: {
  playerSlot: number;
  selectedPlayers: Array<string>;
  setSelectedPlayers: React.Dispatch<React.SetStateAction<Array<string>>>;
  setSelectedContexts: React.Dispatch<React.SetStateAction<SelectedComparisonContext[]>>;
  selectedContexts: SelectedComparisonContext[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchedPlayers: Array<string>;
}) {
  return (
    <div
      className={`relative z-0 h-55 focus-within:z-[9999] flex flex-col justify-center items-center gap-3 rounded-lg px-2 border border-light-ui-border bg-light-background-card/80 dark:border-white/30 dark:bg-black/20 ${poppins.className} shadow-md shadow-slate-300/35 dark:shadow-lg dark:shadow-black/20 backdrop-blur focus-within:border-emerald-500/50 dark:focus-within:border-emerald-400/40 focus-within:ring-4 focus-within:ring-emerald-500/15 dark:focus-within:ring-emerald-400/15`}
    >
      {selectedPlayers[playerSlot] && (
        <img
          src="/images/swap-light-fill.png"
          alt="no pic"
          className="absolute right-2 top-3 object-cover w-7 h-7"
          onClick={() => {
            setSelectedPlayers((prev) => {
              const next = [...prev];
              next[playerSlot] = "";
              return next;
            });
            setSelectedContexts((prev) => {
              const next = [...prev];
              next[playerSlot] = { context: null, scope: {}, label: "Season" };
              return next;
            });
          }}
        />
      )}

      <DropDown
        type="player"
        label="Search a Player"
        playerSlot={playerSlot}
        setSelectedPlayers={setSelectedPlayers}
        selectedPlayers={selectedPlayers}
        setSelectedContexts={setSelectedContexts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchedPlayers={searchedPlayers}
      />

      <DropDown
        type="season"
        label="Season"
        setSelectedContexts={setSelectedContexts}
        playerSlot={playerSlot}
        selectedPlayers={selectedPlayers}
        selectedContexts={selectedContexts}
      />
    </div>
  );
}

export default Compare;

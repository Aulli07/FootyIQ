"use client";

import { poppins } from "@/app/font-icons/fonts";
import Image from "next/image";

import { useState } from "react";
import { useRef } from "react";

import Header from "@/shared/components/header";

import { DropDown } from "@/features/compare/components/dropdown";
import ShowFullStat from "@/features/compare/components/show-stat";
import ComparisonVotesSection from "@/features/compare/components/comp-votes-section";
import ComparisonPostsSection from "@/features/compare/components/comp-posts-section";
import ComparisonShareSection from "@/features/compare/components/comp-share-section";

import { getPlayerSearchResults } from "@/features/search/engine/search-engine";

import { useSaveComparison } from "@/features/compare/services/save-compare-comparison";
import { SelectedComparisonContext } from "@/features/compare/types/comp-save-type";


import { createSelectedContext } from "@/features/compare/utils/get-comp-comtext";



function getComparisonReadinessMessage(
  selectedPlayers: string[],
  selectedContexts: SelectedComparisonContext[],
): string | null {
  if (!selectedPlayers[0] || !selectedPlayers[1]) {
    return "Select two players to begin a comparison.";
  }

  if (!selectedContexts[0]?.context || !selectedContexts[1]?.context) {
    return "Choose a comparison scope for both players.";
  }

  if (selectedContexts[0].context !== selectedContexts[1].context) {
    return "Choose matching comparison scopes for both players.";
  }

  return null;
}



const Compare = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<Array<string>>([
    "",
    "",
  ]);
  const [selectedContexts, setSelectedContexts] = useState<SelectedComparisonContext[]>([
    createSelectedContext(),
    createSelectedContext(),
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [currentComparisonId, setCurrentComparisonId] = useState<string | null>(
    null,
  );
  const [confirmedComparisonKey, setConfirmedComparisonKey] = useState<string | null>(
    null,
  );
  const [showReadinessMessage, setShowReadinessMessage] = useState(false);
  const lastComparisonKeyRef = useRef<string | null>(null);

  const searchedPlayers = getPlayerSearchResults(searchQuery);
  const readinessMessage = getComparisonReadinessMessage(
    selectedPlayers,
    selectedContexts,
  );
  const isComparisonReady = readinessMessage === null;
  const comparisonKey = JSON.stringify({ selectedPlayers, selectedContexts });
  const isShowingResults =
    isComparisonReady && confirmedComparisonKey === comparisonKey;

  useSaveComparison({
    selectedPlayers,
    selectedContexts,
    setCurrentComparisonId,
    lastComparisonKeyRef,
    isConfirmed: isShowingResults,
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

        <div className="flex justify-center px-3 pt-2">
          <button
            type="button"
            onClick={() => {
              if (!isComparisonReady) {
                setShowReadinessMessage(true);
                return;
              }

              setShowReadinessMessage(false);
              setConfirmedComparisonKey(comparisonKey);
            }}
            className={`w-full max-w-sm rounded-xl border px-5 py-3 text-sm font-semibold tracking-wide transition-all ${poppins.className} ${
              isShowingResults
                ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-700 dark:border-emerald-400/60 dark:text-emerald-300"
                : isComparisonReady
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-700/20 hover:bg-emerald-700 dark:border-emerald-400 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
                  : "border-light-ui-border bg-light-background-card text-light-text-muted hover:border-emerald-500/50 hover:text-emerald-700 dark:border-white/10 dark:bg-white/5 dark:text-dark-text-muted dark:hover:text-emerald-300"
            }`}
          >
            {isShowingResults ? "RESULTS" : "COMPARE"}
          </button>
        </div>

        {showReadinessMessage && readinessMessage && (
          <p className={`px-3 text-center text-xs text-amber-700 dark:text-amber-300 ${poppins.className}`}>
            {readinessMessage}
          </p>
        )}

        {isShowingResults && (
          <>
            <div className="relative z-0 flex flex-col gap-3 px-3 text-center text-light-text-secondary dark:text-dark-text-secondary">
              <ShowFullStat
                playerSet={selectedPlayers}
                contexts={selectedContexts}
              />
            </div>

            {currentComparisonId && (
              <ComparisonShareSection comparisonId={currentComparisonId} />
            )}

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
          </>
        )}
      </div>
    </main>
  );
};

function AddFieldBox({
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
        <button
          type="button"
          aria-label="Remove selected player"
          className="absolute right-2 top-3 h-7 w-7 cursor-pointer"
          onClick={() => {
            setSelectedPlayers((prev) => {
              const next = [...prev];
              next[playerSlot] = "";
              return next;
            });
            setSelectedContexts((prev) => {
              const next = [...prev];
              next[playerSlot] = createSelectedContext();
              return next;
            });
          }}
        >
          <Image
            src="/images/swap-light-fill.png"
            alt=""
            width={28}
            height={28}
            className="object-cover"
          />
        </button>
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

"use client";

import { poppins } from "@/app/font-icons/fonts";
import Image from "next/image";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

import { getComparisonReadinessMessage } from "@/features/compare/selectors/get-comp-readiness";
import { useSearchParams } from "next/navigation";
import { create } from "zustand/react";

type ComparisonState = {
  selectedPlayers: string[];
  selectedContexts: SelectedComparisonContext[];
  setSelectedPlayers: Dispatch<SetStateAction<string[]>>;
  setSelectedContexts: Dispatch<SetStateAction<SelectedComparisonContext[]>>;
  confirmedComparisonKey: string | null;
  setConfirmedComparisonKey: Dispatch<SetStateAction<string | null>>;
};

const useComparisonStore = create<ComparisonState>((set) => ({
  selectedPlayers: ["", ""],
  selectedContexts: [createSelectedContext(), createSelectedContext()],
  setSelectedPlayers: (nextPlayers) =>
    set((state) => ({
      selectedPlayers:
        typeof nextPlayers === "function"
          ? nextPlayers(state.selectedPlayers)
          : nextPlayers,
    })),
  setSelectedContexts: (nextContexts) =>
    set((state) => ({
      selectedContexts:
        typeof nextContexts === "function"
          ? nextContexts(state.selectedContexts)
          : nextContexts,
    })),
  confirmedComparisonKey: null,
  setConfirmedComparisonKey: (nextKey) => 
    set((state) => ({
      confirmedComparisonKey:
        typeof nextKey === "function"
          ? nextKey(state.confirmedComparisonKey)
          : nextKey,
    }))
}));



const Compare = () => {
  const searchParams = useSearchParams();
  const playerId = searchParams.get("id");

  const selectedPlayers = useComparisonStore((state) => state.selectedPlayers);
  const selectedContexts = useComparisonStore((state) => state.selectedContexts);
  const setSelectedPlayers = useComparisonStore(
    (state) => state.setSelectedPlayers,
  );
  const setSelectedContexts = useComparisonStore(
    (state) => state.setSelectedContexts,
  );
  const confirmedComparisonKey = useComparisonStore(
    (state) => state.confirmedComparisonKey,
  );
  const setConfirmedComparisonKey = useComparisonStore(
    (state) => state.setConfirmedComparisonKey,
  );

  useEffect(() => {
    if (!playerId) return;
    setSelectedPlayers((previousPlayers) => {
      if (previousPlayers[0] === playerId) return previousPlayers;
      return [playerId, previousPlayers[1]];
    });
  }, [playerId, setSelectedPlayers]);


  const [currentComparisonId, setCurrentComparisonId] = useState<string | null>(null); // State to hold the current comparison ID for shares
  const lastComparisonKeyRef = useRef<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchedPlayers = getPlayerSearchResults(searchQuery);

  const [showReadinessMessage, setShowReadinessMessage] = useState(false);
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
    <main className="flex flex-col w-full px-4 gap-4 text-light-text-primary dark:text-dark-text-primary">
      <Header headerText="Compare" />

      <div className="gap-4 flex flex-col">
        <div className="grid grid-cols-2 gap-3">
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

        <div className="flex justify-center mt-2">
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
            className={`w-full max-w-sm rounded-xl border py-2.5 text-sm font-semibold tracking-wide transition-all ${poppins.className} ${
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
          <p className={`text-center text-xs text-amber-700 dark:text-amber-300 ${poppins.className}`}>
            {readinessMessage}
          </p>
        )}
        
        {isShowingResults && (
          <>
            <div className="relative z-0 mt-3 flex flex-col text-center text-light-text-secondary dark:text-dark-text-secondary">
              <ShowFullStat
                playerSet={selectedPlayers}
                contexts={selectedContexts}
              />
            </div>
            
            {currentComparisonId && (
              <ComparisonShareSection comparisonId={currentComparisonId} />
            )}

            <ComparisonVotesSection
              leftPlayerId={selectedPlayers[0]}
              rightPlayerId={selectedPlayers[1]}
            />

            <ComparisonPostsSection
              leftPlayerId={selectedPlayers[0]}
              rightPlayerId={selectedPlayers[1]}
            />
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

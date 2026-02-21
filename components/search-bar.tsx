import { poppins } from "../app/fonts";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import { PlayerType } from "../app/types/players";

import Compares from "./top-compare-cards";
import { GetSearchedPlayers } from "./searched-players";

function SearchBar({
  setIsSearch,
  isSearch,
  comparedPlayers,
}: {
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  isSearch: boolean;
  comparedPlayers: PlayerType[][];
}) {
  const [inputText, setInputText] = useState<string>("");

  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-[9999]">
          <div className="relative h-6 w-6">
            <Image
              src="/images/search.png"
              fill
              sizes="32px"
              alt="search"
              className="object-cover"
            />
          </div>
        </div>

        {/* The input search section */}
        <InputBar
          setInputText={setInputText}
          setIsSearch={setIsSearch}
          isSearch={isSearch}
        />
      </div>

      {/* If input isn't empty, show searched results */}
      <GetSearchedPlayers query={inputText}>
        {(foundPlayers) =>
          inputText.trim() !== "" ? (
            <div className="flex-1 min-h-0">
              <SearchedPlayersResults
                foundPlayers={foundPlayers}
                emptySearch={`No matches for "${inputText}"`}
                comparedPlayers={comparedPlayers}
              />
            </div>
          ) : (
            <div className="flex-1 min-h-0" />
          )
        }
      </GetSearchedPlayers>
    </div>
  );
}

export function SearchedPlayersResults({
  // Assigning each element to its individual type,
  // foundPlayers is an array of player objects while emptySearch is simply a string
  foundPlayers,
  emptySearch,
  comparedPlayers,
}: {
  foundPlayers: Array<PlayerType>;
  emptySearch: string;
  comparedPlayers: PlayerType[][];
}) {
  const foundPlayerComparisons: Array<Array<PlayerType>> = useMemo(() => {
    const comparisons: Array<Array<PlayerType>> = [];

    foundPlayers.forEach((player) => {
      comparedPlayers.forEach((compares) => {
        const left = compares[0];
        const right = compares[1];

        if (player.id === left.id || player.id === right.id) {
          comparisons.push(compares);
        }
      });
    });

    return comparisons;
  }, [foundPlayers, comparedPlayers]);

  // The display of found player's comparisons
  return (
    <div className="w-full h-full rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-xs tracking-wide text-white/60">
          {foundPlayers.length === 0 ? "No results" : "Matches"}
        </p>
      </div>

      {foundPlayers.length === 0 ? (
        <div className="px-4 py-4">
          <p className="text-sm text-white/80">{emptySearch}</p>
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-auto">
          <Compares compareList={foundPlayerComparisons} categoryType="search" />
        </div>
      )}
    </div>
  );
}

// The component for inputting text in the search bar
function InputBar({
  setInputText,
  setIsSearch,
  isSearch,
}: {
  setInputText: Dispatch<SetStateAction<string>>;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  isSearch: boolean;
}) {
  return (
    <input
      type="text"
      placeholder="Search for players or clubs"
      className={`w-full h-14 rounded-2xl bg-white/5 text-white placeholder:text-white/40 border border-white/30 pl-12 pr-4 text-[15px] ${poppins.className} shadow-lg backdrop-blur outline-none transition focus:border-emerald-400/40 focus:ring-4 focus:ring-emerald-400/15`}
      onChange={(e) => {
        setInputText(e.target.value);
        !isSearch ? setIsSearch(true) : setIsSearch(false);
      }}
    />
  );
}

export default SearchBar;

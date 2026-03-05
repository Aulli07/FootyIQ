"use client";

import PageTitle from "@/components/page-title";
import Compares from "@/components/top-compare-cards";
import { PlayerType } from "@/app/types/players";

import { totalComparedPlayers } from "@/app/page";
import { players } from "@/app/data/players";

import { getTotalComparisons } from "@/app/utils/playerFilters";
import { oswald } from "@/app/fonts";

import { useState } from "react";
import { getSearchedPlayers } from "@/app/utils/playerFilters";
import { foundComparisons } from "@/app/utils/playerFilters";

import { InputBar } from "@/components/search-bar";

export default function AddPost() {
  const [results, setResults] = useState<Array<Array<PlayerType>>>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleSearch(query: string) {
    const compared = getSearchedPlayers(players, query);
    const fetchedComparisons = foundComparisons(totalComparedPlayers, compared);

    setResults(fetchedComparisons);
  }

  const allComparisons = getTotalComparisons(players);
  const topSearchComparisons: Array<Array<PlayerType>> = [];

  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(Math.random() * allComparisons.length);
    topSearchComparisons.push(allComparisons[randomNum]);
  }

  return (
    <main className="flex flex-col gap-6 px-4 min-h-[calc(100vh-5.05rem)] text-light-text-primary dark:text-dark-text-primary">
      <PageTitle title="Add a Post" />

      <div className="flex flex-col min-h-[calc(100vh-12rem)]">
        <div className="flex flex-col gap-3 flex-1">
          <textarea
            placeholder="Write your post here..."
            className="w-full min-h-85 p-3 rounded-xl bg-light-background-card dark:bg-white/10 border border-light-ui-border dark:border-white/20 text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/40 dark:focus:ring-emerald-400/50"
          />
        </div>

        <div className="relative gap-3 flex flex-col justify-end">
          <div className="flex flex-col gap-3 bg-light-background-card dark:bg-white/5 shadow-md shadow-slate-300/30 dark:shadow-sm dark:shadow-black/20 backdrop-blur border border-light-ui-border dark:border-white/20 rounded-lg py-3 px-3 w-full">
            <div className="flex gap-3">
              <div className="flex items-center w-full">
                <p
                  className={`flex flex-1 text-[13px] tracking-wide ${oswald.className} text-light-text-primary dark:text-dark-text-primary font-heading font-semibold`}
                >
                  Select comparison
                </p>
                <InputBar
                  value={searchQuery}
                  placeholder="Search for players"
                  inputClassName="w-51 h-9 rounded-full bg-light-background-main dark:bg-white/5 text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted placeholder:text-[12px] pl-12 border border-light-ui-border dark:border-white/30 text-[14px]"
                  onValueChange={(value) => {
                    setSearchQuery(value);
                    handleSearch(value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row gap-3 overflow-x-auto pb-4 flex-nowrap">
              {searchQuery ? (
                <Compares compareList={results} categoryType="history" />
              ) : (
                <Compares
                  compareList={topSearchComparisons}
                  categoryType="history"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-light-background-card dark:bg-white/10 border border-light-ui-border dark:border-white/20 text-light-text-secondary dark:text-dark-text-primary hover:bg-slate-200 dark:hover:bg-white/20 transition"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition">
              Post
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

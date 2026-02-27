"use client"

import PageTitle from "@/components/page-title";
import HomeTitleSection from "@/components/section-title";
import Compares from "@/components/top-compare-cards";
import { PlayerType } from "@/app/types/players";

import { totalComparedPlayers } from "@/app/page";
import { players } from "@/app/data/players";

import { getTotalComparisons } from "@/app/utils/playerFilters";
import SearchBar from "@/components/search-bar";
import { oswald } from "@/app/fonts";

import { useState } from "react";
import { getSearchedPlayers } from "@/app/utils/playerFilters";
import { foundComparisons } from "@/app/utils/playerFilters";

import { InputBar } from "@/components/search-bar";

export default function AddPost() {

  const [isSearch, setIsSearch] = useState(false);
  const [results, setResults] = useState<Array<Array<PlayerType>>>([])

  const [searchQuery, setSearchQuery] = useState<string>("")

  function handleSearch(query: string) {
    const compared = getSearchedPlayers(players, query);
    const fetchedComparisons = foundComparisons(totalComparedPlayers, compared)

    setResults(fetchedComparisons)
  }
  const allComparisons = getTotalComparisons(players);
  const topSearchComparisons: Array<Array<PlayerType>> = [];

  const topComparisonsType = "topComparisons";
  const topComparisonsTitle = "Top Comparisons";

  for (let i = 0; i < 5; i++) {
    let randomNum = Math.floor(Math.random() * allComparisons.length);
    topSearchComparisons.push(allComparisons[randomNum]);
  }

  return (
    <main className="flex flex-col gap-6 px-4 min-h-[calc(100vh-5.05rem)]">
      <PageTitle title="Add a Post" />

      <div className="flex flex-col min-h-[calc(100vh-12rem)]">
        <div className="flex flex-col gap-3 flex-1">
          <textarea placeholder="Write your post here..." className="w-full min-h-85 p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
        </div> 

        <div className="relative gap-3 flex flex-col justify-end">
          <div className="flex flex-col gap-3 bg-white/5 shadow-sm backdrop-blur border border-white/20 rounded-lg py-3 px-3 w-full">
            <div className="flex gap-3">
              <div className="flex items-center w-full">
                
                <p className={`flex flex-1 text-[13px] tracking-wide ${oswald.className} text-white font-heading font-semibold`}>Select comparison</p>
                <InputBar
                    value={searchQuery}
                    placeholder="Search for players"
                    inputClassName="w-51 h-9 rounded-full bg-white/5 text-white placeholder:text-white/40 placeholder:text-[12px] pl-12 border border-white/30 text-[14px]"
                    onValueChange={(value) => {
                      setSearchQuery(value);
                      handleSearch(value);
                    }}
                  />
              </div>
            </div>
            <div className="flex flex-row gap-3 overflow-x-auto pb-4 flex-nowrap">
              <Compares compareList={(!results.length) ? totalComparedPlayers.slice(0, 5) : results} categoryType="topComaparisons" />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition">
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition">
              Post
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
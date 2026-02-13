"use client"

import { getTotalComparisons } from "../utils/playerFilters";
import { computeLegends } from "../utils/playerFilters";

import { playerStats } from "../data/playerStats";

import { oswald } from "../fonts"
import ComparisonCard from "../components/comparison-card";
import { getLegends, getHotProspects } from "../utils/playerFilters";

import { players } from "../data/players";
import Compares from "../components/compares";
import { useSearchParams } from "next/navigation";
import { PlayerType } from "../types/players";

import { ComparesCard } from "../components/compares"


export default function ViewComparison () {  

  const searchParams = useSearchParams();
  const fieldType = searchParams.get("fieldType");
  const title = searchParams.get("title")
  let playersInField : PlayerType[][] = [];

  // const allComparisons = getTotalComparisons();

  switch (fieldType) {
    case "legends":
      playersInField = getLegends();
      break;
    case "hotProspects":
      playersInField = getHotProspects();
      break
    default:
      playersInField = getTotalComparisons(players)
      break
  }
  return (
    <main className="px-3 pt-5 pb-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-start items-center gap-4 text-white border-b border-white/70 pb-6">
          <img
            src="/images/go-back-light.png"
            alt="go back"
            className="h-8 w-8 object-cover cursor-pointer"
          />
          <p className={`text-xl ${oswald.className} font-semibold`}>
            {title}
          </p>
        </div>
        <div className="flex flex-col gap-4 px-4">
          {playersInField.map((pair) => (
            (fieldType === "topComp") ? <ComparesCard leftPlayer={pair[0]} rightPlayer={pair[1]} /> : <ComparisonCard leftPlayer={pair[0]} rightPlayer={pair[1]} />
            // <ComparisonCard leftPlayer={pair[0]} rightPlayer={pair[1]} />
            // <ComparesCard leftPlayer={pair[0]} rightPlayer={pair[1]}/>
          ))}
        </div>
      </div>
    </main>
  )
}
"use client";

import { oswald } from "../fonts";
import ComparisonCard from "../components/comparison-card";
import {
  getLegends,
  getHotProspects,
  getTotalComparisons,
} from "../utils/playerFilters";

import { players } from "../data/players";
import { useSearchParams } from "next/navigation";
import { PlayerType } from "../types/players";

import { ComparesCard } from "../components/top-compare-cards";
import PageTitle from "../components/page-title";

export default function ViewComparison() {
  const searchParams = useSearchParams();
  const fieldType = searchParams.get("fieldType");
  const title = searchParams.get("title");
  let playersInField: PlayerType[][] = [];

  switch (fieldType) {
    case "legends":
      playersInField = getLegends();
      break;
    case "hotProspects":
      playersInField = getHotProspects();
      break;
    default:
      playersInField = getTotalComparisons(players);
      break;
  }
  return (
    <main className="px-3 pt-5 pb-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-start items-center gap-4 text-white border-b border-white/70 pb-6">
          <PageTitle title={title} />
        </div>
        <div className="flex flex-col gap-4 px-4">
          {playersInField.map((pair) =>
            fieldType === "topComp" ? (
              <ComparesCard leftPlayer={pair[0]} rightPlayer={pair[1]} />
            ) : (
              <ComparisonCard leftPlayer={pair[0]} rightPlayer={pair[1]} />
            ),
          )}
        </div>
      </div>
    </main>
  );
}

"use client";

import { oswald } from "../fonts";
import ComparisonCard from "../../components/comparison-card";
import {
  getLegends,
  getHotProspects,
  getTotalComparisons,
} from "../utils/playerFilters";

import { players } from "../data/players";
import { useSearchParams } from "next/navigation";
import { PlayerType } from "../types/players";

import { ComparesCard } from "../../components/top-compare-cards";
import PageTitle from "../../components/page-title";

export type categoryType = keyof (typeof titles);

const titles  =  {
  legends: "Legends",
  hotProspects: "Hot Prospects",
  topComparisons: "Top Comparisons"
} as const;

const ViewComparison = async ({params} : {params: Promise<{ 
category : categoryType}>}) => {
  const category: categoryType = (await params).category

  let playersInField: PlayerType[][] = [];

  switch (category) {
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
        <PageTitle title={titles[category]} />
        <div className="flex flex-col gap-4 px-4">
          {playersInField.map((pair) =>
            category === "topComparisons" ? (
              <ComparesCard leftPlayer={pair[0]} rightPlayer={pair[1]} categoryType={category}/>
            ) : (
              <ComparisonCard leftPlayer={pair[0]} rightPlayer={pair[1]} categoryType={category}/>
            ),
          )}
        </div>
      </div>
    </main>
  );
}

export default ViewComparison

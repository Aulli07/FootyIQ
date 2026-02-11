import { getTotalComparisons } from "../utils/playerFilters";
import { computeLegends } from "../utils/playerFilters";

import { playerStats } from "../data/playerStats";

import { oswald } from "../fonts"
import ComparisonCard from "../components/comparison-card";

export default function ViewComparison () {  
  const legendsList = computeLegends(playerStats);
  const legendsComparisons = getTotalComparisons(legendsList);

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
            Legends
          </p>
        </div>
        <div className="flex flex-col gap-4 px-4">
          {legendsComparisons.map((legendPair) => (
            <ComparisonCard leftPlayer={legendPair[0]} rightPlayer={legendPair[1]} />
          ))}
        </div>
      </div>
    </main>
  )
}
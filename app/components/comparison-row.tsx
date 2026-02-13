
import { oswald } from "../fonts";

import { PlayerType } from "../types/players";
import ComparisonCard from "./comparison-card";


type ComparisonProps<T extends PlayerType> = {
  playersData: T[][];
  title?: string;
};

const Comparison = <T extends PlayerType>({
  playersData,
  title,
}: ComparisonProps<T>) => {

  return (
    <div className="px-5 py-2 flex flex-col gap-3">
      <div className="text-white/80 flex items-center gap-2">
        <p className={`font-heading text-lg tracking-wide text-white ${oswald.className}`}>{title}</p>
      </div>
      <div className="flex flex-row gap-3 overflow-x-auto pb-4 flex-nowrap">
        {playersData.map((playerPair) => {
          const leftPlayer = playerPair[0];
          const rightPlayer = playerPair[1];

          return (
            <ComparisonCard leftPlayer={leftPlayer} rightPlayer={rightPlayer} />
          )
        })}
      </div>
    </div>
  );
};

export default Comparison;

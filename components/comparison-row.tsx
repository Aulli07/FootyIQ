import { oswald } from "../app/fonts";

import { PlayerType } from "../app/types/players";
import ComparisonCard from "./comparison-card";

import HomeTitleSection from "./section-title";

type ComparisonProps<T extends PlayerType> = {
  playersData: T[][];
  title: string;
  categoryType: string | null
};

const Comparison = <T extends PlayerType>({
  playersData,
  title,
  categoryType
}: ComparisonProps<T>) => {
  return (
    <div className="px-5 py-2 flex flex-col gap-3">      <HomeTitleSection title={title} />
      <div className="flex flex-row gap-3 overflow-x-auto pb-4 flex-nowrap">
        {playersData.map((playerPair) => {
          const leftPlayer = playerPair[0];
          const rightPlayer = playerPair[1];

          return (
            <ComparisonCard leftPlayer={leftPlayer} rightPlayer={rightPlayer} categoryType={categoryType}/>
          );
        })}
      </div>
    </div>
  );
};

export default Comparison;

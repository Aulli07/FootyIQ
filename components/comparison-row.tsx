import { PlayerType } from "../app/types/players";
import ComparisonCard from "./comparison-card";

import HomeTitleSection from "./section-title";

type ComparisonCardData = [PlayerType, PlayerType, string?, string?];

type ComparisonProps = {
  playersData: ComparisonCardData[];
  title: string;
  categoryType: string | null;
};

const Comparison = ({
  playersData,
  title,
  categoryType,
}: ComparisonProps) => {
  return (
    <div className="py-2 flex flex-col gap-3">
      <HomeTitleSection title={title} />
      <div className="flex flex-row gap-3 overflow-x-auto pb-4 flex-nowrap">
        {playersData.map((playerPair, index) => {
          const leftPlayer = playerPair[0];
          const rightPlayer = playerPair[1];
          const leftPlayerSeasonOrCompetition = playerPair[2];
          const rightPlayerSeasonOrCompetition = playerPair[3];

          return (
            <ComparisonCard
              key={`${leftPlayer.id}-${rightPlayer.id}-${index}`}
              leftPlayer={leftPlayer}
              rightPlayer={rightPlayer}
              categoryType={categoryType}
              leftPlayerSeasonOrCompetition={leftPlayerSeasonOrCompetition}
              rightPlayerSeasonOrCompetition={rightPlayerSeasonOrCompetition}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comparison;

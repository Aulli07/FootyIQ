import { PlayerType } from "../types/players";
import TitleSection from "./page-title-section";
import VotesBar from "./comparison-votes-bar";

export default function ComparisonVotesSection({
  leftPlayer,
  rightPlayer,
}: {
  leftPlayer: PlayerType | null;
  rightPlayer: PlayerType | null;
}) {
  return (
    <div className="flex flex-col gap-3 px-4 mt-3 ">
      <TitleSection title="User Votes" />
      <VotesBar players={[leftPlayer, rightPlayer]} />
    </div>
  );
}

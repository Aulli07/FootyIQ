import TitleSection from "@/shared/components/page-section-title";
import VotesBar from "./comparison-votes-bar";

import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";

export default function ComparisonVotesSection({
  leftPlayerId,
  rightPlayerId,
}: {
  leftPlayerId: string | null;
  rightPlayerId: string | null;
}) {
  
  if (!leftPlayerId || !rightPlayerId) {
    return null;
  }

  const leftPlayer = getCanonicalPlayerById(leftPlayerId);
  const rightPlayer = getCanonicalPlayerById(rightPlayerId);

  return (
    <div className="flex flex-col gap-3 px-4 mt-7 ">
      <TitleSection title="User Votes" />
      <VotesBar players={[leftPlayer, rightPlayer]} />
    </div>
  );
}

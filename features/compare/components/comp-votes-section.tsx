import TitleSection from "@/shared/components/page-section-title";
import VotesBar from "./comparison-votes-bar";

import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";
import HomeTitleSection from "@/shared/components/section-title";

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

  if (!leftPlayer || !rightPlayer) return null;

  return (
    <div className="flex flex-col gap-4 mt-8">
      <HomeTitleSection title="User Votes" />
      <VotesBar leftPlayer={leftPlayer} rightPlayer={rightPlayer} />
    </div>
  );
}

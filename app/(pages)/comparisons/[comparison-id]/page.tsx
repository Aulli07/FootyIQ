"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { poppins } from "@/app/font-icons/fonts";
import { useRef, useState } from "react";

import PageTitle from "@/shared/components/page-title";
import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";

import ShowFullStat from "@/features/compare/components/show-stat";
import ComparisonVotesSection from "@/features/compare/components/comp-votes-section";
import ComparisonPostsSection from "@/features/compare/components/comp-posts-section";
import ComparisonShareSection from "@/features/compare/components/comp-share-section";
import { getComparisonById } from "@/features/compare/selectors/get-comparison-by-id";
import { saveComparison } from "@/features/compare/services/save-compare-comparison";



export default function ViewComparisonPage() {
  const params = useParams<{ "comparison-id": string }>();
  const comparisonId = params["comparison-id"];

  const comparison = comparisonId ? getComparisonById(comparisonId) : null;

  const [, setCurrentComparisonId] = useState<string | null>(null);
  const lastComparisonKeyRef = useRef<string | null>(null);

  if (!comparison) {
    return <div className="p-4">Comparison not found</div>;
  }

  const fullPath = `/comparisons/${comparisonId}`;

  saveComparison({
    selectedPlayers: [comparison.playerA, comparison.playerB],
    selectedSeasonLabels: [comparison.contextA, comparison.contextB],
    setCurrentComparisonId,
    lastComparisonKeyRef,
  });

  return (
    <main className="px-3 pb-5 text-light-text-primary dark:text-dark-text-primary">
      <div className="flex flex-col gap-3">
        <PageTitle
          title={`${comparison.playerA.toUpperCase()} & ${comparison.playerB.toUpperCase()} COMPARISON`}
        />
        <div className="flex flex-col gap-4 mt-6">
          <div className="grid grid-cols-2 gap-3 px-2">
            <FixedFieldBox
              playerId={comparison.playerA}
              season={comparison.contextA}
            />
            <FixedFieldBox
              playerId={comparison.playerB}
              season={comparison.contextB}
            />
          </div>

          <div className="px-3 pt-3">
            <ShowFullStat
              playerSet={[comparison.playerA, comparison.playerB]}
              seasonLabels={[comparison.contextA, comparison.contextB]}
            />
          </div>

          <ComparisonShareSection comparisonId={comparisonId} />

          <ComparisonVotesSection
            leftPlayerId={comparison.playerA}
            rightPlayerId={comparison.playerB}
          />

          <ComparisonPostsSection
            leftPlayerId={comparison.playerA}
            rightPlayerId={comparison.playerB}
          />
        </div>
      </div>
    </main>
  );
}

function FixedFieldBox({
  playerId,
  season,
}: {
  playerId: string;
  season: string;
}) {
  const player = getCanonicalPlayerById(playerId);

  if (!player) {
    return <div className="p-4">Player not found</div>;
  }

  return (
    <div
      className={`relative z-0 min-h-58 flex flex-col justify-center items-center gap-3 rounded-lg px-2 border border-light-ui-border bg-light-background-card/80 dark:border-white/30 dark:bg-black/20 ${poppins.className} shadow-md shadow-slate-300/35 dark:shadow-lg dark:shadow-black/20 backdrop-blur`}
    >
      <div className="relative flex flex-col justify-center items-center">
        <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-emerald-500/35 dark:ring-emerald-400/30 flex justify-center items-center bg-light-background-main dark:bg-black/20">
          <Image
            src={player.imageUrl ?? "/default/avatar.jpg"}
            alt={player.id}
            sizes="80px"
            fill
            className="object-cover relative"
          />
        </div>
        <p
          className={`flex justify-center items-center ${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-secondary mt-3`}
        >
          {player.fullName}
        </p>
      </div>
      <div
        className={`w-full bg-light-background-main dark:bg-white/5 border border-light-ui-border dark:border-white/15 rounded-md px-3 py-2 text-left flex justify-center items-center ${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-primary`}
      >
        <span className="truncate pr-2">{season.toUpperCase()}</span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
  ComparisonCombinedType,
  ComparisonType,
} from "@/features/compare/types/comparison-main-type";
import TopComparisonCard from "@/features/compare/components/top-comparison-card";
import { buildHydratedComparisonStore } from "@/features/compare/engine/comparison-store";

import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";
import PageTitle from "@/shared/components/page-title";
import { poppins } from "@/app/font-icons/fonts";
import { useComparisonAnalytics } from "@/providers/providers";

import {
  getAgeOfPlayer,
  getClubNameOfPlayer,
  getHeightOfPlayer,
  getNationalityOfPlayer,
  getPositionOfPlayer,
  getPreferredFootOfPlayer,
} from "@/features/players/selectors/stat-getters";
import { manageAnalyticsOfPlayersInStorage } from "@/features/players/services/player-search-analytics";

import { getPostsInDiscussion } from "@/features/posts/selectors/get-post-details-by-id";

import { PostType } from "@/features/posts/types/post";
import { PostDisplay } from "@/features/posts/components/post-display";

export default function PlayerProfilePage() {
  const params = useParams();
  const id = params["player-id"] as string;
  const lastTrackedPlayerId = useRef<string | null>(null);
  const { comparisonAnalytics } = useComparisonAnalytics();

  useEffect(() => {
    if (id && lastTrackedPlayerId.current !== id) {
      manageAnalyticsOfPlayersInStorage(id);
      lastTrackedPlayerId.current = id;
    }
  }, [id]);

  const player = getCanonicalPlayerById(id);

  if (!player) {
    return <span>Player not found</span>;
  }

  const detailItems = [
    { label: "Age", value: () => `${getAgeOfPlayer(player)} yrs` },
    { label: "Club", value: () => getClubNameOfPlayer(player) },
    { label: "Nationality", value: () => getNationalityOfPlayer(player) },
    { label: "Height", value: () => `${getHeightOfPlayer(player)}cm` },
    { label: "Position", value: () => getPositionOfPlayer(player) },
    { label: "Preferred Foot", value: () => getPreferredFootOfPlayer(player) },
  ];

  const playerComparisons = getPlayerComparisons(id, comparisonAnalytics);

  const fullPath = `/players/${player.id}`;
  const playerPostDiscussions = getPostsInDiscussion(player.id);

  return (
    <main className="flex flex-col px-3 pb-10 ">
      <PageTitle title={player.fullName.toUpperCase()} />

      <div className="flex flex-col px-4 mb-10 mt-4">
        <div className="flex flex-row items-center gap-3">
          <img
            src={player.imageUrl ?? "/images/default-avatar.png"}
            alt={player.fullName}
            style={{
              width: "6rem",
              height: "6rem",
              objectFit: "cover",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.1)",
              flexShrink: 0,
            }}
          />
          <div className="flex flex-col gap-4 flex-1 items-start">
            <p
              className={`text-xl font-black font-semibold ${poppins.className} text-light-text-primary dark:text-dark-text-primary`}
            >
              {player.fullName}
            </p>

            <div className="group flex flex-wrap items-center gap-3">
              <Link
                href={`/compare?playerA=${player.id}`}
                className={`w-max flex flex-row gap-2 border border-emerald-500/10 rounded-xl px-3 py-1 bg-light-background-card dark:border-white/10 dark:bg-white/5`}
              >
                <span
                  className={`font-bold text-sm ${poppins.className} text-emerald-500 dark:text-emerald-400`}
                >
                  COMPARE
                </span>
                <div className="relative opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-emerald-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div
          className="grid gap-3 mt-10 w-full"
          style={{
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            rowGap: "1.2rem",
          }}
        >
          {detailItems.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-3 justify-center items-center border border-light-ui-border rounded-xl px-4 py-4 bg-white dark:bg-white/5 dark:bg-dark-background-card/40 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all dark:border-white/5"
            >
              <p
                className={`text-[10px] text-center font-medium ${poppins.className} text-light-text-secondary dark:text-dark-text-secondary`}
              >
                {item.label}
              </p>
              <p
                className={`text-base font-semibold ${poppins.className} text-light-text-primary dark:text-dark-text-primary`}
              >
                {item.value()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section className="px-4 pb-3 gap-4 flex flex-col mt-8">
        <div className="flex items-center justify-between mb-2">
          <p
            className={`${poppins.className} text-lg font-bold text-light-text-primary dark:text-dark-text-primary uppercase tracking-wide`}
          >
            Popular Comparisons
          </p>
        </div>

        {playerComparisons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playerComparisons.map((comp, index) => (
              <TopComparisonCard
                key={comp.comparisonId}
                id={comp.comparisonId}
                comp={comp}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-light-ui-border dark:border-white/10 bg-light-background-card dark:bg-white/5 p-6 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            No comparisons found for this player yet.
          </div>
        )}
      </section>

      <section className="px-4 pb-3 gap-4 flex flex-col mt-8">
        <div className="flex items-center justify-between mb-2">
          <p
            className={`${poppins.className} text-lg font-bold text-light-text-primary dark:text-dark-text-primary uppercase tracking-wide`}
          >
            Popular Discussions
          </p>
        </div>

        {playerPostDiscussions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-light-ui-border dark:border-white/10 bg-light-background-card dark:bg-white/5 p-6 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            No posts found for this player yet. Be the first to start the
            discussion.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {playerPostDiscussions.slice(0, 3).map((post: PostType) => (
                <PostDisplay key={post.id} post={post} />
              ))}
            </div>
            {playerPostDiscussions.length > 3 && (
              <Link
                href={{ pathname: `${fullPath}/view-more` }}
                className="flex justify-end items-center"
              >
                <span
                  className={`${poppins.className} text-sm font-semibold border-b mt-2 text-light-text-secondary dark:text-dark-text-secondary`}
                >
                  View More Posts
                </span>
              </Link>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function getPlayerComparisons(
  playerId: string,
  comparisonAnalytics: Record<
    string,
    { viewCount: number; searchCount: number }
  >,
) {
  const hydratedComparisons = Object.values(
    buildHydratedComparisonStore(),
  ) as ComparisonType[];

  return hydratedComparisons
    .filter(
      (comparison) =>
        comparison.playerA === playerId || comparison.playerB === playerId,
    )
    .map(
      (comparison) =>
        ({
          ...comparison,
          viewCount:
            comparisonAnalytics[comparison.comparisonId]?.viewCount ?? 0,
          searchCount:
            comparisonAnalytics[comparison.comparisonId]?.searchCount ?? 0,
        }) as ComparisonCombinedType,
    )
    .sort(
      (comparisonA, comparisonB) =>
        (comparisonB?.viewCount ?? 0) - (comparisonA?.viewCount ?? 0),
    )
    .slice(0, 8);
}

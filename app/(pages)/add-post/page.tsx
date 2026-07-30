"use client";

import PageTitle from "@/shared/components/page-title";
import { useState, useRef, useEffect, SetStateAction, Dispatch, RefObject } from "react";

import { handleSearch } from "@/features/compare/utils/history-search-handler";
import { PlayerDisplayResults } from "@/features/search/components/search-results-display";

import { useOnClickOutside } from "@/features/compare/utils/click-outside";
import DropDownMain from "@/features/compare/components/dropdown-main";
import { handleSelect } from "@/features/compare/utils/dropdown-handler";
import { DropDownPropsType } from "@/shared/types/dropdown-props";
import { getPlayerSearchResults } from "@/features/search/engine/search-engine";
import { useSearchParams } from "next/navigation";
import { findComparisonFromHistory } from "@/features/compare/selectors/find-comparison";
import { ComparisonImageCard } from "@/features/compare/components/comp-image-card";
import {
  comparisonStatOptions,
  type ComparisonStatKey,
} from "@/features/players/types/comparison-stat-options";
import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";
import {
  getAgeOfPlayer,
  getAverageRatingOfPlayerBasedOnCareer,
  getAverageRatingOfPlayerBasedOnCompetitionAndSeason,
  getAverageRatingOfPlayerBasedOnSeason,
  getHeightOfPlayer,
  getStatValueBasedOnCareer,
  getStatValueBasedOnCompetitionAndSeason,
  getStatValueBasedOnSeason,
} from "@/features/players/selectors/stat-getters";
import type { ComparisonType } from "@/features/compare/types/comparison-main-type";
import type { Player } from "@/shared/types/stats-schema";
import { buildHashId, createPostKey } from "@/shared/utils/identity";
import { savePostFromUpload } from "@/features/posts/services/uploadPosts";




export default function AddPost() {

  const searchParams = useSearchParams();
  const comparisonId = searchParams.get("comparisonId");
  
  const [isOpen, setIsOpen] = useState(false);
  const prefilledComparison = comparisonId
    ? findComparisonFromHistory(comparisonId)
    : null;

  const [composerMode, setComposerMode] = useState<
    "comparison" | "poll" | null
  >(prefilledComparison ? "comparison" : null);

  const [comparisonSearchQuery, setComparisonSearchQuery] =
    useState<string>("");
  const [pollSearchQuery, setPollSearchQuery] = useState<string>("");

  const [selectedPollPlayers, setSelectedPollPlayers] = useState<Array<string>>(
    ["", ""],
  );

  const [selectedComparison, setSelectedComparison] = useState<string | null>(
    prefilledComparison ? prefilledComparison.comparisonId : null,
  );
  const [selectedComparisonStats, setSelectedComparisonStats] = useState<
    ComparisonStatKey[]
  >([]);
  const [appliedComparisonId, setAppliedComparisonId] = useState<string | null>(
    prefilledComparison ? prefilledComparison.comparisonId : null,
  );
  const [appliedComparisonStats, setAppliedComparisonStats] = useState<
    ComparisonStatKey[]
  >([]);

  const [currentPostId, setCurrentPostId] = useState<SetStateAction<string | null>>();
  const lastPostKeyRef = useRef<string | null>(null);

  const { menuRef } = useOnClickOutside(setIsOpen, isOpen);
  const myRef = useRef<HTMLTextAreaElement | null>(null);

  const selectedComparisonData = appliedComparisonId
    ? findComparisonFromHistory(appliedComparisonId)
    : null;


  const searchedDropdownResults = handleSearch(comparisonSearchQuery);
  const searchedPlayerResults = getPlayerSearchResults(pollSearchQuery);

  const comparisonPostStats = selectedComparisonData ? buildComparisonCardStats(selectedComparisonData, appliedComparisonStats) : undefined;

  const comparisonProps: DropDownPropsType = {
    type: "comparison",
    label: "Select Comparison",
    setSearchQuery: setComparisonSearchQuery,
    searchQuery: comparisonSearchQuery,
    searchedComparisons: searchedDropdownResults,
    setSelectedComparison: setSelectedComparison,
    selectedComparison: selectedComparison,
    comparisonStats: comparisonStatOptions,
    selectedComparisonStats: selectedComparisonStats,
    setSelectedComparisonStats: setSelectedComparisonStats,
    onApplyComparison: () => {
      if (!selectedComparison) {
        return;
      }

      setAppliedComparisonId(selectedComparison);
      setAppliedComparisonStats(selectedComparisonStats);
      setIsOpen(false);
    },
  };

  const [shouldUpload, setShouldUpload] = useState<boolean>(false);

  function handlePostUpload() {
    setShouldUpload(true);
  }

  useUploadPost(shouldUpload);

  function useUploadPost(shouldUpload: boolean) {    
    useEffect(() => {
      if (!shouldUpload) return;

      const postContent = myRef.current?.value
      if (!postContent) {
          return;
      }

      const normalizedPostContent = postContent.trim();
      const hasCompletedUpload = normalizedPostContent.length > 0;
      const compId = selectedComparisonData?.comparisonId;
      const postKey = createPostKey([
        normalizedPostContent,
        selectedComparisonData?.comparisonId ?? "",
        JSON.stringify(comparisonPostStats ?? {})
      ]);

      if (!hasCompletedUpload) {
        lastPostKeyRef.current = null;
        setCurrentPostId(null);
        return;
      }
  
      if (lastPostKeyRef.current === postKey) {
        return;
      }
  
      const currentPost = savePostFromUpload({
        postContent: normalizedPostContent,
        compId,
        compStats: comparisonPostStats,
        timestamp: Date.now(),
        authorId: "u-1",
      });
  
      setCurrentPostId(currentPost?.id ?? null);
      lastPostKeyRef.current = postKey;
    }, [shouldUpload]);
  }

  return (
    <main className="flex min-h-[calc(100vh-7rem)] flex-col px-4 py-4 text-light-text-primary dark:text-dark-text-primary">
      <div className="mx-auto flex w-full max-w-2xl flex-col">
        <PageTitle title="Create Post" />
      </div>

      <div className="mx-auto mt-4 flex w-full max-w-2xl flex-1 flex-col gap-3">
        <div className="flex min-h-0 flex-col mt-4 rounded-2xl border border-light-ui-border bg-white/70 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="flex min-h-0 flex-col gap-5 px-2 py-3">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full border border-black bg-gradient-to-br from-emerald-500 to-teal-500" />

              <div className="flex-1 min-h-0">
                <textarea
                  ref={myRef}
                  placeholder="What's happening?"
                  className="overflow-hidden min-h-30 auto w-full resize-none bg-transparent text-lg text-light-text-primary placeholder:text-light-text-muted focus:outline-none dark:text-dark-text-primary dark:placeholder:text-dark-text-muted"
                  onChange={() => {
                    const current = myRef.current;
                    if (current) {
                      current.style.height = "auto";
                      current.style.height = `${current.scrollHeight}px`;
                    }
                  }}
                />
              </div>
            </div>

            {composerMode === "comparison" && selectedComparisonData ? (
              <ComparisonImageCard
                comparisonId={selectedComparisonData.comparisonId}
                compStats={comparisonPostStats ?? undefined}
              />
            ) :
            null}

            {composerMode === "poll" &&
            selectedPollPlayers[0] &&
            selectedPollPlayers[1] ? (
              <div className="relative rounded-2xl border border-light-ui-border p-3 dark:border-white/10">
                <img
                  src="/images/swap-light-fill.png"
                  alt="no pic"
                  className="absolute -right-1 -top-3 h-7 w-7 object-cover"
                  onClick={() => {
                    setSelectedPollPlayers((prev) => {
                      const next = [...prev];
                      next[0] = "";
                      next[1] = "";
                      return next;
                    });
                  }}
                />
                <PollUISection
                  selectedPlayers={selectedPollPlayers}
                  setSelectedPollPlayers={setSelectedPollPlayers}
                />
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex gap-3">
            <div
              className="flex items-center justify-center rounded-xl border border-light-ui-border bg-light-background-card px-4 py-3 text-sm font-medium text-light-text-primary transition hover:bg-slate-100 dark:border-white/15 dark:bg-white/10 dark:text-dark-text-primary dark:hover:bg-white/15"
              onClick={() => {
                setSelectedPollPlayers(["", ""]);
                setPollSearchQuery("");
                setSelectedComparisonStats([]);
                setAppliedComparisonStats([]);
                setComposerMode("comparison");
                setIsOpen(true);
              }}
            >
              Select Comparison
            </div>
            {/* <div
              className="flex items-center justify-center rounded-xl border border-light-ui-border bg-light-background-card px-4 py-3 text-sm font-medium text-light-text-primary transition hover:bg-slate-100 dark:border-white/15 dark:bg-white/10 dark:text-dark-text-primary dark:hover:bg-white/15"
              onClick={() => {
                setSelectedComparison(null);
                setComparisonSearchQuery("");
                setComposerMode("poll");
                setIsOpen(true);
              }}
            >
              Make a poll
            </div> */}
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 dark:border-white/10">
          <button
            className="rounded-lg border border-light-ui-border bg-transparent px-8 py-3 text-sm text-light-text-secondary transition hover:bg-slate-100 dark:border-white/25 dark:text-dark-text-primary dark:hover:bg-white/10"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button className="rounded-lg bg-emerald-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-emerald-700" onClick={() => handlePostUpload()}>
            Post
          </button>
        </div>

        <div className="mt-auto"></div>
      </div>

      {typeof document !== "undefined" &&
        isOpen &&
        composerMode === "comparison" && (
          <DropDownMain
            menuRef={menuRef}
            props={comparisonProps}
            setIsOpen={setIsOpen}
            handleSelect={handleSelect}
          />
        )}
      {/* {typeof document !== "undefined" && isOpen && composerMode === "poll" && (
        <DropDownMain
          menuRef={menuRef}
          props={pollProps}
          setIsOpen={setIsOpen}
          handleSelect={handleSelect}
        />
      )} */}
    </main>
  );
}

function PollUISection({
  selectedPlayers,
  setSelectedPollPlayers,
}: {
  selectedPlayers: Array<string>;
  setSelectedPollPlayers: React.Dispatch<React.SetStateAction<Array<string>>>;
}) {
  const filteredPlayers = selectedPlayers.filter(Boolean);

  return (
    <div className="flex flex-col gap-4">
      {filteredPlayers.length > 0 && (
        <PlayerDisplayResults playerIds={filteredPlayers} />
      )}
    </div>
  );
}

function buildComparisonCardStats(
  comparison: ComparisonType,
  statKeys: ComparisonStatKey[],
) {

  const leftPlayer = getCanonicalPlayerById(comparison.playerA);
  const rightPlayer = getCanonicalPlayerById(comparison.playerB);

  return statKeys.reduce<Partial<Record<ComparisonStatKey, number[]>>>(
    (accumulator, statKey) => {
      const leftValue = resolveComparisonStatValue(
        leftPlayer,
        comparison.contextA,
        statKey,
      );
      const rightValue = resolveComparisonStatValue(
        rightPlayer,
        comparison.contextB,
        statKey,
      );

      accumulator[statKey] = [leftValue, rightValue];
      return accumulator;
    },
    {},
  );
}

function resolveComparisonStatValue(
  player: Player | null,
  context: string,
  statKey: ComparisonStatKey,
) {
  if (!player) {
    return 0;
  }

  if (statKey === "age") {
    return Number(getAgeOfPlayer(player)) || 0;
  }

  if (statKey === "height") {
    return Number(getHeightOfPlayer(player)) || 0;
  }

  if (statKey === "footyRating") {
    const rating = resolveRatingValue(player, context);
    return Number(rating) || 0;
  }

  const rawValue = resolveStatValue(player, context, statKey);
  return Number(rawValue) || 0;
}

function resolveRatingValue(player: Player, context: string) {
  const trimmedContext = context.trim().toLowerCase();

  if (trimmedContext === "career" || trimmedContext === "all-time") {
    return getAverageRatingOfPlayerBasedOnCareer(player);
  }

  if (context.trim().split(/\s+/).length >= 2) {
    return getAverageRatingOfPlayerBasedOnCompetitionAndSeason(player, context);
  }

  return getAverageRatingOfPlayerBasedOnSeason(player, context);
}

function resolveStatValue(
  player: Player,
  context: string,
  statKey: ComparisonStatKey,
) {
  const trimmedContext = context.trim().toLowerCase();

  if (trimmedContext === "career" || trimmedContext === "all-time") {
    return getStatValueBasedOnCareer(player, statKey);
  }

  if (context.trim().split(/\s+/).length >= 2) {
    return getStatValueBasedOnCompetitionAndSeason(player, context, statKey);
  }

  return getStatValueBasedOnSeason(player, context, statKey);
}

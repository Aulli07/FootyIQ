"use client";

import PageTitle from "@/shared/components/page-title";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { handleSearch } from "@/features/compare/utils/history-search-handler";
import { useOnClickOutside } from "@/features/compare/utils/click-outside";
import DropDownMain from "@/features/compare/components/dropdown-main";
import { handleSelect } from "@/features/compare/utils/dropdown-handler";
import { findComparisonFromHistory } from "@/features/compare/selectors/find-comparison";
import { ComparisonImageCard } from "@/features/compare/components/comp-image-card";

import { DropDownPropsType } from "@/shared/types/dropdown-props";

import { getPlayerSearchResults } from "@/features/search/engine/search-engine";

import {
  comparisonStatOptions,
  type ComparisonStatKey,
} from "@/features/players/types/comparison-stat-options";

import { PostInfoType } from "@/features/posts/types/post";
import { useUploadPost } from "@/features/posts/engine/handle-post-upload";
import { PostTextAreaUI } from "@/features/posts/ui/post-text-input";
import { buildComparisonCardStats } from "@/features/compare/utils/build-comp-post-stats";



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


  const { menuRef } = useOnClickOutside(setIsOpen, isOpen);
  const selectedComparisonData = appliedComparisonId
    ? findComparisonFromHistory(appliedComparisonId)
    : null;
  const searchedDropdownResults = handleSearch(comparisonSearchQuery);
  const searchedPlayerResults = getPlayerSearchResults(pollSearchQuery);

  const comparisonPostStats = selectedComparisonData
    ? buildComparisonCardStats(selectedComparisonData, appliedComparisonStats) : undefined;

    // Figure out with AI how to modularize this 
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
  const myPostRef = useRef<HTMLTextAreaElement | null>(null);
  const lastPostKeyRef = useRef<string | null>(null);

  const postUploadInfo: PostInfoType = {
    shouldUpload,
    setShouldUpload,
    selectedComparisonData,
    comparisonPostStats,
    myPostRef,
    lastPostKeyRef
  };

  function handlePostUpload() {
    postUploadInfo.setShouldUpload(true);
  }

  useUploadPost(postUploadInfo.shouldUpload, postUploadInfo);

  return (
    <main className="flex min-h-[calc(100vh-7rem)] flex-col px-4 py-4 text-light-text-primary dark:text-dark-text-primary">
      <div className="mx-auto flex w-full max-w-2xl flex-col">
        <PageTitle title="Create Post" />
      </div>

      <div className="mx-auto mt-4 flex w-full max-w-2xl flex-1 flex-col gap-3">
        <div className="flex min-h-0 flex-col mt-4 rounded-2xl border border-light-ui-border bg-white/70 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="flex min-h-0 flex-col gap-5 px-2 py-3">
            <PostTextAreaUI myPostRef={myPostRef} />

            {composerMode === "comparison" && selectedComparisonData ? (
              <ComparisonImageCard
                comparisonId={selectedComparisonData.comparisonId}
                compStats={comparisonPostStats ?? undefined}
              />
            ) : null}

            {/* For the Poll UI */}
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
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 dark:border-white/10">
          <button
            className="rounded-lg border border-light-ui-border bg-transparent px-8 py-3 text-sm text-light-text-secondary transition hover:bg-slate-100 dark:border-white/25 dark:text-dark-text-primary dark:hover:bg-white/10"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-emerald-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
            onClick={() => handlePostUpload()}
          >
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
    </main>
  );
}
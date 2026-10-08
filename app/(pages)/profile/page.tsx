"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

import { buildHydratedPostsStore } from "@/features/posts/data/new/posts-store";
import { buildPersonalPosts } from "@/features/posts/selectors/build-personal-posts";
import { PostDisplay } from "@/features/posts/components/post-display";
import SearchBar from "@/features/search/components/search-bar";

import { ComparisonType } from "@/features/compare/types/comparison-main-type";
import { getStoredComparisons } from "@/features/compare/services/comparison-storage";
import { handleSearch } from "@/features/compare/utils/history-search-handler";
import TopComparisonCard from "@/features/compare/components/top-comparison-card";

import { getProfileUserByUsername } from "@/features/users/selectors/profile-meta";

import { Profile } from "@/features/users/components/profile";

const MAIN_PROFILE_USERNAME = "alwell";

export default function FullProfile() {
  const user = getProfileUserByUsername(MAIN_PROFILE_USERNAME);
  return <Profile userId={user?.id || ""} />;
}

"use client";

import { getFollowersByUserId } from "./get-followers-by-user-id";
import { getFollowingByUserId } from "./get-following-by-user-id";

export type UserFollowCountsType = {
  followersCount: number;
  followingCount: number;
};

export function getUserFollowCountsById(userId: string): UserFollowCountsType {
  return {
    followersCount: getFollowersByUserId(userId).length,
    followingCount: getFollowingByUserId(userId).length,
  };
}

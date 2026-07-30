import { buildHydratedUsersStore } from "@/features/users/data/users-store";
import { buildHydratedFollowersStore } from "@/features/users/data/followers-storage";
import { buildHydratedFollowingStore } from "@/features/users/data/following-storage";
import { UserType } from "@/features/users/types/users";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function getProfileUserById(userId?: string | null): UserType | null {
  if (!userId) {
    return null;
  }

  const usersStore = buildHydratedUsersStore();
  return usersStore[userId] ?? null;
}

export function getProfileUserByUsername(
  username?: string | null,
): UserType | null {
  if (!username) {
    return null;
  }

  return (
    Object.values(buildHydratedUsersStore()).find(
      (user) => user.username === username,
    ) ?? null
  );
}

export function getProfileFollowCounts(userId?: string | null) {
  const { followerIds } = getProfileFollowersAndFollowing(userId);
  const { followingIds } = getProfileFollowersAndFollowing(userId);

  return {
    followerCount: followerIds.length,
    followingCount: followingIds.length,
  };
}

export function getProfileFollowUsers(
  userId?: string | null,
  followLabel: "followers" | "following" = "followers",
): UserType[] {
  const usersStore = buildHydratedUsersStore();
  const { followerIds, followingIds } = getProfileFollowersAndFollowing(userId);
  const ids = followLabel === "followers" ? followerIds : followingIds;

  return ids
    .map((id) => usersStore[id])
    .filter((user): user is UserType => Boolean(user));
}

export function getProfileJoinedLabel(dateJoined?: string | null) {
  if (!dateJoined) {
    return "Joined unknown";
  }

  const dateObj = new Date(dateJoined);

  if (Number.isNaN(dateObj.getTime())) {
    return "Joined unknown";
  }

  const month = MONTHS[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `Joined ${month} ${year}`;
}

function getProfileFollowersAndFollowing(userId?: string | null) {
  const followersStore = buildHydratedFollowersStore();
  const followingStore = buildHydratedFollowingStore();

  const followerIds = userId ? (followersStore[userId] ?? []) : [];
  const followingIds = userId ? (followingStore[userId] ?? []) : [];

  return { followerIds, followingIds };
}

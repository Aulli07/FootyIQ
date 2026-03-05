"use client";

import { users } from "@/app/data/users";
import { Profile } from "../page";
import { useParams, useSearchParams } from "next/navigation";
import { getFollowers } from "@/app/utils/playerFilters";

import Link from "next/link";
import Image from "next/image";
import { poppins } from "@/app/fonts";
import PageTitle from "@/components/page-title";

export default function FollowInfo() {
  const params = useParams<{ followInfo: string }>();
  const followLabel = params.followInfo;

  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  function getFollowInformation(userId: string | null) {
    if (followLabel === "following") {
      const getFollowingUsers = (userId: string | null) => {
        const followingIds: Array<string> = getFollowers(userId).followingIds;

        return users.filter((u) => followingIds.includes(u.id));
      };

      return getFollowingUsers(userId);
    } else {
      const getFollowerUsers = (userId: string | null) => {
        const followerIds: Array<string> = getFollowers(userId).followerIds;

        return users.filter((u) => followerIds.includes(u.id));
      };

      return getFollowerUsers(userId);
    }
  }

  const retrievedFollowUsers = getFollowInformation(userId);

  return (
    <main className="px-3 py-4 gap-3 flex flex-col text-light-text-primary dark:text-dark-text-primary">
      <div className="flex flex-col gap-5">
        <PageTitle
          title={
            followLabel.toUpperCase() + " (" + retrievedFollowUsers.length + ")"
          }
        />
      </div>

      <div className="flex flex-col gap-3">
        {retrievedFollowUsers.map((friend) => (
          <Link
            href={{ pathname: `/profile/${followLabel}/${friend.username}` }}
            key={friend.id}
          >
            <article
              key={friend.id}
              className="w-full rounded-2xl border border-light-ui-border dark:border-white/20 bg-light-background-card dark:bg-white/5 backdrop-blur px-4 py-3 flex items-center justify-between shadow-sm shadow-slate-300/35 dark:shadow-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-emerald-500/35 shrink-0">
                  <Image
                    src={friend.avatarUrl}
                    alt={friend.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className={`${poppins.className} text-sm sm:text-base font-semibold text-light-text-primary dark:text-dark-text-primary truncate`}
                  >
                    {friend.name}
                  </p>
                  <p
                    className={`${poppins.className} text-xs sm:text-sm font-medium text-light-text-muted dark:text-dark-text-muted truncate`}
                  >
                    @{friend.username}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label={`Open options for ${friend.name}`}
                className="h-9 w-9 rounded-full border border-light-ui-border dark:border-white/20 bg-light-background-main dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center text-light-text-secondary dark:text-white/85 text-xl leading-none"
              >
                ⋯
              </button>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}

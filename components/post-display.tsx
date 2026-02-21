"use client";

import Image from "next/image";
import Link from "next/link";
import { poppins } from "../app/fonts";
import { TalkType } from "../app/types/talks";

import { users } from "../app/data/users";

import { timeAgo } from "@/app/utils/playerFilters";

export function PostDisplay({ talk }: { talk: TalkType }) {
  const user = users.find(user => user.id === talk.authorId);

  return (
    <Link
      href={`/talks/${talk.id}`}
      className="flex justify-start items-start gap-4 w-full relative p-5 border border-white/20 rounded-lg bg-white/4 shadow-lg backdrop-blur"
    >
      <div>
        <div className="relative h-12 w-12 object-cover">
          <Image
            src={user?.avatarUrl ?? "/images/default-avatar.png"}
            alt={user?.name ?? "User Avatar"}
            sizes="32px"
            fill
            className="object-cover rounded-full border border-emerald-700 shadow-md"
          />
        </div>
      </div>
      <div className="flex flex-col ml-1 gap-2">
        <div className="flex items-center h-4">
          <p
            className={`text-md text-white ${poppins.className} tracking-wide font-semibold`}
          >
            {user?.name}
          </p>
          <span className="ml-2 px-1.5 py-0.5 text-xs text-white/70 bg-emerald-700 rounded">
            {timeAgo(talk?.createdAt)}
          </span>
        </div>
        <p
          className={`text-sm text-white/80 ${poppins.className} tracking-wide`}
        >
          {talk.content}
        </p>
        <div className="flex justify-between items-center w-[90%] mt-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/like-light.png"
              alt="Like"
              width={20}
              height={20}
              className="object-cover"
            />
            <span className={`text-sm text-white/70 ${poppins.className}`}>
              {talk.stats.likes}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/comment-light.png"
              alt="Comment"
              width={20}
              height={20}
              className="object-cover"
            />
            <span className={`text-sm text-white/70 ${poppins.className}`}>
              {talk.stats.comments}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/view-light.png"
              alt="View"
              width={20}
              height={20}
              className="object-cover"
            />
            <span className={`text-sm text-white/70 ${poppins.className}`}>
              {talk.stats.views}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

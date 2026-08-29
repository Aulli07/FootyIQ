"use client";

import Image from "next/image";
import Link from "next/link";
import { poppins } from "@/app/font-icons/fonts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { PostTimeDesign } from "@/app/(post-view)/posts/[view-particular-post]/page";
import {
  getPostCountsById,
  getPostAttachmentById,
} from "../selectors/get-post-details-by-id";
import { getUserById } from "@/features/users/selectors/get-user-by-id";

import { ComparisonImageCard } from "@/features/compare/components/comp-image-card";

import { PostType } from "@/features/posts/types/post";

export function PostDisplay({ post }: { post: PostType }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [postAttachment, setPostAttachment] = useState<ReturnType<
    typeof getPostAttachmentById
  > | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setPostAttachment(getPostAttachmentById(post.attachmentIds));
  }, [post.id]);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const user = getUserById(post.authorId);
  const counts = getPostCountsById(post.id);

  const hasAttachment =
    postAttachment?.comparisonId && postAttachment.comparisonId.length > 0;

  return (
    <Link
      href={`/posts/${post.id}`}
      className="flex justify-start items-start gap-3 w-full relative py-1 pb-5 border-b backdrop-blur dark:border-white/15"
    >
      <div>
        <div className="relative h-13 w-13 object-cover">
          <Image
            src={user?.avatarUrl ?? "/images/default-avatar.png"}
            alt={user?.name ?? "User Avatar"}
            sizes="32px"
            fill
            className="object-cover rounded-full border border-emerald-700 shadow-md"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center h-6 gap-5">
          <p
            className={`text-md text-light-text-primary dark:text-dark-text-primary ${poppins.className} tracking-wide font-semibold`}
          >
            {user?.name}
          </p>
          <PostTimeDesign post={post} />
        </div>
        <p
          className={`text-sm text-light-text-secondary dark:text-dark-text-secondary ${poppins.className} tracking-wide`}
        >
          {post.content}
        </p>
        <div className="flex flex-col gap-3">
          {hasAttachment && (
            <ComparisonImageCard
              key={postAttachment.id}
              comparisonId={postAttachment.comparisonId}
              compStats={postAttachment.stats}
            />
          )}
        </div>
        <div className="flex justify-between items-center w-[90%] mt-3">
          <div className="flex items-center gap-2">
            <Image
              src={
                mounted
                  ? isDark
                    ? "/images/like-light.png"
                    : "/images/like-dark.png"
                  : "/images/like-dark.png"
              }
              alt="Like"
              width={20}
              height={20}
              className="object-cover"
            />
            <span
              className={`text-sm text-light-text-muted dark:text-dark-text-muted ${poppins.className}`}
            >
              {counts.likeCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={
                mounted
                  ? isDark
                    ? "/images/comment-light.png"
                    : "/images/comment-dark.png"
                  : "/images/comment-dark.png"
              }
              alt="Comment"
              width={20}
              height={20}
              className="object-cover"
            />
            <span
              className={`text-sm text-light-text-muted dark:text-dark-text-muted ${poppins.className}`}
            >
              {counts.commentCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={
                mounted
                  ? isDark
                    ? "/images/view-light.png"
                    : "/images/view-dark.png"
                  : "/images/view-dark.png"
              }
              alt="View"
              width={20}
              height={20}
              className="object-cover"
            />
            <span
              className={`text-sm text-light-text-muted dark:text-dark-text-muted ${poppins.className}`}
            >
              {counts.viewCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

"use client";

import Image from "next/image";
import { AllPosts } from "../../data/posts";
import { users } from "../../data/users";

import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { oswald, poppins } from "../../fonts";
import PageTitle from "../../../components/page-title";

import { timeAgo } from "@/app/utils/playerFilters";
import { PostType } from "@/app/types/posts";

import Stats from "@/app/utils/post-stats";

import Comments from "../../data/post-stats/comments";

export function PostTimeDesign({ post }: { post: PostType }) {
  return (
    <div className="flex border border-emerald-400/20 bg-emerald-500/10 rounded-full px-3 h-6 items-center gap-2">
      <p
        className={`text-xs text-light-text-secondary dark:text-dark-text-secondary ${poppins.className}`}
      >
        {timeAgo(post.createdAt)}
      </p>
    </div>
  );
}

export default function ParticularPost() {
  const params = useParams<{ "view-particular-post": string; posts: string }>();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const postId = params["view-particular-post"];

  const post = AllPosts.find((item) => item.id === postId);
  const user = users.find((item) => item.id === post?.authorId);

  const commentsData = Comments.filter(
    (comment) => comment.postId === post?.id,
  );

  if (!post) {
    return (
      <main className="px-4 py-6 min-h-[80vh] text-light-text-primary dark:text-dark-text-primary">
        <div className="max-w-3xl mx-auto border border-light-ui-border dark:border-white/20 rounded-2xl bg-light-background-card dark:bg-white/5 p-6">
          <p
            className={`${poppins.className} text-light-text-secondary dark:text-dark-text-secondary text-sm`}
          >
            Post not found.
          </p>
        </div>
      </main>
    );
  }

  const statChips = [
    { label: "likes", value: Stats.likesByPost[post.id] ?? 0 },
    { label: "comments", value: Stats.commentsByPost[post.id] ?? 0 },
    { label: "views", value: Stats.viewsByPost[post.id] ?? 0 },
  ];

  const quickActions = [
    {
      alt: "Comment",
      src:
        mounted && !isDark
          ? "/images/comment-dark.png"
          : "/images/comment-light.png",
    },
    {
      alt: "Like",
      src:
        mounted && !isDark ? "/images/like-dark.png" : "/images/like-light.png",
    },
    {
      alt: "View",
      src:
        mounted && !isDark ? "/images/view-dark.png" : "/images/view-light.png",
    },
  ];

  return (
    <main className="px-4 md:px-6 text-light-text-primary dark:text-dark-text-primary overflow-y-auto">
      <div className="max-w-3xl mx-auto flex flex-col h-full gap-1">
        <PageTitle title="POST" />

        <div className="pt-4 shrink-0 px-3">
          <article className="w-full border border-light-ui-border dark:border-white/20 rounded-2xl bg-light-background-card dark:bg-white/5 backdrop-blur p-5 md:p-7 shadow-md shadow-slate-300/35 dark:shadow-[0_8px_28px_rgba(0,0,0,0.32)] flex flex-col h-auto space-y-5">
            <div className="flex justify-start items-start gap-4">
              <div className="relative h-14 w-14">
                <Image
                  src={user?.avatarUrl ?? "/images/default-avatar.png"}
                  alt={user?.name ?? "User Avatar"}
                  fill
                  sizes="56px"
                  className="object-cover rounded-full border border-emerald-700 shadow-md"
                />
              </div>

              <div className="flex flex-wrap items-start gap-3 md:gap-4">
                <div>
                  <p
                    className={`text-lg text-light-text-primary dark:text-dark-text-primary ${poppins.className} font-semibold`}
                  >
                    {user?.name}
                  </p>
                  <p
                    className={`text-sm text-light-text-muted dark:text-dark-text-muted ${poppins.className}`}
                  >
                    @{user?.username}
                  </p>
                </div>
                <PostTimeDesign post={post} />
              </div>
            </div>

            <div>
              <p
                className={`text-base md:text-lg leading-8 text-light-text-secondary dark:text-dark-text-secondary ${poppins.className}`}
              >
                {post.content}
              </p>
            </div>
          </article>
        </div>

        <div className="py-4 px-3 flex gap-2 md:gap-3 shrink-0 flex-wrap">
          {statChips.map((chip) => (
            <p
              key={chip.label}
              className={`${poppins.className} text-xs text-light-text-secondary dark:text-dark-text-secondary font-medium border border-light-ui-border dark:border-white/20 bg-light-background-card dark:bg-white/5 rounded-full px-3 py-1 flex items-center`}
            >
              {chip.value} {chip.label}
            </p>
          ))}
        </div>

        <div className="h-20 shrink-0 px-3">
          <div className="flex items-center justify-between w-[100%] py-1 px-10 border border-light-ui-border dark:border-white/20 rounded-2xl bg-light-background-card/80 dark:bg-white/4 backdrop-blur">
            {quickActions.map((action) => (
              <button
                key={action.alt}
                type="button"
                className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <Image
                  src={action.src}
                  alt={action.alt}
                  width={25}
                  height={25}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <section className="mt-5 w-full flex-1 min-h-0 flex flex-col px-3 relative">
          <div className="flex items-center justify-between pb-3 px-1 border-b border-light-ui-border dark:border-white/10">
            <h2
              className={`${oswald.className} text-md text-light-text-primary dark:text-dark-text-primary font-semibold`}
            >
              COMMENTS
            </h2>
            <p
              className={`${poppins.className} text-xs text-light-text-muted dark:text-dark-text-muted`}
            >
              Join the conversation
            </p>
          </div>

          <div className="mt-3 flex-1 pr-1 min-h-0 rounded-xl bg-light-background-card/40 dark:bg-white/[0.02]">
            {commentsData.length > 0 ? (
              commentsData.map((comment) => {
                const commentAuthor = users.find(
                  (item) => item.id === comment.userId,
                );

                const commentMentions = comment.mentions.map((mentionId) => {
                  const mentionedUser = users.find(
                    (item) => item.id === mentionId,
                  );
                  return mentionedUser?.username;
                });

                const validMentions = commentMentions.filter(Boolean);

                return (
                  <div
                    key={comment.id}
                    className="relative px-2 py-4 md:px-3 flex items-start justify-between gap-3 border-b border-light-ui-border dark:border-white/20 last:border-b-0"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="relative h-9 w-9 shrink-0">
                        <Image
                          src={
                            commentAuthor?.avatarUrl ??
                            "/images/default-avatar.png"
                          }
                          alt={commentAuthor?.name ?? "User Avatar"}
                          fill
                          sizes="36px"
                          className="object-cover rounded-full border border-light-ui-border dark:border-white/20"
                        />
                      </div>

                      <div className="min-w-0 flex flex-col gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p
                            className={`${poppins.className} text-sm text-light-text-primary dark:text-dark-text-primary font-medium truncate`}
                          >
                            {commentAuthor?.name ?? "Unknown user"}
                          </p>
                          <p
                            className={`${poppins.className} text-xs text-light-text-muted dark:text-dark-text-muted truncate`}
                          >
                            @{commentAuthor?.username ?? "unknown"}
                          </p>
                          <span
                            className={`${poppins.className} text-[11px] text-light-text-muted dark:text-dark-text-muted`}
                          >
                            • {timeAgo(comment.createdAt)}
                          </span>
                        </div>
                        <div className={`${poppins.className}`}>
                          {validMentions.length > 0 && (
                            <p className="text-xs leading-5 mb-0.5">
                              {validMentions.map((mention) => (
                                <span
                                  key={mention}
                                  className="text-emerald-300 mr-1"
                                >
                                  @{mention}
                                </span>
                              ))}
                            </p>
                          )}
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-6 whitespace-pre-line">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 transition-colors h-16"
                    >
                      <span
                        className={`${poppins.className} text-xs text-light-text-secondary dark:text-dark-text-secondary`}
                      >
                        {Stats.likesByPost[comment.id] ?? 0}
                      </span>
                      <Image
                        src={
                          mounted && !isDark
                            ? "/images/like-dark.png"
                            : "/images/like-light.png"
                        }
                        alt="Like"
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="relative p-4 flex items-start gap-3">
                <div className="h-9 w-9 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Image
                    src={
                      mounted && !isDark
                        ? "/images/comment-dark.png"
                        : "/images/comment-light.png"
                    }
                    alt="comment"
                    width={16}
                    height={16}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <p
                    className={`${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-secondary font-medium`}
                  >
                    No comments yet
                  </p>
                  <p
                    className={`${poppins.className} text-xs text-light-text-muted dark:text-dark-text-muted`}
                  >
                    Be the first to drop your thoughts on this post.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 text-light-background-main dark:text-white/10 text-sm">
            a
          </div>

          <div className="fixed bottom-20 left-0 right-0 z-40 px-4 md:px-6 py-3">
            <div className="max-w-3xl mx-auto px-3">
              <div className="w-full flex items-center gap-3 rounded-xl border border-light-ui-border dark:border-white/40 bg-light-background-card/95 dark:bg-[#0B1323]/95 backdrop-blur px-4 py-2 shadow-md shadow-slate-300/35 dark:shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
                <input
                  placeholder="Write a comment..."
                  className={`${poppins.className} flex w-full bg-transparent text-sm text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted outline-none resize-none items-center justify-center`}
                />
                <div>
                  <button
                    type="button"
                    className={`${poppins.className} py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 transition-colors tracking-wide px-5`}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

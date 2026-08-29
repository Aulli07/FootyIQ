"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";

import { oswald, poppins } from "@/app/font-icons/fonts";
import PageTitle from "@/shared/components/page-title";

import { postQuickActions } from "@/features/posts/selectors/post-quick-actions";
import { postStatChips } from "@/features/posts/selectors/post-stat-chips";

import { buildHydratedPostsStore } from "@/features/posts/data/new/posts-store";
import { getPostCommentsById, getPostAttachmentById, getPostCountsById } from "@/features/posts/selectors/get-post-details-by-id";

import { CommentType } from "@/features/posts/types/comment";
import { getUserById } from "@/features/users/selectors/get-user-by-id";
import { timeAgo } from "@/features/posts/utils/time-ago";

import { PostType } from "@/features/posts/types/post";

import { ComparisonImageCard } from "@/features/compare/components/comp-image-card";
import { CommentDisplay } from "@/features/posts/components/comment-display";
import { getQuickActionIcon } from "@/features/posts/utils/quick-actions";
import { NoCommentsDisplay } from "@/features/posts/components/no-comment-display";
import { NoPostDisplay } from "@/features/posts/components/no-post-display";
import { CommentInfoType } from "@/features/posts/types/comment";
import { handleCommentUpload } from "@/features/posts/engine/handle-comment-upload";

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
  const mounted = true;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const postId = params["view-particular-post"];
  const postsStore = buildHydratedPostsStore();
  const post = postsStore[postId] ?? null;
  const user = post ? getUserById(post.authorId) : null;

  const [uploadedComments, setUploadedComments] = useState<CommentType[]>([]);
  const [shouldUpload, setShouldUpload] = useState<boolean>(false);
  const myCommentRef = useRef<HTMLInputElement | null>(null);
  const lastCommentKeyRef = useRef<string | null>(null);

  const postAttachment = post ? getPostAttachmentById(post.attachmentIds) : null;
  const hasAttachment =
    postAttachment?.comparisonId && postAttachment.comparisonId.length > 0;

  const baseComments = post ? getPostCommentsById(post.id) : [];
  const commentStore = post
    ? [
        ...baseComments,
        ...uploadedComments.filter((comment) => comment.postId === post.id),
      ]
    : [];

  const commentUploadInfo: CommentInfoType = {
    shouldUpload,
    setShouldUpload,
    myCommentRef,
    lastCommentKeyRef,
    postId: post?.id ?? "",
    userId: user?.id ?? "u-1",
    setUploadedComments,
  };

  if (!post) {
    return <NoPostDisplay />;
  }

  const postCounts = getPostCountsById(post.id);
  const statChipValues = {
    likes: postCounts.likeCount,
    comments: postCounts.commentCount,
    views: postCounts.viewCount,
  };

  function handleComment() {
    if (!post) return;

    handleCommentUpload(commentUploadInfo);
  }
  // function handleCommentUpload() {
  //   if (!post) return;

  //   const commentContent = myCommentRef.current?.value?.trim();
  //   if (!commentContent) return;

  //   const commentKey = createPostKey([commentContent]);
  //   if (lastCommentKeyRef.current === commentKey) return;

  //   const uploadedComment = saveCommentFromUpload({
  //     postId: post.id,
  //     commentContent,
  //     timestamp: Date.now(),
  //     authorId: user?.id ?? "u-1",
  //   });

  //   if (!uploadedComment) return;

  //   setUploadedComments((prev) => [...prev, uploadedComment]);
  //   setShouldUpload(false);

  //   if (myCommentRef.current) {
  //     myCommentRef.current.value = "";
  //   }

  //   lastCommentKeyRef.current = commentKey;
  // }

  return (
    <main className="relative px-4 md:px-6 text-light-text-primary dark:text-dark-text-primary overflow-y-auto">
      <div className="max-w-3xl mx-auto flex flex-col h-full gap-1">
        <PageTitle title="POST" />

        <div className="py-3 shrink-0 px-3">
          <article className="w-full rounded-2xl backdrop-blur md:p-7 shadow-md flex flex-col h-auto space-y-3">
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
            <div className="flex flex-col gap-3">
              {hasAttachment && (
                <ComparisonImageCard
                  key={postAttachment.id}
                  comparisonId={postAttachment.comparisonId}
                  compStats={postAttachment.stats}
                />
              )}
            </div>
          </article>
        </div>

        <div className="py-4 px-3 flex gap-2 md:gap-3 shrink-0 flex-wrap">
          {postStatChips.map((chip) => (
            <p
              key={chip.label}
              className={`${poppins.className} text-xs text-light-text-secondary dark:text-dark-text-secondary font-medium border border-light-ui-border dark:border-white/20 bg-light-background-card dark:bg-white/5 rounded-full px-3 py-1 flex items-center`}
            >
              {statChipValues[chip.key as keyof typeof statChipValues]} {chip.label}
            </p>
          ))}
        </div>

        <div className="h-20 shrink-0 px-3">
          <div className="flex items-center justify-between w-[100%] py-1 px-10 border border-light-ui-border dark:border-white/20 rounded-2xl bg-light-background-card/80 dark:bg-white/4 backdrop-blur">
            {postQuickActions.map((action) => (
              <button
                key={action.alt}
                type="button"
                className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <Image
                  src={getQuickActionIcon(action.key, mounted, isDark)}
                  alt={action.alt}
                  width={25}
                  height={25}
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <section className="relative mt-5 w-full flex-1 min-h-0 flex flex-col px-3 relative">
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
            {commentStore.length > 0 ? (
              commentStore.map((comment) => (
                <CommentDisplay key={comment.id} comment={comment} mounted={mounted} isDark={isDark} />
              ))
            ) : (
              <NoCommentsDisplay mounted={mounted} isDark={isDark} />
            )}
          </div>

          <div className="fixed bottom-10 left-0 right-0 flex items-center gap-2 px-5">
            <input
              ref={myCommentRef}
              placeholder="Add a comment"
              className="flex-1 rounded-full border border-light-ui-border dark:border-white/20 bg-light-background-card dark:bg-white/[0.03] px-4 py-2 text-sm text-light-text-primary dark:text-dark-text-primary outline-none"
            />
            <button
              type="button"
              onClick={handleComment}
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white"
            >
              Post
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

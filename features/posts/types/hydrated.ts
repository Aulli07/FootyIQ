import { PostType } from "./post";
import { LikeType } from "./like";
import { CommentType } from "./comment";
import { ViewType } from "./view";
import { PostAttachmentType } from "./attachment";

export type PostAnalyticsType = {
  likeIds: string[];
  commentIds: string[];
  viewIds: string[];
  attachmentIds: string[];
};

export type PostAnalyticsStoreType = Record<string, PostAnalyticsType>;

// export type HydratedPostType = {
//   post: PostType;
//   analytics: PostAnalyticsType;
//   likes: LikeType[];
//   comments: CommentType[];
//   views: ViewType[];
//   attachments: PostAttachmentType[];
// };

// export type HydratedPostsStoreType = Record<string, HydratedPostType>;

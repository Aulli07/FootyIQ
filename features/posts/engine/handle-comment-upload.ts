import { createPostKey } from "@/shared/utils/identity";
import { CommentInfoType, CommentType } from "../types/comment";
import { saveCommentFromUpload } from "../services/uploadComments";

// export function useUploadComment(
//   commentInfo: CommentInfoType,
// ): CommentType | undefined {
//   if (!commentInfo.shouldUpload) {
//     return undefined;
//   }

//   const commentContent = commentInfo.myCommentRef.current?.value?.trim();
//   if (!commentContent) {
//     return undefined;
//   }

//   const commentKey = createPostKey([commentContent]);
//   if (commentInfo.lastCommentKeyRef.current === commentKey) {
//     return undefined;
//   }

//   const uploadedComment = saveCommentFromUpload({
//     postId: commentInfo.postId,
//     commentContent,
//     timestamp: Date.now(),
//     authorId: commentInfo.userId,
//   });

//   if (!uploadedComment) {
//     return undefined;
//   }

//   commentInfo.setShouldUpload(false);

//   if (commentInfo.myCommentRef.current) {
//     commentInfo.myCommentRef.current.value = "";
//   }

//   commentInfo.lastCommentKeyRef.current = commentKey;
//   return uploadedComment;
// }

export function handleCommentUpload(comInfo: CommentInfoType) {
  // if (!post) return;

  const commentContent = comInfo.myCommentRef.current?.value?.trim();
  if (!commentContent) return;

  const commentKey = createPostKey([commentContent]);
  if (comInfo.lastCommentKeyRef.current === commentKey) return;

  const uploadedComment = saveCommentFromUpload({
    postId: comInfo.postId,
    commentContent,
    timestamp: Date.now(),
    authorId: comInfo.userId ?? "u-1",
  });

  if (!uploadedComment) return;

  comInfo.setUploadedComments((prev) => [...prev, uploadedComment]);
  comInfo.setShouldUpload(false);

  if (comInfo.myCommentRef.current) {
    comInfo.myCommentRef.current.value = "";
  }

  comInfo.lastCommentKeyRef.current = commentKey;
}
import type {
  PostAttachmentComparisonStatsType,
  PostAttachmentType,
} from "@/features/posts/types/attachment";

const AllAttachments: PostAttachmentType[] = [
  {
    id: "pa-1",
    postId: "t-1",
    comparisonId: "cmp-1",
    stats: {
      footyRating: [96, 95],
      keyPasses: [4, 3],
      chancesCreated: [3, 2],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-2",
    postId: "t-5",
    comparisonId: "cmp-2",
    stats: {
      footyRating: [97, 91],
      dribblesCompleted: [6, 4],
      shotsOnTarget: [5, 3],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-3",
    postId: "t-9",
    comparisonId: "cmp-3",
    stats: {
      footyRating: [90, 88],
      keyPasses: [2, 2],
      dribblesCompleted: [4, 5],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-4",
    postId: "t-23",
    comparisonId: "cmp-4",
    stats: {
      footyRating: [91, 89],
      chancesCreated: [4, 3],
      shotsOnTarget: [3, 2],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-5",
    postId: "t-34",
    comparisonId: "cmp-5",
    stats: {
      footyRating: [88, 90],
      groundDuelsWon: [7, 6],
      shotsOnTarget: [2, 4],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-6",
    postId: "t-12",
    comparisonId: "cmp_0001",
    stats: {
      footyRating: [95, 94],
      shotsOnTarget: [4, 3],
      keyPasses: [3, 2],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-7",
    postId: "t-14",
    comparisonId: "cmp_0002",
    stats: {
      footyRating: [93, 92],
      dribblesCompleted: [5, 4],
      shotsOnTarget: [4, 3],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-8",
    postId: "t-17",
    comparisonId: "cmp_0004",
    stats: {
      footyRating: [90, 91],
      keyPasses: [5, 6],
      chancesCreated: [3, 4],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-9",
    postId: "t-18",
    comparisonId: "cmp_0005",
    stats: {
      footyRating: [89, 90],
      groundDuelsWon: [6, 7],
      shotsOnTarget: [2, 3],
    } satisfies PostAttachmentComparisonStatsType,
  },
];

export default AllAttachments;

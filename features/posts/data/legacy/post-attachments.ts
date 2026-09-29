import type {
  PostAttachmentComparisonStatsType,
  PostAttachmentType,
} from "@/features/posts/types/attachment";

const AllAttachments: PostAttachmentType[] = [
  {
    id: "pa-1",
    postId: "t-1",
    comparisonId: "cmp-a5d656f7",
    stats: {
      footyRating: [8, 8],
      keyPasses: [35, 31],
      chancesCreated: [40, 31],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-2",
    postId: "t-5",
    comparisonId: "cmp-4e5b11a6",
    stats: {
      footyRating: [7, 6],
      dribblesCompleted: [48, 26],
      shotsOnTarget: [48, 35],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-3",
    postId: "t-9",
    comparisonId: "cmp-5eb1364f",
    stats: {
      footyRating: [7, 8],
      keyPasses: [50, 102],
      dribblesCompleted: [45, 94],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-4",
    postId: "t-23",
    comparisonId: "cmp-6319dbe1",
    stats: {
      footyRating: [8, 8],
      chancesCreated: [102, 100],
      shotsOnTarget: [57, 65],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-5",
    postId: "t-34",
    comparisonId: "cmp-c087480b",
    stats: {
      footyRating: [7, 6],
      groundDuelsWon: [90, 79],
      shotsOnTarget: [74, 95],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-6",
    postId: "t-12",
    comparisonId: "cmp-10ca5057",
    stats: {
      footyRating: [7, 7],
      shotsOnTarget: [32, 40],
      keyPasses: [22, 25],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-7",
    postId: "t-14",
    comparisonId: "cmp-d32ef993",
    stats: {
      footyRating: [6, 8],
      dribblesCompleted: [6, 10],
      shotsOnTarget: [14, 18],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-8",
    postId: "t-17",
    comparisonId: "cmp-b83af692",
    stats: {
      footyRating: [6, 5],
      keyPasses: [27, 17],
      chancesCreated: [27, 17],
    } satisfies PostAttachmentComparisonStatsType,
  },
  {
    id: "pa-9",
    postId: "t-18",
    comparisonId: "cmp-50729530",
    stats: {
      footyRating: [7, 8],
      groundDuelsWon: [188, 407],
      shotsOnTarget: [221, 296],
    } satisfies PostAttachmentComparisonStatsType,
  },
];

export default AllAttachments;

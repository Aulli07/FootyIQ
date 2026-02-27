const Comments = [
  {
    id: "c-1",
    postId: "t-1",
    userId: "u-1",
    content: "He needs one more season to show what he's got",
    mentions: [],
    createdAt: Date.now(),
  },
  {
    id: "c-2",
    postId: "t-1",
    userId: "u-1",
    content: "He needs one more season to show what he's got, but he's looking good so far",
    mentions: ["u-2", "u-3"],
    createdAt: Date.now(),
  },
  {
    id: "c-3",
    postId: "t-1",
    userId: "u-1",
    content: "Talent is not by mouth o",
    mentions: [],
    createdAt: Date.now(),
  },
  {
    id: "c-4",
    postId: "t-1",
    userId: "u-2",
    content: "He needs one more season to show what he's got",
    mentions: ["u-1"],
    createdAt: Date.now(),
  },
  {
    id: "c-5",
    postId: "t-1",
    userId: "u-2",
    content: "He needs one more season to show what he's got",
    mentions: ["u-4"],
    createdAt: Date.now(),
  },
];

export default Comments;
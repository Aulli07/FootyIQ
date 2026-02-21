export type TalkType = {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  }
  authorId: string;
  content: string;
  playersInDiscussion: Array<string>;
  createdAt: string;
  stats: {
    likes: number;
    comments: number;
    views: number;
  }
} 
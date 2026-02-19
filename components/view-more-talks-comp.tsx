// import { PostType } from "../app/types/posts";
// import { PostDisplay } from "./post-display";

// import { oswald } from "../app/fonts";

// import { getPostsInDiscussion } from "../app/utils/playerFilters";
// import { players } from "../app/data/players";

// import Image from "next/image";
// import PageTitle from "./page-title";

// export default function MoreTalks({
//   leftPlayerId,
//   rightPlayerId,
// }: {
//   leftPlayerId: string | null;
//   rightPlayerId: string | null;
// }) {
//   const leftPlayer = players.find((player) => player.id === leftPlayerId);
//   const rightPlayer = players.find((player) => player.id === rightPlayerId);

//   const postsInDiscussion = getPostsInDiscussion(leftPlayer, rightPlayer);

//   return (
//     <div className="px-3 pt-5 pb-5 flex flex-col gap-5">
//       <PageTitle
//         title={`TALKS ON ${leftPlayer?.id.toUpperCase()} AND ${rightPlayer?.id.toUpperCase()}`}
//       />
//       <div className="flex flex-col gap-4 px-4 mt-1">
//         {postsInDiscussion.map((post: PostType) => (
//           <PostDisplay key={post.id} post={post} />
//         ))}
//       </div>
//     </div>
//   );
// }

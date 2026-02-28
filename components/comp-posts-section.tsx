import { PlayerType } from "../app/types/players";
import TitleSection from "./page-section-title";
import { PostDisplay } from "./post-display";
import { poppins } from "../app/fonts";
import Link from "next/link";
import { getPostsInDiscussion } from "../app/utils/playerFilters";
import { PostType } from "../app/types/posts";

export default function ComparisonPostsSection({
	leftPlayer,
	rightPlayer,
	uniqueFullPath,
}: {
	leftPlayer: PlayerType | null;
	rightPlayer: PlayerType | null;
	uniqueFullPath: string;
}) {
	const postsInDiscussion = getPostsInDiscussion(leftPlayer, rightPlayer);

	if (postsInDiscussion.length === 0) {
		return (
			<div className="flex flex-col gap-3 justify-center items-center h-full w-full mt-5 px-3">
				<TitleSection title="Posts" />
				<p className={`text-white/70 ${poppins.className} text-sm`}>
					No posts found for this comparison. Be the first to start the
					discussion!
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3 h-full w-full mt-5 px-3">
			<TitleSection title="Posts" />
			<div className="flex flex-col gap-4 px-4 mt-1">
				{postsInDiscussion.slice(0, 3).map((post: PostType) => (
					<PostDisplay key={post.id} post={post} />
				))}
			</div>
			<Link
				href={{
					pathname: `${uniqueFullPath}/view-more-posts`,
					query: {
						leftPlayerId: leftPlayer?.id,
						rightPlayerId: rightPlayer?.id,
					},
				}}
				className="flex justify-end items-center px-4"
			>
				<span
					className={`${poppins.className} text-sm font-semibold border-b mt-2 text-white/70`}
				>
					View More Posts
				</span>
			</Link>
		</div>
	);
}

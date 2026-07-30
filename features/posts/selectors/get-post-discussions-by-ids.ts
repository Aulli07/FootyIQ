import { buildHydratedPostStore } from "@/features/posts/data/new/post-storage";

export function getPostsInDiscussion(leftPlayerId?: string, rightPlayerId?: string) {
  const normalizeName = (value: string | undefined) =>
    value?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");

  const targetPlayers = [leftPlayerId, rightPlayerId]
    .filter(Boolean)
    .map(normalizeName);

  const hydratedPostStore = buildHydratedPostStore();

  const postsInDiscussion = Object.values(hydratedPostStore).filter((post) => {
    const postPlayers = post.references.players.map(normalizeName);

    return targetPlayers.some((playerName) => postPlayers.includes(playerName));
  });

  return postsInDiscussion;
}
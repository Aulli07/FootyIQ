import {
  canonicalPlayers,
  getCanonicalPlayerCareerStats,
} from "@/shared/utils/canonical-lookups";

export function getSuggestedPlayers() {
  const suggestedPlayers = canonicalPlayers
    .filter(
      (player) =>
        (getCanonicalPlayerCareerStats(player.id)?.averageRating ?? 0) > 8.0,
    )
    .map((player) => player.id);

  return suggestedPlayers;
}

import { aggregateStats } from "@/features/compare/utils/aggregate-stat";
import { getAverageRating, PositionGroup } from "@/features/compare/utils/avg-player-rating";
import { canonicalPlayers, getCanonicalPlayerCareerStats } from "@/shared/utils/canonical-lookups";

export function getSuggestedPlayers() {
  const suggestedPlayers = canonicalPlayers
    .filter((player) => {
      const stats = getCanonicalPlayerCareerStats(player.id);
      if (!stats) return false;
      const aggStats = aggregateStats(stats);
      const avgRating = getAverageRating(aggStats, player.primaryPosition as PositionGroup);
      return avgRating > 1.0;
    })
    .map((player) => player.id);

  return suggestedPlayers;
}

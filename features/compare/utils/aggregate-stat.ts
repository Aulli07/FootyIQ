import { PlayerCareerStats } from "@/shared/types/stats-schema";

export const aggregatePlayerStats = (player: PlayerCareerStats | null) => {
  const totalGoals = player?.goals || 0;
  const totalAppearances = player?.appearances || 0;

  const weightedRatingSum = () => {
    const rating = Number(player?.averageRating) || 0;
    if (!Number.isFinite(rating) || totalAppearances <= 0) return 0;
    return rating * totalAppearances;
  };

  const avgRating =
    totalAppearances > 0 ? weightedRatingSum() / totalAppearances : 0;

  return { totalGoals, totalAppearances, avgRating };
};
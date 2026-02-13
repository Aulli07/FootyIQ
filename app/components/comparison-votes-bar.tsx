import { PlayerType } from "../types/players";
import { StatsType } from "../types/stats";

import { poppins } from "../fonts";
import { playerStats } from "../data/playerStats";
// import { PlayerStatsType } from "../types/playerStatsType";


const formatShortName = (name?: string) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return name;
  return `${parts[0]?.[0] ?? ""}. ${parts.slice(1).join(" ")}`.trim();
};

const aggregatePlayerStats = (player: StatsType | null) => {
  // const totalGoals = seasons.reduce(
  //   (sum, season) => sum + (Number(season.career.totalGoals) || 0),
  //   0,
  // );
  const totalGoals = player?.career.totalGoals || 0;

  const totalAppearances = player?.career.totalAppearances || 0;

  const weightedRatingSum = () => {
    // const apps = Number(season.career.totalAppearances) || 0;

    const rating = Number(player?.career.averageRating) || 0;
    
    if (!Number.isFinite(rating) || totalAppearances <= 0) return 0;
    return rating * totalAppearances;
  };

  const avgRating = totalAppearances > 0 ? weightedRatingSum() / totalAppearances : 0;

  return { totalGoals, totalAppearances, avgRating };
};

const getPreferenceForPair = (pair: Array<PlayerType | null>) => {
  const left = pair?.[0]
  const right = pair?.[1]

  if (!left || !right) {
    return {
      left,
      right,
      leftPct: 0,
      rightPct: 0,
    };
  }

  // playerStats is an object keyed by player id -> array of season stats
  // We intentionally avoid hardcoding player keys by using dynamic indexing (left.id/right.id).
  const statsByPlayerId = playerStats as unknown as Record<string, StatsType[]>;

  const leftPlayerStats = playerStats.find((stat) => stat.id === left.id) || null;
  const rightPlayerStats = playerStats.find((stat) => stat.id === right.id) || null;

  const leftAgg = aggregatePlayerStats(leftPlayerStats)
  const rightAgg = aggregatePlayerStats(rightPlayerStats)

  // Use average rating as a proxy until vote data exists.
  const total = Math.max(1, leftAgg.avgRating + rightAgg.avgRating);
  const leftPct = Math.max(
    0,
    Math.min(100, Math.round((leftAgg.avgRating / total) * 100)),
  );
  const rightPct = 100 - leftPct;

  return { left, right, leftPct, rightPct };
};



export default function VotesBar({ players }: { players: Array<PlayerType | null> }) {
  const pref = getPreferenceForPair(players);

  return (
    <div className="flex flex-col gap-2 relative p-4 border border-white/20 rounded-lg bg-white/5 shadow-lg backdrop-blur">
      <div className={`flex justify-between items-center text-white/70 ${poppins.className}`}>
        <span className={`max-w-[45%] truncate text-sm ${poppins.className}`}>
          {formatShortName(pref.left?.name)} {pref.leftPct}%
        </span>
        <span className={`max-w-[45%] truncate text-right text-sm ${poppins.className}`}>
          {pref.rightPct}% {formatShortName(pref.right?.name)}
        </span>
      </div>

      <div className="relative w-full h-2.5 rounded-lg bg-white/10 overflow-hidden border border-white/10">
        <div
          className="bg-green-500 w-full h-full absolute left-0 top-0 flex transition-all duration-500 ease-in-out"
          style={{ width: `${pref.leftPct}%` }}
          aria-label="Left player preference"
        />
        <div
          className="bg-white/70 w-full h-full absolute right-0 top-0 flex transition-all duration-500 ease-in-out"
          style={{ width: `${pref.rightPct}%` }}
          aria-label="Right player preference"
        />
      </div>
    </div>
  );
}

import { Player } from "@/shared/types/stats-schema";

import { poppins } from "@/app/font-icons/fonts";
import { getCanonicalPlayerCareerStats } from "@/shared/utils/canonical-lookups";

import { aggregatePlayerStats } from "../utils/aggregate-stat";
import { formatShortName } from "../utils/format-name";



export default function VotesBar( players : Array<Player | null>) {

  const pref = getPreferenceForPair(players);

  return (
    <div className="flex flex-col gap-2 relative p-4 border border-light-ui-border dark:border-white/20 rounded-lg bg-light-background-card dark:bg-white/5 shadow-md shadow-slate-300/35 dark:shadow-lg dark:shadow-black/20 backdrop-blur">
      <div
        className={`flex justify-between items-center text-light-text-secondary dark:text-dark-text-secondary ${poppins.className}`}
      >
        <span className={`max-w-[45%] truncate text-sm ${poppins.className}`}>
          {formatShortName(pref.left?.fullName)} {pref.leftPct}%
        </span>
        <span
          className={`max-w-[45%] truncate text-right text-sm ${poppins.className}`}
        >
          {pref.rightPct}% {formatShortName(pref.right?.fullName)}
        </span>
      </div>

      <div className="relative w-full h-2.5 rounded-lg bg-slate-200 dark:bg-white/10 overflow-hidden border border-slate-300 dark:border-white/10">
        <div
          className="bg-green-500 w-full h-full absolute left-0 top-0 flex transition-all duration-500 ease-in-out"
          style={{ width: `${pref.leftPct}%` }}
          aria-label="Left player preference"
        />
        <div
          className="bg-slate-500/65 dark:bg-white/70 w-full h-full absolute right-0 top-0 flex transition-all duration-500 ease-in-out"
          style={{ width: `${pref.rightPct}%` }}
          aria-label="Right player preference"
        />
      </div>
    </div>
  );
}

const getPreferenceForPair = (pair: Array<Player | null>) => {
  const left = pair?.[0];
  const right = pair?.[1];

  if (!left || !right) {
    return { left, right, leftPct: 0, rightPct: 0 };
  }

  const leftPlayerStats = getCanonicalPlayerCareerStats(left.id);
  const rightPlayerStats = getCanonicalPlayerCareerStats(right.id);

  const leftAgg = aggregatePlayerStats(leftPlayerStats);
  const rightAgg = aggregatePlayerStats(rightPlayerStats);

  // Use average rating as a proxy until vote data exists.
  const total = Math.max(1, leftAgg.avgRating + rightAgg.avgRating);
  const leftPct = Math.max(
    0,
    Math.min(100, Math.round((leftAgg.avgRating / total) * 100)),
  );
  const rightPct = 100 - leftPct;

  return { left, right, leftPct, rightPct };
};

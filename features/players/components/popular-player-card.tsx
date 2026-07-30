import Image from "next/image";
import Link from "next/link";

import { poppins } from "@/app/font-icons/fonts";
import { Player } from "@/shared/types/stats-schema";

interface PopularPlayerCardProps {
  player: Player;
  searchCount: number;
}

export default function PopularPlayerCard({
  player,
  searchCount,
}: PopularPlayerCardProps) {
  return (
    <Link
      href={`/players/${player.id}`}
      className="group flex items-center gap-4 rounded-xl border border-light-ui-border bg-white dark:bg-dark-background-card/40 p-3 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all dark:border-white/5 border border-white"
    >
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-slate-100 dark:ring-white/5">
        <Image
          src={player.imageUrl ?? "/images/default-avatar.png"}
          alt={player.fullName}
          fill
          sizes="56px"
          className="object-cover transition-transform group-hover:scale-110 duration-300"
        />
      </div>

      <div className="relative flex-1 flex flex-row w-full items-stretch items-center">
        <div className="min-w-0 flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              className={`${poppins.className} truncate text-sm font-bold text-light-text-primary dark:text-dark-text-primary`}
            >
              {player.fullName}
            </p>
            <div className="flex gap-1 items-center opacity-60 group-hover:opacity-100 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3 text-emerald-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.045 4.5 12 4.5s8.601 3.549 9.964 7.178a1.012 1.012 0 010 .644C20.601 15.951 16.955 19.5 12 19.5s-8.601-3.549-9.964-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span
                className={`${poppins.className} text-[12px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter`}
              >
                {searchCount > 999
                  ? `${(searchCount / 1000).toFixed(1)}k`
                  : searchCount}{" "}
                Searches
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span
              className={`${poppins.className} text-[11px] font-semibold text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wider`}
            >
              {player.primaryPosition ?? "Player"}
            </span>
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-0 right-0 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 text-emerald-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div> */}
    </Link>
  );
}

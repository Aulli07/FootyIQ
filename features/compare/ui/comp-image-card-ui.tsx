import { poppins } from "@/app/font-icons/fonts"
import Image from "next/image";

import { Player } from "@/shared/types/stats-schema";
import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";



export function renderStatPill(
  label: string,
  leftValue: number,
  rightValue: number,
  isRightSide: boolean,
) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-light-ui-border/20">
      <div className="min-w-0">
        <p
          className={`text-[11px] font-semibold uppercase ${poppins.className} text-light-text-secondary dark:text-dark-text-secondary`}
        >
          {label}
        </p>
      </div>
      <div
        className={`text-sm font-bold ${poppins.className} ${isRightSide ? "text-sky-600 dark:text-sky-400" : "text-emerald-600 dark:text-emerald-400"}`}
      >
        {isRightSide ? rightValue : leftValue}
      </div>
    </div>
  )
}

export function renderPlayerImage(player: Player | null, label: string | undefined) {
  const imageUrl = player?.imageUrl ?? "/images/default-avatar.png";
  const name = player?.fullName ?? label ?? "Player profile";

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-24 w-24 sm:h-28 sm:w-28">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 via-transparent to-transparent blur-xl" />
        <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-black/10 shadow-md shadow-slate-300/20 dark:ring-white/10 dark:shadow-black/20">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>
      </div>

      <div>
        <p
          className={`text-md sm:text-xl font-semibold tracking-tight ${poppins.className} text-light-text-primary dark:text-dark-text-primary`}
        >
          {name}
        </p>
        <p
          className={`text-[11px] sm:text-xs font-medium uppercase ${poppins.className} text-emerald-600/80 dark:text-emerald-400/80`}
        >
          {label ?? "Player profile"}
        </p>
      </div>
    </div>
  );
}

export function renderPlayer(playerId: string, context: string) {
  const player = getCanonicalPlayerById(playerId);
  if (!player) {
    return null;
  }

  return (
    <div key={player.id} className="flex flex-row items-center gap-3">
      <div className="relative h-10 w-10 flex-shrink-0">
        <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-emerald-500/10 shadow-sm">
          <Image
            src={player.imageUrl ?? "/images/default-avatar.png"}
            alt={player.fullName}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col min-w-0">
        <p
          className={`text-sm font-bold ${poppins.className} text-light-text-primary dark:text-dark-text-primary leading-tight truncate`}
        >
          {player.fullName}
        </p>
        <span
          className={`text-[10px] font-semibold uppercase tracking-wider ${poppins.className} text-emerald-600/80 dark:text-emerald-400/80`}
        >
          {context}
        </span>
      </div>
    </div>
  );
}
import Image from "next/image";

import { poppins } from "@/app/font-icons/fonts";
import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";

import { PlayerSelectionDropdownPanelProps } from "../types/comp-dropdown";



export function PlayerSelectionDropdownPanel({
  label,
  searchQuery,
  searchedPlayers,
  selectedPlayers,
  suggestedPlayers,
  placeholder,
  onSearchQueryChange,
  onSelectPlayer,
}: PlayerSelectionDropdownPanelProps) {

  const playersToRender = searchQuery.trim() !== "" ? searchedPlayers : suggestedPlayers;
  const showEmptyState = searchQuery.trim() !== "" && searchedPlayers.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-light-ui-border/80 bg-light-background-card/95 px-4 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0b1216]/95">
        <p
          className={`${poppins.className} text-[11px] font-semibold uppercase tracking-[0.22em] text-light-text-secondary dark:text-dark-text-secondary`}
        >
          {label}
        </p>
        <input
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder={placeholder}
          className="mt-2 h-11 w-full rounded-full border border-light-ui-border/80 bg-light-background-main px-4 text-[14px] text-light-text-primary shadow-sm shadow-slate-200/40 outline-none placeholder:text-light-text-muted dark:border-white/15 dark:bg-white/5 dark:text-dark-text-primary dark:placeholder:text-dark-text-muted dark:shadow-black/10"
        />
      </div>

      {showEmptyState ? (
        <p
          className={`${poppins.className} px-1 text-xs text-light-text-muted dark:text-dark-text-muted`}
        >
          {`No matches found for "${searchQuery}"`}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {playersToRender.slice(0, 7).map((playerId) => (
            <li
              key={playerId}
              onClick={() => onSelectPlayer(playerId)}
              className={`flex cursor-pointer items-center justify-start gap-2 rounded-lg border border-transparent p-2 transition hover:border-emerald-500/20 hover:bg-emerald-500/10 dark:hover:bg-white/5 ${poppins.className} text-sm text-light-text-primary dark:text-dark-text-primary ${selectedPlayers?.includes(playerId) ? "border-emerald-500/25 bg-emerald-500/10 dark:bg-emerald-400/10" : ""}`}
            >
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full object-cover">
                <Image
                  src={
                    getCanonicalPlayerById(playerId)?.imageUrl ??
                    "/images/default-avatar.png"
                  }
                  alt={getCanonicalPlayerById(playerId)?.fullName ?? "Player"}
                  fill
                  sizes="44px"
                  className="rounded-full object-cover"
                />
              </div>

              <p
                className={`truncate whitespace-nowrap leading-relaxed ${poppins.className} text-xs text-light-text-primary dark:text-dark-text-primary`}
              >
                {getCanonicalPlayerById(playerId)?.fullName ?? "Player"}
              </p>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

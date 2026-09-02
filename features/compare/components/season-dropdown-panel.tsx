import { poppins } from "@/app/font-icons/fonts";
import {
  formatCompetitionIdToName,
  getCanonicalPlayerSeasonCompetitionOptions,
} from "@/shared/utils/canonical-lookups";

import { SeasonDropdownPanelProps } from "../types/comp-dropdown";


export function SeasonDropdownPanel({
  label,
  players,
  playerSlot,
  onSelectSeason,
}: SeasonDropdownPanelProps) {
  const selectedPlayerId = players?.[playerSlot] ?? "";
  const seasonGroups = selectedPlayerId
    ? getCanonicalPlayerSeasonCompetitionOptions(selectedPlayerId)
    : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border border-light-ui-border/80 bg-light-background-card/95 px-4 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0b1216]/95">
        <p
          className={`${poppins.className} text-[11px] font-semibold uppercase tracking-[0.22em] text-light-text-secondary dark:text-dark-text-secondary`}
        >
          {label}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {seasonGroups.length > 0 ? (
          seasonGroups.map((seasonGroup) => (
            <div key={seasonGroup.seasonId} className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onSelectSeason(seasonGroup.seasonLabel)}
                className={`cursor-pointer rounded-lg px-3 py-2 text-left text-sm ${poppins.className} font-semibold text-light-text-primary hover:bg-emerald-500/10 dark:text-dark-text-primary dark:hover:bg-white/5`}
              >
                {seasonGroup.seasonLabel}
              </button>

              <div className="ml-3 flex flex-col gap-1 border-l border-emerald-500/20 pl-3">
                {seasonGroup.competitions.map((competition) => (
                  <button
                    key={`${seasonGroup.seasonId}-${competition.competitionId}`}
                    type="button"
                    onClick={() =>
                      onSelectSeason(
                        `${competition.competitionId} ${seasonGroup.seasonLabel}`,
                      )
                    }
                    className={`cursor-pointer rounded-md px-2 py-1.5 text-left text-xs ${poppins.className} text-light-text-secondary hover:bg-emerald-500/10 dark:text-dark-text-secondary dark:hover:bg-white/5`}
                  >
                    {competition.competitionLabel}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p
            className={`${poppins.className} px-1 text-xs text-light-text-muted dark:text-dark-text-muted`}
          >
            Select a player first to view available seasons.
          </p>
        )}
      </div>
    </div>
  );
}

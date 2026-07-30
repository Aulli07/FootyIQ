import { poppins } from "@/app/font-icons/fonts";
import { getCanonicalPlayerSeasonAndCompetitionLabels } from "@/shared/utils/canonical-lookups";

type SeasonDropdownPanelProps = {
  label: string;
  players?: string[];
  playerSlot: number;
  onSelectSeason: (season: string) => void;
};

export function SeasonDropdownPanel({
  label,
  players,
  playerSlot,
  onSelectSeason,
}: SeasonDropdownPanelProps) {
  const selectedPlayerId = players?.[playerSlot] ?? "";
  const seasonOptions = selectedPlayerId
    ? getCanonicalPlayerSeasonAndCompetitionLabels(selectedPlayerId)
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

      <div className="flex flex-col gap-2">
        {seasonOptions.length > 0 ? (
          seasonOptions.map((season) => (
            <li
              key={season}
              onClick={() => onSelectSeason(season)}
              className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${poppins.className} text-light-text-primary hover:bg-emerald-500/10 dark:text-dark-text-primary dark:hover:bg-white/5`}
            >
              {season.toUpperCase()}
            </li>
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

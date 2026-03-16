import { poppins } from "../app/fonts";
import { PlayerType } from "../app/types/players";

import Image from "next/image";
import Link from "next/link";

const META_LABELS: Record<string, string> = {
  epl: "EPL",
  spl: "SPL",
  ucl: "UCL",
  cl: "UCL",
  laliga: "LaLiga",
  world_cup: "WC",
  euros: "Euros",
  copa_america: "Copa America",
  afcon: "AFCON",
  career: "Career",
};

function formatMetaLabel(value?: string | null) {
  if (!value) {
    return null;
  }

  return META_LABELS[value] ?? value;
}

export default function ComparisonCard({
  leftPlayer,
  rightPlayer,
  categoryType,
  leftPlayerSeasonOrCompetition,
  rightPlayerSeasonOrCompetition,
}: {
  leftPlayer: PlayerType;
  rightPlayer: PlayerType;
  categoryType: string | null;
  leftPlayerSeasonOrCompetition?: string;
  rightPlayerSeasonOrCompetition?: string;
}) {
  const viewComparisonPath = leftPlayer.id + "-vs-" + rightPlayer.id;
  const leftMetaLabel = formatMetaLabel(leftPlayerSeasonOrCompetition)?.toUpperCase();

  const rightMetaLabel = formatMetaLabel(rightPlayerSeasonOrCompetition)?.toUpperCase();

  const renderLegend = (legend: PlayerType) => (
    <div key={legend.id} className="flex flex-row">
      <div className="p-1 flex flex-col w-32 items-center gap-2">
        <div className="relative h-18 w-18 flex">
          <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-black/10 dark:ring-white/10">
            <Image
              src={legend.image}
              alt={legend.name}
              fill
              sizes="68px"
              className="object-cover"
            />
          </div>
        </div>
        <p
          className={`w-full text-center text-[13px] font-semibold ${poppins.className} text-light-text-primary leading-tight truncate dark:text-dark-text-primary`}
        >
          {legend.name}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 p-3 rounded-xl border border-light-ui-border bg-light-background-card shadow-md shadow-slate-300/30 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-sm dark:shadow-black/20">

      <div className="relative flex flex-row items-start justify-between gap-6 px-1">
        <div className="flex flex-1 flex-col justify-center items-center">
          {leftPlayer && renderLegend(leftPlayer)}
          <span className={`text-[10px] font-medium ${poppins.className} text-light-text-secondary dark:text-dark-text-secondary`}>
            {leftMetaLabel}
          </span>
        </div>

        {/* VS badge centered between the two avatars */}
        {leftPlayer && rightPlayer && (
          <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 z-10">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-300 shadow-md shadow-slate-300/40 backdrop-blur flex items-center justify-center ring-1 ring-emerald-500/20 dark:bg-white/10 dark:border-white/20 dark:shadow-md dark:shadow-black/25 dark:ring-emerald-400/20">
                <span
                  className={`text-xs ${poppins.className} tracking-widest text-light-text-secondary font-semibold dark:text-dark-text-primary`}
                >
                  VS
                </span>
              </div>
              <div className="pointer-events-none absolute -inset-2 rounded-full bg-emerald-500/10 blur-md dark:bg-emerald-500/15" />
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col justify-center items-center">
          {rightPlayer && renderLegend(rightPlayer)}
          <span className={`text-[10px] font-medium ${poppins.className} text-light-text-secondary dark:text-dark-text-secondary`}>
            {rightMetaLabel}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 border border-emerald-700/50 dark:border-emerald-300/20 text-white w-full rounded-xl p-2 transition-colors">
        <Link
          href={{
            pathname: `/${categoryType}/${viewComparisonPath}`,
            query: {
              leftPlayerId: leftPlayer.id,
              rightPlayerId: rightPlayer.id,
            },
          }}
        >
          <span
            className={`text-md ${poppins.className} font-semibold tracking-wide`}
          >
            Compare
          </span>
        </Link>
      </div>

      <div className="flex flex-row justify-end items-center">
        <p
          className={`${poppins.className} text-sm font-medium text-light-text-muted dark:text-dark-text-muted italic`}
        >
          20.8K votes
        </p>
      </div>
    </div>
  );
}

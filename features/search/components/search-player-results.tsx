import { oswald, poppins } from "@/app/font-icons/fonts";

import { PlayerDisplayResults } from "./search-results-display";

export default function SearchedPlayerResults({
  data,
  resultText,
}: {
  data: string[];
  resultText: string;
}) {
  return (
    <section className="w-full overflow-hidden">
      <div className=" py-3 border-b border-white/10 flex items-center justify-between">
        <p
          className={`${oswald.className} text-[14px] tracking-wide text-light-text-primary/80 font-semibold dark:text-dark-text-secondary/80`}
        >
          {resultText}
        </p>
        <span
          className={`${poppins.className} text-[11px] dark:text-emerald-300/90 dark:bg-emerald-500/15 border dark:border-emerald-400/30 rounded-full px-2 py-0.5 border-emerald-500/90 bg-emerald-500/20 text-light-text-primary`}
        >
          {data.length === 0
            ? "No matches"
            : `${data.length} match${data.length > 1 ? "es" : ""}`}
        </span>
      </div>

      {data.length === 0 ? (
        <div className="px-4 py-8 flex items-center justify-center">
          <p
            className={`${poppins.className} text-sm text-white/70 text-center`}
          >
            No player results found.
          </p>
        </div>
      ) : (
        <div className="">
          <div className="flex flex-col gap-5">
            <PlayerDisplayResults playerIds={data} />
          </div>
        </div>
      )}
    </section>
  );
}

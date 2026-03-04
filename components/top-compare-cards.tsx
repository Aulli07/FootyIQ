import Image from "next/image";

import { poppins } from "../app/fonts";

import { PlayerType } from "../app/types/players";
import Link from "next/link";

const Compares = ({
  compareList,
  categoryType,
  compactNames = false,
}: {
  compareList: PlayerType[][];
  categoryType: string;
  compactNames?: boolean;
}) => {
  return (
    <>
      {compareList.map((players, index) => {
        const left = players[0];
        const right = players[1];

        return (
          <ComparesCard
            key={`${left.id}-${right.id}-${index}`}
            leftPlayer={left}
            rightPlayer={right}
            categoryType={categoryType}
            compactNames={compactNames}
          />
        );
      })}
    </>
  );
};

export function ComparesCard({
  leftPlayer,
  rightPlayer,
  categoryType,
  compactNames = false,
}: {
  leftPlayer: PlayerType;
  rightPlayer: PlayerType;
  categoryType: string;
  compactNames?: boolean;
}) {
  const viewComparisonPath = leftPlayer.id + "-vs-" + rightPlayer.id;

  return (
    <div
      key={`${leftPlayer.id}-${rightPlayer.id}`}
      className="relative flex flex-row items-center w-full border border-light-ui-border bg-light-background-card shadow-md shadow-slate-300/35 backdrop-blur rounded-xl p-3 dark:border-white/10 dark:bg-white/5 dark:shadow-lg dark:shadow-black/20"
    >
      <div className="flex flex-col gap-1 flex-1 min-w-0 pr-4">
        <div className="flex flex-row items-center">
          <div className="relative w-[88px] h-12">
            <div className="absolute left-0 top-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-black/10 dark:ring-white/10">
              <Image
                sizes="48px"
                fill
                src={leftPlayer.image}
                className="object-cover"
                alt={leftPlayer.name}
              />
            </div>
            <div className="absolute left-8 top-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-black/10 dark:ring-white/10">
              <Image
                sizes="48px"
                fill
                src={rightPlayer.image}
                className="object-cover"
                alt={rightPlayer.name}
              />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-6 w-6 rounded-full bg-slate-100 border border-slate-300 backdrop-blur flex items-center justify-center shadow-sm dark:bg-black/35 dark:border-white/15">
                <span
                  className={`text-[9px] ${poppins.className} tracking-widest text-light-text-secondary dark:text-dark-text-primary`}
                >
                  VS
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <p
            className={`text-light-text-primary dark:text-dark-text-primary ${poppins.className} font-medium ${compactNames ? "text-xs" : "text-sm"} truncate max-w-[145px] sm:max-w-[170px]`}
          >
            {leftPlayer.name} x {rightPlayer.name}
          </p>
        </div>

        <div
          className={`text-light-text-muted dark:text-dark-text-secondary ${poppins.className} text-xs`}
        >
          3K searches
        </div>
      </div>

      <Link
        href={{
          pathname: `/${categoryType}/${viewComparisonPath}`,
          query: {
            leftPlayerId: leftPlayer.id,
            rightPlayerId: rightPlayer.id,
          },
        }}
      >
        <div className="relative flex items-center">
          <p
            className={`bg-primary hover:bg-primary-hover text-white text-center rounded px-3 py-1 border border-emerald-700/50 dark:border-emerald-300/20 transition-colors ${poppins.className} text-sm`}
          >
            View
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Compares;

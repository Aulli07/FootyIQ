import Image from "next/image";

import { poppins } from "../app/fonts";

import { PlayerType } from "../app/types/players";
import Link from "next/link";

const Compares = ({ compareList, categoryType }: { compareList: PlayerType[][], categoryType: string }) => {
  return (
    <div className="flex flex-col gap-4">
      {compareList.map((players, index) => {
        const left = players[0];
        const right = players[1];

        return <ComparesCard leftPlayer={left} rightPlayer={right} categoryType={categoryType} />;
      })}
    </div>
  );
};

export function ComparesCard({
  leftPlayer,
  rightPlayer,
  categoryType
}: {
  leftPlayer: PlayerType;
  rightPlayer: PlayerType;
  categoryType: string;
}) {

  const viewComparisonPath = leftPlayer.id + "-vs-" + rightPlayer.id;

  return (
    <div
      key={`${leftPlayer.id}-${rightPlayer.id}`}
      className="relative flex flex-row items-center w-full border border-white/10 bg-white/5 shadow-lg backdrop-blur rounded-xl p-3"
    >
      <div className="flex flex-col gap-1 w-full min-w-0">
        <div className="flex flex-row items-center">
          <div className="relative w-[88px] h-12">
            <div className="absolute left-0 top-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/10">
              <Image
                sizes="48px"
                fill
                src={leftPlayer.image}
                className="object-cover"
                alt={leftPlayer.name}
              />
            </div>
            <div className="absolute left-8 top-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/10">
              <Image
                sizes="48px"
                fill
                src={rightPlayer.image}
                className="object-cover"
                alt={rightPlayer.name}
              />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-6 w-6 rounded-full bg-black/35 border border-white/15 backdrop-blur flex items-center justify-center shadow-sm">
                <span
                  className={`text-[9px] ${poppins.className} tracking-widest text-white/90`}
                >
                  VS
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <p
            className={`text-white ${poppins.className} font-medium text-sm truncate`}
          >
            {leftPlayer.name} x {rightPlayer.name}
          </p>
        </div>

        <div className={`text-white/90 ${poppins.className} text-xs`}>
          3K searches
        </div>
      </div>

      <Link
        href={{
          pathname: `/${categoryType}/${viewComparisonPath}`,
          query: {
            leftPlayerId: leftPlayer.id,
            rightPlayerId: rightPlayer.id
          }
        }}
      >
        <div className="relative flex items-center">
          <p
            className={`bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded px-3 py-1 ${poppins.className} text-sm`}
          >
            View
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Compares;

import { poppins } from "../app/fonts";
import { PlayerType } from "../app/types/players";

import Image from "next/image";
import Link from "next/link";

export default function ComparisonCard({
  leftPlayer,
  rightPlayer,
  categoryType
}: {
  leftPlayer: PlayerType;
  rightPlayer: PlayerType;
  categoryType: string | null
}) {

  const viewComparisonPath = leftPlayer.id + "-vs-" + rightPlayer.id;
  // const dynamicPathname =  "/" + categoryType + "/" + leftPlayer.id + "-vs-" + rightPlayer.id;

  const renderLegend = (legend: PlayerType) => (
    <div key={legend.id} className="flex flex-row">
      <div className="p-2 flex flex-col w-32 items-center gap-2">
        <div className="relative h-18 w-18 flex">
          <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/10">
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
          className={`w-full text-center text-xs font-semibold ${poppins.className} text-white leading-tight truncate`}
        >
          {legend.name}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 p-3 rounded-xl border border-white/10 bg-white/5 shadow-sm backdrop-blur">
      <div className="relative flex flex-row items-start justify-between gap-6 px-1">
        <div className="flex-1 flex justify-center">
          {leftPlayer && renderLegend(leftPlayer)}
        </div>

        {/* VS badge centered between the two avatars */}
        {leftPlayer && rightPlayer && (
          <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 z-10">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-white/10 border border-white/20 shadow-md backdrop-blur flex items-center justify-center ring-1 ring-emerald-400/20">
                <span
                  className={`text-xs ${poppins.className} tracking-widest text-white/90`}
                >
                  VS
                </span>
              </div>
              <div className="pointer-events-none absolute -inset-2 rounded-full bg-emerald-500/15 blur-md" />
            </div>
          </div>
        )}

        <div className="flex-1 flex justify-center">
          {rightPlayer && renderLegend(rightPlayer)}
        </div>
      </div>

      <div className="flex justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white w-full rounded-xl p-2">
        <Link
          href={{
            pathname: `/${categoryType}/${viewComparisonPath}`,
            query: {
              leftPlayerId: leftPlayer.id,
              rightPlayerId: rightPlayer.id
            }
          }}
        >
          <span
            className={`text-md ${poppins.className} font-semibold tracking-wide `}
          >
            Compare
          </span>
        </Link>
      </div>

      <div className="flex flex-row justify-end items-center">
        <p
          className={`${poppins.className} text-sm font-medium text-white/50 font-italic`}
        >
          20.8K votes
        </p>
      </div>
    </div>
  );
}

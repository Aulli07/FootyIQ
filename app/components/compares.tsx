import Image from "next/image";

import { poppins } from "../fonts";

import { PlayerType } from "../types/players";

const Compares = ({ compareList }: { compareList: PlayerType[][] }) => {
  return (
    <div className="flex flex-col gap-4">
      {compareList.map((players, index) => {
        const left = players[0];
        const right = players[1];

        return (
          <div
            key={`${left.id}-${right.id}-${index}`}
            className="relative flex flex-row items-center w-full border border-white/10 bg-white/5 shadow-lg backdrop-blur rounded-xl p-3"
          >
            <div className="flex flex-col gap-1 w-full min-w-0">
              <div className="flex flex-row items-center">
                <div className="relative w-[88px] h-12">
                  <div className="absolute left-0 top-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/10">
                    <Image
                      sizes="48px"
                      fill
                      src={left.image}
                      className="object-cover"
                      alt={left.name}
                    />
                  </div>
                  <div className="absolute left-8 top-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/10">
                    <Image
                      sizes="48px"
                      fill
                      src={right.image}
                      className="object-cover"
                      alt={right.name}
                    />
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-6 w-6 rounded-full bg-black/35 border border-white/15 backdrop-blur flex items-center justify-center shadow-sm">
                      <span className={`text-[9px] ${poppins.className} tracking-widest text-white/90`}>
                        VS
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <p className={`text-white ${poppins.className} font-medium text-sm truncate`}>
                  {left.name} x {right.name}
                </p>
              </div>

              <div className={`text-white/90 ${poppins.className} text-xs`}>3K searches</div>
            </div>

            <div className="relative flex items-center">
              <p className={`bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded px-3 py-1 ${poppins.className} text-sm`}>
                View
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Compares;

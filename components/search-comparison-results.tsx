import { PlayerType } from "@/app/types/players";
import { oswald, poppins } from "@/app/fonts";
import Compares from "./top-compare-cards";

export default function SearchedComparisonResults({
  data,
}: {
  data: Array<Array<PlayerType>>;
}) {
  return (
    <section className="w-full overflow-hidden">
      <div className=" py-3 border-b border-white/10 bg-black/20 flex items-center justify-between">
        <p className={`${oswald.className} text-[14px] tracking-wide text-white/80 font-semibold`}>
          Search Results
        </p>
        <span
          className={`${poppins.className} text-[11px] text-emerald-300/90 bg-emerald-500/15 border border-emerald-400/30 rounded-full px-2 py-0.5`}
        >
          {data.length === 0 ? "No matches" : `${data.length} match${data.length > 1 ? "es" : ""}`}
        </span>
      </div>

      {data.length === 0 ? (
        <div className="px-4 py-8 flex items-center justify-center">
          <p
            className={`${poppins.className} text-sm text-white/70 text-center`}
          >
            No comparison results found.
          </p>
        </div>
      ) : (
        <div className="">
          <div className="flex flex-col gap-5">
            <Compares compareList={data} categoryType="search" />
          </div>
        </div>
      )}
    </section>
  );
}

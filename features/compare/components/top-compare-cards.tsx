import Image from "next/image";
import { poppins } from "@/app/font-icons/fonts";
import Link from "next/link";

import { ComparisonStoredType } from "@/features/compare/types/comparison-main-type";
import { Player } from "@/shared/types/stats-schema";

import { getCanonicalPlayerById } from "@/shared/utils/canonical-lookups";
import { getComparisonById } from "@/features/compare/selectors/get-comparison-by-id";



const Compares = ({
  compareList,
  categoryType,
  compactNames = false,
}: {
  compareList: ComparisonStoredType;
  categoryType: string;
  compactNames?: boolean;
}) => {
  
  const comparisonIds = Object.keys(compareList);

  return (
    <div>
      {comparisonIds.map((comparisonId, index) => {
        return (
          <ComparesCard
            key={`${comparisonId}-${index}`}
            comparisonId={comparisonId}
            categoryType={categoryType}
            compactNames={compactNames}
          />
        );
      })}
    </div>
  );
};

export function ComparesCard({
  comparisonId,
  categoryType,
  compactNames = false,
}: {
  comparisonId: string;
  categoryType: string;
  compactNames?: boolean;
}) {
  const comparison = getComparisonById(comparisonId);

  if (!comparison) {
    return null;
  }

  const leftPlayer = getCanonicalPlayerById(
    comparison.playerA,
  ) as Player | null;
  const rightPlayer = getCanonicalPlayerById(
    comparison.playerB,
  ) as Player | null;

  if (!leftPlayer || !rightPlayer) {
    return null;
  }

  const viewComparisonPath = comparisonId;
  const leftLabel = comparison.contextA;
  const rightLabel = comparison.contextB;

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
                src={leftPlayer.imageUrl ?? "/images/default-avatar.png"}
                className="object-cover"
                alt={leftPlayer.fullName}
              />
            </div>
            <div className="absolute left-8 top-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-black/10 dark:ring-white/10">
              <Image
                sizes="48px"
                fill
                src={rightPlayer.imageUrl ?? "/images/default-avatar.png"}
                className="object-cover"
                alt={rightPlayer.fullName}
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
            className={`text-light-text-primary dark:text-dark-text-primary ${poppins.className} font-medium ${compactNames ? "text-xs" : "text-sm"} whitespace-normal break-words`}
          >
            {leftPlayer.fullName} x {rightPlayer.fullName}
          </p>
        </div>
      </div>

      <Link
        href={{
          pathname: `/${categoryType}/${viewComparisonPath}`,
          query: {
            comparisonId,
          },
        }}
      >
        <div className="relative flex items-center">
          <p
            className={`bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded px-3 py-1 border border-emerald-700/50 dark:border-emerald-300/20 transition-colors ${poppins.className} text-sm`}
          >
            View
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Compares;

import ComparisonCard from "./comparison-card";
import { ComparisonProps } from "../types/comparison-main-type";

import HomeTitleSection from "@/shared/components/section-title";


const Comparison = ({ comparisonIds, title }: ComparisonProps) => {
  return (
    <div className="py-2 flex flex-col gap-3">
      <HomeTitleSection title={title} />
      <div className="flex flex-row gap-3 overflow-x-auto scrollbar-none pb-4 flex-nowrap">
        {comparisonIds.map((comparisonId, index) => {
          return (
            <ComparisonCard
              key={`${comparisonId}-${index}`}
              comparisonId={comparisonId}
              cardWidth="w-55"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comparison;

import ComparisonCard from "./comparison-card";

import HomeTitleSection from "@/shared/components/section-title";

type ComparisonProps = {
  comparisonIds: string[];
  title: string;
  themeId: string;
};

const Comparison = ({ comparisonIds, title, themeId }: ComparisonProps) => {
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
              themeId={themeId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comparison;

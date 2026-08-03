import Image from "next/image";
import { poppins } from "@/app/font-icons/fonts";

import { Player } from "@/shared/types/stats-schema";



export const renderPlayerUi = (legend: Player) => (
  <div key={legend.id} className="flex flex-row">
    {(() => {
      const nameParts = legend.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] ?? legend.fullName;
      const lastName = nameParts.slice(1).join(" ") || nameParts[0] || legend.fullName;

      return (
        <div className="py-1 flex flex-col items-center gap-2">
          <div className="relative h-13 w-13 flex">
            <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-black/10 dark:ring-white/10">
              <Image
                src={legend.imageUrl ?? "/images/default-avatar.png"}
                alt={legend.fullName}
                fill
                sizes="68px"
                className="object-cover"
              />
            </div>
          </div>
          <p
            className={`w-23 text-center text-[11px] leading-tight tracking-wider ${poppins.className} text-light-text-primary dark:text-dark-text-primary`}
          >
            <span className="block">{firstName}</span>
            <span className="block">{lastName}</span>
          </p>
        </div>
      );
    })()}
  </div>
);
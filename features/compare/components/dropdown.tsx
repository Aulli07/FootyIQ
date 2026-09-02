import Image from "next/image";
import { useEffect, useState } from "react";
import { poppins } from "@/app/font-icons/fonts";
import { useTheme } from "next-themes";

import {
  formatSeasonContextValue,
  getCanonicalPlayerById,
} from "@/shared/utils/canonical-lookups";
import DropDownMain from "./dropdown-main";

import { useOnClickOutside } from "@/features/compare/utils/click-outside";
import { handleSelect } from "@/features/compare/utils/dropdown-handler";

import { DropDownPropsType } from "@/shared/types/dropdown-props";


export function DropDown(props: DropDownPropsType) {
  const [isOpen, setIsOpen] = useState(false);

  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>();

  const { containerRef, triggerRef, menuRef } = useOnClickOutside(
    setIsOpen,
    isOpen,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={`${props.type === "player" ? "relative w-44" : "relative w-full"} ${
        isOpen ? "z-[9999]" : "z-0"
      }`}
    >
      {props.type === "player" && (
        <div className="relative flex flex-col justify-center items-center gap-3">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className="w-full flex justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded-full"
          >
            {props.selectedPlayers &&
            props.selectedPlayers[props.playerSlot] ? (
              <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-emerald-500/35 dark:ring-emerald-400/30 flex justify-center items-center bg-light-background-card dark:bg-white/5 shadow-sm shadow-slate-300/45 dark:shadow-none backdrop-blur focus-within:ring-4 focus-within:ring-emerald-500/15 dark:focus-within:ring-emerald-400/15">
                <img
                  src={
                    getCanonicalPlayerById(
                      props.selectedPlayers?.[props.playerSlot] ?? "",
                    )?.imageUrl ?? "/images/default-avatar.png"
                  }
                  alt={
                    props.selectedPlayers?.[props.playerSlot] ??
                    "Selected Player"
                  }
                  className="object-cover relative rounded-full inset-0"
                />
              </div>
            ) : (
              <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-emerald-500/35 dark:ring-emerald-400/30 flex justify-center items-center bg-light-background-card dark:bg-white/5 shadow-sm shadow-slate-300/45 dark:shadow-none backdrop-blur focus-within:ring-4 focus-within:ring-emerald-500/15 dark:focus-within:ring-emerald-400/15">
                <img
                  src={
                    theme === "dark"
                      ? "/images/add.png"
                      : "/images/add-dark.png"
                  }
                  alt="add"
                  className="object-cover relative rounded-full h-13 w-13"
                />
              </div>
            )}
          </button>
          <p
            className={`flex justify-center items-center ${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-secondary mt-3`}
          >
            {getCanonicalPlayerById(
              props.selectedPlayers?.[props.playerSlot] ?? "",
            )?.fullName ?? props.label}
          </p>
        </div>
      )}

      {props.type === "season" && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full bg-light-background-card dark:bg-white/5 border border-light-ui-border dark:border-white/15 rounded-md px-3 py-2 text-left flex justify-between items-center ${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40`}
        >
          <span className="truncate pr-2">
            {formatSeasonContextValue(
              props.selectedSeasonLabels?.[props.playerSlot] ?? "SEASON",
            )}
          </span>
          <Image
            src="/images/arrow-drop-down.png"
            alt="arrow"
            width={16}
            height={16}
            className={`opacity-80 transition-transform ${isOpen ? "rotate-180" : ""} `}
          />
        </button>
      )}

      {typeof document !== "undefined" && isOpen && (
        <DropDownMain
          menuRef={menuRef}
          props={props}
          setIsOpen={setIsOpen}
          handleSelect={handleSelect}
        />
      )}
    </div>
  );
}

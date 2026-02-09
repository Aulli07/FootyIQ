import Image from "next/image";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

import { oswald, poppins } from "../fonts";
import { players } from "../data/players";
import { PlayerType } from "../types/players";
import { playerStats } from "../data/playerStats";

import SearchBar from "./search-bar";
import { totalComparedPlayers } from "../page";

import { AnimatePresence, motion } from "framer-motion";

type DropDownProps =
  | {
      type: "season";
      label: string;
      setSelectedSeasons: React.Dispatch<React.SetStateAction<Array<string>>>;
      playerSlot: number;
      selectedPlayers?: Array<PlayerType | null>;
      selectedSeasons: Array<string>;
    }
  | {
      type: "player";
      label: string;
      playerSlot: number;
      setSelectedPlayers: React.Dispatch<
        React.SetStateAction<Array<PlayerType | null>>
      >;
      selectedPlayers: Array<PlayerType | null>;
      setSelectedSeasons: React.Dispatch<React.SetStateAction<Array<string>>>;
    };

export function DropDown(props: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [isDropSearch, setIsDropSearch] = useState(false);

  const [selected, setSelected] = useState(props.label || "Select");
  const [menuRect, setMenuRect] = useState<{
    top: number;
    left: number;
    width: number;
  }>({
    top: 0,
    left: 0,
    width: 0,
  });

  let selectedPlayer =
    props.type === "player"
      ? (players.find((player) => player.name === selected) ?? null)
      : null;

  const seasonOptions =
    props.type === "season"
      ? (() => {
          const selectedId = props.selectedPlayers?.[props.playerSlot]?.id;
          const stats = selectedId
            ? playerStats.find((player) => player.id === selectedId)
            : undefined;

          const seasons = stats?.seasons?.map((s) => s.season) ?? [];
          return [...seasons];
        })()
      : [];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const updateMenuPosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    setMenuRect({
      top: rect.bottom - 28,
      left: rect.left + 20,
      width: rect.width,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      if (containerRef.current?.contains(target)) return;

      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updateMenuPosition();

    const onScrollOrResize = () => updateMenuPosition();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [isOpen]);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);

    if (props.type === "player") {
      const nextPlayer =
        players.find((player) => player.name === value) ?? null;
      props.setSelectedPlayers((prev) => {
        const next = [...prev];
        next[props.playerSlot] = nextPlayer;
        return next;
      });
    } else {
      props.setSelectedSeasons((prev) => {
        const next = [...prev];
        next[props.playerSlot] = value;
        return next;
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${props.type === "player" ? "relative w-44" : "relative w-full"} ${
        isOpen ? "z-[9999]" : "z-0"
      }`}
    >
      {props.type === "player" ? (
        <div className="relative flex flex-col justify-center items-center">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className="w-full flex justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded-full"
          >
            <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-emerald-400/30 flex justify-center items-center bg-black/20 focus-within:ring-4 focus-within:ring-emerald-400/15">
              <Image
                src={
                  props.selectedPlayers?.[props.playerSlot]?.image ??
                  "/images/add.png"
                }
                alt={selectedPlayer?.name ?? "add"}
                sizes="80px"
                fill
                className="object-cover relative"
              />
            </div>
          </button>
          <p
            className={`flex justify-center items-center ${poppins.className} text-sm text-white/80 mt-3`}
          >
            {props.selectedPlayers?.[props.playerSlot]?.name ?? props.label}
          </p>
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full bg-white/5 border border-white/15 rounded-md px-3 py-2 text-left flex justify-between items-center ${poppins.className} text-sm text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40`}
        >
          <span className="truncate pr-2">
            {props.selectedSeasons?.[props.playerSlot] ?? "All-time"}
          </span>
          <Image
            src="/images/arrow-drop-down.png"
            alt="arrow"
            width={16}
            height={16}
            className={`opacity-80 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                ref={menuRef}
                style={{ position: "absolute" }}
                className="absolute z-[99999] overflow-hidden rounded-md bg-black/50 backdrop-blur border-2 border-emerald-500 shadow-2xl ring-1 ring-white/10 max-h-100 overflow-y-auto w-full bottom-0"
              >
                {props.type === "season" ? (
                  seasonOptions.map((season) => (
                    <li
                      key={season}
                      onClick={() => handleSelect(season)}
                      className={`px-3 py-2 hover:bg-white/10 cursor-pointer ${poppins.className} text-sm text-white/90`}
                    >
                      {season}
                    </li>
                  ))
                ) : (
                  <div className="flex flex-col gap-4 p-2">
                    <SearchBar
                      setIsSearch={setIsDropSearch}
                      isSearch={isDropSearch}
                      comparedPlayers={totalComparedPlayers}
                    />
                    <div className="flex justify-start items-center">
                      <p
                        className={`${oswald.className} font-semibold text-md text-white`}
                      >
                        Suggested
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      {players.map((player) => (
                        <li
                          key={player.id}
                          onClick={() => handleSelect(player.name)}
                          className={`flex justify-start items-center gap-2 p-1 hover:bg-white/10 cursor-pointer ${poppins.className} text-sm text-white/90 border-b-1 border-white/20 `}
                        >
                          <div className="w-9 h-9 object-cover rounded-full relative shrink-0">
                            <Image
                              src={player.image}
                              alt={player.name}
                              fill
                              sizes="44px"
                              className="rounded-full object-cover"
                            />
                          </div>

                          <p
                            className={`truncate ${poppins.className} text-xs text-white/90 whitespace-nowrap leading-relaxed`}
                          >
                            {player.name}
                          </p>
                        </li>
                      ))}
                    </div>
                  </div>
                )}
              </motion.ul>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

import Image from "next/image";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

import { oswald, poppins } from "../app/fonts";
import { players } from "../app/data/players";
import { PlayerType } from "../app/types/players";
import { playerStats } from "../app/data/playerStats";
import { InputBar } from "./search-bar";

import { useTheme } from "next-themes";
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
      searchQuery: string;
      onSearchQueryChange: (query: string) => void;
      searchedPlayers: Array<PlayerType>;
    };

export function DropDown(props: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

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
      props.onSearchQueryChange("");
    }

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

  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>()

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
      {props.type === "player" ? (
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
                  src={props.selectedPlayers?.[props.playerSlot]?.image}
                  alt={props.selectedPlayers?.[props.playerSlot]?.name}
                  className="object-cover relative rounded-full inset-0"
                />
              </div>
            ) : (
              <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-emerald-500/35 dark:ring-emerald-400/30 flex justify-center items-center bg-light-background-card dark:bg-white/5 shadow-sm shadow-slate-300/45 dark:shadow-none backdrop-blur focus-within:ring-4 focus-within:ring-emerald-500/15 dark:focus-within:ring-emerald-400/15">
                <img
                  src={theme === "dark" ? "/images/add-dark.png" : "/images/add.png"}
                  alt="add"
                  className="object-cover relative rounded-full h-13 w-13"
                />
              </div>
            )}
          </button>
          <p
            className={`flex justify-center items-center ${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-secondary mt-3`}
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
          className={`w-full bg-light-background-card dark:bg-white/5 border border-light-ui-border dark:border-white/15 rounded-md px-3 py-2 text-left flex justify-between items-center ${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40`}
        >
          <span className="truncate pr-2">
            {props.selectedSeasons?.[props.playerSlot] ?? "Season"}
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

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 20 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                ref={menuRef}
                style={{ position: "absolute" }}
                className="absolute z-[99999] overflow-hidden rounded-md bg-light-background-card/98 dark:bg-black/50 backdrop-blur border border-light-ui-border dark:border-emerald-500 shadow-2xl ring-1 ring-slate-300/60 dark:ring-white/10 min-h-100 overflow-y-auto w-full bottom-0 mt-2"
              >
                {props.type === "season" ? (
                  seasonOptions.map((season) => (
                    <li
                      key={season}
                      onClick={() => handleSelect(season)}
                      className={`px-3 py-2 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer ${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-primary`}
                    >
                      {season}
                    </li>
                  ))
                ) : (
                  <div className="flex flex-col gap-4 p-2">
                    <InputBar
                      value={props.type === "player" ? props.searchQuery : ""}
                      placeholder="Search for players"
                      inputClassName="w-full h-12 rounded-full bg-light-background-main text-light-text-primary placeholder:text-light-text-muted border border-light-ui-border pl-12 pr-4 text-[14px] dark:bg-white/5 dark:text-dark-text-primary dark:placeholder:text-dark-text-muted dark:border-white/30"
                      onValueChange={(value) =>
                        props.type === "player" &&
                        props.onSearchQueryChange(value)
                      }
                    />

                    {props.type === "player" &&
                    props.searchQuery.trim() !== "" ? (
                      <>
                        <div className="flex justify-start items-center">
                          <p
                            className={`${oswald.className} font-semibold text-md text-light-text-primary dark:text-dark-text-primary`}
                          >
                            Matches
                          </p>
                        </div>

                        {props.searchedPlayers.length === 0 ? (
                          <p
                            className={`${poppins.className} text-xs text-light-text-muted dark:text-dark-text-muted px-1`}
                          >
                            {`No matches for "${props.searchQuery}"`}
                          </p>
                        ) : (
                          <div className="flex flex-col gap-2">
                            {props.searchedPlayers.map((player) => (
                              <li
                                key={player.id}
                                onClick={() => handleSelect(player.name)}
                                className={`flex justify-start items-center gap-2 p-1 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer ${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-primary border-b-1 border-light-ui-border dark:border-white/20 `}
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
                                  className={`truncate ${poppins.className} text-xs text-light-text-secondary dark:text-dark-text-primary whitespace-nowrap leading-relaxed`}
                                >
                                  {player.name}
                                </p>
                              </li>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex justify-start items-center">
                          <p
                            className={`${oswald.className} font-semibold text-md text-light-text-primary dark:text-dark-text-primary`}
                          >
                            Suggested
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          {players.map((player) => (
                            <li
                              key={player.id}
                              onClick={() => handleSelect(player.name)}
                              className={`flex justify-start items-center gap-2 p-1 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer ${poppins.className} text-sm text-light-text-secondary dark:text-dark-text-primary border-b-1 border-light-ui-border dark:border-white/20 `}
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
                                className={`truncate ${poppins.className} text-xs text-light-text-secondary dark:text-dark-text-primary whitespace-nowrap leading-relaxed`}
                              >
                                {player.name}
                              </p>
                            </li>
                          ))}
                        </div>
                      </>
                    )}
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

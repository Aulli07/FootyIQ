import Image from "next/image";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { poppins } from "../fonts";
import { createPortal } from "react-dom";

import { players } from "../data/players";
import { PlayerType } from "../types/players";
import { playerStats } from "../data/playerStats";

type DropDownProps =
  | {
      type: "season";
      label: string;
      setSelectedSeasons: React.Dispatch<React.SetStateAction<Array<string>>>;
      playerSlot: number;
      selectedPlayers?: Array<PlayerType | null>;
      // options: string[];
    }
  | {
      type: "player";
      label: string;
      // options: PlayerOption[];
      playerSlot: number;
      setSelectedPlayers: React.Dispatch<
        React.SetStateAction<Array<PlayerType | null>>
      >;
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

  const selectedPlayer =
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
          return ["All-time", ...seasons];
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
      // Handle season selection if needed
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${props.type === "player" ? "relative w-44" : "relative w-32"} ${
        isOpen ? "z-[9999]" : "z-0"
      }`}
    >
      {props.type === "player" ? (
        <div className="flex flex-col justify-center items-center">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className="w-full flex justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded-full"
          >
            <div className="relative h-23 w-23 rounded-full overflow-hidden ring-2 ring-white/10 flex justify-center items-center bg-black/20">
              <Image
                src={selectedPlayer?.image ?? "/images/add.png"}
                alt={selectedPlayer?.name ?? "add"}
                sizes="80px"
                fill
                className="object-cover relative"
              />
            </div>
          </button>
          <p className={`${poppins.className} text-sm text-white/80 mt-3`}>
            {selectedPlayer?.name ?? props.label}
          </p>
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full bg-white/5 border border-white/15 rounded-md px-3 py-2 text-left flex justify-between items-center ${poppins.className} text-sm text-white/90 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40`}
        >
          <span className="truncate pr-2">{selected}</span>
          <Image
            src="/images/arrow-drop-down.png"
            alt="arrow"
            width={16}
            height={16}
            className={`opacity-80 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <ul
            ref={menuRef}
            style={{
              position: "absolute",
              top: menuRect.top,
              left: menuRect.left,
              width: menuRect.width,
            }}
            className="z-[99999] overflow-hidden rounded-md bg-black/90 backdrop-blur border border-white/15 shadow-2xl ring-1 ring-white/10 max-h-60 overflow-y-auto"
          >
            {props.type === "season"
              ? seasonOptions.map((season) => (
                  <li
                    key={season}
                    onClick={() => handleSelect(season)}
                    className={`px-3 py-2 hover:bg-white/10 cursor-pointer ${poppins.className} text-sm text-white/90`}
                  >
                    {season}
                  </li>
                ))
              : // playerStats.find((player) => selectedPlayers?.id == player.id)?.seasons.map((season) => (
                //     <li
                //       key={season.season}
                //       onClick={() => handleSelect(season.season)}
                //       className={`px-3 py-2 hover:bg-white/10 cursor-pointer ${poppins.className} text-sm text-white/90`}
                //     >
                //       {season.season}
                //     </li>
                //   ))
                players.map((player) => (
                  <li
                    key={player.id}
                    onClick={() => handleSelect(player.name)}
                    className={`flex flex-row justify-start items-center gap-2 py-2 px-2 hover:bg-white/10 cursor-pointer ${poppins.className} text-sm text-white/90`}
                  >
                    <div className="w-11 h-11 object-cover rounded-full relative shrink-0">
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
          </ul>,
          document.body,
        )}
    </div>
  );
}

// function SeasonDropDown({selectedPlayer} : { selectedPlayer : PlayerType }) {
//   playerStats.forEach((player) => {
//     player
//     // if (selectedPlayer?.id == player.id) {
//     //   player.
//     // }
//   })
//   // playerStats.find(player => selectedPlayer?.id === player.id)
// }

"use client";

// Importing the font families, image modules, react change modules and modal modules for this page
import { oswald, poppins } from "../fonts";
import { useState } from "react";
import { DropDown } from "../components/dropdown";

// This is the types for the season dropdown default content for users to decide from
type fieldBoxType = {
  fieldText: string;
  options: string[];
};

// Assigning the season dropdown default content to this variable
const fieldBox = {
  fieldText: "Search a player",
  options: ["2023/24", "2022/23", "2021/22", "2020/21"],
};

// This is the specific types for each player chosen from the
// player dropdown default content with specific details to make use of
export type PlayerOption = {
  name: string;
  image: string;
  id: string;
  stats: {
    Goals: number;
    Assists: number;
    ShotsOnTarget: number;
  };
};

// Assigning the player dropdown default content to this variable
const playerFieldBox = {
  fieldText: "Select Player",
  options: [
    {
      name: "Cristiano Ronaldo",
      image: "/images/ronaldo.jpg",
      id: "ronaldo",
      stats: {
        Goals: 409,
        Assists: 20,
        ShotsOnTarget: 10,
      },
    },
    {
      name: "Lionel Messi",
      image: "/images/messi.jpg",
      id: "messi",
      stats: {
        Goals: 328,
        Assists: 10,
        ShotsOnTarget: 10,
      },
    },
  ],
};


// This is the types for each player's stats. N.B: this will be added to the player details type element
type playerStatType = {
  field: string;
  player1: number;
  player2: number;
  better: () => string;
};

// Assigning random stats for players to this variable
const playerStats = [
  {
    field: "Goals",
    player1: 46,
    player2: 18,
    better() {
      return this.player1 > this.player2 ? "text-emerald-500" : "text-white/80";
    },
  },
  {
    field: "Assists",
    player1: 46,
    player2: 18,
    better() {
      return this.player1 > this.player2 ? "text-emerald-500" : "text-white/80";
    },
  },
  {
    field: "Shots",
    player1: 46,
    player2: 18,
    better() {
      return this.player1 > this.player2 ? "text-emerald-500" : "text-white/80";
    },
  },
  {
    field: "Shots on Target",
    player1: 46,
    player2: 18,
    better() {
      return this.player1 > this.player2 ? "text-emerald-500" : "text-white/80";
    },
  },
  {
    field: "Accurate Passes",
    player1: 46,
    player2: 18,
    better() {
      return this.player1 > this.player2 ? "text-emerald-500" : "text-white/80";
    },
  },
];

// Component to display each stats and the values of both sides

function AddFieldBox({
  fieldBoxDetails,
  playerSlot,
  selectedPlayers,
  setSelectedPlayers,
}: {
  fieldBoxDetails: fieldBoxType;
  playerSlot: number;
  selectedPlayers: Array<PlayerOption | null>;
  setSelectedPlayers: React.Dispatch<
    React.SetStateAction<Array<PlayerOption | null>>
  >;
}) {
  return (
    <div
      className={`relative z-0 focus-within:z-[9999] flex flex-col items-center gap-3 rounded-lg p-4 border border-white/30 bg-black/20 ${poppins.className} shadow-lg backdrop-blur`}
    >
      <DropDown
        type="player"
        label="Player"
        options={playerFieldBox.options}
        playerSlot={playerSlot}
        setSelectedPlayers={setSelectedPlayers}
      />
      
      <DropDown
        type="season"
        label="Season"
        options={fieldBoxDetails.options}
      />
    </div>
  );
}

// type DropDownProps =
//   | {
//       type: "season";
//       label: string;
//       options: string[];
//     }
//   | {
//       type: "player";
//       label: string;
//       options: PlayerOption[];
//       playerSlot: number;
//       setSelectedPlayers: React.Dispatch<
//         React.SetStateAction<Array<PlayerOption | null>>
//       >;
//     };

// function DropDown(props: DropDownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState(props.label || "Select");
//   const [menuRect, setMenuRect] = useState<{
//     top: number;
//     left: number;
//     width: number;
//   }>({
//     top: 0,
//     left: 0,
//     width: 0,
//   });

//   const selectedPlayer =
//     props.type === "player"
//       ? (props.options.find((opt) => opt.name === selected) ?? null)
//       : null;

//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const triggerRef = useRef<HTMLButtonElement | null>(null);
//   const menuRef = useRef<HTMLUListElement | null>(null);

//   const updateMenuPosition = () => {
//     const trigger = triggerRef.current;
//     if (!trigger) return;

//     const rect = trigger.getBoundingClientRect();
//     setMenuRect({
//       top: rect.bottom + 8,
//       left: rect.left,
//       width: rect.width,
//     });
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Node | null;
//       if (!target) return;

//       if (triggerRef.current?.contains(target)) return;
//       if (menuRef.current?.contains(target)) return;
//       if (containerRef.current?.contains(target)) return;

//       setIsOpen(false);
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useLayoutEffect(() => {
//     if (!isOpen) return;
//     updateMenuPosition();

//     const onScrollOrResize = () => updateMenuPosition();
//     window.addEventListener("resize", onScrollOrResize);
//     window.addEventListener("scroll", onScrollOrResize, true);
//     return () => {
//       window.removeEventListener("resize", onScrollOrResize);
//       window.removeEventListener("scroll", onScrollOrResize, true);
//     };
//   }, [isOpen]);

//   const handleSelect = (value: string) => {
//     setSelected(value);
//     setIsOpen(false);

//     if (props.type === "player") {
//       const nextPlayer =
//         props.options.find((opt) => opt.name === value) ?? null;
//       props.setSelectedPlayers((prev) => {
//         const next = [...prev];
//         next[props.playerSlot] = nextPlayer;
//         return next;
//       });
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={`${props.type === "player" ? "relative w-44" : "relative w-32"} ${
//         isOpen ? "z-[9999]" : "z-0"
//       }`}
//     >
//       {props.type === "player" ? (
//         <div className="flex flex-col justify-center items-center">
//           <button
//             ref={triggerRef}
//             type="button"
//             onClick={() => setIsOpen((v) => !v)}
//             aria-haspopup="listbox"
//             aria-expanded={isOpen}
//             className="w-full flex justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded-full"
//           >
//             <div className="relative h-23 w-23 rounded-full overflow-hidden ring-2 ring-white/10 flex justify-center items-center bg-black/20">
//               <Image
//                 src={selectedPlayer?.image ?? "/images/add.png"}
//                 alt={selectedPlayer?.name ?? "add"}
//                 sizes="80px"
//                 fill
//                 className="object-cover relative"
//               />
//             </div>

//             {/* <p className={`${poppins.className} text-xs text-white/80 mt-3`}>
//               {fieldBoxDetails.fieldText}
//             </p> */}
//           </button>
//           <p className={`${poppins.className} text-sm text-white/80 mt-3`}>
//             {selectedPlayer?.name ?? "Search a player"}
//           </p>
//         </div>
//       ) : (
//         <button
//           ref={triggerRef}
//           type="button"
//           onClick={() => setIsOpen((v) => !v)}
//           aria-haspopup="listbox"
//           aria-expanded={isOpen}
//           className={`w-full bg-white/5 border border-white/15 rounded-md px-3 py-2 text-left flex justify-between items-center ${poppins.className} text-sm text-white/90 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40`}
//         >
//           <span className="truncate pr-2">{selected}</span>
//           <Image
//             src="/images/arrow-drop-down.png"
//             alt="arrow"
//             width={16}
//             height={16}
//             className={`opacity-80 transition-transform ${isOpen ? "rotate-180" : ""}`}
//           />
//         </button>
//       )}

//       {isOpen &&
//         typeof document !== "undefined" &&
//         createPortal(
//           <ul
//             ref={menuRef}
//             style={{
//               position: "fixed",
//               top: menuRect.top,
//               left: menuRect.left,
//               width: menuRect.width,
//             }}
//             className="z-[99999] overflow-hidden rounded-md bg-black/90 backdrop-blur border border-white/15 shadow-2xl ring-1 ring-white/10 max-h-60 overflow-y-auto"
//           >
//             {props.type === "season"
//               ? props.options.map((option) => (
//                   <li
//                     key={option}
//                     onClick={() => handleSelect(option)}
//                     className={`px-3 py-2 hover:bg-white/10 cursor-pointer ${poppins.className} text-sm text-white/90`}
//                   >
//                     {option}
//                   </li>
//                 ))
//               : props.options.map((option) => (
//                   <li
//                     key={option.id}
//                     onClick={() => handleSelect(option.name)}
//                     className={`flex flex-row justify-start items-center gap-2 py-2 px-2 hover:bg-white/10 cursor-pointer ${poppins.className} text-sm text-white/90`}
//                   >
//                     <div className="w-11 h-11 object-cover rounded-full relative shrink-0">
//                       <Image
//                         src={option.image}
//                         alt={option.name}
//                         fill
//                         sizes="44px"
//                         className="rounded-full object-cover"
//                       />
//                     </div>

//                     <p
//                       className={`truncate ${poppins.className} text-xs text-white/90 whitespace-nowrap leading-relaxed`}
//                     >
//                       {option.name}
//                     </p>
//                   </li>
//                 ))}
//           </ul>,
//           document.body,
//         )}
//     </div>
//   );
// }

function ShowStat({ players }: { players: Array<PlayerOption | null> }) {
  const statCheckers = Object.keys(playerFieldBox.options[0].stats) as Array<
    keyof PlayerOption["stats"]
  >;

  return (
    <>
      {statCheckers.map((check, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-3 px-3"
        >
          <p
            className={`text-emerald-500 ${poppins.className} text-md font-semibold`}
          >
            {players[0] ? players[0].stats[check] : "-"}
          </p>
          <p
            className={`text-white ${poppins.className} text-md font-semibold`}
          >
            {check}
          </p>
          <p
            className={`text-white/80 ${poppins.className} text-md font-semibold`}
          >
            {players[1] ? players[1].stats[check] : "-"}
          </p>
        </div>
      ))}
    </>

    // <div className="flex justify-between items-center py-3 px-3">
    //   <p
    //     className={`text-emerald-500 ${poppins.className} text-md font-semibold ${stat.better()}`}
    //   >
    //     {stat.player1}
    //   </p>
    //   <p
    //     className={`text-white ${poppins.className} text-md font-semibold ${stat.better()}`}
    //   >
    //     {stat.field}
    //   </p>
    //   <p
    //     className={`text-white/80 ${poppins.className} text-md font-semibold ${stat.better()}`}
    //   >
    //     {stat.player2}
    //   </p>
    // </div>
  );
}

const Compare = () => {
  const [selectedPlayers, setSelectedPlayers] = useState<
    Array<PlayerOption | null>
  >([null, null]);

  return (
    <main className="flex flex-col w-full px-3 h-full pt-10 overflow-auto">
      <div className="gap-3 flex flex-col gap-4">
        <div className="relative flex justify-center items-center mb-5">
          <p className={`text-white ${oswald.className} text-lg font-semibold`}>
            Player Comparison
          </p>
          <img
            src="/images/swap-fields.png"
            alt="no pic"
            className="absolute right-0 top-1/2 object-cover -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 px-2">
          <AddFieldBox
            fieldBoxDetails={fieldBox}
            playerSlot={0}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
          />
          <AddFieldBox
            fieldBoxDetails={fieldBox}
            playerSlot={1}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
          />
        </div>
        <div className="relative z-0 text-white/70 flex flex-col text-center gap-3 px-3">
          <div className="relative z-0 flex flex-col gap-4 p-2 w-full border border-white/20 rounded-lg bg-white/5 shadow-lg backdrop-blur">
            <ShowStat players={selectedPlayers} />
          </div>
        </div>

        <div className="flex flex-col gap-3 h-full w-full">
          <div className="flex justify-center items-center">
            <p
              className={`text-white ${oswald.className} text-lg font-semibold`}
            >
              Comments
            </p>
          </div>

          <div className="w-full border border-white/15 rounded-xl bg-white/5 shadow-lg backdrop-blur p-4">
            <p
              className={`text-white/60 ${poppins.className} text-sm text-center`}
            >
              No comments yet.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Compare;

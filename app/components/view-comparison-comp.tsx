"use client";

import { players } from "../data/players";
import { oswald, poppins } from "../fonts";
import ShowStat from "./show-stat";

import Image from "next/image";

import { PlayerType } from "../types/players";
import ShowFullStat from "./show-stat";



// const generalStats = [
//   { key: "age", label: "Age" }, 
//   { key: "heightCm", label: "Height" },
//   { key: "position", label: "Position"},
//   { key: "team", label: "Team"},
//   { key: "footyRating", label: "Footy IQ Rating"}
// ]

// const attackingStats = [
//   { key: "goals", label: "Goals"},
//   { key: 'assists', label: "Assists"},
//   { key: "totalShots", label: "Total Shots"},
//   { key: "shotsOnTarget", label: "Shots On Target"},
//   { key: "chancesCreated", label: "Big Chances Created"},
//   { key: "dribbles", label: "Successful Dribbles"}
// ]

// const defendingStats = [
//   { key: "interceptions", label: "Interceptions"},
//   { key: "tackles", label: "Tackles"},
//   { key: "dribbledPast", label: "Dribbled Past"},
//   { key: "clearances", label: "Clearances"},
//   { key: "groundDuelsWon", label: "Ground Duels Won"},
//   { key: "blockedShots", label: "Blocked Shots"}
// ]

// const cardStats = [
//   { key: "yellowCards", label: "Yellow Cards"},
//   { key: "redCards", label: "Red Cards"}
// ]

// function GeneralStats({ players, seasons }: { players: Array<PlayerType | null>; seasons: Array<string> }) {
//   return (
    
//     <div className="flex flex-col gap-2 w-full relative">
//       {generalStats.map((stat, index) => (
//         <StatBlock
//           key={stat.key}
//           identifier={stat.key}
//           label={stat.label}
//           playerA={players[0]}
//           playerB={players[1]}
//           seasonA={seasons[0]}
//           seasonB={seasons[1]}
//           isGeneral = {true}
//         />
//       ))}
//     </div>
//   )
// }


function FixedFieldBox({
  player,
  season,
}: {
  player: PlayerType;
  season: string;
}) {
  return (
    <div
      className={`relative z-0 h-55 flex flex-col justify-center items-center gap-3 rounded-lg px-2 border border-white/30 bg-black/20 ${poppins.className} shadow-lg backdrop-blur`}
    >
      <div className="relative flex flex-col justify-center items-center">
        <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-emerald-400/30 flex justify-center items-center bg-black/20">
          <Image
            src={player.image}
            alt={player.name}
            sizes="80px"
            fill
            className="object-cover relative"
          />
        </div>
        <p
          className={`flex justify-center items-center ${poppins.className} text-sm text-white/80 mt-3`}
        >
          {player.name}
        </p>
      </div>
      <div
        className={`w-full bg-white/5 border border-white/15 rounded-md px-3 py-2 text-left flex justify-center items-center ${poppins.className} text-sm text-white/90`}
      >
        <span className="truncate pr-2">{season}</span>
      </div>
    </div>
  );
}

export default function ViewComparison({
  leftPlayerId,
  rightPlayerId,
}: {
  leftPlayerId: string | null;
  rightPlayerId: string | null;
}) {
  const leftPlayer = players.find((p) => p.id === leftPlayerId);
  const rightPlayer = players.find((p) => p.id === rightPlayerId);

  if (!leftPlayer || !rightPlayer) {
    return <div className="p-4">Player not found</div>;
  }

  // const compareStatsField = ["General", "Attacking", "Defending", "Cards", "AI Insights"];
  
  return (
    <main className="p-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-start items-center gap-4 text-white border-b border-white/70 pb-6">
          <img
            src="/images/go-back-light.png"
            alt="go back"
            className="h-8 w-8 object-cover cursor-pointer"
          />
          <p className={`text-md ${oswald.className} font-semibold`}>
            {leftPlayer.id.toUpperCase()} & {rightPlayer.id.toUpperCase()}{" "}
            COMPARISON
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div className="grid grid-cols-2 gap-3 px-2">
            <FixedFieldBox player={leftPlayer} season="23/24" />
            <FixedFieldBox player={rightPlayer} season="23/24" />
          </div>

          <ShowFullStat
            players={[leftPlayer, rightPlayer]}
            seasons={["23/24", "23/24"]}
          />

          {/* <div className="flex flex-col gap-3 mt-3">
            <div className="flex flex-row gap-3 w-full relative overflow-x-auto pb-4">
              {compareStatsField.map((field, index) => (
                <div key={index} className="flex justify-center items-center px-3 py-1 bg-gray-200/30 rounded-3xl border-2 h-10 border-white/70">
                  <span
                    className={`${poppins.className} text-xs font-medium tracking-wide w-full whitespace-nowrap`}
                  >
                    {field}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className="relative z-0 text-white/70 flex flex-col text-center gap-3 px-3">
            <div className="relative z-0 flex flex-col gap-4 p-2 w-full border border-white/20 rounded-lg bg-white/5 shadow-lg backdrop-blur">
              <ShowStat
                players={[leftPlayer, rightPlayer]}
                seasons={["23/24", "23/24"]}
              />
            </div>
          </div> */}
        </div>
      </div>
    </main>
  )
}

"use client";

import Image from "next/image";
import { useState } from "react";

import { comparisonList } from "../components/app-shell";
import Compares from "../components/compares";
import totalCompares from "../utils/total-compares";

const totalComparedPlayers = totalCompares();
// type ComparableSearch = {
//   id: string;
//   image: string;
//   name: string;
//   age: number;
//   height: number;
//   nationality: string;
//   rating: number;
// };

// type searchBarProps<T extends ComparableSearch> = {
//   comparisonList : T[]
// }

// const SearchBar = <T extends ComparableSearch,>({
//   comparisonList
// } : searchBarProps<T>) => {
//   const [inputText, setInputText] = useState("");
//   const foundPlayers = filterPlayers(inputText, comparisonList);

//   return (
//     <div className="px-2 items-center flex relative flex-col gap-2">
//       <div className="flex items-center relative flex-1 w-full h-15 ">
//         <div className="w-5 h-5 absolute left-5 z-1 top-1/2 -translate-y-1/2">
//           <Image
//             src="/images/search-icon.png"
//             fill
//             sizes="32px"
//             alt="search"
//             className="object-cover"
//           />
//         </div>
//         <InputBar setInputText={setInputText} />
//       </div>

//       {inputText !== "" ? (
//         <DisplayFoundPlayers
//           foundPlayers={foundPlayers}
//           emptySearch={`No matches for "${inputText}"`}
//         />
//       ) : (
//         false
//       )}
//     </div>
//   );
// }

// type inputBarProps = {
//   setInputText: React.Dispatch<React.SetStateAction<string>>;
// };

// function InputBar({ setInputText }: inputBarProps) {
//   return (
//     <input
//       type="text"
//       placeholder="Search for players or clubs"
//       className="relative w-full h-14 rounded-full border border-0 py-4 pr-5 pl-12 bg-white/25 font-sans text-md min-w-0 outline-0"
//       onChange={(e) => setInputText(e.target.value)}
//     />
//   );
// }

// function DisplayFoundPlayers({
//   foundPlayers,
//   emptySearch,
// }: {
//   foundPlayers: Array<ComparableSearch>;
//   emptySearch: string;
// }) {
//   return (
//     <div className="bg-white/30 p-4 w-full z-1 rounded-lg backdrop-blur">
//       {foundPlayers.length === 0 ? (
//         <p className="text-lg font-sans">
//           {emptySearch}
//         </p>
//       ) : null}
//       {foundPlayers.map((player, index) => (
//         <div className="flex items-center gap-3 py-1 hover:bg-gray-500 rounded-full" key={index}>
//           <div className="relative w-10 h-10">
//             <Image
//               src={player.image}
//               alt="no_img"
//               sizes="32px"
//               fill
//               className="object-cover relative rounded-full"
//             />
//           </div>
//           <span className="font-sans text-lg text-white">{player.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// function filterPlayers(input: string, comparisonList: Array<ComparableSearch>) {
//   input = input.toLowerCase();

//   let foundPlayers = comparisonList.filter((player) =>
//     containsAllPlayers(input, player.name),
//   );

//   return foundPlayers;
// }

// function containsAllPlayers(input: string, description: string) {
//   input = input.toLowerCase();
//   description = description.toLowerCase();

//   let descriptionList = description.split(" ");
//   return descriptionList.some((text) => text.startsWith(input));
// }

// export default SearchBar;

type ComparableSearch = {
  id: string;
  image: string;
  name: string;
  age: number;
  height: number;
  nationality: string;
  rating: number;
  positionPlayed: string;
};

// type searchBarProps<T extends ComparableSearch> = {
//   comparisonList : T[]
// }

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const foundPlayers = filterPlayers(inputText);

  return (
    <div className="px-5 flex flex-col gap-3 h-[calc(100vh-88px)] pb-24 overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 opacity-80">
          <div className="relative h-5 w-5">
            <Image
              src="/images/search-icon.png"
              fill
              sizes="20px"
              alt="search"
              className="object-cover"
            />
          </div>
        </div>

        <InputBar setInputText={setInputText} />
      </div>

      {/* <p className="text-xs text-white/50 px-1">
        Try searching a player name (e.g. “Messi”)
      </p> */}

      {inputText.trim() !== "" ? (
        <div className="flex-1 min-h-0">
          <DisplayFoundPlayers
            foundPlayers={foundPlayers}
            emptySearch={`No matches for "${inputText}"`}
          />
        </div>
      ) : (
        <div className="flex-1 min-h-0" />
      )}
    </div>
  );
}

type inputBarProps = {
  setInputText: React.Dispatch<React.SetStateAction<string>>;
};

function InputBar({ setInputText }: inputBarProps) {
  return (
    <input
      type="text"
      placeholder="Search for players or clubs"
      className="w-full h-14 rounded-2xl bg-white/5 text-white placeholder:text-white/40 border border-white/10 pl-12 pr-4 text-[15px] font-medium shadow-lg backdrop-blur outline-none transition focus:border-emerald-400/40 focus:ring-4 focus:ring-emerald-400/15"
      onChange={(e) => setInputText(e.target.value)}
    />
  );
}

function DisplayFoundPlayers({
  foundPlayers,
  emptySearch,
}: {
  foundPlayers: Array<ComparableSearch>;
  emptySearch: string;
}) {
  const foundPlayerComparisons: Array<Array<ComparableSearch>> = [];

  foundPlayers.forEach((player) => {
    totalComparedPlayers.forEach((compares) => {
      let left = compares[0];
      let right = compares[1];

      if (player.id == left.id || player.id == right.id) {
        foundPlayerComparisons.push(compares);
      }
    });
  });

  return (
    <div className="w-full h-full rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-xs tracking-wide text-white/60">
          {foundPlayers.length === 0 ? "No results" : "Matches"}
        </p>
      </div>

      {foundPlayers.length === 0 ? (
        <div className="px-4 py-4">
          <p className="text-sm text-white/80">{emptySearch}</p>
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-auto">
          <Compares compareList={foundPlayerComparisons} />
        </div>
      )}
    </div>
  );
}

function filterPlayers(input: string) {
  input = input.toLowerCase();

  let foundPlayers = comparisonList.filter((player) =>
    containsAllPlayers(input, player.name),
  );

  return foundPlayers;
}

function containsAllPlayers(input: string, description: string) {
  input = input.toLowerCase();
  description = description.toLowerCase();

  let descriptionList = description.split(" ");
  return descriptionList.some((text) => text.startsWith(input));
}

export default SearchBar;

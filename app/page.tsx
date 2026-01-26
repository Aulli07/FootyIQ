"use client";

import React from "react";
import Image from "next/image";
import Comparison from "./components/comparison-card";
import { comparisonList } from "./components/app-shell";
import Compares from "./components/compares";
import totalCompares from "./utils/total-compares";
import { oswald } from "./fonts";

type PlayerDataType = {
  id: string;
  field: string;
  status: string;
  name: string;
  age: number;
  image: string;
  active: boolean;
  label: string;
  era: string;
  nationality: string;
  club: string;
  positionPlayed: string;
  rating: number;
  height: number;
};

function HomePage() {
  // PlayerDataType[][]
  let playersClash: Array<PlayerDataType> = [];

  function getLegends(comparisonList: Array<PlayerDataType>) {
    let compareBreak = 0;
    const legendsList: Array<Array<PlayerDataType>> = [];
    comparisonList.forEach((comparedPerson) => {
      if (comparedPerson.rating >= 90) {
        playersClash.push(comparedPerson);
        compareBreak++;

        if (compareBreak % 2 == 0) {
          legendsList.push(playersClash);
          playersClash = [];
        }
      }
    });

    return legendsList;
  }

  function getHotProspects(comparisonList: Array<PlayerDataType>) {
    let compareBreak = 0;
    const hotProspectsList: Array<Array<PlayerDataType>> = [];
    comparisonList.forEach((comparedPerson) => {
      if (comparedPerson.rating >= 80 && comparedPerson.rating < 90) {
        playersClash.push(comparedPerson);
        compareBreak++;

        if (compareBreak % 2 == 0) {
          hotProspectsList.push(playersClash);
          playersClash = [];
        }
      }
    });

    return hotProspectsList;
  }

  function Searches() {
    // const searchesList: Array<Array<PlayerDataType>> = [];

    // for (let i = 0; i < comparisonList.length; i++) {
    //   for (let j = i + 1; j < comparisonList.length; j++) {
    //     const comparedPerson = comparisonList[i];
    //     const toComparePerson = comparisonList[j];

    //     if (comparedPerson.id !== toComparePerson.id) {
    //       searchesList.push([comparedPerson, toComparePerson]);
    //     }
    //   }
    // }

    const totalCompared = totalCompares();

    const randomList: Array<Array<PlayerDataType>> = [];
    for (let i = 0; i < 5; i++) {
      let randomNum = Math.floor(Math.random() * totalCompared.length);
      randomList.push(totalCompared[randomNum]);
    }

    return (
      <div className="px-5 gap-3 flex flex-col">
        <div className="flex items-center gap-2">
          <p className={`text-lg tracking-wide ${oswald.className} text-white font-heading`}>
            Top Searches
          </p>
        </div>
        <Compares compareList={randomList} />
        {/* {randomList.map((players, index) => {
          const left = players[0];
          const right = players[1];

          return (
            <div
              key={`${left.id}-${right.id}-${index}`}
              className="relative flex flex-row items-center w-full border border-white/10 bg-white/5 shadow-lg backdrop-blur rounded-xl p-3"
            >
              <div className="flex flex-col gap-1 w-full min-w-0">
                <div className="flex flex-row items-center">
                  <div className="relative w-[88px] h-12">
                    <div className="absolute left-0 top-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/10">
                      <Image
                        sizes="48px"
                        fill
                        src={left.image}
                        className="object-cover"
                        alt={left.name}
                      />
                    </div>
                    <div className="absolute left-8 top-0 h-12 w-12 rounded-full overflow-hidden ring-2 ring-white/10">
                      <Image
                        sizes="48px"
                        fill
                        src={right.image}
                        className="object-cover"
                        alt={right.name}
                      />
                    </div>

                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="h-6 w-6 rounded-full bg-black/35 border border-white/15 backdrop-blur flex items-center justify-center shadow-sm">
                        <span className="text-[9px] font-sans tracking-widest text-white/90">
                          VS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <p className="text-white font-medium font-sans text-sm truncate">
                    {left.name} x {right.name}
                  </p>
                </div>

                <div className="text-white/90 font-sans text-xs">
                  3K searches
                </div>
              </div>

              <div className="relative flex items-center">
                <p className="bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded px-3 py-1 font-sans text-sm">
                  View
                </p>
              </div>
            </div>
          );
        })} */}
      </div>
    );
  }

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
  //   foundPlayers: Array<PlayerDataType>;
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

  // function filterPlayers(input: string) {
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

  // function SearchBar() {
  //   const [inputText, setInputText] = useState("");
  //   const foundPlayers = filterPlayers(inputText);

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

  return (
    <div className="flex flex-col gap-2">
      {/* <SearchBar comparisonList={comparisonList} /> */}
      <Comparison legendsData={getLegends(comparisonList)} title="Legends" />
      <Comparison
        legendsData={getHotProspects(comparisonList)}
        title="Hot Prospects"
      />
      <Comparison
        legendsData={getHotProspects(comparisonList)}
        title="Hot Prospects"
      />
      <Searches />
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full pl-2 pt-2 pb-20 text-white">
      <HomePage />
    </main>
  );
}

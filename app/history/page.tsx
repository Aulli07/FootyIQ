"use client";

import { useState } from "react";

import Header from "../components/header";
import SearchBar from "../components/search-bar";

import { totalComparedPlayers } from "../page";
import Compares from "../components/top-compare-cards";

import { oswald } from "../fonts";

import Image from "next/image";

const History = () => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <main className="w-full px-3 pt-2 text-white">
      <div className="flex justify-start items-center gap-2 text-white mb-5">
        {/* <img
          src="/images/go-back-light.png"
          alt="go back"
          className="h-8 w-8 object-cover cursor-pointer"
        /> */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="cursor-pointer"
        >
          <Image
            src="/images/go-back-light.png"
            alt="go back"
            width={30}
            height={30}
            className="object-cover"
          />
        </button>
        <p className={`text-xl ${oswald.className} font-semibold py-3`}>
          History
        </p>
      </div>
      <SearchBar
        setIsSearch={setIsSearch}
        isSearch={isSearch}
        comparedPlayers={totalComparedPlayers}
      />
      <div className="px-3 mt-3">
        <Compares compareList={totalComparedPlayers.slice(0, 10)} />
      </div>
    </main>
  );
};

export default History;

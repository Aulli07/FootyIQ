// "use client";

// import { useState } from "react";

// import Header from "../../components/header";
// import SearchBar from "../../components/search-bar";

// import { totalComparedPlayers } from "../page";
// import Compares from "../../components/top-compare-cards";

// import { oswald } from "../fonts";

// import Image from "next/image";

const History = () => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <main className="w-full px-3 pt-2 text-white">
      {/* <Header headerText="History" /> */}
      <SearchBar
        setIsSearch={setIsSearch}
        isSearch={isSearch}
        comparedPlayers={totalComparedPlayers}
      />
      <div className="px-3 mt-3">
        <Compares compareList={totalComparedPlayers.slice(0, 10)} categoryType="history"/>
      </div>
    </main>
  );
};

export default History;

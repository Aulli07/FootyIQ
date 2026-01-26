"use client";

import React, { useState } from "react";

import Header from "./header";
import Footer from "./footer";


export const comparisonList = [
  {
    id: "ronaldo",
    field: "Player",
    status: "Legend",
    name: "Cristiano Ronaldo",
    age: 40,
    image: "/images/ronaldo.jpg",
    active: true,
    label: "Player",
    era: "2014-2022",
    nationality: "Portugal",
    club: "Al Nassr",
    positionPlayed: "Forward",
    rating: 96,
    height: 183,
  },
  {
    id: "messi",
    field: "Player",
    status: "Legend",
    name: "Lionel Messi",
    age: 37,
    image: "/images/messi.jpg",
    active: true,
    label: "Player",
    era: "2014-2022",
    nationality: "Argentina",
    club: "Inter Miami",
    positionPlayed: "Forward",
    rating: 96,
    height: 180,
  },
  {
    id: "neymar",
    field: "Player",
    status: "Legend",
    name: "Neymar Jr",
    age: 32,
    image: "/images/neymar.jpg",
    active: true,
    label: "Player",
    era: "2014-2022",
    nationality: "Brazil",
    club: "Santos FC",
    positionPlayed: "Forward",
    rating: 93,
    height: 175,
  },
  {
    id: "benzema",
    field: "Player",
    status: "Legend",
    name: "Karim Benzema",
    age: 35,
    image: "/images/benzema.jpg",
    active: true,
    label: "Player",
    era: "2014-2022",
    nationality: "France",
    club: "Al-Ittihad",
    positionPlayed: "Forward",
    rating: 94,
    height: 185,
  },
  {
    id: "doue",
    field: "Player",
    status: "Top Prospect",
    name: "Desire Doue",
    age: 19,
    image: "/images/desire-doue.png",
    active: true,
    label: "Player",
    era: "2020-2024",
    nationality: "France",
    club: "Paris Saint-Germain",
    positionPlayed: "Forward",
    rating: 90,
    height: 178,
  },
  {
    id: "benzema",
    field: "Player",
    status: "Legend",
    name: "Karim Benzema",
    age: 35,
    image: "/images/benzema.jpg",
    active: true,
    label: "Player",
    era: "2014-2022",
    nationality: "France",
    club: "Al-Ittihad",
    positionPlayed: "Forward",
    rating: 94,
    height: 185,
  },
  {
    id: "doue",
    field: "Player",
    status: "Top Prospect",
    name: "Desire Doue",
    age: 19,
    image: "/images/desire-doue.png",
    active: true,
    label: "Player",
    era: "2020-2024",
    nationality: "France",
    club: "Paris Saint-Germain",
    positionPlayed: "Forward",
    rating: 80,
    height: 178,
  },
  {
    id: "yamal",
    field: "Player",
    status: "Top Prospect",
    name: "Lamine Yamal",
    age: 18,
    image: "/images/lamine-yamal.jpg",
    active: true,
    label: "Player",
    era: "2021-2024",
    nationality: "Spain",
    club: "FC Barcelona",
    positionPlayed: "Forward",
    rating: 85,
    height: 170,
  },
  {
    id: "yamal",
    field: "Player",
    status: "Top Prospect",
    name: "Lamine Yamal",
    age: 18,
    image: "/images/lamine-yamal.jpg",
    active: true,
    label: "Player",
    era: "2021-2024",
    nationality: "Spain",
    club: "FC Barcelona",
    positionPlayed: "Forward",
    rating: 89,
    height: 170,
  },
  {
    id: "yamal",
    field: "Player",
    status: "Top Prospect",
    name: "Lamine Yamal",
    age: 18,
    image: "/images/lamine-yamal.jpg",
    active: true,
    label: "Player",
    era: "2021-2024",
    nationality: "Spain",
    club: "FC Barcelona",
    positionPlayed: "Forward",
    rating: 89,
    height: 170,
  },
];


export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerText, setHeaderText] = useState("FOOTY IQ");

  

  return (
    <>
      <Header headerText={headerText} />
      {children}
      <Footer setHeaderText={setHeaderText} />
    </>
  );
}

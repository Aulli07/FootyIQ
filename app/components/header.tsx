"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { oswald } from "../fonts";

const Header = ({ headerText }: { headerText: string }) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchHref = isSearchOpen ? "/home" : "/";

  return (
    <div className="flex flex-row items-center justify-between p-5 backdrop-blur">
      <div>
        <h1
          className={`font-semibold text-2xl ${oswald.className} leading-relaxed text-white`}
        >
          {headerText}
        </h1>
      </div>
      <div className="flex gap-8">
        <Link
          href={searchHref}
          className="relative h-7 w-7"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Image
            src="/images/search.png"
            alt="no-img"
            sizes="32px"
            fill
            className="relative object-cover"
          />
        </Link>
        <div className="relative h-7 w-7">
          <Image
            src="/images/light-mode.png"
            alt="light-mode"
            fill
            sizes="32px"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

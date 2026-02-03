"use client";

import React from "react";
import Image from "next/image";
import { oswald } from "../fonts";

const Header = ({
  headerText,
  showLightMode = false,
}: {
  headerText: string;
  showLightMode?: boolean;
}) => {
  return (
    <div className="flex flex-row items-center justify-between p-5 backdrop-blur">
      <div>
        <h1
          className={`font-semibold text-2xl ${oswald.className} leading-relaxed text-white`}
        >
          {headerText}
        </h1>
      </div>

      <div className="flex items-center">
        {showLightMode ? (
          <div className="relative h-7 w-7">
            <Image
              src="/images/light-mode.png"
              alt="light-mode"
              fill
              sizes="32px"
              className="object-cover"
              onClick={() => {}}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Header;

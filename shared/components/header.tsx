"use client";

import Image from "next/image";
import { oswald } from "@/app/font-icons/fonts";

import { useTheme } from "next-themes";

import { useState, useEffect } from "react";




const Header = ({
  headerText,
  showLightMode = false,
}: {
  headerText: string;
  showLightMode?: boolean;
}) => {

  const { theme, setTheme } = useTheme();

  /* The mounted state element is used alongside useEffect due to the light/dark mode changes. 
  Once in effect, it displays the header UI*/
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  
  return (
    <div className="flex flex-row items-center justify-between px-3 h-18 backdrop-blur bg-light-background-main/80 dark:bg-dark-background-main/80">
      <div>
        <h1
          className={`font-semibold text-2xl ${oswald.className} leading-relaxed text-light-text-primary dark:text-dark-text-primary`}
        >
          {headerText}
        </h1>
      </div>

      <div className="flex items-center">
        {showLightMode ? (
          <div className="relative h-11 w-11 rounded-full border border-light-ui-border bg-light-background-card shadow-sm shadow-slate-300/50 dark:border-white/20 dark:bg-white/10 dark:shadow-none">
            <Image
              src={
                theme === "dark"
                  ? "/images/light-mode.png"
                  : "/images/dark-mode-fill.png"
              }
              alt="light-mode"
              fill
              sizes="32px"
              className="object-cover p-2.5 cursor-pointer"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
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

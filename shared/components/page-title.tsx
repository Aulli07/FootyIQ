"use client";

import { poppins } from "@/app/font-icons/fonts";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";





export default function PageTitle({ title }: { title: string | null }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  
  return (
    <div className="flex justify-start items-center gap-4 text-light-text-primary dark:text-dark-text-primary border-light-ui-border dark:border-white/40 py-6 px-3">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="cursor-pointer"
      >
        <Image
          src={
            mounted
              ? isDark
                ? "/images/go-back-light.png"
                : "/images/go-back-dark.png"
              : "/images/go-back-dark.png"
          }
          alt="go back"
          width={22}
          height={22}
          className="object-cover"
        />
      </button>
      <p className={`text-[17px] ${poppins.className} font-semibold font-black`}>{title}</p>
    </div>
  );
}

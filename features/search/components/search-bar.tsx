import { poppins } from "@/app/font-icons/fonts";
import Image from "next/image";
import { useTheme } from "next-themes";

import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";




export default function SearchInput({
  setIsSearch,
  onSearch,
  setFocusSearch,
  isFocusSearch,
}: {
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  onSearch: (query: string) => void;
  setFocusSearch?: Dispatch<SetStateAction<boolean>>;
  isFocusSearch?: boolean;
}) {

  const [value, setValue] = useState<string>("");

  function handleInputChange(newValue: string) {
    setValue(newValue);
    onSearch(newValue);
    setIsSearch(newValue.trim() !== "");
  }

  function handleInputFocus(bool: boolean) {
    setFocusSearch?.(bool);
  }

  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <InputBar
        value={value}
        onValueChange={handleInputChange}
        onInputFocus={handleInputFocus}
        isFocusSearch={isFocusSearch}
      />
    </div>
  );
}

export function InputBar({
  value,
  onValueChange,
  onInputFocus,
  isFocusSearch,
  placeholder = "Search for any player",
  inputClassName = "w-full h-13 rounded-full bg-light-background-card text-light-text-primary placeholder:text-light-text-muted border border-light-ui-border pl-14 pr-4 text-[16px] shadow-md shadow-slate-300/40 dark:bg-white/5 dark:text-dark-text-primary dark:placeholder:text-dark-text-muted dark:border-white/30 dark:shadow-lg dark:shadow-black/20",
}: {
  value?: string;
  onValueChange: (value: string) => void;
  onInputFocus?: (bool: boolean) => void;
  isFocusSearch?: boolean;
  placeholder?: string;
  inputClassName?: string;
}) {
  
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex flex-row gap-2 items-center">
      {isFocusSearch ? (
        <div className="group relative h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 hover:bg-zinc-800 active:scale-95">
          <Image
            src={
              theme === "dark"
                ? "/images/go-back-light.png"
                : "/images/go-back-dark.png"
            }
            fill
            sizes="32px"
            alt="go-back"
            className="object-cover"
            onClick={() => onInputFocus?.(false)}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="relative min-w-0 flex-1">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-[9999]">
          <div className="relative h-7 w-7">
            <Image
              src={
                theme === "dark"
                  ? "/images/search.png"
                  : "/images/search-dark.png"
              }
              fill
              sizes="32px"
              alt="search"
              className="object-cover"
            />
          </div>
        </div>

        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className={`${inputClassName} ${poppins.className} backdrop-blur outline-none transition focus:border-emerald-500/50 dark:focus:border-emerald-400/40 focus:ring-4 focus:ring-emerald-500/15 dark:focus:ring-emerald-400/15`}
          onChange={(e) => onValueChange(e.target.value)}
          onFocus={() => onInputFocus?.(true)}
        />
      </div>
    </div>
  );
}

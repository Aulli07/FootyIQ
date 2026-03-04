import { poppins } from "../app/fonts";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useTheme } from "next-themes";

export function InputBar({
  value,
  onValueChange,
  placeholder = "Search for players or clubs",
  inputClassName = "w-full h-14 rounded-full bg-light-background-card text-light-text-primary placeholder:text-light-text-muted border border-light-ui-border pl-12 pr-4 text-[15px] shadow-md shadow-slate-300/40 dark:bg-white/5 dark:text-dark-text-primary dark:placeholder:text-dark-text-muted dark:border-white/30 dark:shadow-lg dark:shadow-black/20",
}: {
  value?: string;
  onValueChange: (value: string) => void;
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
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-[9999]">
        <div className="relative h-6 w-6">
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
      />
    </div>
  );
}

function SearchInput({
  setIsSearch,
  isSearch,
  onSearch,
}: {
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  isSearch: boolean;
  onSearch: (query: string) => void;
}) {
  const [value, setValue] = useState<string>("");

  function handleInputChange(newValue: string) {
    setValue(newValue);
    onSearch(newValue);
    setIsSearch(newValue.trim() !== "");
  }

  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <InputBar value={value} onValueChange={handleInputChange} />
    </div>
  );
}

export default SearchInput;

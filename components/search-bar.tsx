import { poppins } from "../app/fonts";

import Image from "next/image";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export function InputBar({
  value,
  onValueChange,
  placeholder = "Search for players or clubs",
  inputClassName = "w-full h-14 rounded-full bg-white/5 text-white placeholder:text-white/40 border border-white/30 pl-12 pr-4 text-[15px]",
}: {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
}) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-[9999]">
        <div className="relative h-6 w-6">
          <Image
            src="/images/search.png"
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
        className={`${inputClassName} ${poppins.className} shadow-lg backdrop-blur outline-none transition focus:border-emerald-400/40 focus:ring-4 focus:ring-emerald-400/15`}
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

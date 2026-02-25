"use client";

import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      className="flex-1 pt-[170px] pb-[20px] relative
    max-lg:pt-[140px]
    max-md:pt-[0px]
    max-sm:pt-[140px]
    max-xs:pt-[0px]"
    >
      <div className="flex max-w-[500px] rounded-full ml-auto relative overflow-hidden z-10">
        <input
          type="search"
          className="appearance-none outline-none border-2 border-theme
        -mr-16 font-jakarta rounded-full py-[3px] px-7 text-sm
        bg-surface text-theme placeholder:text-muted-theme
        peer flex-1
        max-lg:flex-none max-lg:ml-auto max-lg:w-[260px]
        max-lg:text-[10px] max-lg:self-center max-lg:px-4
        max-xs:w-full"
          placeholder="We can give you everything, except the girl you lost..."
          value={query}
          onChange={handleSearch}
        />

        {/* Animated underline */}
        <span
          className="absolute bottom-0 left-1/2 w-full h-[2px]
        opacity-0 bg-primary-theme origin-center
        -translate-x-1/2 scale-x-0
        transition duration-[350ms] ease-in
        peer-focus:scale-x-100 peer-focus:opacity-100"
        ></span>

        <button
          className="py-2 px-3 max-lg:py-0 max-lg:px-1
        bg-primary-theme
        shadow-sm
        flex-center
        rounded-full
        transition
        hover:animate-btn-search"
        >
          <BiSearch className="text-2xl mr-1 max-lg:text-lg text-theme" />
          <p className="text-xs max-lg:text-[10px] max-sm:text-[8px] text-theme">
            SEARCH
          </p>
        </button>
      </div>

      <div className="absolute top-[0px] right-[-70px] max-md:hidden z-0">
        <Image
          src="/images/saleOff.png"
          alt=""
          width={1010}
          height={200}
          priority
        />
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Search from "@/assets/icons/Search.svg";
import { UserData } from "@/types";
import search from "@/firebase/search";

const SearchInput = ({
  searchValue,
  setSearch,
  setResults,
  setIsLoading,
}: {
  searchValue: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<UserData[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    const timeoutId = setTimeout(() => {
      performSearch();
    }, 500);
    setTypingTimeout(timeoutId);
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [searchValue]);

  const performSearch = async () => {
    try {
      if (!searchValue) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      const results = await search({ search: searchValue });
      if (results && results.length > 0) {
        setResults(results);
      } else {
        setResults([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error performing search:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="group flex w-full bg-[#EEEE] dark:bg-black px-4 py-2 rounded-md cursor-text items-center gap-2">
      <Search className="fill-gray-400 group-focus-within:hidden" />
      <input
        type="text"
        name="search"
        id="search"
        value={searchValue}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="outline-none bg-transparent w-full"
      />
      <span
        className=" rotate-45 text-lg bg-gray-300 dark:text-black text-[#EEEE] p-2 w-2 h-2 opacity-0 group-focus-within:opacity-100 flex items-center justify-center rounded-[50%] cursor-pointer select-none"
        onClick={() => setSearch("")}
      >
        +
      </span>
    </div>
  );
};

export default SearchInput;

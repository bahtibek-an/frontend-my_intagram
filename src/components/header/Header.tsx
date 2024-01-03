"use client";
import React, { useState } from "react";
import LogoBlack from "@/assets/icons/LogoBlack.svg";
import Heart from "@/assets/icons/ActivityFeed.svg";
import Link from "next/link";
import SearchInput from "../ui/SearchInput";
import { UserData } from "@/types";
import SearchResultSkeleton from "../ui/SearchResultSkeleton";
import { Avatar } from "@mui/material";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<UserData[]>([]);
  return (
    <header className="sm:hidden px-4 sticky top-0 bg-white dark:bg-[#000000] border-b shadow-sm z-30 w-full">
      <div className="flex justify-between items-center py-3">
        <Link
          href="/feed"
          className="transition duration-100 scale-150 hover:scale-[1.6] active:scale-125 mr-1 "
        >
          <LogoBlack />
        </Link>
        <div className="flex items-center gap-5">
          <div className="relative">
            <SearchInput
              searchValue={search}
              setSearch={setSearch}
              setIsLoading={setIsLoading}
              setResults={setResults}
            />
            {search && (
              <div className="absolute z-30 w-full dark:bg-black bg-white shadow-md mt-4 flex flex-col rounded-md max-h-72 overflow-x-hidden overflow-y-auto ">
                {results.map((result) => (
                  <Link
                    href={`/${result.userName}`}
                    key={result.userId}
                    className="flex gap-4 items-center hover:bg-[#F2F2F2] dark:hover:bg-[#1A1A1A] p-3"
                  >
                    <Avatar src={result.profileImage} className="w-12 h-12" />
                    <div className="flex flex-col">
                      <span>{result.userName}</span>
                      <span className="text-[#A8A8A8]">{result.fullName}</span>
                    </div>
                  </Link>
                ))}
                {isLoading &&
                  results.length < 1 &&
                  Array.from({ length: 4 }, (_, index) => (
                    <SearchResultSkeleton key={index} />
                  ))}
              </div>
            )}
          </div>
          <Link
            href="/notifications"
            className="transition duration-100 scale-110 hover:scale-[1.2] active:scale-100 active:opacity-60 "
          >
            <Heart />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

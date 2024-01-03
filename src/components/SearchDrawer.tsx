"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchInput from "./ui/SearchInput";
import { UserData } from "@/types";
import Link from "next/link";
import { Avatar } from "@mui/material";
import SearchResultSkeleton from "./ui/SearchResultSkeleton";

const SearchDrawer = ({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<UserData[]>([]);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node) &&
      isActive
    ) {
      setSearch("");
      setIsLoading(false);
      setIsActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
  return (
    <div
      className={`fixed z-10 h-screen shadow-[4px_0_24px_rgba(0,0,0,.15)] dark:bg-[#000000]  bg-white top-0 transition-all overflow-hidden duration-300 w-0 ${
        isActive &&
        "w-[397px] left-[4.6rem] dark:border-r border-[#262626] px-4 py-5"
      } ${!isActive && "left-10"}`}
      ref={drawerRef}
    >
      <h2 className="font-[600] text-[24px]">Search</h2>
      <div className="mt-8">
        <SearchInput
          setIsLoading={setIsLoading}
          searchValue={search}
          setSearch={setSearch}
          setResults={setResults}
        />
      </div>
      <div className="mt-8 flex flex-col">
        {results.map((result) => (
          <Link
            href={`/${result.userName}`}
            key={result.userId}
            className="flex gap-4 items-center hover:bg-[#F2F2F2] dark:hover:bg-[#1A1A1A] p-2 rounded-md"
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
          Array.from({ length: 8 }, (_, index) => (
            <SearchResultSkeleton key={index} />
          ))}
      </div>
    </div>
  );
};
export default SearchDrawer;

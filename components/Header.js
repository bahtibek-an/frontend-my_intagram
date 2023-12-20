import Image from "next/image";
import React from "react";
import { PlusCircleIcon, SearchIcon } from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { HomeIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState } from "@/atom/modalAtom";
import { useRouter } from "next/router";
export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  return (
    <div className=" shadow-sm stick top-0 bg-white z-30 ">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/* left */}
        <div className=" cursor-pointer h-24 w-24 relative hidden lg:inline-grid ">
          <Image
            layout="fill"
            className=" object-contain"
            alt="ista-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="cursor-pointer h-24 w-10 relative  lg:hidden ">
          <Image
            onClick={() => router.push("/")}
            layout="fill"
            className=" object-contain"
            alt="ista-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
          />
        </div>

        {/* middle */}
        <div className=" relative mt-1">
          <div className="absolute top-2 left-2">
            <SearchIcon className=" h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className=" bg-gray-50 pl-10 border-gray-500 text-sm focus:border-black rounded-md"
          />
        </div>
        {/* right */}
        <div className="flex space-x-4 items-center">
          <HomeIcon
            onClick={() => router.push("/")}
            className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
          />
          {session ? (
            <>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className=" h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
              />
              <img
                onClick={signOut}
                src={session.user.image}
                alt="user-img"
                className="h-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}

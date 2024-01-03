"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import LogoInline from "@/assets/icons/LogoInline.svg";
import LogoBlack from "@/assets/icons/LogoBlack.svg";
import Home from "@/assets/icons/Home.svg";
import HomeFilled from "@/assets/icons/Home-fill.svg";
import Search from "@/assets/icons/Search.svg";
import Explore from "@/assets/icons/FindPeople.svg";
import Messages from "@/assets/icons/Messenger.svg";
import Reels from "@/assets/icons/Reels.svg";
import Notifications from "@/assets/icons/ActivityFeed.svg";
import Create from "@/assets/icons/NewPosts.svg";
import Burger from "@/assets/icons/Burger.svg";
import SideBarLink from "./SideBarLink";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import SearchDrawer from "../SearchDrawer";
import SideBarMoreMenu from "./SideBarMoreMenu";
import { useAuthContext } from "@/contexts/AuthContext";
import CreatePostModal from "../modals/create-post/CreatePostModal";

const SideBar = () => {
  const pathname = usePathname();
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isCreatePost, setIsCreatePost] = useState<boolean>(false);
  const { userData } = useAuthContext();
  return (
    <>
      <aside className="hidden fixed z-20 top-0 sm:flex flex-col items-start h-screen px-[12px] pt-[8px] pb-5 dark:text-white border-r-[1px] dark:border-[#262626] border-gray-300 transition duration-300">
        <header
          className={`pt-[25px] pb-4  ${
            !isSearch && !pathname.includes("messages") && "lg:px-[12px]"
          }`}
        >
          {!isSearch && !pathname.includes("messages") && (
            <Link
              href="/feed"
              className={`hidden lg:block w-auto lg:w-[160px] 2xl:w-[251px]`}
            >
              <LogoInline />
            </Link>
          )}
          <SideBarLink
            href="/feed"
            className={`${
              !isSearch && !pathname.includes("messages") && "lg:hidden"
            }`}
          >
            <LogoBlack className="transition duration-100 group-hover:scale-105 group-active:scale-95 " />
          </SideBarLink>
        </header>
        <nav className="flex-grow flex flex-col gap-1">
          <SideBarLink
            isActive={
              pathname == "/feed" &&
              !isSearch &&
              !pathname.includes("messages") &&
              !isCreatePost
            }
            href="/feed"
          >
            {pathname == "/feed" &&
            !isSearch &&
            !pathname.includes("messages") &&
            !isCreatePost ? (
              <HomeFilled className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
            ) : (
              <Home className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
            )}
            {!isSearch && !pathname.includes("messages") && (
              <span className="hidden lg:block w-auto lg:w-[160px] 2xl:w-[251px]">
                Home
              </span>
            )}
          </SideBarLink>

          <SideBarLink
            isActive={isSearch}
            href="#"
            onClick={() => setIsSearch(true)}
            className={isSearch ? "border-[1px] rounded-md" : ""}
          >
            <Search className="transition delay-100 group-hover:scale-105 group-active:scale-95" />
            {!isSearch && !pathname.includes("messages") && (
              <span className="hidden lg:block w-auto lg:w-[160px] 2xl:w-[251px]">
                Search
              </span>
            )}
          </SideBarLink>

          <SideBarLink
            isActive={
              pathname == "/explore" &&
              !isSearch &&
              !pathname.includes("messages") &&
              !isCreatePost
            }
            href="/explore"
          >
            <Explore className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
            {!isSearch && !pathname.includes("messages") && (
              <span className="hidden lg:block w-auto lg:w-[160px] 2xl:w-[251px]">
                Explore
              </span>
            )}
          </SideBarLink>

          <SideBarLink
            isActive={
              pathname == "/reels" &&
              !isSearch &&
              !pathname.includes("messages") &&
              !isCreatePost
            }
            href="/reels"
          >
            <Reels className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
            {!isSearch && !pathname.includes("messages") && (
              <span className="hidden lg:block w-auto lg:w-[160px] 2xl:w-[251px]">
                Reels
              </span>
            )}
          </SideBarLink>

          <SideBarLink
            isActive={
              pathname == "/messages" &&
              !isSearch &&
              !pathname.includes("messages") &&
              !isCreatePost
            }
            href="/messages"
          >
            <Messages className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
            {!isSearch && !pathname.includes("messages") && (
              <span className="hidden lg:block w-auto lg:w-[160px] 2xl:w-[251px]">
                Messages
              </span>
            )}
          </SideBarLink>

          <SideBarLink
            isActive={
              pathname == "/notifications" &&
              !isSearch &&
              !pathname.includes("messages") &&
              !isCreatePost
            }
            href="/notifications"
          >
            <Notifications className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
            {!isSearch && !pathname.includes("messages") && (
              <span className="hidden lg:block w-auto lg:w-[160px] 2xl:w-[251px]">
                Notifications
              </span>
            )}
          </SideBarLink>

          <SideBarLink
            isActive={isCreatePost}
            href="#"
            onClick={() => setIsCreatePost(true)}
          >
            <Create className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
            {!isSearch && !pathname.includes("messages") && (
              <span className="hidden lg:block w-auto lg:w-[160px] 2xl:w-[251px]">
                Create
              </span>
            )}
          </SideBarLink>
          <SideBarLink
            isActive={
              pathname.split("/")[1] == userData?.userName &&
              !isSearch &&
              !pathname.includes("messages") &&
              !isCreatePost
            }
            href={`/${userData?.userName}`}
          >
            <Avatar
              sx={{ width: 28, height: 28 }}
              className={`transition delay-100 group-hover:scale-105 group-active:scale-95 border-[#000000] ${
                pathname.split("/")[1] == userData?.userName &&
                !isSearch &&
                !pathname.includes("messages") &&
                !isCreatePost &&
                "border-2"
              } `}
              src={userData?.profileImage}
            />
            {!isSearch && !pathname.includes("messages") && (
              <span className="hidden lg:block w-auto lg:w-[160px] 2xl:w-[251px]">
                Profile
              </span>
            )}
          </SideBarLink>
          <SideBarLink
            isActive={isMenu}
            onClick={() => setIsMenu(!isMenu)}
            href="#"
            className="mt-auto"
          >
            <Burger className="transition delay-100 group-hover:scale-105 group-active:scale-95 " />
            {!isSearch && !pathname.includes("messages") && (
              <span className="hidden lg:block w-auto lg:w-[160px] 2xl:w-[251px]">
                More
              </span>
            )}
          </SideBarLink>
          <SideBarMoreMenu isMenu={isMenu} setIsMenu={setIsMenu} />
        </nav>
      </aside>
      <SearchDrawer isActive={isSearch} setIsActive={setIsSearch} />
      <CreatePostModal open={isCreatePost} setOpen={setIsCreatePost} />
      <div
        className={`hidden sm:block ${
          !pathname.includes("messages") && "lg:min-w-[248px] 2xl:min-w-[393px]"
        } sm:min-w-[76px]`}
      />
    </>
  );
};

export default SideBar;

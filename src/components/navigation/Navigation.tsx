"use client";
import React, { useState } from "react";
import Home from "@/assets/icons/Home.svg";
import Search from "@/assets/icons/Search.svg";
import Explore from "@/assets/icons/FindPeople.svg";
import Messages from "@/assets/icons/Messenger.svg";
import Reels from "@/assets/icons/Reels.svg";
import Notifications from "@/assets/icons/ActivityFeed.svg";
import Create from "@/assets/icons/NewPosts.svg";
import Burger from "@/assets/icons/Burger.svg";
import Avatar from "@mui/material/Avatar";

import Link from "next/link";
import CreatePostModal from "../modals/create-post/CreatePostModal";
import { useAuthContext } from "@/contexts/AuthContext";
const Navigation = () => {
  const [createModal, setCreateModal] = useState(false);
  const { userData } = useAuthContext();

  return (
    <>
      <nav className="sm:hidden fixed bottom-0 border-t bg-white dark:bg-[#000000] dark:border-gray-300 z-30 w-full shadow-sm">
        <div className="flex justify-around items-center py-3">
          <Link
            href="/feed"
            className="transition duration-100 scale-110 hover:scale-[1.2] active:scale-100 active:opacity-60 "
          >
            <Home />
          </Link>
          <Link
            href="/explore"
            className="transition duration-100 scale-110 hover:scale-[1.2] active:scale-100 active:opacity-60 "
          >
            <Explore />
          </Link>
          <Link
            href="/reels"
            className="transition duration-100 scale-110 hover:scale-[1.2] active:scale-100 active:opacity-60 "
          >
            <Reels />
          </Link>
          <Link
            href="#"
            className="transition duration-100 scale-110 hover:scale-[1.2] active:scale-100 active:opacity-60"
            onClick={() => setCreateModal(true)}
          >
            <Create />
          </Link>
          <Link
            href="/messages"
            className="transition duration-100 scale-110 hover:scale-[1.2] active:scale-100 active:opacity-60 "
          >
            <Messages />
          </Link>
          <Link
            href={`/${userData?.userName}`}
            className="transition duration-100 scale-110 hover:scale-[1.2] active:scale-100 active:opacity-60 "
          >
            <Avatar
              sx={{ width: 28, height: 28 }}
              className="transition delay-100 group-hover:scale-105 group-active:scale-95 border-[#000000]"
              src={userData?.profileImage}
            />
          </Link>
        </div>
      </nav>
      <CreatePostModal open={createModal} setOpen={setCreateModal} />
    </>
  );
};

export default Navigation;

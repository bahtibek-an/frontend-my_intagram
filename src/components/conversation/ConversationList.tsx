"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import React, { useState } from "react";
import NoteIcon from "@/assets/icons/Note.svg";
import SendMessageModal from "../modals/SendMessageModal";
import useMessagingRooms from "@/hooks/useRooms";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { UserData } from "@/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ConversationList = () => {
  const { userData } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [rooms, setRooms] = useMessagingRooms([]);
  const senders = (users: UserData[]) =>
    users.filter((user) => user.userId !== userData?.userId || "");
  return (
    <div className="border-r border-[#A8A8A8] dark:border-neutral-800 min-h-screen">
      <div className="flex justify-center md:px-7 py-8 w-full md:justify-between">
        <span className="hidden md:block font-bold text-xl">
          {userData?.userName}
        </span>
        <span onClick={() => setIsOpen(true)} className="cursor-pointer">
          <NoteIcon />
        </span>
      </div>
      <span className="hidden md:block px-7 font-bold text-[17px]">
        Messages
      </span>
      <ul className="mt-2">
        {rooms.length > 0 &&
          rooms.map((room) => (
            <li key={room.roomId}>
              <Link
                href={`/messages/${room.roomId}`}
                className="flex justify-center md:justify-start items-center gap-2 md:px-7 py-2 dark:hover:bg-neutral-950"
              >
                <Avatar
                  src={
                    senders(room.users)[0]?.profileImage ||
                    userData?.profileImage
                  }
                  className="h-14 w-14"
                />
                <div className="md:flex flex-col hidden overflow-x-hidden">
                  <span>
                    {senders(room.users).length > 1
                      ? room.users.map(
                          (user) => user.fullName.slice(0, 4) + "..,",
                        )
                      : senders(room.users).length == 1
                      ? senders(room.users)[0].fullName
                      : userData?.fullName}
                  </span>
                  <span className="text-sm dark:text-[#A8A8A8] ">
                    {room.lastMessage.content.length > 28
                      ? room.lastMessage.content.slice(0, 28) + ".."
                      : room.lastMessage.content}{" "}
                    . {dayjs(room.lastMessage.time.toDate()).fromNow()}{" "}
                  </span>
                </div>
              </Link>
            </li>
          ))}
      </ul>
      <SendMessageModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ConversationList;

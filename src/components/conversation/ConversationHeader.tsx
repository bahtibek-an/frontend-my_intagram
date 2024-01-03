"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserData } from "@/types";
import { Avatar } from "@mui/material";
import React from "react";
const ConversationHeader = ({ users }: { users: UserData[] }) => {
  const { userData } = useAuthContext();
  const recievers = users.filter((user) => user.userId != userData?.userId);
  return (
    <div className="border-b border-[#A7A7A7] dark:border-neutral-800 w-full p-4 flex items-center gap-3">
      <Avatar
        src={recievers.length ? users[0].profileImage : userData?.profileImage}
        className="w-[44px] h-[44px]"
      />
      <span className="font-semibold text-lg">
        {recievers.length == 0
          ? userData?.fullName
          : recievers.length == 1
          ? recievers[0].fullName
          : recievers.map(
              (reciever, i) => i < 3 && `${reciever.fullName.slice(0, 4)}, `,
            )}
      </span>
    </div>
  );
};

export default ConversationHeader;

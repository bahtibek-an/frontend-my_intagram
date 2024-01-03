"use client";
import React from "react";
import MessageIcon from "@/assets/icons/Messenger.svg";
import SendMessageButton from "@/components/SendMessageButton";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-full">
      <div className="flex items-center flex-col gap-3">
        <span className="border p-2 border-black dark:border-white rounded-[50%] max-w-min scale-[2.2]">
          <MessageIcon />
        </span>
        <span className="text-2xl mt-5">Your messages</span>
        <span className="text-[#737373] dark:text-[#A8A8A8]">
          Send private photos and messages to a friend or group
        </span>
        <SendMessageButton />
      </div>
    </div>
  );
};

export default page;

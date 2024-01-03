"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import useRealTimeChat from "@/hooks/useRealTimeChat";
import dayjs from "dayjs";
import React from "react";
const Chat = ({ roomId }: { roomId: string }) => {
  const { userData } = useAuthContext();
  const [chat, setChat] = useRealTimeChat({ roomId: roomId });
  const isUserMessage = (userId: string) => userId == userData?.userId;
  return (
    <ul className="flex flex-col gap-2 px-2 max-h-screen overflow-y-auto">
      {chat.length > 0
        ? chat.map((message) => (
            <li
              key={message.time.toMillis()}
              className={`w-fit  py-[7px] px-3 rounded-lg ${
                isUserMessage(message.sender)
                  ? "bg-blue ml-auto"
                  : "bg-neutral-950"
              }`}
            >
              {message.content}
            </li>
          ))
        : null}
    </ul>
  );
};

export default Chat;

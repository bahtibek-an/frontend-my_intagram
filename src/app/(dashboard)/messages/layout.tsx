import ConversationList from "@/components/conversation/ConversationList";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox • Chats",
  description: "Instagram clone made by Anis Kehila",
  icons: "/logoIcon.png",
};

const Messages = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="w-[27%]">
        <ConversationList />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Messages;

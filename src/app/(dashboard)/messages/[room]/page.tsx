import Chat from "@/components/conversation/Chat";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import SendMessage from "@/components/conversation/SendMessage";
import { fetchUserData } from "@/firebase/fetchUserData";
import { fetchConversation } from "@/firebase/startConversation";
import React from "react";

const Room = async ({ params }: { params: { room: string } }) => {
  const { users, messages } = await fetchConversation(params.room);
  const usersData = await Promise.all(
    users?.map(async (userId) => await fetchUserData(userId)),
  );
  return (
    <div className="flex flex-col h-screen overflow-y-auto w-full">
      <ConversationHeader users={usersData} />
      <Chat roomId={params.room} />
      <SendMessage roomId={params.room} />
    </div>
  );
};

export default Room;

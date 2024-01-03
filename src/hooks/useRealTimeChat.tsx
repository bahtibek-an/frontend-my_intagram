import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Message } from "@/types";
const useRealTimeChat = ({
  roomId,
}: {
  roomId: string;
}): [Message[], React.Dispatch<React.SetStateAction<Message[]>>] => {
  const [chat, setChat] = useState<Message[]>([]);
  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "inboxRooms", roomId, "messages"),
        orderBy("time", "asc"),
      ),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          setChat((prevState) => [...prevState, change.doc.data() as Message]);
        });
      },
    );
    return () => unsub();
  }, [roomId]);
  return [chat, setChat];
};

export default useRealTimeChat;

import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { MessagingRoom, Message, Room } from "@/types";
import { fetchUserData } from "@/firebase/fetchUserData";
import { useAuthContext } from "@/contexts/AuthContext";

const useMessagingRooms = (
  initState: MessagingRoom[],
): [MessagingRoom[], React.Dispatch<React.SetStateAction<MessagingRoom[]>>] => {
  const [messagingRooms, setMessagingRooms] =
    useState<MessagingRoom[]>(initState);
  const { userData } = useAuthContext();
  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "inboxRooms"),
        where("users", "array-contains", userData?.userId || ""),
      ),
      (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          const room = change.doc.data() as Room;
          const roomIndex = messagingRooms.findIndex(
            (r) => r.roomId === room.roomId,
          );

          if (change.type === "added" && roomIndex === -1) {
            // Handle added room and initial state
            const usersData = await Promise.all(
              room.users.map(async (user: string) => await fetchUserData(user)),
            );

            const messagesRef = collection(
              db,
              "inboxRooms",
              room.roomId,
              "messages",
            );
            const messagesQuery = query(
              messagesRef,
              orderBy("time", "desc"),
              limit(1),
            );
            const messagesSnapshot = await getDocs(messagesQuery);

            if (!messagesSnapshot.empty) {
              let lastMessage = messagesSnapshot.docs[0].data() as Message;
              setMessagingRooms((prevData) => [
                ...prevData,
                {
                  ...room,
                  users: usersData,
                  lastMessage,
                },
              ]);
            }
          }
        });
        snapshot.forEach(async (roomDoc) => {
          const messagesQuery = query(
            collection(db, "inboxRooms", roomDoc.id, "messages"),
          );
          const unsubMessage = onSnapshot(messagesQuery, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              const message = change.doc.data() as Message;
              const roomIndex = messagingRooms.findIndex(
                (r) => r.roomId === roomDoc.id,
              );
              if (roomIndex !== -1) {
                // Create a copy of the messagingRooms array
                const updatedRooms = [...messagingRooms];
                // Update the specific room if the new message is newer
                if (
                  message.time.toMillis() >
                  updatedRooms[roomIndex].lastMessage.time.toMillis()
                ) {
                  updatedRooms[roomIndex] = {
                    ...updatedRooms[roomIndex],
                    lastMessage: message,
                  };
                }
                // Set the updated array using setMessagingRooms
                setMessagingRooms(updatedRooms);
              }
            });
          });
        });
      },
    );

    return () => {
      unsub();
    };
  }, [messagingRooms, userData]);

  // Order messagingRooms based on the last comment time
  const orderedMessagingRooms = messagingRooms.sort((a, b) => {
    const aTime = a.lastMessage.time.toMillis();
    const bTime = b.lastMessage.time.toMillis();
    return bTime - aTime;
  });

  return [orderedMessagingRooms, setMessagingRooms];
};

export default useMessagingRooms;

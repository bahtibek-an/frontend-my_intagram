import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  DocumentData,
  QueryDocumentSnapshot,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./config";
import { Message, Room, MessagingRoom } from "@/types";

const startConversation = async (userIds: string[]): Promise<string> => {
  const inboxRoomsRef = collection(db, "inboxRooms");

  // Query for documents where the "users" array exactly matches userIds
  const q = query(inboxRoomsRef, where("users", "==", userIds));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    // Return the id of the first matching document
    return querySnapshot.docs[0].id;
  } else {
    // No matching document found, create a new room
    const newRoomRef = await addDoc(inboxRoomsRef, { users: userIds });
    await updateDoc(doc(db, "inboxRooms", newRoomRef.id), {
      roomId: newRoomRef.id,
    });
    // Return the id of the newly created room
    return newRoomRef.id;
  }
};

export const fetchConversation = async (roomId: string) => {
  let messages: Message[] = [];
  const messagesRef = collection(db, "inboxRooms", roomId, "messages");
  const snapshot = await getDocs(messagesRef);
  snapshot.forEach((msg) => messages.push(msg.data() as Message));
  const inboxRoomsRef = collection(db, "inboxRooms");
  const q = query(inboxRoomsRef, where("roomId", "==", roomId));
  const querySnapshot = await getDocs(q);
  return {
    users: querySnapshot.docs[0]?.data().users as string[],
    messages: messages,
  };
};

// const fetchRooms = async (userId: string) => {
//   const rooms: Room[] = [];
//   const inboxRoomsRef = collection(db, "inboxRooms");
//   const q = query(inboxRoomsRef, where("users", "array-contains", userId));
//   const snapshot = await getDocs(q);
//   snapshot.forEach((room) => rooms.push(room.data() as Room));
//   return rooms;
// };
// export const fetchMessagingRooms = async (userId: string) => {
//   const rooms = await fetchRooms(userId);
//   const messagingRooms: MessagingRoom[] = [];
//   for (const room of rooms) {
//     const inboxRoomsRef = collection(db, "inboxRooms", room.roomId, "messages");
//     const q = query(inboxRoomsRef, orderBy("time"), limit(1));
//     const querySnapshot = await getDocs(q);
//     if (!querySnapshot.empty) {
//       messagingRooms.push({
//         lastMessage: querySnapshot.docs[0]?.data() as Message,
//         ...room,
//       });
//     }
//   }
//   return messagingRooms;
// };
export const sendMessage = async ({
  roomId,
  message,
}: {
  roomId: string;
  message: Message;
}) => {
  const messageRef = collection(db, "inboxRooms", roomId, "messages");
  if (!message.image) {
    await addDoc(messageRef, message);
  }
};

export default startConversation;

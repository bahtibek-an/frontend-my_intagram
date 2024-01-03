import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./config";

export const follow = async ({
  followerId,
  followedId,
}: {
  followerId: string;
  followedId: string;
}): Promise<void> => {
  const followerRef = doc(db, "users", followerId);
  const followedRef = doc(db, "users", followedId);
  await updateDoc(followerRef, { following: arrayUnion(followedId) });
  await updateDoc(followedRef, { followers: arrayUnion(followerId) });
};

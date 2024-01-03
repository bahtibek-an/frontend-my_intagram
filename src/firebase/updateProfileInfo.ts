import { doc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export const updateProfileInfo = async (
  userId: string,
  fullName: string,
  bio: string,
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { fullName: fullName, bio: bio });
};

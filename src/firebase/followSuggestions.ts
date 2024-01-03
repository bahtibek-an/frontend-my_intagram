import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "./config";
import { UserData } from "@/types";

const followSuggestions = async (user: UserData): Promise<UserData[]> => {
  const usersCollection = collection(db, "users");

  const q = query(
    usersCollection,
    where("userId", "not-in", user.following),
    limit(5),
  );

  const querySnapshot = await getDocs(q);
  const suggestions: UserData[] = [];

  querySnapshot.forEach((doc) => {
    const userData: UserData = doc.data() as UserData;
    suggestions.push(userData);
  });

  return suggestions;
};
export default followSuggestions;

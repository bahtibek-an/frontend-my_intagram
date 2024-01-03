import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./config";
import { UserData } from "@/types";
const search = async ({ search }: { search: string }) => {
  const usersRef = collection(db, "users");
  const q = query(
    usersRef,
    where("userName", ">=", search),
    where("userName", "<=", search + "z"),
  );

  const querySnapshot = await getDocs(q);

  const results: UserData[] = [];
  querySnapshot.forEach((doc) => {
    results.push(doc.data() as UserData);
  });
  return results;
};

export default search;

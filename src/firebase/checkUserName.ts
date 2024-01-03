import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./config";

const checkUserName = async (username: string) => {
  const usernameRef = doc(collection(db, "userNames"), username);
  const usernameSnapshot = await getDoc(usernameRef);
  return usernameSnapshot.exists();
};

export default checkUserName;

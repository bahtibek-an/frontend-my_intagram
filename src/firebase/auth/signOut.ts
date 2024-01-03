import firebase_app from "../config";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth";
const auth = getAuth(firebase_app);

export default async function signOut() {
  return await firebaseSignOut(auth);
}

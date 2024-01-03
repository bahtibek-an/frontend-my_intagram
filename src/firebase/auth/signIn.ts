import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string) {
  let result: any = null;
  result = await signInWithEmailAndPassword(auth, email, password);
  return result;
}

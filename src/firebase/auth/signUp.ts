import firebaseApp from "../config";
import { createUserWithEmailAndPassword, getAuth, Auth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config";
const auth: Auth = getAuth(firebaseApp);

export default async function signUp({
  email,
  password,
  fullName,
  username,
}: {
  email: string;
  password: string;
  fullName: string;
  username: string;
}) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const userRef = doc(collection(db, "users"), user.uid);
    await setDoc(userRef, {
      userId: user.uid,
      fullName: fullName,
      userName: username,
      email: email,
      following: [user.uid],
      createdAt: new Date(),
    });
    const usernameRef = doc(collection(db, "userNames"), username);
    await setDoc(usernameRef, {
      uid: user.uid,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

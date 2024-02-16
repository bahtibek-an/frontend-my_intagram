import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "KEYS_ARE_PRIVATE",
  authDomain: "KEYS_ARE_PRIVATE",
  projectId: "KEYS_ARE_PRIVATE",
  storageBucket: "KEYS_ARE_PRIVATE",
  messagingSenderId: "KEYS_ARE_PRIVATE",
  appId: "KEYS_ARE_PRIVATE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

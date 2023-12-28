import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsKIje9CGtXzXx03kFiHSGnZwh-rNn6Ys",
  authDomain: "instagram-test-3c57a.firebaseapp.com",
  projectId: "instagram-test-3c57a",
  storageBucket: "instagram-test-3c57a.appspot.com",
  messagingSenderId: "43710650243",
  appId: "1:43710650243:web:2f7716c133d245f236c8b6"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
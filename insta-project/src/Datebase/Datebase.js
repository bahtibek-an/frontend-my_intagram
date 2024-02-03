import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-E5YwxPMav3r_o5N05a9F1TBoh-MdovY",
  authDomain: "instagram-2a6c3.firebaseapp.com",
  projectId: "instagram-2a6c3",
  storageBucket: "instagram-2a6c3.appspot.com",
  messagingSenderId: "912519966422",
  appId: "1:912519966422:web:9fff206770e5360f2a6377",
  measurementId: "G-F6H43JVWZ9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
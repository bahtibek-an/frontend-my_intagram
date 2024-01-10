import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAz_nzdZPHMJW-2Comx0FrOHliot6Tb38w",
  authDomain: "instagram-3749c.firebaseapp.com",
  projectId: "instagram-3749c",
  storageBucket: "instagram-3749c.appspot.com",
  messagingSenderId: "24261905176",
  appId: "1:24261905176:web:7ac4cefbc7830fe38cec6d",
  measurementId: "G-836WWDP3NW"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
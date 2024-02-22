import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcrAYuMiOXtDwMMpLl34YQtrKPike5dQ0",
  authDomain: "instagram-react-409e9.firebaseapp.com",
  projectId: "instagram-react-409e9",
  storageBucket: "instagram-react-409e9.appspot.com",
  messagingSenderId: "912627673569",
  appId: "1:912627673569:web:73ddf963851ef0a4388aa0",
  measurementId: "G-K2X6WKP2G7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export { db, storage, auth, provider };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFlJMG4FdL76_-haGbC9_fWKg6P2olCbI",
  authDomain: "instagram-42b85.firebaseapp.com",
  projectId: "instagram-42b85",
  storageBucket: "instagram-42b85.appspot.com",
  messagingSenderId: "589313515369",
  appId: "1:589313515369:web:8fe30b338a65088f13a7f8",
  measurementId: "G-GW8H4EWM64"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app);
const Firestoredb = getFirestore(app)

export { auth, db, storage, Firestoredb };
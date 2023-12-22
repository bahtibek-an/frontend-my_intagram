import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsKIje9CGtXzXx03kFiHSGnZwh-rNn6Ys",
  authDomain: "instagram-test-3c57a.firebaseapp.com",
  projectId: "instagram-test-3c57a",
  storageBucket: "instagram-test-3c57a.appspot.com",
  messagingSenderId: "43710650243",
  appId: "1:43710650243:web:2f7716c133d245f236c8b6"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
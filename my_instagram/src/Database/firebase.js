import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtZNjsGPpRWV00W5ph3BWESFwJ1PH8W3U",
  authDomain: "klent-19f93.firebaseapp.com",
  projectId: "klent-19f93",
  storageBucket: "klent-19f93.appspot.com",
  messagingSenderId: "665295820486",
  appId: "1:665295820486:web:b9b51be156c4c9c61e69c7",
  measurementId: "G-3QL4N0BZZL"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
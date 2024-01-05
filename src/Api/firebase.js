
import { initializeApp } from "firebase/app";
import {  getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBuEWdiuwlihbwRBRiMUCBEddsSO59zBp8",
    authDomain: "madina-9f9f6.firebaseapp.com",
    projectId: "madina-9f9f6",
    storageBucket: "madina-9f9f6.appspot.com",
    messagingSenderId: "360312760912",
    appId: "1:360312760912:web:d68aaff9c20b7b3a38bf55",
    measurementId: "G-GDVNWJD1SY"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore(app);
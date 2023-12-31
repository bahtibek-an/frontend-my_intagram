
import { initializeApp } from "firebase/app";
import {  getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBqoqDBgBYLnst0BJgyMLiROO-jlS7azpY",
    authDomain: "karomiddin-instagram.firebaseapp.com",
    projectId: "karomiddin-instagram",
    storageBucket: "karomiddin-instagram.appspot.com",
    messagingSenderId: "603196847891",
    appId: "1:603196847891:web:de607a0864a25585284ce6",
    measurementId: "G-SW90RH6SGT"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore(app);
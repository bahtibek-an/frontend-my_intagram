
import { initializeApp } from "firebase/app";
import {  getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD0K01p3pRk5SKInxwmzmXecDVuOtT6z8E",
    authDomain: "instaproject12-bfc15.firebaseapp.com",
    projectId: "instaproject12-bfc15",
    storageBucket: "instaproject12-bfc15.appspot.com",
    messagingSenderId: "779056874247",
    appId: "1:779056874247:web:21c75b11e8d6d51da6bba2",
    measurementId: "G-0S8XM70JCV"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore(app);
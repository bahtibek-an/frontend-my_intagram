
import { initializeApp } from "firebase/app";
import {  getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCKrVoWtZ84iJPMJmY9JxxepS4ftGbWRA",
    authDomain: "insta-8f458.firebaseapp.com",
    databaseURL: "https://insta-8f458-default-rtdb.firebaseio.com",
    projectId: "insta-8f458",
    storageBucket: "insta-8f458.appspot.com",
    messagingSenderId: "966989905820",
    appId: "1:966989905820:web:065bb86bd0dd7ee6df1259"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDghM9AX8G7OyF_Fxki7jAaZ2boLxkNjYU",
  authDomain: "insta-app-1-d57f7.firebaseapp.com",
  projectId: "insta-app-1-d57f7",
  storageBucket: "insta-app-1-d57f7.appspot.com",
  messagingSenderId: "841425515462",
  appId: "1:841425515462:web:fd947eb35383784b47b8c7",
  measurementId: "G-H4FBSWGGCV"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};


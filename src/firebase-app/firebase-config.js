import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAao5_NpPS6jW5L7fR75LA_ADzqxkrlUOM",
  authDomain: "shakhboz-insta-3d1bd.firebaseapp.com",
  projectId: "shakhboz-insta-3d1bd",
  storageBucket: "shakhboz-insta-3d1bd.appspot.com",
  messagingSenderId: "619767977115",
  appId: "1:619767977115:web:aff58da34e77878962e23e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

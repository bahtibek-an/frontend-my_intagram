// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAtrP5YFqj6Mv0Hdxo3BB2rbNscOWh9J3E",
  authDomain: "auth-94fb1.firebaseapp.com",
  projectId: "auth-94fb1",
  storageBucket: "auth-94fb1.appspot.com",
  messagingSenderId: "622350792769",
  appId: "1:622350792769:web:e9bdd9084cc21238e36ec0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const imageDb = getStorage(app)
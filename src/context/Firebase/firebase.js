import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhb2jjcTELQPsKoBbNZTavD71k4_cEZNo",
  authDomain: "instagram-uz-bd4d1.firebaseapp.com",
  projectId: "instagram-uz-bd4d1",
  storageBucket: "instagram-uz-bd4d1.appspot.com",
  messagingSenderId: "362172724514",
  appId: "1:362172724514:web:70bccae7f1823a6849217b",
  measurementId: "G-R6LY05DE6P"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTsKYbqaAUZ8izpiVEEdHKaI_JchhUIlo",
  authDomain: "mukam-instagram-13505.firebaseapp.com",
  projectId: "mukam-instagram-13505",
  storageBucket: "mukam-instagram-13505.appspot.com",
  messagingSenderId: "75521843882",
  appId: "1:75521843882:web:2e1e8dd4a112c687d126d3",
  measurementId: "G-VQ7V323BC5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

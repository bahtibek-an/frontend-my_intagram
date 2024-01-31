import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEAch2K35b5VvWMDPR1F1ZZutHmVMkC3g",
  authDomain: "instagram-af628.firebaseapp.com",
  projectId: "instagram-af628",
  storageBucket: "instagram-af628.appspot.com",
  messagingSenderId: "329698581497",
  appId: "1:329698581497:web:6f89b7bcda55ad8c2cbb28"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

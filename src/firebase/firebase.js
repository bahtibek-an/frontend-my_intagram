import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAtrP5YFqj6Mv0Hdxo3BB2rbNscOWh9J3E",
  authDomain: "auth-94fb1.firebaseapp.com",
  projectId: "auth-94fb1",
  storageBucket: "auth-94fb1.appspot.com",
  messagingSenderId: "622350792769",
  appId: "1:622350792769:web:e9bdd9084cc21238e36ec0"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

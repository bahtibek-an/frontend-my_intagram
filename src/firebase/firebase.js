import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCB_e4aOKeDmJZMkdPJBBkWDLNej2sp6hc",
  authDomain: "instagram-c8be6.firebaseapp.com",
  databaseURL: "https://instagram-c8be6-default-rtdb.firebaseio.com",
  projectId: "instagram-c8be6",
  storageBucket: "instagram-c8be6.appspot.com",
  messagingSenderId: "274154457179",
  appId: "1:274154457179:web:ae6a48549a93490606977e",
  measurementId: "G-QNJ6W5J9JV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
   apiKey: "AIzaSyD3PLH35y2XgDgFM0e1bmXmoHZ4z9nH0uk",
   authDomain: "insta-murodjon.firebaseapp.com",
   projectId: "insta-murodjon",
   storageBucket: "insta-murodjon.appspot.com",
   messagingSenderId: "523941490219",
   appId: "1:523941490219:web:eefbdae77e77bafb0fc46e",
   measurementId: "G-CVVZ405C1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { app, storage, db, auth, googleProvider };

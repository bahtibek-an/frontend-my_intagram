import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYYrQo3WDYmFD1DdZNuRof2YvIrcpo4uQ",
  authDomain: "my-instagram-8a736.firebaseapp.com",
  projectId: "my-instagram-8a736",
  storageBucket: "my-instagram-8a736.appspot.com",
  messagingSenderId: "386252018885",
  appId: "1:386252018885:web:3927515ed80558522c0cac"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase services directly
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export { app }; // Optionally export the app if needed elsewhere

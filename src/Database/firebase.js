import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

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

export async function saveUserDataTofirebase(userId, userData) {
  try{
    const userRef = doc(db, "follow", userId);
    await updateDoc(userRef, userData, {merge: true});
    console.log("Create database collen");
  }catch(error){
    console.log(error);
  }
}

// Export Firebase services directly
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export { app };

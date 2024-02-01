import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyCfYbDYwRloQcob-OsN-XFHcHTqYQOZECE",
  authDomain: "instagram-ca768.firebaseapp.com",
  projectId: "instagram-ca768",
  storageBucket: "instagram-ca768.appspot.com",
  messagingSenderId: "43580888803",
  appId: "1:43580888803:web:31dcc9b7170bc059fa57d6",
  measurementId: "G-LMVWF26E4F"
}

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };

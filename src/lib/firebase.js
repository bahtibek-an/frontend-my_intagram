import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import Firebase from "firebase/compat/app";

const config = {
  apiKey: "AIzaSyBup3TlhY-hT-CfkyrOr38r8UlKNowVX6c",
  authDomain: "instagram-clone-d56d1.firebaseapp.com",
  projectId: "instagram-clone-d56d1",
  storageBucket: "instagram-clone-d56d1.appspot.com",
  messagingSenderId: "610539683313",
  appId: "1:610539683313:web:381a183ba554d371ae1850",
  measurementId: "G-3GSHKPEMXH"
}

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };

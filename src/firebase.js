import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp4D56Z1ovAUT0DpCjIJ45b9ecVHOjUQY",
  authDomain: "ozod-insta.firebaseapp.com",
  projectId: "ozod-insta",
  storageBucket: "ozod-insta.appspot.com",
  messagingSenderId: "406063531642",
  appId: "1:406063531642:web:9e4f3911d58ccad150ddc3",
  measurementId: "G-N56F0EEZ5R"
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const auth = getAuth();
export const app = initializeApp(firebaseConfig);
export const db = getFirestore()

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB6rhKO53eDnCSUvQVGZg1U5h1CnyC8hTw',
  authDomain: 'instagram-clone-1d499.firebaseapp.com',
  databaseURL: 'https://instagram-clone-1d499-default-rtdb.firebaseio.com',
  projectId: 'instagram-clone-1d499',
  storageBucket: 'instagram-clone-1d499.appspot.com',
  messagingSenderId: '620192335188',
  appId: '1:620192335188:web:8b56d816f4f54b1a95b4c1',
  measurementId: 'G-XM52DLNDRL',
};

firebase.initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = firebase.storage();
export const db = getFirestore(app);

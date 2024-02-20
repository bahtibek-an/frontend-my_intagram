import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC09WY7OFZAIV8FzKTghS8isaKqsZOX1co",
    authDomain: "qwasar-instagram-project.firebaseapp.com",
    projectId: "qwasar-instagram-project",
    storageBucket: "qwasar-instagram-project.appspot.com",
    messagingSenderId: "670661781879",
    appId: "1:670661781879:web:e7aa4888868c30e97fd972",
    measurementId: "G-P7HJQFQHHW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const usernameCollection = collection(db, 'username');
const usersCollection = collection(db, 'users');
const postCollection = collection(db, 'post');
const followerCollection = collection(db, 'followers');
const followingCollection = collection(db, 'followings');

export {
    auth,
    db,
    usernameCollection,
    usersCollection,
    storage,
    ref,
    uploadBytes,
    deleteObject,
    doc,
    updateDoc,
    postCollection,
    app,
    followerCollection,
    followingCollection,
};

import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBezOG4mgB62IgwJhp9MvqgIiNUlLVORs",
  authDomain: "instagram-clone-5920b.firebaseapp.com",
  projectId: "instagram-clone-5920b",
  storageBucket: "instagram-clone-5920b.appspot.com",
  messagingSenderId: "947407787032",
  appId: "1:947407787032:web:b67fef3e0764dbfccb9f6d",
  measurementId: "G-NH9FFEQJJ4"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)
export  {app,auth,db,storage};



// 'deleteDoc', 'handleLikes', 'isLiked', 'handleShare', 'handlePostComments', 'isAuthor' и 'handleDeletePost', 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAgAjFhACb_S2XpK7aePZd2m5cEiziCtUI",
	authDomain: "instagram-app-c6952.firebaseapp.com",
	projectId: "instagram-app-c6952",
	storageBucket: "instagram-app-c6952.appspot.com",
	messagingSenderId: "299785333023",
	appId: "1:299785333023:web:5342d3a88a53b74f41e82a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

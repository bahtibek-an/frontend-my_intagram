import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyC6aQAw93686a555nX_cIyblkBonygZNl4",
	authDomain: "bekagram-ecda5.firebaseapp.com",
	projectId: "bekagram-ecda5",
	storageBucket: "bekagram-ecda5.appspot.com",
	messagingSenderId: "448636530433",
	appId: "1:448636530433:web:72bb760b19b9f42053f500"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

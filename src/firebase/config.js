import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALxPYpcijvUeDBvXJOzYFp_BbpwukxnR4",
  authDomain: "my-yelp-963fc.firebaseapp.com",
  databaseURL: "https://my-yelp-963fc-default-rtdb.firebaseio.com",
  projectId: "my-yelp-963fc",
  storageBucket: "my-yelp-963fc.appspot.com",
  messagingSenderId: "126887725688",
  appId: "1:126887725688:web:566ef7946695b4a93bbb8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);

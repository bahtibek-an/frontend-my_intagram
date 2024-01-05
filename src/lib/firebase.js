import Firebase from "firebase/compat/app";
import firebaseAuthServices from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
    apiKey: "AIzaSyD9bey1ez6gx_2he0MpCL3Dw2GKoaimDt8",
    authDomain: "instagram-dc39d.firebaseapp.com",
    projectId: "instagram-dc39d",
    storageBucket: "instagram-dc39d.appspot.com",
    messagingSenderId: "81965261261",
    appId: "1:81965261261:web:0b9c61f0f38340ef232484"
}

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };

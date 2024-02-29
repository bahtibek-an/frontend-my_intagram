import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import { seedDatabase } from '../seed';

const config = {
    apiKey: 'AIzaSyCP2-lGX7Bw8bh79PitSCe1UJIxF11xaso',
    authDomain: 'instagram-1cd27.firebaseapp.com',
    projectId: 'instagram-1cd27',
    storageBucket: 'instagram-1cd27.appspot.com',
    messagingSenderId: '329563867891',
    appId: '1:329563867891:web:9e37dd13c15c2fbb9d8586'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//seedDatabase(firebase);

export { firebase, FieldValue, config };

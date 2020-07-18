import firebase from 'firebase'
import firestore from 'firebase/firebase-firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAPi3sHCVukXT3fJ_RutCRIrkGOgPmZMvM",
    authDomain: "fir-study-a5944.firebaseapp.com",
    databaseURL: "https://fir-study-a5944.firebaseio.com",
    projectId: "fir-study-a5944",
    storageBucket: "fir-study-a5944.appspot.com",
    messagingSenderId: "563369099608",
    appId: "1:563369099608:web:9bc82430cb7974c118a52d",
    measurementId: "G-RLPQ50JNB3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const db=firebase.firestore();
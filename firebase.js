// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9dSR6G4sAeujbSOtoj8GIbNFiLMRP_jg",
  authDomain: "hspantryapp-17c6f.firebaseapp.com",
  projectId: "hspantryapp-17c6f",
  storageBucket: "hspantryapp-17c6f.appspot.com",
  messagingSenderId: "427101349202",
  appId: "1:427101349202:web:66ec415b7c43a7fb41868b",
  measurementId: "G-G05DRGS1DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {firestore, firebaseConfig, auth };
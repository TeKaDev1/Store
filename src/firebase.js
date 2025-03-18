// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC54IlSex68eEcm5PtSn95A4EiH8QkHU14",
    authDomain: "admin-478e6.firebaseapp.com",
    projectId: "admin-478e6",
    storageBucket: "admin-478e6.firebasestorage.app",
    messagingSenderId: "494535471612",
    appId: "1:494535471612:web:9034b747b4cc7dc98ec279"
  };


  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
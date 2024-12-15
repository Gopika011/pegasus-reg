import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBiOKsgv6uxPK6I_SqbH04mVfh_Wgm5kQA",
  authDomain: "nextapp-81627.firebaseapp.com",
  projectId: "nextapp-81627",
  storageBucket: "nextapp-81627.firebasestorage.app",
  messagingSenderId: "728349559879",
  appId: "1:728349559879:web:a26d30dd1db237365db562",
  measurementId: "G-2FTX0LX8Y4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}
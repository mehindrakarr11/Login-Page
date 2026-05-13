import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyA6uOkpG5UFNBaetPq9f9uEfGGs2Hz1thM",
  authDomain: "auth-demo-799c0.firebaseapp.com",
  projectId: "auth-demo-799c0",
  storageBucket: "auth-demo-799c0.firebasestorage.app",
  messagingSenderId: "373812427008",
  appId: "1:373812427008:web:f4e8fd2bd4cef971689be5"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
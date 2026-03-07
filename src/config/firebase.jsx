// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcm0iDbIRay3yMfWqr5IQnibq_okF2SpM",
  authDomain: "affliate-site-0.firebaseapp.com",
  projectId: "affliate-site-0",
  storageBucket: "affliate-site-0.firebasestorage.app",
  messagingSenderId: "281815305405",
  appId: "1:281815305405:web:d94bb1b21c285903a6bbd4",
  measurementId: "G-GDE1LPF4W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
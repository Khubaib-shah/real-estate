// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-b0e7b.firebaseapp.com",
  projectId: "real-estate-b0e7b",
  storageBucket: "real-estate-b0e7b.appspot.com",
  messagingSenderId: "890020932707",
  appId: "1:890020932707:web:365684b423c5bc72f91c56",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

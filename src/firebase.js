// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9Agz1JVg9olxgFnql6XNzQNvMV3hxYnc",
  authDomain: "citadel-135ec.firebaseapp.com",
  projectId: "citadel-135ec",
  storageBucket: "citadel-135ec.appspot.com",
  messagingSenderId: "1873928652",
  appId: "1:1873928652:web:356e19f6150b8736823d69",
  measurementId: "G-XQ2XD8G69B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries */

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCudVOR8ZCETqj1n0oLL1eoHJCKTk4JNtM",
  authDomain: "recipe-finder-meal-plann-7ddeb.firebaseapp.com",
  projectId: "recipe-finder-meal-plann-7ddeb",
  storageBucket: "recipe-finder-meal-plann-7ddeb.firebasestorage.app",
  messagingSenderId: "767947081190",
  appId: "1:767947081190:web:44c43174aad8fd09648227",
};

/* // Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); */

//Usar Firestore en cualquier parte de tu app
/* import { db } from "../firebase/init";
import { collection, getDocs } from "firebase/firestore";

const recipesCollection = collection(db, "recipes");
const snapshot = await getDocs(recipesCollection); */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDxNzLuZcCS0rR24ifTZNSnbjvrX-3D-3I",
  authDomain: "store-user-f3f73.firebaseapp.com",
  projectId: "store-user-f3f73",
  storageBucket: "store-user-f3f73.appspot.com",
  messagingSenderId: "332646048080",
  appId: "1:332646048080:web:d382d42c2bb5ff681b4c55",
  measurementId: "G-YSY918RMER",
  databaseURL:"https://store-user-f3f73-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
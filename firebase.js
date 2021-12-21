// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPxhDav35UYwj4_K7E3IphGqxicvlil2U",
  authDomain: "iebc-254.firebaseapp.com",
  projectId: "iebc-254",
  storageBucket: "iebc-254.appspot.com",
  messagingSenderId: "1063164399562",
  appId: "1:1063164399562:web:9a6d059a9d2e8902438933"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {
  app, db, storage
}
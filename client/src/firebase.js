// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAFM2taoOM6HbZ-K3PHyyyq9LgIgg1QSk",
  authDomain: "blog-platform-d0984.firebaseapp.com",
  projectId: "blog-platform-d0984",
  storageBucket: "blog-platform-d0984.firebasestorage.app",
  messagingSenderId: "1066245050632",
  appId: "1:1066245050632:web:8b5b6d7fcfce63fba01cbd",
  measurementId: "G-Y3L090YY7P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

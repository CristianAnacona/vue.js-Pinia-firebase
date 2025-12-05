
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCLvUsX2mZpaSBCG6iP-gsYHmYsfNGL200",
  authDomain: "tienda--ropa-vue.firebaseapp.com",
  projectId: "tienda--ropa-vue",
  storageBucket: "tienda--ropa-vue.firebasestorage.app",
  messagingSenderId: "33656788886",
  appId: "1:33656788886:web:ba409e5f20eeefffe7efb7",
  measurementId: "G-Z996KV5W7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


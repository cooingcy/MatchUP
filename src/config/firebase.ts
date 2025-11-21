import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_S7o2d8Z5eMzCfB8bQWjzNEvtj2Hsbyk",
  authDomain: "matchup-2b71e.firebaseapp.com",
  projectId: "matchup-2b71e",
  storageBucket: "matchup-2b71e.firebasestorage.app",
  messagingSenderId: "557330553224",
  appId: "1:557330553224:web:cfb6e88183cd82eb23823d",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

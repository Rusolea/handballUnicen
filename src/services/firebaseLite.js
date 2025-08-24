import { initializeApp, getApps, getApp as getFirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const getApp = () => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
  return getFirebaseApp();
};

let dbLite;
export const getDbLite = () => {
  if (!dbLite) {
    dbLite = getFirestore(getApp());
  }
  return dbLite;
};


import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBPmuI79a9RECMvkM_KboCSl90fGst5Qvo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aycodderweb.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aycodderweb",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aycodderweb.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "694837469429",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:694837469429:web:6b2dc47dd94bd7e30765bc",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RV8W6XT0VQ"
};

// Initialize Firebase safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;


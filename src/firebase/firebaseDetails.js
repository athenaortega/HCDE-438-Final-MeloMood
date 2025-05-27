import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDTOg0M0NmBoRUT8ZFOf0v1Gs6g9v1fDWM",
  authDomain: "hcde-438-final-melomood.firebaseapp.com",
  projectId: "hcde-438-final-melomood",
  storageBucket: "hcde-438-final-melomood.firebasestorage.app",
  messagingSenderId: "125470358537",
  appId: "1:125470358537:web:734a94d99faf8ffdac0cd8",
  measurementId: "G-1MHP8B301F"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

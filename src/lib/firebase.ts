import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDG62SazlBkS2dBWqOuJUs3jOepmcOHYO4",
  authDomain: "guide-bazaar.firebaseapp.com",
  projectId: "guide-bazaar",
  storageBucket: "guide-bazaar.firebasestorage.app",
  messagingSenderId: "653163372647",
  appId: "1:653163372647:web:cb01458863b00920b3f4c2",
  measurementId: "G-7W9M6KXK91"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app); 
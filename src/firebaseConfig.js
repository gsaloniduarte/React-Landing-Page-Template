// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADswkKwm65Tk1Ef6zEUbJfgsAS7ZNDNzA",
  authDomain: "landing-541b3.firebaseapp.com",
  projectId: "landing-541b3",
  storageBucket: "landing-541b3.firebasestorage.app",
  messagingSenderId: "189740640039",
  appId: "1:189740640039:web:46b400b381565abd60ab02",
  measurementId: "G-MPKDC8RZH7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
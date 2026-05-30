// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqebROMtO0vrjaAN5BJ0LXbPzHYCruMoU",
  authDomain: "netflix-gpt-b46e3.firebaseapp.com",
  projectId: "netflix-gpt-b46e3",
  storageBucket: "netflix-gpt-b46e3.firebasestorage.app",
  messagingSenderId: "381758107380",
  appId: "1:381758107380:web:b12be07dac8a35c03a38a1",
  measurementId: "G-5YYG1XY8JH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

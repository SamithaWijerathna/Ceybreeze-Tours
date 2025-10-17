// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBz253Eiif34B28FdWiX51UmlbUF3dc-E0",
  authDomain: "ceybreeze-tours-3443d.firebaseapp.com",
  projectId: "ceybreeze-tours-3443d",
  storageBucket: "ceybreeze-tours-3443d.firebasestorage.app",
  messagingSenderId: "94148437936",
  appId: "1:94148437936:web:4de667cfc522c502c05875",
  measurementId: "G-JB0916EC12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
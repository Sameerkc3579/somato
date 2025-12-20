import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Authentication

const firebaseConfig = {
  apiKey: "AIzaSyCEWX3zobtts4IEqf5vF7Vn4QJkjpP9qZk",
  authDomain: "somato-fc217.firebaseapp.com",
  projectId: "somato-fc217",
  storageBucket: "somato-fc217.firebasestorage.app",
  messagingSenderId: "369423627452",
  appId: "1:369423627452:web:98b85e2004f579456e8cb9",
  measurementId: "G-JQ4SCCEEV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth so the Login page can use it
export const auth = getAuth(app);
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDa8cjeDMgj5BuRtvC4zkdfDuJ0oCYm70M",
  authDomain: "feedback-25b95.firebaseapp.com",
  projectId: "feedback-25b95",
  storageBucket: "feedback-25b95.appspot.com",
  messagingSenderId: "1092897530306",
  appId: "1:1092897530306:web:3cb1863882e87c45e4b65b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyADtBX8G9ymjM3IMTLniM8UN6iaDAol8Yw",
  authDomain: "question-page-147ab.firebaseapp.com",
  projectId: "question-page-147ab",
  storageBucket: "question-page-147ab.appspot.com",
  messagingSenderId: "750371404513",
  appId: "1:750371404513:web:afbc72ae1d8ec6f76c95a0",
  measurementId: "G-MY4WPHMWFG"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 
const storage = getStorage(app); 

let analytics;
if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
  analytics = getAnalytics(app); 
}


export { db, storage };

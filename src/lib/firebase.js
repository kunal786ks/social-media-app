
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'



  
const firebaseConfig = {
  apiKey: "AIzaSyBYJvQimGF28oLRjWT9Ut8yyLnfDyB_eGM",
  authDomain: "social-media-app-f0078.firebaseapp.com",
  projectId: "social-media-app-f0078",
  storageBucket: "social-media-app-f0078.appspot.com",
  messagingSenderId: "198348431451",
  appId: "1:198348431451:web:9418038833b960a2de5f7e"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage=getStorage(app);

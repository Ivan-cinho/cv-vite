

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCj9rD4dTTT8xbE19TndoziMtO5CWa3tXA",
    authDomain: "cv-vite.firebaseapp.com",
    projectId: "cv-vite",
    storageBucket: "cv-vite.firebasestorage.app",
    messagingSenderId: "1080551529294",
    appId: "1:1080551529294:web:0418ab34909b495f435c1f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

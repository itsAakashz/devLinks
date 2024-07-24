// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDl_6C8YFqbjJe4cRpgpMqkkaO3qO22kC0",
  authDomain: "devlinks-d8e6f.firebaseapp.com",
  projectId: "devlinks-d8e6f",
  storageBucket: "devlinks-d8e6f.appspot.com",
  messagingSenderId: "112923042923",
  appId: "1:112923042923:web:c30c3691d7562dd4853d2e",
  measurementId: "G-GD3M1MKMFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };

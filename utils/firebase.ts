import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWNqyl25T61yXwovGHp5PilA-ATUwGYe8",
  authDomain: "studio-2221789131-ddb70.firebaseapp.com",
  projectId: "studio-2221789131-ddb70",
  storageBucket: "studio-2221789131-ddb70.firebasestorage.app",
  messagingSenderId: "334494001740",
  appId: "1:334494001740:web:1ce8ae92fc07f7f3fd22e9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
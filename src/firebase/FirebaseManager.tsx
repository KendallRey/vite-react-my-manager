// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID ,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID 
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const messaging = getMessaging(firebaseApp);
// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(firebaseApp)
// export const db = getFirestore(firebaseApp)
// export const realtimeDB = getDatabase(firebaseApp, import.meta.env.VITE_DATABASE_URL)
export default firebaseApp
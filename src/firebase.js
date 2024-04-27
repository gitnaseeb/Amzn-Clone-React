// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYH1guiC2ERENrBiekecHku-M8jOKEN_U",
  authDomain: "fir-a56cb.firebaseapp.com",
  projectId: "fir-a56cb",
  storageBucket: "fir-a56cb.appspot.com",
  messagingSenderId: "71881307664",
  appId: "1:71881307664:web:8e55b2823655350591fc95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

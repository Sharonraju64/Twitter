// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEnucGchwkCNuGXQTvOrJYnjRnLY9QuzU",
  authDomain: "twitter-5767b.firebaseapp.com",
  projectId: "twitter-5767b",
  storageBucket: "twitter-5767b.appspot.com",
  messagingSenderId: "570110537167",
  appId: "1:570110537167:web:36ec14adbc8ac70108f6ba",
  measurementId: "G-674HEK55P6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;
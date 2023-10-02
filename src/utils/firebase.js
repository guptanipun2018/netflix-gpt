// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwq4Cx6zSX8qKBVSQgS9iYzASGrcWbz7Q",
  authDomain: "netflixgpt-9032f.firebaseapp.com",
  projectId: "netflixgpt-9032f",
  storageBucket: "netflixgpt-9032f.appspot.com",
  messagingSenderId: "121827285200",
  appId: "1:121827285200:web:521bfafef5e6c15f91e6d5",
  measurementId: "G-MR7XY4584W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();
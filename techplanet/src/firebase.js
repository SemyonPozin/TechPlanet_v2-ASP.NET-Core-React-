// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBMNmeUMZc6sCAdlkDoNgC1DVSINmrZ1Hw",
  authDomain: "techplanet-758f0.firebaseapp.com",
  projectId: "techplanet-758f0",
  storageBucket: "techplanet-758f0.appspot.com",
  messagingSenderId: "467645984243",
  appId: "1:467645984243:web:d53ba1d200a19c93c17686",
  measurementId: "G-WD8X8M75ER",
  databaseURL: "https://techplanet-758f0-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const analytics = getAnalytics(firebaseApp);
export default firebaseApp;
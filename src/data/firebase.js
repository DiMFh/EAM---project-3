// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzoH3UBLZaf1xJa4bzrdXhIq3KPo3amgA",

  authDomain: "prolog-b259a.firebaseapp.com",

  databaseURL: "https://prolog-b259a-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "prolog-b259a",

  storageBucket: "prolog-b259a.appspot.com",

  messagingSenderId: "510724773307",

  appId: "1:510724773307:web:a88d2aa300c52b085f209e",

  measurementId: "G-Z7S3X70YPH"

  

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
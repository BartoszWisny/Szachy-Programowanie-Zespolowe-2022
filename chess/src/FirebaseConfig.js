import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4vnYwkVnF-BVqXSR9v3ctynRWC_1eSFs",
  authDomain: "szachy-programowanie-zespolowe.firebaseapp.com",
  databaseURL: "https://szachy-programowanie-zespolowe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "szachy-programowanie-zespolowe",
  storageBucket: "szachy-programowanie-zespolowe.appspot.com",
  messagingSenderId: "1070253380342",
  appId: "1:1070253380342:web:161d90aa469da3d4df52d7",
  measurementId: "G-Y98J1RM53Z"
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getFirestore(app);

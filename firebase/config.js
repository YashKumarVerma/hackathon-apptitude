import firebase from "Firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCZMOn9h6LpwJGj_8R7YfUbBORuEwh3S0s",
  authDomain: "acmvitapptitude.firebaseapp.com",
  databaseURL: "https://acmvitapptitude.firebaseio.com",
  projectId: "acmvitapptitude",
  storageBucket: "acmvitapptitude.appspot.com",
  messagingSenderId: "691038575126",
  appId: "1:691038575126:web:9263b21673d7d1c3bfb337",
  measurementId: "G-DRJ2C1SHEC",
};

// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBEwKP1qmNP2MGiSLRHj9hr_UKjRo9Lr5k",
  authDomain: "challenge-7e003.firebaseapp.com",
  projectId: "challenge-7e003",
  storageBucket: "challenge-7e003.appspot.com",
  messagingSenderId: "796054779219",
  appId: "1:796054779219:web:7e4900cd35905e782f5da6",
  measurementId: "G-JBSNG943C8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db , auth } 
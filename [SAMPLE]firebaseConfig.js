import firebase from "firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

/*
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
*/

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
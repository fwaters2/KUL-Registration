import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBY2h8WMFvciDiZaGXdXGrh7ffpnly6A7I",
  authDomain: "fall20kul.firebaseapp.com",
  databaseURL: "https://fall20kul.firebaseio.com",
  projectId: "fall20kul",
  storageBucket: "fall20kul.appspot.com",
  messagingSenderId: "837129488452",
  appId: "1:837129488452:web:73e61a2d9e15494d795411",
  measurementId: "G-NF5HQBKFYY",
};
firebase.initializeApp(firebaseConfig);

export default firebase;

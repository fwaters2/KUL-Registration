import firebase from "firebase";
// import "firebase/firestore";
// import "firebase/auth";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAihRxiubQJmG6lGkpeo7gzZ4W2TFXnwKk",
  authDomain: "taiwana-beach-hat.firebaseapp.com",
  databaseURL: "https://taiwana-beach-hat.firebaseio.com",
  projectId: "taiwana-beach-hat",
  storageBucket: "taiwana-beach-hat.appspot.com",
  messagingSenderId: "163669249374",
  appId: "1:163669249374:web:5e5db3bd97dcd30db893cf",
  measurementId: "G-H5PWFVTYFC",
};
firebase.initializeApp(firebaseConfig);

export default firebase;

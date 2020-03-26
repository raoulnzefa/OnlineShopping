import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB59xYDpC-I6-IjYpSDp2q4skOJBbAa18k",
  authDomain: "onlineshoppinglajz.firebaseapp.com",
  databaseURL: "https://onlineshoppinglajz.firebaseio.com",
  projectId: "onlineshoppinglajz",
  storageBucket: "onlineshoppinglajz.appspot.com",
  messagingSenderId: "412055424625",
  appId: "1:412055424625:web:38cf04776ba7a9bd2ed5d0",
  measurementId: "G-3G4NQE53RF"
};
  // Initialize Firebase
  let app = firebase.initializeApp(firebaseConfig);
  export {app};
  let db = app.firestore();
  export {db};
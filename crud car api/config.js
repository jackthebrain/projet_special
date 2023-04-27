const firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyBi1FivWievLIE3R7Iu-wLYuDF5gwU7ZDY",
  authDomain: "crud-base-jack.firebaseapp.com",
  projectId: "crud-base-jack",
  storageBucket: "crud-base-jack.appspot.com",
  messagingSenderId: "225211939815",
  appId: "1:225211939815:web:24969c254187b044471b42"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const trips = db.collection("cars");
module.exports = trips;
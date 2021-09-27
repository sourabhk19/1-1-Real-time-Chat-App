import firebase from "firebase/app";
import  "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAd9p6B8vf2WAdKLV5GuLfOkylmQ2899No",
    authDomain: "unichat-c9598.firebaseapp.com",
    projectId: "unichat-c9598",
    storageBucket: "unichat-c9598.appspot.com",
    messagingSenderId: "124208568707",
    appId: "1:124208568707:web:17f2272ad0d80e131d3eb6"
  }).auth();
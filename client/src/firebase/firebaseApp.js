import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

var firebaseConfig = {
    apiKey: "AIzaSyDdB4bxbpzuhIk6fF8uENZGEetZL_QhNFQ",
    authDomain: "fir-vuejs-41baa.firebaseapp.com",
    databaseURL: "https://fir-vuejs-41baa.firebaseio.com",
    projectId: "fir-vuejs-41baa",
    storageBucket: "fir-vuejs-41baa.appspot.com",
    messagingSenderId: "257883077377",
    appId: "1:257883077377:web:96a1a9c357b392fc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

   const db = firebase.firestore();
   const auth = firebase.auth();
   const functions = firebase.functions()   


   
   export {
       db, auth, functions
   }
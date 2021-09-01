import firebase from "firebase/app";
import "firebase/auth";
 
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyDVOjAaaJGLcTQkXABRT6ARcYrdpeqw07g",
    authDomain: "ecommerce-1eaf3.firebaseapp.com",
    projectId: "ecommerce-1eaf3",
    storageBucket: "ecommerce-1eaf3.appspot.com",
    messagingSenderId: "850661521283",
    appId: "1:850661521283:web:64255d734d383b6ea128b6"
  }
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export const auth = firebase.auth();
  
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

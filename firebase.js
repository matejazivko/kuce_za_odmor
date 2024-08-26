import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAzpELEpi2rS-omGgRRANdTB1picXK2AFg",
    authDomain: "kuce-za-odmor.firebaseapp.com",
    projectId: "kuce-za-odmor",
    storageBucket: "kuce-za-odmor.appspot.com",
    messagingSenderId: "848802382235",
    appId: "1:848802382235:web:bfb19b7e319c3c40a1213e"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export default app;
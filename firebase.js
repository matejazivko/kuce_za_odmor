import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAd80HPr5GTHR8Q_OX30HgW3BoBSPr7ImE",
  authDomain: "kuce-za-odmor-270f3.firebaseapp.com",
  projectId: "kuce-za-odmor-270f3",
  storageBucket: "kuce-za-odmor-270f3.appspot.com",
  messagingSenderId: "619857949682",
  appId: "1:619857949682:web:ae25d86d4974ec4724316b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  export default {app, getAuth};
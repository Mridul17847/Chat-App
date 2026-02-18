import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMwOj9WImqY-Ks5NJinKnXgmSLk0AFUrA",
  authDomain: "realtimechat-3c53e.firebaseapp.com",
  databaseURL: "https://realtimechat-3c53e-default-rtdb.firebaseio.com",
  projectId: "realtimechat-3c53e",
  storageBucket: "realtimechat-3c53e.firebasestorage.app",
  messagingSenderId: "830919860035",
  appId: "1:830919860035:web:ae96576ab92ab7034d99f6",
  measurementId: "G-7LFVXBQNJ2",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };


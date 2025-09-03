// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQTfLolKekdeMaBZ8abjfZ3js-b49fGLk",
  authDomain: "project-sih-cc5b6.firebaseapp.com",
  projectId: "project-sih-cc5b6",
  storageBucket: "project-sih-cc5b6.firebasestorage.app",
  messagingSenderId: "127386326947",
  appId: "1:127386326947:web:836041cd6551240f302c16",
  measurementId: "G-3FQ2J3Y44P",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

if (!isSupported()) {
  const analytics = getAnalytics(app);
}

const auth = getAuth(app);

export { auth };

export const register = (email, username, password) => {
  return createUserWithEmailAndPassword(auth, email, password).then((res) =>
    updateProfile(res.user, { displayName: username })
  );
};

export const login = (email, password) => {
  console.log(email, password);
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  setTimeout(() => {
    return auth.signOut();
  }, 1500);
};

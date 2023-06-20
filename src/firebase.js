import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBvsSXrH367P4SQzH02R-QSDk9O60r_STM",
  authDomain: "vedanta-b45f3.firebaseapp.com",
  projectId: "vedanta-b45f3",
  storageBucket: "vedanta-b45f3.appspot.com",
  messagingSenderId: "462813724768",
  appId: "1:462813724768:web:b5bcdfda367c6375c50305"
};
const app = initializeApp(firebaseConfig);

export const auth = app.getAuth()

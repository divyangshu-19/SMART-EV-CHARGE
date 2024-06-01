import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDV8Zu38IOAmMjSVMbdN8cD1qewI44DpwM",
  authDomain: "loginpage-s.firebaseapp.com",
  databaseURL: "https://loginpage-s-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "loginpage-s",
  storageBucket: "loginpage-s.appspot.com",
  messagingSenderId: "424988850304",
  appId: "1:424988850304:web:b8f963c2cf420996d9ce65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
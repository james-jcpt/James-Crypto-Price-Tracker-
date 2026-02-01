import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvIu63A6S3Dr3VyWIxG7fhr3UzdJZki64",
  authDomain: "jciplatform.firebaseapp.com",
  projectId: "jciplatform",
  storageBucket: "jciplatform.firebasestorage.app",
  messagingSenderId: "772727430342",
  appId: "1:772727430342:web:78865051a02d6323b3cbc7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

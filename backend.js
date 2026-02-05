// Firebase setup for JCI Platform
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, onValue, query, orderByChild, limitToLast } from "firebase/database";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBMWmtgufykRj0ExqXQYsp6aGEsf7-EzxM",
  authDomain: "jci-platform.firebaseapp.com",
  projectId: "jci-platform",
  storageBucket: "jci-platform.firebasestorage.app",
  messagingSenderId: "455825874162",
  appId: "1:455825874162:web:a667b64a5b2fc276e6846b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Signup function
export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

// Login function
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// Logout function
export function logout() {
    return signOut(auth);
}

// Update leaderboard
export function updateLeaderboard(userId, score) {
    set(ref(db, 'leaderboard/' + userId), { score });
}

// Fetch leaderboard (top 10)
export function getLeaderboard(callback) {
    const leaderboardRef = query(ref(db, 'leaderboard'), orderByChild('score'), limitToLast(10));
    onValue(leaderboardRef, snapshot => {
        callback(snapshot.val());
    });
                      }

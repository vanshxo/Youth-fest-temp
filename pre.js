import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithPopup, 
    GoogleAuthProvider, 
    setPersistence, 
    browserSessionPersistence, 
    signOut 
  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { app } from "./firebaseConfig.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const prereg = document.getElementById("pre-register-btn");

// Login logic
prereg.addEventListener("click", () => {
    setPersistence(auth, browserSessionPersistence)
    .then(() => signInWithPopup(auth, provider))
    .then((result) => {
        const user = result.user;
        console.log("User signed in: ", user);
        alert(`Welcome, ${user.displayName}!`);
    })
    .catch((error) => {
        console.error("Error during login: ", error);
        alert("Login Error: " + error.message);
    });
});

// Detect auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User signed in: ", user);
        prereg.textContent = "REGISTERED!!!";
        prereg.disabled = true; // Disable the button
    } else {
        console.log("No user signed in.");
        prereg.textContent = "PRE-REGISTER";
        prereg.disabled = false; // Enable the button if no user is logged in
    }
});

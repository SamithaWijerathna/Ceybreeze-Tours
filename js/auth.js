// auth.js

// Initialize Firebase (copy your config here)
const firebaseConfig = {
  apiKey: "AIzaSyBz253Eiif34B28FdWiX51UmlbUF3dc-E0",
  authDomain: "ceybreeze-tours-3443d.firebaseapp.com",
  projectId: "ceybreeze-tours-3443d",
  storageBucket: "ceybreeze-tours-3443d.appspot.com",
  messagingSenderId: "94148437936",
  appId: "1:94148437936:web:4de667cfc522c502c05875",
  measurementId: "G-JB0916EC12"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

// Update user greeting and check session
function updateUserGreeting() {
  const greeting = document.getElementById("user-greeting");
  if (!greeting) return; // exit if element not found

  auth.onAuthStateChanged(user => {
    if (user) {
      greeting.textContent = `Hi ${user.displayName || "User"}`;
    } else {
      greeting.textContent = "Hi Guest";
      // Optionally redirect to login page if session expired
      // window.location.href = "login.html";
    }
  });
}

// Call function on page load
updateUserGreeting();

// Optional: force logout after inactivity (session timeout)
// Example: 30 minutes inactivity
let sessionTimeout = 30 * 60 * 1000; // 30 minutes
let logoutTimer;

function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(() => {
    auth.signOut().then(() => {
      alert("Session expired. Please login again.");
      window.location.href = "login.html";
    });
  }, sessionTimeout);
}

// Listen for user activity
['click', 'keydown', 'mousemove', 'scroll'].forEach(event => {
  document.addEventListener(event, resetLogoutTimer);
});

// Start timer
resetLogoutTimer();

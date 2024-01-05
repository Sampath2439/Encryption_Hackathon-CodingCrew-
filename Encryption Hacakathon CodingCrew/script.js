 

  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAbunsfYboVBve59cH9fw5MqCPCDh9xs_A",
    authDomain: "signin-1f542.firebaseapp.com",
    projectId: "signin-1f542",
    storageBucket: "signin-1f542.appspot.com",
    messagingSenderId: "640383751614",
    appId: "1:640383751614:web:a313f7c7a5c752edf215ef",
    measurementId: "G-EJ82PK6PRP"
  };

  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en'
  const analytics = getAnalytics(app);
  const provider = new GoogleAuthProvider();


  const googleLogin = document.getElementById("google-login")

  googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    console.log(user);
    window.location.href="./home.html";
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
   
   
    
  });
  })

  updateUserProfile();

  function redirect(){
    window.location.href="./sign-up.html";
  }

  document.getElementById("googlebtn1").addEventListener("click", redirect);
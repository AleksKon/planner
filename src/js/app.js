'use strict';

// Initializes event planner.
function eventPlanner() {

  pageSections(); // Page section single view -> pageSection.js
 
  // Shortcuts to Email/Passw SignUP Buttons.
  //this.registerWithEmail = document.getElementById('email-register');

  // Shortcuts to Facebook Buttons.
  this.signInFacebookBtnReg = document.getElementById('facebook');

  // Shortcuts to Google Buttons.
  this.signInGoogleBtnReg = document.getElementById('google');
  this.signInGoogleBtn = document.getElementById('google-signin');
  this.signOutBtn = document.getElementById('log-out');

  // Sign Up with Email/Passw Button.
  //this.registerWithEmail.addEventListener('click', this.emailPasswordRegister.bind(this));
  // Sign In With Facebook Buttons.
  this.signInFacebookBtnReg.addEventListener('click', this.signInFacebook.bind(this));
  // Sign In With Google Buttons.
  this.signInGoogleBtnReg.addEventListener('click', this.signInGoogle.bind(this));
  this.signInGoogleBtn.addEventListener('click', this.signInGoogle.bind(this));
  // Sign Out Button
  this.signOutBtn.addEventListener('click', this.signOut.bind(this));

  this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
eventPlanner.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
	this.auth = firebase.auth();
	this.database = firebase.database();
	this.storage = firebase.storage();
	//Initiates Firebase auth and listen to auth state changes.
	this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Register with email and password
// eventPlanner.prototype.emailPasswordRegister = function(){
//   var fullName = document.getElementById('fullName').value;
//   var email = document.getElementById('email').value;
//   var password = document.getElementById('password').value;

//   var errEmail = document.getElementById('errMessageEmail');
//   var errPassword = document.getElementById('errMessagePassw');

//   var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//   var valid = re.test(email);

//   if(!valid){
//     errEmail.textContent = 'Please enter a valid email.';
//   }
//   if(email === ''){
//     errEmail.textContent = 'Don\'t forget your email.';
//   }
//   if(password === ''){
//     errPassword.textContent = 'Enter password';
//   }
//   this.auth.createUserWithEmailAndPassword(email, password).catch(function(error) {

//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // [START_EXCLUDE]
//         if (errorCode == 'auth/weak-password') {
//           alert('The password is too weak.');
//         } else {
//           alert(errorMessage);
//         }
//         console.log(error);
//         // [END_EXCLUDE]
//       });
//       // [END createwithemail]
// };


// Sign-in with Facebook
eventPlanner.prototype.signInFacebook = function() {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_birthday');
  this.auth.signInWithRedirect(provider);
};
// Sign-in with Google
eventPlanner.prototype.signInGoogle = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');
  this.auth.signInWithRedirect(provider);
};
// Sign-out of Firebase
eventPlanner.prototype.signOut = function() {
  this.auth.signOut(); 
};

//Triggers when the auth state change for instance when the user signs-in or signs-out.
eventPlanner.prototype.onAuthStateChanged = function(user) {
	if(user){
    // Console log provider - Delete when done!!!
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Name: "+profile.displayName);
      console.log("  Email: "+profile.email);
      console.log("  Photo URL: "+profile.photoURL);
    });
    // When User signs in,hide register/sign in and show dashboard 
    document.getElementById('home').removeAttribute('class', 'page-active');
    document.getElementById('sign-in').removeAttribute('class', 'section-current');
    document.getElementById('register').removeAttribute('class', 'section-current');
    document.getElementById('dashboard').setAttribute('class', 'section-current');
    
    //Grabb dashboard elements
    this.userName = document.getElementById('user-name');

    //Display user's name
    var userName = user.displayName;
    this.userName.textContent = userName;

	}else{
    // When User signs out,show nav and direct to home page!
    document.getElementById('dashboard').removeAttribute('class');
    document.getElementById('home').setAttribute('class', 'section-current');

	}
};
  
window.onload = function() {
  window.eventPlanner = new eventPlanner();
};

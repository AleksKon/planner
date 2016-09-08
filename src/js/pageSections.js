/* -------------------------
* PAGE SECTIONS
---------------------------*/

function pageSections(){
//PAGE Sections
var homeSection = document.getElementById('home');
var registerSection = document.getElementById('register');
var signInSection = document.getElementById('sign-in');
var dashboardSection = document.getElementById('dashboard');

var registerLink = document.querySelector('.registerLink');
var signInLink = document.querySelector('.signInLink');
var registerHome = document.querySelector('.register-home');
var signInRegister = document.querySelector('.signin-register');
var homeLink = document.querySelector('.home-link');

// When clicking on navigation register/sign in links page section get current class
registerLink.addEventListener('click', toRegisterPage);
registerHome.addEventListener('click', toRegisterPage);
signInLink.addEventListener('click', toSignInPage);
signInRegister.addEventListener('click', toSignInPage);
homeLink.addEventListener('click', toHomePage);

function toRegisterPage(){
  registerSection.setAttribute('class', 'section-current');
  homeSection.removeAttribute('class', 'page-active');
  signInSection.removeAttribute('class', 'section-current');
}
function toSignInPage(){
  signInSection.setAttribute('class', 'section-current');
  registerSection.removeAttribute('class', 'section-current');
  homeSection.removeAttribute('class', 'page-active');
}
function toHomePage(){
  homeSection.setAttribute('class', 'section-current');
  registerSection.removeAttribute('class', 'section-current');
  signInSection.removeAttribute('class', 'section-current');
}

}
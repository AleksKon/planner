/* -------------------------
* REGISTRATION FORM VALIDATION
---------------------------*/

// Grabing inputs
var fullName = document.getElementById('fullName');
var email = document.getElementById('email');
var password = document.getElementById('password');
var confPassword = document.getElementById('conf-password');

// Taking inputs values
// var name = document.getElementById('fullName').value;
// var email = document.getElementById('email').value;
// var password = document.getElementById('password').value;
// var confPassword = document.getElementById('conf-password').value;

// Grabing error messages
var errName = document.getElementById('errMessageName');
var errEmail = document.getElementById('errMessageEmail');
var errPassword = document.getElementById('errMessagePassw');
var errConfPassword = document.getElementById('errMessageCofirm');
var tips =  document.getElementById('tips'); // TRY TO LOOP THROUGH ????

//Setting password requirements
var mustHaves = [ 'Password must be at least 8 characters long', 
				  'Password must have an uppercase', 
				  'Password must have a lowercase', 
				  'Password must have a number',
				  'Password must have symbols: !, @, #, $, %, ^, &, *',
				   ];

//Name Validation
fullName.addEventListener('focusout', checkName);
fullName.addEventListener('focus', function(){
	errName.textContent = ' ';
});

//Email Validation
email.addEventListener('focusout', checkEmail);
email.addEventListener('focus', function(){
	errEmail.textContent = ' ';
});

//Password Validation
password.addEventListener('keyup', function(){
	tips.innerHTML = '<li class="tip-check">' + mustHaves[0] + '</li>'
					+ '<li class="tip-check">' + mustHaves[1] + '</li>'
					+ '<li class="tip-check">' + mustHaves[2] + '</li>'
					+ '<li class="tip-check">' + mustHaves[3] + '</li>'
					+ '<li class="tip-check">' + mustHaves[4] + '</li>';
	checkPassword();
});
password.addEventListener('focusout', function(){
	tips.innerHTML = '';
	if(password.value == ''){
		errPassword.innerHTML = 'Enter a password';
	}
});

//Confirm Passwords
confPassword.addEventListener('focusout', confirmPassword);
confPassword.addEventListener('focus', function(){
	errConfPassword.textContent = '';
});

// Validation functions
function checkName(){
	if(fullName.value === ''){
		errName.textContent = 'Hey, enter your name.';
	}
	return;
}

function checkEmail(){
	//RegEx source: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	var valid = re.test(email.value);

	if(!valid){
		errEmail.textContent = 'Please enter a valid email.';
	}
	if(email.value === ''){
		errEmail.textContent = 'Don\'t forget your email.';
	}
	return valid;
}

function checkPassword(){
	/*RegEx source: https://www.udacity.com/course/viewer#!/c-ud890/l-5247541854/e-5388355230/m-5388355232
	match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
	match a number: /[0-9]/g or /\d/g
	match a lowercase letter: /[a-z]/g
	match an uppercase letter: /[A-Z]/g
	match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
	*/
	var list = document.querySelectorAll('li.tip-check');

	if(password.value.length > 8){
		list[0].style.color = '#48f95d';
	}
	if(password.value.match(/[A-Z]/g)){
		list[1].style.color = '#48f95d';
	}
	if(password.value.match(/[a-z]/g)){
		list[2].style.color = '#48f95d';
	}
	if(password.value.match(/\d/g)){
		list[3].style.color = '#48f95d';
	}
	if(password.value.match(/[\!\@\#\$\%\^\&\*]/g)){
		list[4].style.color = '#48f95d';
	}

	var illegalCharacterGroup = password.value.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g);
	if(illegalCharacterGroup){
		illegalCharacterGroup.forEach(function(illegalChar){
			errPassword.textContent = 'Includes illegal character: ' + '"' + illegalChar + '"';
		});
	}else{
		errPassword.textContent = ' ';
	}	
	return;
}
function confirmPassword(){
	if(password.value !== confPassword.value){
		errConfPassword.textContent = 'Passwords don\'t match.Try again';
	}
	return;
};





export default class authDisplay {
	constructor(parentElement) {
		this.parentElement = parentElement;
		this.signupForm = document.getElementById('signupForm');
		this.loginForm = document.getElementById('loginForm');
		this.forgotPassForm = document.getElementById('forgotPassForm');
		this.currentForm = this.loginForm;
		// TODO: Builder.buildAuthentication(parentElement);
	}

	addErrorMsg(msg) {
		const errorDiv = this.currentForm.getElementsByClassName('error');
		errorDiv[0].innerText = msg;
	}

	clearFields() {
		document.getElementById('emailSignup').value = '';
		document.getElementById('passwordSignup').value = '';
		document.getElementById('emailLogin').value = '';
		document.getElementById('passwordLogin').value = '';
		document.getElementById('errorSignup').innerText = '';
		document.getElementById('errorLogin').innerText = '';
	}

	switchToSignupForm() {
		this.currentForm = this.signupForm;
		this.signupForm.classList.remove('disabled');
		this.loginForm.classList.add('disabled');
	}

	switchToLoginForm() {
		this.currentForm = this.loginForm;
		this.loginForm.classList.remove('disabled');
		this.signupForm.classList.add('disabled');
	}

	switchToForgotPassword() {
		this.currentForm = this.forgotPassForm;
		this.forgotPassForm.classList.remove('disabled');
		this.loginForm.classList.add('disabled');
	}
}

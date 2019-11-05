import Storage from './storageClasses/storageClass';
import Authentication from './authenticationClass';
import DisplayHandler from './displayClasses/displayHandlerClass';


export default class Controller {
	constructor(homeDisplay, menuDisplay, locationDisplay, authDisplay) {
		this.homeDisplay = homeDisplay;
		this.menuDisplay = menuDisplay;
		this.locationDisplay = locationDisplay;
		this.authDisplay = authDisplay;
		this.imgsWithListener = [];

		this.menuPage = document.getElementById('menuPage');
		this.menuBtn = document.getElementById('menuBtn');
		this.homeBtn = document.getElementById('homeBtn');

		this.goToDislikedBtn = document.getElementById('goToDislikedBtn');
		this.goToLikedBtn = document.getElementById('goToLikedBtn');

		this.rejectBtn = document.getElementById('rejectBtn');
		this.likeBtn = document.getElementById('likeBtn');
		this.signOutBtn = document.getElementById('signOutBtn');

		this.locatieBtn = document.getElementById('locatieBtn');
		this.backBtn = document.getElementById('backBtn');

		this.submitSignup = document.getElementById('submitSignup');
		this.emailSignup = document.getElementById('emailSignup');
		this.passwordSignup = document.getElementById('passwordSignup');
		this.submitLogin = document.getElementById('submitLogin');
		this.emailLogin = document.getElementById('emailLogin');
		this.passwordLogin = document.getElementById('passwordLogin');
		this.goToLoginForm = document.getElementById('goToLoginForm');
		this.goToSignupForm = document.getElementById('goToSignupForm');
	}

	updateImgListeners() {
		Array.from(this.menuPage.getElementsByClassName('imgSmall')).forEach((node) => {
			// Check if this element already has a listener
			if (!this.imgsWithListener.includes(node)) {
				node.addEventListener('click', () => {
					// switch to homeDisplay, update the displayedUsrID to clicked user, update the SwipeDOM
					const userID = parseInt(node.getAttribute('id').slice(8), 10);
					DisplayHandler.goToDisplay(this.homeDisplay);
					// this.homeDisplay.switchFromDisplay(this.menuDisplay);
					Storage.displayedUsrID.setValue = userID;
					Storage.upload();
					this.homeDisplay.updateDOM();
				});
				this.imgsWithListener.push(node);
			}
		});
	}

	addListeners() {
		this.likeBtn.addEventListener('click', async () => {
			Storage.addLike(Storage.users.getValueById(Storage.displayedUsrID.value));
			// check if new users should be fetched
			await Storage.checkNeedForNewUsers();
			this.homeDisplay.getNextDisplayedUser();
			this.homeDisplay.updateDOM();
		});
		this.rejectBtn.addEventListener('click', async () => {
			Storage.removeLike(Storage.users.getValueById(Storage.displayedUsrID.value));
			await Storage.checkNeedForNewUsers();
			this.homeDisplay.getNextDisplayedUser();
			this.homeDisplay.updateDOM();
		});
		this.menuBtn.addEventListener('click', () => {
			DisplayHandler.goToDisplay(this.menuDisplay);
			this.menuDisplay.updateDOM();
			this.updateImgListeners();
		});
		this.homeBtn.addEventListener('click', () => {
			DisplayHandler.goToDisplay(this.homeDisplay);
			this.homeDisplay.updateDOM();
		});
		this.goToDislikedBtn.addEventListener('click', () => {
			this.menuDisplay.switchOverview();
			this.menuDisplay.updateDOM();
			this.updateImgListeners();
		});
		this.goToLikedBtn.addEventListener('click', () => {
			this.menuDisplay.switchOverview();
			this.menuDisplay.updateDOM();
			this.updateImgListeners();
		});
		this.locatieBtn.addEventListener('click', () => {
			DisplayHandler.goToDisplay(this.locationDisplay);
			const { long, lat } = Storage.users.getValueById(Storage.displayedUsrID.value).coords;
			this.locationDisplay.updateCircle(long, lat);
			this.locationDisplay.goToCoords(long, lat);
		});
		this.backBtn.addEventListener('click', () => {
			DisplayHandler.goToDisplay(this.homeDisplay);
		});
		this.submitSignup.addEventListener('click', async (event) => {
			event.preventDefault();
			// signup = true if there are no errors, else login = errorMessage
			const signup = await Authentication.signup(this.emailSignup.value, this.passwordSignup.value);
			if (signup !== true) {
				this.authDisplay.addErrorMsg(signup);
			} else {
				this.authDisplay.clearFields();
			}
			this.authDisplay.clearFields();
		});
		this.submitLogin.addEventListener('click', async (event) => {
			event.preventDefault();
			// login = true if there are no errors, else login = errorMessage
			const login = await Authentication.login(this.emailLogin.value, this.passwordLogin.value);
			if (login !== true) {
				this.authDisplay.addErrorMsg(login);
			} else {
				this.authDisplay.clearFields();
			}
		});
		this.signOutBtn.addEventListener('click', (event) => {
			Authentication.signout();
		});
		this.goToSignupForm.addEventListener('click', (event) => {
			event.preventDefault();
			this.authDisplay.switchToSignupForm();
		});
		this.goToLoginForm.addEventListener('click', (event) => {
			event.preventDefault();
			this.authDisplay.switchToLoginForm();
		});
	}
}

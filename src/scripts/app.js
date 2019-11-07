import '../styles/main.css';
import Firebase from 'firebase';
import Firebaseconfig from './storageClasses/firebase_config';

import Storage from './storageClasses/storageClass';
import Location from './classInstances/location';
import Controller from './classInstances/controller';
import DisplayHandler from './displayClasses/displayHandlerClass';
import Authentication from './classInstances/authentication';
import Notifications from './classInstances/notifications';
import UserFetcher from './storageClasses/UserFetcher';

import LoadingDisplay from './displayClasses/loadingDisplayClass';
import HomeDisplay from './displayClasses/homeDisplayClass';
import MenuDisplay from './displayClasses/menuDisplayClass';
import LocationDisplay from './displayClasses/locationDisplayClass';
import AuthDisplay from './displayClasses/authDisplayClass';
import Popup from './displayClasses/popupDisplayClass';

// init firebaseApp
Firebase.initializeApp(Firebaseconfig);
Storage.initDB();

// application parameters
Storage.setNumberOfUsers = 5;
Storage.setUserFetchBuffer = 3;

// instances of displays and controller
const homeContainer = document.getElementById('homeContainer');
const menuContainer = document.getElementById('menuContainer');
const loadingContainer = document.getElementById('loadingContainer');
const mapContainer = document.getElementById('mapContainer');
const loginContainer = document.getElementById('loginContainer');
const homeDisplay = new HomeDisplay(homeContainer);
const menuDisplay = new MenuDisplay(menuContainer);
const loadingDisplay = new LoadingDisplay(loadingContainer);
const locationDisplay = new LocationDisplay(mapContainer);
const authDisplay = new AuthDisplay(loginContainer);
const controller = new Controller(homeDisplay, menuDisplay, locationDisplay, authDisplay);

async function init() {
	controller.addListeners();

	// wait for the user to login then load users and displays
	Firebase.auth().onAuthStateChanged(async (user) => {
		if (user) {
			// sets loading msg to message 1 in loadingDisplay.messages
			loadingDisplay.setMessage(1);
			DisplayHandler.goToDisplay(loadingDisplay);

			// check if new users have to be fetched
			await UserFetcher.getNewUsers();

			// wait untill location has been received, then switch to homedisplay
			await Location.setMyLocation();

			// wait untill notification permission is granted
			loadingDisplay.setMessage(2);
			await Notifications.checkPermision();

			// go to homepage
			DisplayHandler.goToDisplay(homeDisplay);

			// push notification
			Notifications.push(`Welcome, ${Authentication.getCurrentUser().email}`);

			// show popup if email is not verified
			if (!Authentication.isVerified()) {
				const popup = new Popup('Please make sure to verify your email adress!');
				popup.build();
			}
			// set first user on homeDisplay
			Storage.getNextDisplayedUser();
			// Update both displays
			homeDisplay.updateDOM();
			menuDisplay.updateDOM();
			// });
		} else {
			// if no one is logged in go to authentication page
			DisplayHandler.goToDisplay(authDisplay);
		}
	});
}

init();

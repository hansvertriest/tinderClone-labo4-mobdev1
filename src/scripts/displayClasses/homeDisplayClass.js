import Storage from '../storageClasses/storageClass';
import Builder from '../classInstances/htmlBuilder';
import Location from '../classInstances/location';
import Authentication from '../classInstances/authentication';

export default class homeDisplay {
	constructor(parentElement) {
		this.parentElement = parentElement;
		Builder.buildHome(this.parentElement);
		this.nameDOM = document.getElementById('nameAge');
		this.picture = document.getElementById('userImgHome');
		this.picture2 = document.getElementById('userImgHome2');
		this.dist = document.getElementById('dist');
		this.greeting = document.getElementById('greeting');
	}

	updateDOM() {
		// remove swipeClasses
		this.picture.classList.remove('swipeRight');
		this.picture.classList.remove('swipeLeft');

		// input data
		this.greeting.innerHTML = `Welcome, ${Authentication.getCurrentUser().email}`;
		const user = Storage.displayedUser.value;
		this.nameDOM.innerText = `${user.name}, ${user.age}`;
		const userLat = user.coords.lat;
		const userLong = user.coords.long;
		const distance = Location.calculateDistance(userLat, userLong);
		this.dist.innerText = `${distance} km`;
		this.picture.style.backgroundImage = `url(${user.pictureURL})`;

		// input picture 2
		const user2 = Storage.displayedUser2.value;
		this.picture2.style.backgroundImage = `url(${user2.pictureURL})`;
	}
}

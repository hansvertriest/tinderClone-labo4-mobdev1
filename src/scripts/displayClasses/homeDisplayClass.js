import Storage from '../storageClasses/storageClass';
import Builder from '../classInstances/htmlBuilder';
import Location from '../classInstances/location';
import Authentication from '../classInstances/authentication';

export default class homeDisplay {
	constructor(parentElement) {
		this.parentElement = parentElement;
		Builder.buildHome(this.parentElement);
		this.nameDOM = document.getElementById('nameAge');
		this.picture = document.getElementById('img');
		this.dist = document.getElementById('dist');
		this.greeting = document.getElementById('greeting');
	}

	updateDOM() {
		// input data
		this.greeting.innerHTML = `Welcome, ${Authentication.getCurrentUser().email}`;
		Storage.download();
		const user = Storage.displayedUser.value;
		this.nameDOM.innerText = `${user.name}, ${user.age}`;
		const userLat = user.coords.lat;
		const userLong = user.coords.long;
		const distance = Location.calculateDistance(userLat, userLong);
		this.dist.innerText = `${distance} km`;
		this.picture.style.backgroundImage = `url(${user.pictureURL})`;
	}
}

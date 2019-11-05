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
		const user = Storage.users.getValueById(Storage.displayedUsrID.value);
		this.nameDOM.innerText = `${user.name}, ${user.age}`;
		const userLat = Storage.users.getValueById(Storage.displayedUsrID.value).coords.lat;
		const userLong = Storage.users.getValueById(Storage.displayedUsrID.value).coords.long;
		const distance = Location.calculateDistance(userLat, userLong);
		this.dist.innerText = `${distance} km`;
		this.picture.style.backgroundImage = `url(${user.pictureURL})`;
	}

	getNextDisplayedUser() {
		Storage.download();
		const idsInLiked = Storage.liked.getArrayIDs;
		const idsInDisliked = Storage.disliked.getArrayIDs;
		// take ids of users that aren't liked or disliked, shuffles them and sets the first one to displayedUsrID
		const unAssignedUsers = Storage.users.getArrayIDs.filter((id) => !idsInLiked.includes(id)).filter((id) => !idsInDisliked.includes(id));
		const unAssignedUsersRandom = unAssignedUsers.sort((a, b) => 0.5 - Math.random());
		const [a] = unAssignedUsersRandom;
		Storage.displayedUsrID.setValue = a;
		Storage.upload();
	}
}

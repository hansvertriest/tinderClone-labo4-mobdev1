import Storage from './storageClass';
import User from './userClass';
import Location from '../classInstances/location';
import Popup from '../displayClasses/popupDisplayClass';

class UserFetcher {
	getData() {
		return fetch(`https://randomuser.me/api/?results=${Storage.numberOfUsers}`)
			.then((response) => response.json());
	}

	// check if new users should be loaded (when there are only 3 users left)
	async checkNeedForNewUsers() {
		return new Promise((resolve) => {
			if (Storage.users.getArray.length < Storage.userFetchBuffer) {
				this.getNewUsers().then(() => { resolve(); });
			} else {
				resolve();
			}
		});
	}

	async getNewUsers() {
		Storage.download();
		Storage.users.setArray = [];
		const userDataJSON = await this.getData(Storage.numberOfUsers)
			.catch(() => new Popup('Seems like randomuser.me is currently unavailable!').build());

		// For every user: fetch coordinates, then create a User object with userdata, then add this to Storage.users
		return new Promise((resolve) => {
			let completionCounter = 0;
			Array.from(userDataJSON.results).forEach(async (user, index) => {
				// await the response of the geocoder, then create instance of User
				Location.getLocationFromAdress(user.location.city.replace(' ', '_'), user.location.street.name.replace(' ', '_'), user.location.coordinates)
					.then((response) => {
						const newUser = new User(
							// this sum always equals a unique number
							Storage.liked.getArray.length + Storage.disliked.getArray.length + Storage.users.getArray.length + 1,
							user.name.first,
							user.registered.age,
							user.picture.large,
							user.picture.thumbnail,
							{
								long: Number(response[0]),
								lat: Number(response[1]),
							},
							user.location.country, // Used for checking geocoding
						);
						Storage.users.add(newUser);
					})
					.then(() => {
						// resolve when all users have been made
						completionCounter += 1;
						if (userDataJSON.results.length === completionCounter) {
							resolve();
						}
					});
			});
		});
	}
}

export default new UserFetcher();

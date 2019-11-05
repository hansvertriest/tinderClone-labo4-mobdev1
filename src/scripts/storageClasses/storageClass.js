import StorageArray from './storageArrayClass';
import StorageKeyValue from './storageKeyValueClass';
import Location from '../location';
import User from './userClass';

class Storage {
	constructor() {
		this.users = new StorageArray('users');
		this.liked = new StorageArray('liked');
		this.disliked = new StorageArray('disliked');
		this.displayedUsrID = new StorageKeyValue('displayedUsrID', 0);
		this.numberOfUsers = 10;
	}

	set setNumberOfUsers(value) {
		this.numberOfUsers = value;
	}

	getData() {
		return fetch(`https://randomuser.me/api/?results=${this.numberOfUsers}`)
			.then((response) => response.json());
	}

	upload() {
		localStorage.setItem('users', JSON.stringify(this.users.getArray));
		localStorage.setItem('liked', JSON.stringify(this.liked.getArray));
		localStorage.setItem('disliked', JSON.stringify(this.disliked.getArray));
		localStorage.setItem('displayedUsrID', JSON.stringify(this.displayedUsrID.getValue));
	}

	download() {
		const dataUsrs = JSON.parse(localStorage.getItem('users'));
		this.users.setArray = Array.from(dataUsrs).map((user) => new User(user.id, user.name, user.age, user.pictureURL, user.thumbnailURL, user.like, user.coords, user.country));
		this.liked.setArray = JSON.parse(localStorage.getItem('liked'));
		this.disliked.setArray = JSON.parse(localStorage.getItem('disliked'));
		this.displayedUsrID.setValue = JSON.parse(localStorage.getItem('displayedUsrID'));
	}

	async checkNeedForNewUsers() {
		return new Promise((resolve) => {
			// if users array isset in localstorage
			if (!this.users.isSet) {
				this.getNewUsers().then(() => { resolve(); });
			} else {
				this.download();
				const idsInLiked = this.liked.getArrayIDs;
				const idsInDisliked = this.disliked.getArrayIDs;
				// get ids that aren't in liked or disliked
				const unAssignedUsrs = this.users.getArrayIDs.filter((id) => !idsInLiked.includes(id)).filter((id) => !idsInDisliked.includes(id));
				const unAssignedUsrsCount = unAssignedUsrs.length;
				// if there are less than 3 users to be assigned, get new users
				if (unAssignedUsrsCount <= 3) {
					this.getNewUsers().then(() => { resolve(); });
				} else {
					resolve();
				}
			}
		});
	}

	async getNewUsers() {
		const userDataJSON = await this.getData(this.numberOfUsers);
		return new Promise((resolve) => {
			const createUsers = new Promise(() => {
				Array.from(userDataJSON.results).forEach(async (user, index) => {
					// await the response of the geocoder, then create instance of User
					Location.getLocationFromAdress(user.location.city.replace(' ', '_'), user.location.street.name.replace(' ', '_'), user.location.coordinates)
						.then((response) => {
							const newUser = new User(
								this.users.getArray.length,
								user.name.first,
								user.registered.age,
								user.picture.large,
								user.picture.thumbnail,
								false,
								{
									long: Number(response[0]),
									lat: Number(response[1]),
								},
								user.location.country, // Used for checking geocoding
							);
							this.users.add(newUser);
						})
						.then(() => {
							// check if all users have been created
							const mod = this.users.getArray.length % this.numberOfUsers;
							if (this.users.getArray.length % this.numberOfUsers === 0) {
								this.upload();
								resolve();
							}
						});
				});
			});
			createUsers.then(() => {
				resolve();
			});
		});
	}

	addLike(user) {
		this.users.getValueById(user.id).toggleLike();
		this.disliked.remove(user);
		// if this id isn't already in liked
		if (!this.liked.getArrayIDs.includes(user.id)) {
			this.liked.add(user);
		}
		this.upload();
	}

	removeLike(user) {
		this.users.getValueById(user.id).toggleLike();
		this.liked.remove(user);
		// if this id isn't already in disliked
		if (!this.disliked.getArrayIDs.includes(user.id)) {
			this.disliked.add(user);
		}
		this.upload();
	}

	removeAssignment(user) {
		this.users.getValueById(user.id).like = false;
		this.liked.remove(user);
		this.disliked.remove(user);
		this.upload();
	}
}

export default new Storage();

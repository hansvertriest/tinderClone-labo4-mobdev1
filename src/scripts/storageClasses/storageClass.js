import Firebase from 'firebase/app';

import Authentication from '../classInstances/authentication';
import StorageArray from './storageArrayClass';
import StorageKeyValue from './storageKeyValueClass';
import Popup from '../displayClasses/popupDisplayClass';

class Storage {
	constructor() {
		this.users = new StorageArray('users');
		this.liked = new StorageArray('liked');
		this.disliked = new StorageArray('disliked');
		this.displayedUser = new StorageKeyValue('displayedUser', { id: undefined });
		this.displayedUser2 = new StorageKeyValue('displayedUser', { id: undefined });
		this.likedToBeRemoved = new StorageArray('likedToBeRemoved');
		this.dislikedToBeRemoved = new StorageArray('dislikedToBeRemoved');
		this.numberOfUsers = 10;
		this.userFetchBuffer = 15;
	}

	initDB() {
		this.firestore = Firebase.firestore();
	}

	set setNumberOfUsers(value) {
		this.numberOfUsers = value;
	}

	set setUserFetchBuffer(value) {
		this.userFetchBuffer = value;
	}

	// randomly pick a user to show next
	getNextDisplayedUser() {
		const usersSortedRandomly = this.users.getArray.sort(() => 0.5 - Math.random());
		console.log(usersSortedRandomly);
		const [a, b] = usersSortedRandomly;
		// if displayedUser is empty
		if (this.displayedUser.getValue.id === undefined) {
			this.displayedUser.setValue = a;
			this.displayedUser2.setValue = b;
		} else {
			this.displayedUser.setValue = this.displayedUser2.getValue;
			this.displayedUser2.setValue = a;
		}
	}

	clearTempStorage() {
		this.users.setArray = [];
		this.liked.setArray = [];
		this.disliked.setArray = [];
	}

	getUserFromLikedAndDisliked(userID) {
		if (this.liked.getValueById(userID)) {
			return this.liked.getValueById(userID);
		}
		return this.disliked.getValueById(userID);
	}

	upload() {
		// upload liked
		this.liked.isAdded.forEach((element) => {
			this.firestore.collection('users').doc(Authentication.getUID()).collection('liked').doc(String(element.id))
				.set({ ...element })
				.catch(() => new Popup('Seems like firebase is currently unavailable!'));
		});
		// upload disliked
		this.disliked.isAdded.forEach((element) => {
			this.firestore.collection('users').doc(Authentication.getUID()).collection('disliked').doc(String(element.id))
				.set({ ...element })
				.catch(() => new Popup('Seems like firebase is currently unavailable!'));
		});
		this.deleteDocs();
	}

	deleteDocs() {
		this.liked.getIsRemoved.forEach((element) => {
			this.firestore.collection('users').doc(Authentication.getUID()).collection('liked').doc(String(element.id))
				.delete()
				.then(() => {
					this.liked.clearArrayCache();
				})
				.catch(() => new Popup('Seems like firebase is currently unavailable!'));
		});

		this.disliked.getIsRemoved.forEach((element) => {
			this.firestore.collection('users').doc(Authentication.getUID()).collection('disliked').doc(String(element.id))
				.delete()
				.then(() => {
					this.disliked.clearArrayCache();
				})
				.catch(() => new Popup('Seems like firebase is currently unavailable!'));
		});
	}

	download() {
		return new Promise((resolve) => {
			this.firestore.collection('users').doc(Authentication.getUID()).collection('liked').get()
				.then((collection) => {
					if (!collection.empty) {
						this.liked.setArray = collection.docs.map((doc) => doc.data());
					}
				})
				.catch(() => new Popup('Seems like firebase is currently unavailable!').build());

			this.firestore.collection('users').doc(Authentication.getUID()).collection('disliked').get()
				.then((collection) => {
					if (!collection.empty) {
						this.disliked.setArray = collection.docs.map((doc) => doc.data());
					}
				})
				.then(() => {
					resolve();
				})
				.catch(() => new Popup('Seems like firebase is currently unavailable!').build());
		});
	}

	addLike(user) {
		// if this id isn't already in liked
		if (!this.liked.getArray.includes(user)) {
			this.liked.add(user);
		}
		this.users.remove(user);
		this.disliked.remove(user);
		this.upload();
	}

	removeLike(user) {
		// if this id isn't already in disliked
		if (!this.disliked.getArray.includes(user)) {
			this.disliked.add(user);
		}
		this.users.remove(user);
		this.liked.remove(user);
		this.upload();
	}

	removeAssignment(user) {
		this.users.add(user);
		this.liked.remove(user);
		this.disliked.remove(user);
		this.upload();
	}
}

export default new Storage();

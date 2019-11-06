import Firebase from 'firebase/app';

import Authentication from '../classInstances/authentication';
import StorageArray from './storageArrayClass';
import StorageKeyValue from './storageKeyValueClass';

class Storage {
	constructor() {
		this.users = new StorageArray('users');
		this.liked = new StorageArray('liked');
		this.disliked = new StorageArray('disliked');
		this.displayedUser = new StorageKeyValue('displayedUser', {});
		this.likedToBeRemoved = new StorageArray('likedToBeRemoved');
		this.dislikedToBeRemoved = new StorageArray('dislikedToBeRemoved');
		this.numberOfUsers = 10;
	}

	initDB() {
		this.firestore = Firebase.firestore();
	}

	set setNumberOfUsers(value) {
		this.numberOfUsers = value;
	}

	// randomly pick a user to show next
	getNextDisplayedUser() {
		const usersSortedRandomly = this.users.getArray.sort(() => 0.5 - Math.random());
		const [a] = usersSortedRandomly;
		this.displayedUser.setValue = a;
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
		console.log('uploading');
		// upload liked
		this.liked.isAdded.forEach((element) => {
			this.firestore.collection('users').doc(Authentication.getUID()).collection('liked').doc(String(element.id))
				.set({ ...element });
		});
		// upload disliked
		this.disliked.isAdded.forEach((element) => {
			this.firestore.collection('users').doc(Authentication.getUID()).collection('disliked').doc(String(element.id))
				.set({ ...element });
		});
		this.deleteDocs();
	}

	deleteDocs() {
		this.liked.getIsRemoved.forEach((element) => {
			this.firestore.collection('users').doc(Authentication.getUID()).collection('liked').doc(String(element.id))
				.delete()
				.then(() => {
					this.liked.clearArrayCache();
				});
		});
		this.disliked.getIsRemoved.forEach((element) => {
			this.firestore.collection('users').doc(Authentication.getUID()).collection('disliked').doc(String(element.id))
				.delete()
				.then(() => {
					this.disliked.clearArrayCache();
				});
		});
	}

	download() {
		console.log('downloading');
		return new Promise((resolve) => {
			this.firestore.collection('users').doc(Authentication.getUID()).collection('liked').get()
				.then((collection) => {
					if (!collection.empty) {
						this.liked.setArray = collection.docs.map((doc) => doc.data());
					}
				});
			this.firestore.collection('users').doc(Authentication.getUID()).collection('disliked').get()
				.then((collection) => {
					if (!collection.empty) {
						this.disliked.setArray = collection.docs.map((doc) => doc.data());
					}
				})
				.then(() => {
					resolve();
				});
		});
	}

	addLike(user) {
		this.users.remove(user);
		this.disliked.remove(user);
		// if this id isn't already in liked
		if (!this.liked.getArray.includes(user)) {
			this.liked.add(user);
		}
		this.upload();
	}

	removeLike(user) {
		this.users.remove(user);
		this.liked.remove(user);
		// if this id isn't already in disliked
		if (!this.disliked.getArray.includes(user)) {
			this.disliked.add(user);
		}
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

import Data from './storageDataClass';

export default class StorageArray extends Data {
	constructor(name, array) {
		super(name, []);
		this.array = [];
	}

	get getArray() {
		return this.array;
	}

	set setArray(array) { // No set method because this doesn't work with homeDisplay.getNextDisplayedUrs
		this.array = array;
	}

	getValueById(id) {
		try {
			// filters out all ids that do not match the parameter (wich should be one) and take the first (and only) one
			// With this method we can request values without having to rely on the order of the storageArray
			// Allows for deleting and adding users anywhere in any storageArray with any id
			return this.array.filter((user) => user.id === id)[0];
		} catch {
			return this.array[0];
		}
	}

	// return all IDs of this array
	get getArrayIDs() {
		return this.array.map((item) => item.id);
	}

	add(user) {
		this.array.push(user);
	}

	remove(user) {
		this.array = this.array.filter((object) => object.id !== user.id);
	}
}

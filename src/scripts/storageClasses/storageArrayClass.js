import Data from './storageDataClass';

export default class StorageArray extends Data {
	constructor(name) {
		super(name, []);
		this.name = name;
		this.array = [];
		this.isRemoved = [];
		this.isAdded = [];
	}

	get getIsRemoved() {
		return this.isRemoved;
	}

	get getIsAdded() {
		return this.isAdded;
	}

	get getArray() {
		return this.array;
	}

	set setArray(array) {
		this.array = array;
	}

	clearArrayCache() {
		this.isRemoved = [];
		this.isAdded = [];
	}

	getValueById(id) {
		try {
			return this.array.filter((user) => user.id === id)[0];
		} catch {
			return false;
		}
	}

	// return all IDs of this array
	get getArrayIDs() {
		return this.array.map((item) => item.id);
	}

	add(user) {
		this.array.push(user);
		this.isAdded.push(user);
	}

	remove(user) {
		this.array = this.array.filter((object) => object !== user);
		this.isRemoved.push(user);
	}
}

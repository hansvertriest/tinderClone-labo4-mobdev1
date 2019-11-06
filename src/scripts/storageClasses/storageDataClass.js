export default class StorageData {
	constructor(name) {
		this.name = name;
	}

	upload() {
		localStorage.setItem(this.name, JSON.stringify(this.value)); // update the localStorage
	}

	get isSet() {
		if (localStorage.getItem(this.name)) {
			return true;
		}
		return false;
	}
}

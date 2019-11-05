import StorageData from './storageDataClass';

export default class StorageKeyValue extends StorageData {
	constructor(key, value) {
		super(key);
		this.value = value;
	}

	set setValue(value) {
		this.value = value;
	}

	get getValue() {
		return this.value;
	}
}

import Builder from '../htmlBuilder';

export default class LoadingDisplay {
	constructor(parentElement) {
		this.parentElement = parentElement;
		Builder.buildLoadingScreen(this.parentElement);
	}
}

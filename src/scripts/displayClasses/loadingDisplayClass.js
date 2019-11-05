import Builder from '../classInstances/htmlBuilder';

export default class LoadingDisplay {
	constructor(parentElement) {
		this.parentElement = parentElement;
		Builder.buildLoadingScreen(this.parentElement);
		this.messages = ['', 'This app needs your location to function properly!', 'Please enable notifications so we can alert you!'];
	}

	setMessage(msgCode) {
		document.getElementById('loadingMsg').innerText = this.messages[msgCode];
	}
}

import Builder from '../htmlBuilder';

export default class LoadingDisplay {
	constructor(parentElement) {
		this.parentElement = parentElement;
		Builder.buildLoadingScreen(this.parentElement);
		this.messages = ['', 'This app needs your location to function properly!'];
	}

	setMessage(msgCode) {
		console.log(this.parentElement);
		document.getElementById('loadingMsg').innerText = this.messages[msgCode];
	}
}

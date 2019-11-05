class DisplayHandler {
	goToDisplay(targetDisplay) {
		// remove popup if present
		const popup = document.getElementById('popup');
		if (popup) {
			document.getElementById('app').removeChild(popup);
		}
		// get all displays
		const displays = [...document.getElementsByClassName('display')];
		const enabledDisplays = displays.filter((display) => !display.getAttribute('class').includes('disabled'));

		// disable all elements that aren't disabled
		enabledDisplays.forEach((displayElement) => {
			displayElement.classList.add('disabled');
		});
		// enable targetDisplay
		targetDisplay.parentElement.classList.remove('disabled');
	}
}

export default new DisplayHandler();

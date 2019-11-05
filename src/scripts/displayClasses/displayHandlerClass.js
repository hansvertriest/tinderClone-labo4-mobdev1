class DisplayHandler {
	goToDisplay(targetDisplay) {
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

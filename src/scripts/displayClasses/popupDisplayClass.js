export default class Popup {
	constructor(msg) {
		this.msg = msg;
	}

	build() {
		const container = document.createElement('div');
		container.setAttribute('id', 'popup');
		const msg = document.createElement('p');
		msg.innerText = this.msg;
		const button = document.createElement('button');
		button.setAttribute('id', 'agreeBtn');
		button.innerText = 'okay';
		button.addEventListener('click', () => {
			this.remove();
		});
		container.appendChild(msg);
		container.appendChild(button);
		document.getElementById('app').appendChild(container);
	}

	remove() {
		document.getElementById('app').removeChild(document.getElementById('popup'));
	}
}

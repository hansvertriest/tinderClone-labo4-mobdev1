class Notifications {
	constructor() {
		this.icon = 'https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/tinder-512.png';
		// icon creddit to: https://www.iconfinder.com/aha-soft
		// license: https://creativecommons.org/licenses/by/3.0/
	}

	async checkPermision() {
		return new Promise((resolve, reject) => {
			Notification.requestPermission((response) => {
				if (response === 'denied') {
					reject();
				} else {
					resolve();
				}
			});
		});
	}

	push(msg) {
		if (('Notification' in window) && Notification.permission === 'granted') {
			const notification = new Notification(msg, { icon: this.icon });
		}
	}
}

export default new Notifications();

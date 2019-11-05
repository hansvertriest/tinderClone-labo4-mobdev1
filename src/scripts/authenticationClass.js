import FirebaseApp from 'firebase/app';

class Authentication {
	async signup(email, password) {
		console.log(email, password);
		FirebaseApp.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				console.log('fixed!');
			}).catch((err) => {
				console.log(err.message);
			});
	}

	async login(email, password) {
		FirebaseApp.auth().signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('loged in');
			})
			.catch((err) => {
				console.log(err.message);
			});
	}

	signout() {
		FirebaseApp.auth().signOut();
	}
}

export default new Authentication();

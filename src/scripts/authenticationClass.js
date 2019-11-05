import FirebaseApp from 'firebase/app';

class Authentication {
	async signup(email, password) {
		return FirebaseApp.auth().createUserWithEmailAndPassword(email, password)
			.then(() => true)
			.catch((err) => err.message);
	}

	async login(email, password) {
		return FirebaseApp.auth().signInWithEmailAndPassword(email, password)
			.then(() => true)
			.catch((err) => err.message);
	}

	signout() {
		FirebaseApp.auth().signOut();
	}
}

export default new Authentication();

import FirebaseApp from 'firebase/app';

class Authentication {
	async signup(email, password) {
		return FirebaseApp.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				this.sendVerificationMail();
				return true;
			})
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

	sendVerificationMail(user = this.getCurrentUser()) {
		user.sendEmailVerification();
	}

	isVerified(user = this.getCurrentUser()) {
		return user.emailVerified;
	}

	sendPasswordReset(email) {
		FirebaseApp.auth().sendPasswordResetEmail(email)
			.then(() => {
				console.log('sent');
			})
			.catch(() => {
				console.log('not sent');
			});
	}

	getCurrentUser() {
		return FirebaseApp.auth().currentUser;
	}
}

export default new Authentication();

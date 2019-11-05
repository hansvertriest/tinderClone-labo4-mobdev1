
class Builder {
	buildMenu(parentElement) {
		// header
		const header = document.createElement('header');
		const homeBtn = document.createElement('div');
		homeBtn.setAttribute('class', 'iconHeader');
		homeBtn.setAttribute('id', 'homeBtn');
		homeBtn.innerHTML = '<i class="fas fa-home">';
		const logo = document.createElement('div');
		logo.setAttribute('class', 'logo');
		logo.innerHTML = '<img src="./img/tinder.png" alt="">';
		const msgBtn = document.createElement('div');
		msgBtn.setAttribute('class', 'iconHeader');
		msgBtn.setAttribute('id', 'msgBtn');
		msgBtn.innerHTML = '<i class="fas fa-comments">';
		header.appendChild(homeBtn);
		header.appendChild(logo);
		header.appendChild(msgBtn);
		// menupage
		const menuPage = document.createElement('div');
		menuPage.setAttribute('id', 'menuPage');
		// ---likedmenu
		const likedMenu = document.createElement('div');
		likedMenu.setAttribute('id', 'likedMenu');
		// ------likedMenuHeader
		const likedMenuHeader = document.createElement('div');
		likedMenuHeader.setAttribute('class', 'likedMenuHeader');
		likedMenuHeader.innerHTML += '<h2>Liked People</h2>';
		const goToDislikedBtn = document.createElement('button');
		goToDislikedBtn.setAttribute('class', 'likednMenuNavBtn');
		goToDislikedBtn.setAttribute('id', 'goToDislikedBtn');
		goToDislikedBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
		likedMenuHeader.appendChild(goToDislikedBtn);
		// ------dataLiked
		const dataLiked = document.createElement('div');
		dataLiked.setAttribute('id', 'dataLiked');
		likedMenu.appendChild(likedMenuHeader);
		likedMenu.appendChild(dataLiked);
		menuPage.appendChild(likedMenu);
		// ---dislikedmenu
		const dislikedMenu = document.createElement('div');
		dislikedMenu.setAttribute('class', 'disabled');
		dislikedMenu.setAttribute('id', 'dislikedMenu');
		// ------dislikedMenuHeader
		const dislikedMenuHeader = document.createElement('div');
		const goToLikedBtn = document.createElement('button');
		goToLikedBtn.setAttribute('class', 'likednMenuNavBtn');
		goToLikedBtn.setAttribute('id', 'goToLikedBtn');
		goToLikedBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
		dislikedMenuHeader.appendChild(goToLikedBtn);
		dislikedMenuHeader.setAttribute('class', 'likedMenuHeader');
		dislikedMenuHeader.innerHTML += '<h2>Disliked People</h2>';
		// ------dataDisliked
		const dataDisliked = document.createElement('div');
		dataDisliked.setAttribute('id', 'dataDisliked');
		dislikedMenu.appendChild(dislikedMenuHeader);
		dislikedMenu.appendChild(dataDisliked);
		menuPage.appendChild(dislikedMenu);

		parentElement.appendChild(header);
		parentElement.appendChild(menuPage);
	}

	buildHome(parentElement) {
		// header
		const header = document.createElement('header');
		const menuBtn = document.createElement('div');
		menuBtn.setAttribute('class', 'iconHeader');
		menuBtn.setAttribute('id', 'menuBtn');
		menuBtn.innerHTML = '<i class="fas fa-bars">';
		const logo = document.createElement('div');
		logo.setAttribute('class', 'logo');
		logo.innerHTML = '<img src="./img/tinder.png" alt="">';
		const msgBtn = document.createElement('div');
		msgBtn.setAttribute('class', 'iconHeader');
		msgBtn.setAttribute('id', 'msgBtn');
		msgBtn.innerHTML = '<i class="fas fa-comments">';
		header.appendChild(menuBtn);
		header.appendChild(logo);
		header.appendChild(msgBtn);
		// main
		const main = document.createElement('main');
		// ---profile
		const profile = document.createElement('profile');
		profile.innerHTML += '<div id="img"></div>';
		const data = document.createElement('div');
		data.setAttribute('id', 'data');
		data.innerHTML = '<h1 id="nameAge"></h1><div id="dist"></div>';
		profile.append(data);
		main.appendChild(profile);
		// ---actionSection
		const actionSection = document.createElement('div');
		actionSection.setAttribute('class', 'actionSection');
		actionSection.innerHTML += '<button id="rejectBtn" class="btn"><i class="fas fa-times"></i></button>';
		actionSection.innerHTML += '<button id="locatieBtn" class="btn"><i class="fas fa-map-marker-alt"></i></button>';
		actionSection.innerHTML += '<button id="likeBtn" class="btn"><i class="fas fa-heart"></i></button>';
		main.appendChild(actionSection);

		const accountSection = document.createElement('div');
		accountSection.setAttribute('id', 'accountSection');

		const greeting = document.createElement('p');
		greeting.setAttribute('id', 'greeting');
		accountSection.appendChild(greeting);

		const signOutBtn = document.createElement('button');
		signOutBtn.innerText = 'Log out';
		signOutBtn.setAttribute('id', 'signOutBtn');
		accountSection.appendChild(signOutBtn);

		parentElement.appendChild(header);
		parentElement.appendChild(accountSection);
		parentElement.appendChild(main);
	}

	buildLoadingScreen(parentElement) {
		const text = document.createElement('p');
		text.setAttribute('id', 'loadingMsg');
		const icon = document.createElement('div');
		icon.innerHTML = '<i class="fas fa-spinner"></i>';
		parentElement.appendChild(text);
		parentElement.appendChild(icon);
	}

	buildMap(parentElement) {
		const backBtn = document.createElement('div');
		backBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
		backBtn.setAttribute('id', 'backBtn');
		parentElement.appendChild(backBtn);
	}
}

export default new Builder();

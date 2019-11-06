import Storage from '../storageClasses/storageClass';
import Builder from '../classInstances/htmlBuilder';

export default class menuDisplay {
	constructor(parentElement) {
		this.parentElement = parentElement;
		Builder.buildMenu(this.parentElement);
	}

	updateDOM() {
		const dislikedMenu = document.getElementById('dislikedMenu');
		const dataLiked = document.getElementById('dataLiked');
		const dataDisliked = document.getElementById('dataDisliked');

		if (Object.values(dislikedMenu.classList).includes('disabled')) {
			// update liked menu
			// Get all ids out of the DOM elements, these are the same as the ID of the users
			const displayedLikes = Array.from(dataLiked.getElementsByClassName('likedUserDiv')).map((node) => this.getUserIdFromDomId(node));

			//  items that are in liked but not displayed
			const likesToBeAdded = Storage.liked.getArrayIDs.filter((id) => !displayedLikes.includes(id));

			// items that are displayed but not in liked
			const likesToBeRemoved = displayedLikes.filter((id) => !Storage.liked.getArrayIDs.includes(id));

			// Add the liked users
			likesToBeAdded.forEach((id) => {
				this.createUserListElement(id, dataLiked, true, Storage.getUserFromLikedAndDisliked(id));
			});

			// remove the users that should be removed
			likesToBeRemoved.forEach((id) => {
				const element = document.getElementById(`userID${id}`);
				dataLiked.removeChild(element);
			});
		} else {
			// update dislikedMenu
			const displayedDislikes = Array.from(dataDisliked.getElementsByClassName('dislikedUserDiv')).map((node) => this.getUserIdFromDomId(node));
			const dislikesToBeAdded = Storage.disliked.getArrayIDs.filter((id) => !displayedDislikes.includes(id));
			const dislikesToBeRemoved = displayedDislikes.filter((id) => !Storage.disliked.getArrayIDs.includes(id));

			dislikesToBeAdded.forEach((id) => {
				this.createUserListElement(id, dataDisliked, false, Storage.getUserFromLikedAndDisliked(id));
			});
			dislikesToBeRemoved.forEach((id) => {
				const element = document.getElementById(`userID${id}`);
				dataDisliked.removeChild(element);
			});
		}
	}

	createUserListElement(id, parentElement, overviewTypeLiked, user) {
		// The user ID is set in the DOM element id for later reference

		// create newElement
		const newElement = document.createElement('div');
		if (overviewTypeLiked) {
			newElement.setAttribute('class', 'likedUserDiv');
		} else {
			newElement.setAttribute('class', 'dislikedUserDiv');
		}
		newElement.setAttribute('id', `userID${id}`);

		// create grouping div for name and image
		const groupDiv = document.createElement('div');
		groupDiv.setAttribute('class', 'group');
		newElement.appendChild(groupDiv);

		// add img
		const img = document.createElement('div');
		img.setAttribute('class', 'imgSmall');
		img.setAttribute('id', `imgUsrID${id}`);
		img.style.backgroundImage = `url(${user.thumbnailURL})`;
		groupDiv.appendChild(img);


		// create paragraph with the name
		const newName = document.createElement('p');
		newName.innerText = user.name;
		groupDiv.appendChild(newName);

		// create button
		const dislikeBtn = document.createElement('button');
		dislikeBtn.innerHTML = '<i class="fas fa-times">';
		dislikeBtn.addEventListener('click', () => {
			Storage.removeAssignment(user);
			this.updateDOM();
		});
		newElement.appendChild(dislikeBtn);

		parentElement.appendChild(newElement);
	}

	// Switch between the liked and disliked overview
	switchOverview() {
		const likedMenu = document.getElementById('likedMenu');
		const dislikedMenu = document.getElementById('dislikedMenu');

		if (Object.values(dislikedMenu.classList).includes('disabled')) {
			// switch to dislikedmenu
			likedMenu.classList.add('disabled');
			dislikedMenu.classList.remove('disabled');
		} else {
			// switch to likedmenu
			dislikedMenu.classList.add('disabled');
			likedMenu.classList.remove('disabled');
		}
	}

	getUserIdFromDomId(DOMElement) {
		return parseInt(DOMElement.getAttribute('id').slice(6), 10);
	}
}

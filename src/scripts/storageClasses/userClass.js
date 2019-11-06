export default class User {
	constructor(id, name, age, pictureURL, thunmbnailURL, coords, country) {
		this.id = id;
		this.name = name;
		this.age = age;
		this.pictureURL = pictureURL;
		this.thumbnailURL = thunmbnailURL;
		this.coords = coords;
		this.country = country; // included for checking if geocoding works correctly
	}
}

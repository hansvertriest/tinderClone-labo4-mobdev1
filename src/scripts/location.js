import * as turf from '@turf/turf';

class Location {
	async setMyLocation() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition((position) => {
				this.myLocation = {
					lat: position.coords.latitude, long: position.coords.longitude,
				};
				resolve();
			});
		});
	}

	calculateDistance(userLat, userLong) {
		const from = turf.point([this.myLocation.long, this.myLocation.lat]);
		const to = turf.point([userLong, userLat]);
		const options = { units: 'kilometers' };

		const distance = turf.distance(from, to, options);
		return Math.round(distance);
	}

	async getLocationFromAdress(city, street, coords) {
		return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}%20${street}.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1572548102024&autocomplete=true&types=place%2Caddress`)
			.then((response) => response.json())
			// returns long, lat !!!!
			.then((response) => {
				try {
					return response.features[0].geometry.coordinates;
				} catch {
					// if anything goes wrong get the coordinates supplied by randomuser.me
					return [coords.longitude, coords.latitude];
				}
			});
	}
}

export default new Location();

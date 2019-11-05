import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import * as turf from '@turf/turf';
import Builder from '../htmlBuilder';


export default class LocationDisplay {
	constructor(parentElement) {
		this.parentElement = parentElement;
		this.markers = [];
		this.layerIDs = [];
		Builder.buildMap(this.parentElement);
		this.initMap();
	}

	async initMap() {
		mapboxgl.accessToken = 'pk.eyJ1IjoicGltcGFtcG9taWtiZW5zdG9tIiwiYSI6ImNqdmM1a3dibjFmOHE0NG1qcG9wcHdmNnIifQ.ZwK_kkHHAYRTbnQvD7oVBw';
		this.map = new mapboxgl.Map({
			container: this.parentElement,
			style: 'mapbox://styles/mapbox/streets-v11',
			zoom: 10,
		});
		this.map.on('styledata', () => {
			this.createCircle();
		});
	}

	goToCoords(long, lat) {
		this.map.jumpTo({ center: [long, lat] });
		this.map.zoomTo(11);
	}

	updateCircle(long, lat) {
		const center = [long, lat];
		const radius = 5;
		const options = { steps: 100 };
		const circle = turf.circle(center, radius, options);
		const addToMap = {
			type: 'geojson',
			data: circle,
		};

		if (this.map.getSource('circle')) {
			this.map.getSource('circle').setData(circle);
		} else {
			this.map.addSource('circle', addToMap);
		}
		this.resetMap();
	}

	createCircle() {
		this.updateCircle(0, 0);
		if (!this.map.getLayer('circle')) {
			this.map.addLayer({
				id: 'circle',
				type: 'fill',
				source: 'circle',
				layout: {},
				paint: {
					'fill-color': '#f76b60',
					'fill-opacity': 0.5,
				},
			});
		}
		this.layerIDs.push('circle');
	}

	resetMap() {
		this.map.resize();
	}
}

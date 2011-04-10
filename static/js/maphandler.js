var MapHandler = function() {

	geoCodeBtn: document.getElementById('mh-go'),
	address: document.getElementById('mh-address'),

	addLatLng: function(event) {
		console.log(this.getAddress);
		var path = poly.getPath();
		path.push(event.latLng);
	},

	geoCode: function() {
		//console.log(MapHandler.address);
	},

	addListener: function(el, ev, fn) {
		if (el.addEventListener) {
			el.addEventListener(ev, fn, false);
		} else if (el.attachEvent) {
			el.attachEvent('on' + ev, fn);
		} else {
			el['on' + ev] = fn;
		}
	},

	initialize: function() {
	
		this.addListener(this.geoCodeBtn, 'click', this.geoCode);

		var latlng = new google.maps.LatLng(38.94617, -92.32866);
		var myOptions = {
			zoom: 19,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

		var polyOptions = {
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3
		};

		poly = new google.maps.Polyline(polyOptions);
		poly.setMap(map);

		google.maps.event.addListener(map, 'click', addLatLng);
	}
};

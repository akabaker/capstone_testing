MapHandler = {
	geoCodeUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
	geoCodeHandler: '/geocode/'
};

MapHandler.geoCodeBtn = function() {
	return document.getElementById('mh-go');
}

MapHandler.address = function() {
	return document.getElementById('mh-address');
}

MapHandler.addLatLng = function(event) {
	var path = poly.getPath();
	path.push(event.latLng);
}

MapHandler.addListener = function(el, ev, fn) {
	if (el.addEventListener) {
		el.addEventListener(ev, fn, false);
	} else if (el.attachEvent) {
		el.attachEvent('on' + ev, fn);
	} else {
		el['on' + ev] = fn;
	}
}

MapHandler.doGeoCode = function() {
	var address = MapHandler.address().value;
	var params = {
		address: address,
		geoCodeUrl: MapHandler.geoCodeUrl,
		sensor: false
	};

	$.ajax({
		url: MapHandler.geoCodeHandler,
		type: 'GET',
		data: params, 
		success: function(data) {
			var obj = JSON.parse(data);
			var lat = obj.results[0].geometry.location.lat;
			var lng = obj.results[0].geometry.location.lng;

			MapHandler.initialize(lat, lng);
		}
	});

	/*
	var req = new XMLHttpRequest();
	req.open('POST', MapHandler.geoCodeHandler, true);
	req.send(params);
	req.onreadystatechange = function (e) {
		if (req.readyState == 4) {
			if(req.status == 200) {
				alert(req.responseText);
			} else {
				alert("Error loading page");
			}
		}
	};
	*/
}

MapHandler.initialize = function(lat, lng) {

	//Default values for MU campus
	lat = typeof(lat) != 'undefined' ? lat : 38.94617;
	lng = typeof(lng) != 'undefined' ? lng : -92.32866; 

	var geoCodeBtn = MapHandler.geoCodeBtn();
	MapHandler.addListener(geoCodeBtn, 'click', MapHandler.doGeoCode);

	var latlng = new google.maps.LatLng(lat, lng);
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

	google.maps.event.addListener(map, 'click', MapHandler.addLatLng);
}

/*
function MapHandler() {
	this.geoCodeBtn = document.getElementById('mh-go');
	this.address = document.getElementById('mh-address');
}

MapHandler.prototype.getGeoCodeBtn = function() {
	return this.geoCodeBtn;
}

MapHandler.prototype.getAddress = function() {
	return this.address;
}

MapHandler.prototype.addLatLng = function(event) {
	var path = poly.getPath();
	path.push(event.latLng);
}

MapHandler.prototype.doGeoCode = function(el) {
}

MapHandler.prototype.addListener = function(el, ev, fn) {
	if (el.addEventListener) {
		el.addEventListener(ev, fn, false);
	} else if (el.attachEvent) {
		el.attachEvent('on' + ev, fn);
	} else {
		el['on' + ev] = fn;
	}
}

MapHandler.prototype.initialize = function() {
	this.addListener(this.geoCodeBtn, 'click', this.doGeoCode);

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

	google.maps.event.addListener(map, 'click', this.addLatLng);
}

	var req = new XMLHttpRequest();
	req.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&&address=2401+Calder+CT+columbia%2C+mo', false);
	//req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	req.onreadystatechange = function (aEvt) {
		if (req.readyState == 4) {
			if(req.status == 200)
			dump(req.responseText);
			else
			dump("Error loading page\n");
		}
	};
	//jQuery.param(params);
*/

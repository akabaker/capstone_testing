var MapHandler = function() {

	var geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
	var geoCodeHandler = '/geocode/';
	var geoCodeBtn = document.getElementById('mh-go');
	var address = document.getElementById('mh-address');

	function addLatLng(event) {
		var path = poly.getPath();
		path.push(event.latLng);
	}

	function addListener(el, ev, fn) {
		if (el.addEventListener) {
			el.addEventListener(ev, fn, false);
		} else if (el.attachEvent) {
			el.attachEvent('on' + ev, fn);
		} else {
			el['on' + ev] = fn;
		}
	}

	function doGeoCode() {
		var params = {
			address: address.value,
			geoCodeUrl: geoCodeUrl,
			sensor: 'false'
		};
		
		var req = new XMLHttpRequest();
		req.open('POST', geoCodeHandler, true);
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if (req.status == 200) {
					var obj = JSON.parse(req.responseText);
					var lat = obj.results[0].geometry.location.lat;
					var lng = obj.results[0].geometry.location.lng;

					initialize(lat, lng);
				} else {
					alert("Error loading page");
				}
			}
		}
		req.send(JSON.stringify(params));

		/*
		$.ajax({
			url: geoCodeHandler,
			type: 'POST',
			data: params, 
			success: function(data) {
				var obj = JSON.parse(data);
				var lat = obj.results[0].geometry.location.lat;
				var lng = obj.results[0].geometry.location.lng;

				initialize(lat, lng);
			}
		});
		*/
	}
	
	function initialize(lat, lng) {
		//Default values for MU campus
		lat = typeof(lat) != 'undefined' ? lat : 38.94617;
		lng = typeof(lng) != 'undefined' ? lng : -92.32866; 

		addListener(geoCodeBtn, 'click', doGeoCode);

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

		google.maps.event.addListener(map, 'click', addLatLng);
	}

	/* 
	 * Public Methods
	 */
	return {
		init: function() {
			initialize();
		}
	}
}

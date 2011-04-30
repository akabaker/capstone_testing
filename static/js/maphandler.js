var MapHandler = function() {

	var geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
	var geoCodeHandler = '/geocode/';
	var geoCodeBtn = document.getElementById('mh-go');
	var address = document.getElementById('mh-address');

	function drawPolyLine(event) {
		MapHandler.path = poly.getPath();
		MapHandler.path.push(event.latLng);
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

		if (window.XMLHttpRequest) {
			var xmlhttp = new XMLHttpRequest();
  		} else {
			var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open('POST', geoCodeHandler, true);
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					var obj = JSON.parse(xmlhttp.responseText);
					var lat = obj.results[0].geometry.location.lat;
					var lng = obj.results[0].geometry.location.lng;

					initialize(lat, lng);
				} else {
					alert("Error loading page");
				}
			}
		}
		xmlhttp.send(JSON.stringify(params));
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

		// Set map to an object property to make it available elsewhere
		MapHandler.map = map;

		var polyOptions = {
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3
		};

		poly = new google.maps.Polyline(polyOptions);
		poly.setMap(map);

		// Draw poly line
		google.maps.event.addListener(map, 'click', drawPolyLine);

		var pgon = new google.maps.Polygon(polyOptions);	
		pgon.setMap(map);

		// Map click events return latLng, this is used to
		// create a new marker
		google.maps.event.addListener(map, 'click', function(e) {
			console.log(e.latLng.toString());
			setMarkers(e.latLng);

			pgon.setPaths(MapHandler.path);
		});
		
	}

	function drawRect() {
		var sw = new google.maps.LatLng(38.94576530459227, -92.3290717190838);
		var ne = new google.maps.LatLng(38.946071955448325, -92.32848699751855);
		var bounds = new google.maps.LatLngBounds(sw, ne);
		var rectOptions = {
			bounds: bounds,
			clickable: true,
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3
		};

		var rect = new google.maps.Rectangle(rectOptions);
		rect.setMap(MapHandler.map);

		var bbounds = rect.getBounds();
		var point = new google.maps.LatLng(38, -92);
		bbounds.extend(point);
	}

	function setMarkers(latLng) {
		var marker = new google.maps.Marker({
			//position: new google.maps.LatLng(38.94617, -92.32866),
			position: latLng,
			map: MapHandler.map,
			draggable: true,
			raiseOnDrag: true,
			animation: google.maps.Animation.DROP
		});
	}

	/* 
	 * Public Methods
	 */
	return {
		init: function() {
			initialize();
		},
		markers: function() {
			setMarkers();
		}
	}
}

var MapTools = function(map){

	var map = map;
	var drawPolygonButton = document.getElementById('draw-polygon');
	var polyOptions = {
		strokeColor: '#000000',
		strokeOpacity: 1.0,
		strokeWeight: 3
	};

	function drawPolyLine(event) {
		MapHandler.path = poly.getPath();
		MapHandler.path.push(event.latLng);
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
	/*
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
		*/
	function addListener(el, ev, fn) {
		if (el.addEventListener) {
			el.addEventListener(ev, fn, false);
		} else if (el.attachEvent) {
			el.attachEvent('on' + ev, fn);
		} else {
			el['on' + ev] = fn;
		}
	}
	/* 
	 * Public Methods
	 */

	return {
		test: function() {
			console.log(map);

			addListener(drawPolygonButton, 'click', function(e) {
				console.log('clicked');
			});
		}
	}
}

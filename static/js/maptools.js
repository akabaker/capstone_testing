var MapTools = function(map){

	var map = map;
	var helper = Helpers();
	var drawPolygonButton = document.getElementById('draw-polygon');
	var clearPointsButton = document.getElementById('clear-points');
	var polyLineOptions = {
		strokeColor: '#000000',
		strokeOpacity: 1.0,
		strokeWeight: 3,
	};

	function drawPolyLine(event) {
		MapTools.path = MapTools.poly.getPath();
		MapTools.path.push(event.latLng);
	}

	function setMarker(latLng, map) {
		this.marker = new google.maps.Marker({
			//position: new google.maps.LatLng(38.94617, -92.32866),
			position: latLng,
			map: map,
			draggable: true,
			raiseOnDrag: true,
			animation: google.maps.Animation.DROP
		});
		this.markers = []
		this.markers.push(this.marker);
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

	function polygonOptions(map, path) {
		var polyOptions = {
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3,
			map: map,
			path: path,
		};

		return polyOptions;
	}

	function drawPolygon(map) {
		var poly = new google.maps.Polyline(polyLineOptions);
		poly.setMap(map);
		var isClosed = false;

		google.maps.event.addListener(map, 'click', function(clickEvent) {
			if (isClosed) {
				return;
			} else {
				var marker = new google.maps.Marker({
					position: clickEvent.latLng,
					map: map,
					draggable: true,
					raiseOnDrag: true,
					animation: google.maps.Animation.DROP
				});

				if (poly.getPath().length === 0) {
					poly.getPath().push(clickEvent.latLng);
					google.maps.event.addListener(marker, 'click', function() {
						if (isClosed) {
							return;
						} else {
							var path = poly.getPath();
							pgon = new google.maps.Polygon(polygonOptions(map, path));
							isClosed = true;
						}
					});
				} else {
					google.maps.event.addListener(marker, 'drag', function(dragEvent) {
						//poly.getPath().setAt(marker, dragEvent.latLng);
					});
					var verticies = poly.getPath();
					for (var i=0; i < verticies.length; i++) {
						console.log(i);
					}

					poly.getPath().push(clickEvent.latLng);
				}
			}
		});
	}

	function clearPoints() {
		map.clearOverlays();
	}

	/* 
	* Public Methods
	*/
	return {
		initTools: function() {
			helper.addListener(drawPolygonButton, 'click', function() {
				drawPolygon(map);
			});

			helper.addListener(clearPointsButton, 'click', function() {
				clearPoints(map);
			});
		},
	}
}

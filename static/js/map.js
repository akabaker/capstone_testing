function initialize() {
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

function addLatLng(event) {
	var path = poly.getPath();
	path.push(event.latLng);
}

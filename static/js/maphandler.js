var MapHandler = function() {

	var helper = Helpers();
	var geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
	var geoCodeHandler = '/geocode/';
	var geoCodeBtn = document.getElementById('mh-go');
	var address = document.getElementById('mh-address');
	var clearPointsButton = document.getElementById('clear-points');

	function _doGeoCode() {
		var params = {
			address: address.value,
			geoCodeUrl: geoCodeUrl,
			sensor: 'false'
		};

		xmlhttp = helper.xmlHttp();
		xmlhttp.open('POST', geoCodeHandler, true);
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					var obj = JSON.parse(xmlhttp.responseText);
					var lat = obj.results[0].geometry.location.lat;
					var lng = obj.results[0].geometry.location.lng;

					_initialize(lat, lng);
				} else {
					alert("Error loading page");
				}
			}
		}
		xmlhttp.send(JSON.stringify(params));
	}

	function _initialize(lat, lng) {
		//Default values for MU campus
		lat = typeof(lat) != 'undefined' ? lat : 38.94617;
		lng = typeof(lng) != 'undefined' ? lng : -92.32866; 

		helper.addListener(geoCodeBtn, 'click', _doGeoCode);

		var latlng = new google.maps.LatLng(lat, lng);
		var myOptions = {
			zoom: 19,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
		return map;
	}

	/* 
	* Public Methods
	*/
	return {
		init: function() {
			var map = _initialize();

			var that = this;
			helper.addListener(clearPointsButton, 'click', function(e) {
				that.init();
			});

			return map;
		},
	}
}

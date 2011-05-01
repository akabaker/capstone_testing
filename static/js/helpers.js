var Helpers = function() {

	function _addListener(el, ev, fn) {
		if (el.addEventListener) {
			el.addEventListener(ev, fn, false);
		} else if (el.attachEvent) {
			el.attachEvent('on' + ev, fn);
		} else {
			el['on' + ev] = fn;
		}
	}

	function _xmlHttp() {
		if (window.XMLHttpRequest) {
			var xmlhttp = new XMLHttpRequest();
  		} else {
			var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xmlhttp;
	}

	return {
		addListener: function(el, ev, fn) {
			_addListener(el, ev, fn);
		},

		xmlHttp: function() {
			var xmlhttp = _xmlHttp();
			return xmlhttp;
		}
	}
}

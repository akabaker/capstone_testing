from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.utils import simplejson as json
import urllib

def main_page(request):
	return render_to_response('home.html', {'var': 'hi'})

def geo_code(request):
	
	# JSON object must be loaded with raw_post_data method
	geodata = json.loads(request.raw_post_data)

	address = geodata.get('address', False)
	sensor = geodata.get('sensor', False)
	geocodeurl = geodata.get('geoCodeUrl', False)
	geo_args = {
		'address': address,
		'sensor': sensor
	}

	url = geocodeurl + '?' + urllib.urlencode(geo_args)
	result = json.load(urllib.urlopen(url))

	return HttpResponse(json.dumps(result), mimetype='application/javascript')

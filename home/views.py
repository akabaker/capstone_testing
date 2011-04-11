from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.utils import simplejson
import urllib

def main_page(request):
	return render_to_response('home.html', {'var': 'hi'})

def geo_code(request):
	address = request.GET.get('address', False)
	sensor = request.GET.get('sensor', False)
	geocodeurl = request.GET.get('geoCodeUrl', False)

	geo_args = {
		'address': address,
		'sensor': sensor
	}

	url = geocodeurl + '?' + urllib.urlencode(geo_args)
	result = simplejson.load(urllib.urlopen(url))

	return HttpResponse(simplejson.dumps(result), mimetype='application/javascript')

from django.shortcuts import render_to_response

def main_page(request):
	return render_to_response('home.html', {'var': 'hi'})

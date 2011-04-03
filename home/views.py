# Create your views here.

from django.views.generic import TemplateView

class MainPage(TemplateView):
	template_name = "base.html"

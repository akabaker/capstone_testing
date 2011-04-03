from django.conf.urls.defaults import patterns, include, url
from capstone.home.views import MainPage

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	(r'^$', MainPage.as_view()),
    # Examples:
    # url(r'^$', 'capstone.views.home', name='home'),
    # url(r'^capstone/', include('capstone.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

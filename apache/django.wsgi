import os
import sys
import site

site.addsitedir('/opt/venv/lib64/python2.6/site-packages')
#activate_this = '/home/bakerlu/venv/bin/activate_this.py'
#execfile(activate_this, dict(__file__=activate_this))

path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append('/var/www/school')
sys.path.append('/var/www/school/capstone')

if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()

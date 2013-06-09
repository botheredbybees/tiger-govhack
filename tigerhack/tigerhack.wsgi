import os
import sys	
sys.path.append('/var/www/tiger-govhack/tigerhack/')
os.environ['DJANGO_SETTINGS_MODULE'] = 'tigerhack.settings'
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()

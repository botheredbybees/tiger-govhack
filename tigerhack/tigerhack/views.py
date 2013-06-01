# Create your views here.
from django.http import HttpResponse
from marker.models import SitePhoto
from django.template import Context, loader
from django.http import Http404

def home(request):
    template = loader.get_template("index.html")
    context = Context({ })
    return HttpResponse(template.render(context))


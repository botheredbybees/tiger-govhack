# Create your views here.
from django.http import HttpResponse
from marker.models import SitePhoto
from django.template import Context, loader

def index(request):
    return HttpResponse("Hello, world. You're at the poll index.")

def all(request):
    marker_list = SitePhoto.objects.order_by('-lastupdate')
    template = loader.get_template("marker/markers.js")
    context = Context({ 'marker_list': marker_list, })
    return HttpResponse(template.render(context))

def detail(request, marker_id):
    return HttpResponse("Return a single marker!")

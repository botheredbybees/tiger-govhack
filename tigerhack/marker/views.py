# Create your views here.
from django.http import HttpResponse
from marker.models import SitePhoto
from django.template import Context, loader
from django.http import Http404
from django.shortcuts import render

def all(request):
    marker_list = SitePhoto.objects.order_by('-lastupdate')
    nbr_of_markers = len(marker_list)
    template = loader.get_template("marker/markers.js")
    context = Context({ 'marker_list': marker_list, 'nbr_of_markers': nbr_of_markers })
    return HttpResponse(template.render(context))

def detail(request, marker_id):
    try:
        marker = SitePhoto.objects.get(id=marker_id)
    except SitePhoto.DoesNotExist:
        raise Http404
    return render(request, 'marker/marker_detail.html', {'marker': marker})

def add(request):
    site_photo = SitePhoto.id()
    site_photo.note = request.POST['note']
    site_photo.save()
    return HttpResponseRedirect(reverse('/'))
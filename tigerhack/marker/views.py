# Create your views here.
from datetime import datetime
from django.http import HttpResponse

from marker.models import SitePhoto
from marker.models import MarkerTypes

from django.template import Context, loader
from django.http import Http404
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt                                          

def isset(var): return var in vars() or var in globals()

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

@csrf_exempt
def add(request):
    now = datetime.now()
    site_photo = SitePhoto(
        created=now, 
        lastupdate=now, 
        mime_type='image/jpeg',
        approved=1,
        owner='system')
    if 'note' in request.POST['note']:
        site_photo.note = request.POST['note']
    else:
        site_photo.note = ''
    
    if (isset(request.POST['caption'])):
        site_photo.caption = request.POST['caption']
    else:
        site_photo.caption = ''

    if (isset(request.POST['lat'])):
        site_photo.latitude=float(request.POST['lat'])
    else:
        site_photo.latitude = 0

    if (isset(request.POST['long'])):
        site_photo.longitude=float(request.POST['long'])
    else:
        site_photo.latitude =   0

    mt = MarkerTypes.objects.get(name='Site Photo')
    site_photo.type = mt
    site_photo.save()
    template = loader.get_template("index.html")
    message = "Thankyou for adding a site marker. It has been added to the moderation queue"
    context = Context({'message': message})
    return HttpResponse(template.render(context))
#    return HttpResponse('OK')

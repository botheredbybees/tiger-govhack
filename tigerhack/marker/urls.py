from django.conf.urls import patterns, url

from marker import views

urlpatterns = patterns('',
    url(r'^$', views.all, name='all'),
    url(r'^(?P<marker_id>\d+)/$', views.detail, name='detail'),
    )

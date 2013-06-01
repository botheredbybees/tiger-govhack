from django.contrib import admin
from marker.models import MarkerTypes, SitePhoto

#class SitePhotoAdmin:
#  fields = ['created', 'caption']
#  readonly_fields = []
#  form = []
#  fieldsets = [
#      (None, {'fields': ['caption']}),
#      ('Date Information', {'fields': ['created'], 'classes': ['collapse']}),
#    ]
#  list_display = ('caption', 'lastupdate', 'was_published_recently')
#  list_filter = ['created']
#  search_fields = ['caption']
#  date_hierarchy = 'created'

admin.site.register(SitePhoto)
  
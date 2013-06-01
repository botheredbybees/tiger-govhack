from django.db import models

# Create your models here.
class MarkerTypes(models.Model):
  name = models.CharField(max_length=200)

class SitePhoto(models.Model):
  approved = models.BooleanField()
  owner = models.CharField(max_length=200)
  created = models.DateTimeField('date published')
  lastupdate = models.DateTimeField('date updated')
  type = models.ForeignKey(MarkerTypes)
  latitude = models.FloatField(default=0)
  longitude = models.FloatField(default=0)
  note = models.TextField()
  image = models.ImageField(upload_to='/var/www/tiger-govhack/public_html/uploads/')
  mime_type = models.CharField(max_length=150)
  caption = models.CharField(max_length=250)

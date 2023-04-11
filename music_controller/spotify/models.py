from django.db import models
from django.utils import timezone
from api.models import Room

# Create your models here.

class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_in = models.DateTimeField(default=timezone.now)
    token_type = models.CharField(max_length=50, default='Bearer')
    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255)

class Vote(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    song_id = models.CharField(max_length=50)
    user = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
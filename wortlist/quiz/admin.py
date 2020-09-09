from django.contrib import admin
from .models import Word, WordCategory, VerbForm, Sentence

admin.site.register(Word)
admin.site.register(WordCategory)
admin.site.register(VerbForm)
admin.site.register(Sentence)

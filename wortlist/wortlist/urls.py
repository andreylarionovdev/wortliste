from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('quiz.urls')),
    path('admin/', admin.site.urls),
]

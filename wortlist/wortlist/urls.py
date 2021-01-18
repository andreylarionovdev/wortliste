from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import RedirectView

urlpatterns = [
    path('', include('quiz.urls')),
    path('admin/', admin.site.urls),
    re_path(r'^', include('frontend.urls')),
]

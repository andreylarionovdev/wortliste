from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:word_id>/', views.word_detail, name='word_detail'),
    path('<int:word_id>/check/', views.check_word, name='check_word')
]

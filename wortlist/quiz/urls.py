from django.urls import path

from . import views

urlpatterns = [
    path('api/words/', views.WordListCreate.as_view()),
    path('api/words/<int:pk>', views.WordRetrieve.as_view()),
    # path('', views.index, name='index'),
    # path('<int:word_id>/', views.word_detail, name='word_detail'),
    # path('<int:word_id>/check/', views.check_word, name='check_word')
]

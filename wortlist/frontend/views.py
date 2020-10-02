from django.shortcuts import render


def index(request, word_id=None):
    print(word_id)
    return render(request, 'frontend/index.html')

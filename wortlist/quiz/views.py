from django.shortcuts import render, get_object_or_404
from .models import Word, Sentence


def index(request):
    words = Word.objects.order_by('text')
    return render(request, 'quiz/index.html', {'words': words})


def detail(request, word_id):
    word = get_object_or_404(Word, pk=word_id)
    sentences = Sentence.objects.filter(word=word)
    return render(request, 'quiz/detail.html', {'word': word, 'sentences': sentences})

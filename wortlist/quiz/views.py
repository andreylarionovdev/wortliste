from django.shortcuts import render, get_object_or_404
from django.db.models.functions import Lower
from .models import Word, Sentence


def index(request):
    words = Word.objects.filter(verb_inf=None).order_by(Lower('text'))
    return render(request, 'quiz/index.html', {'words': words})


def detail(request, word_id):
    word = get_object_or_404(Word, pk=word_id)
    sentences = Sentence.objects.filter(word=word)
    context = {'word': word, 'sentences': sentences}
    if word.is_verb():
        context['verb_forms'] = Word.objects.filter(verb_inf=word)
    return render(request, 'quiz/detail.html', context)

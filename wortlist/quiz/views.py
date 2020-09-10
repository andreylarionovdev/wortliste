from django.shortcuts import render, get_object_or_404, HttpResponseRedirect
from django.db.models.functions import Lower
from django.urls import reverse
from .models import Word, Sentence


def index(request):
    words = Word.objects.filter(verb_inf=None).order_by(Lower('text'))
    return render(request, 'quiz/index.html', {'words': words})


def word_detail(request, word_id):
    word = get_object_or_404(Word, pk=word_id)
    sentences = Sentence.objects.filter(word=word)
    context = {'word': word, 'sentences': sentences}
    if word.is_verb():
        context['verb_forms'] = Word.objects.filter(verb_inf=word)
    return render(request, 'quiz/word-detail.html', context)


def check_word(request, word_id):
    word = get_object_or_404(Word, pk=word_id)
    context = {'word': word}
    try:
        Sentence.objects.get(word=word, text=request.POST['sentence'])
    except KeyError:
        return render(request, 'quiz/check-word.html', context)
    except Sentence.DoesNotExist:
        context['error_message'] = 'Try again!'
        return render(request, 'quiz/check-word.html', context)
    else:
        next_word = get_next_word_for_check(word)
        return HttpResponseRedirect(reverse('check_word', args=(next_word.id,)))


def get_next_word_for_check(word):
    word = Word.objects.filter(verb_inf=None, id__gt=word.id).first()
    if not word:
        return Word.objects.filter(verb_inf=None).first()
    return word

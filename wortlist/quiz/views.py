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
        # POST validation
        Sentence.objects.get(word=word, text=request.POST['sentence'])
        if word.is_noun():
            artikel = request.POST['artikel']
            plural_ending = request.POST['plural_ending']
            word = Word.objects.get(id=word_id)
            if (word.artikel.text != artikel) or (word.plural_ending != plural_ending):
                raise Word.DoesNotExist
    except KeyError:
        # GET
        return render(request, 'quiz/check-word.html', context)
    except (Sentence.DoesNotExist, Word.DoesNotExist):
        # POST with validation error
        context['error_message'] = 'noch einmal!'
        return render(request, 'quiz/check-word.html', context)
    else:
        # POST without validation error
        next_word = get_next_word_for_check(word)
        return HttpResponseRedirect(reverse('check_word', args=(next_word.id,)))


def get_next_word_for_check(word):
    word = Word.objects.filter(verb_inf=None, id__gt=word.id).first()
    if not word:
        return Word.objects.filter(verb_inf=None).first()
    return word

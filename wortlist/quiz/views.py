from django.shortcuts import get_object_or_404
from django.db.models.functions import Lower
# from django.urls import reverse
# from .models import Word, Sentence, VerbForm
# from .forms.BaseWordForm import BaseWordForm
# from .forms.NounWordForm import NounWordForm
# from .forms.VerbWordForm import VerbWordForm

from .models import Word
from .serializers import WordShortSerializer, WordSerializer
from rest_framework import generics, mixins, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


class WordListCreate(generics.ListCreateAPIView):
    queryset = Word.objects.filter(verb_inf=None).order_by(Lower('text'))
    serializer_class = WordShortSerializer


class WordRetrieve(generics.RetrieveAPIView):
    queryset = Word.objects.filter(verb_inf=None)
    serializer_class = WordSerializer


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def reorder_words(request):
    words = Word.objects.filter(verb_inf=None).order_by(Lower('text'))
    for i, word in enumerate(words):
        word.order_id = i
        word.save()
    return Response({'rows_affected': i}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def fetch_next_word(request, pk):
    data = request.data
    try:
        current_word = Word.objects.get(pk=pk)
        order_id = current_word.order_id
        next_id = order_id - 1 if data.get('dir') == 'prev' else order_id + 1
        next_word = Word.objects.get(order_id=next_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = WordSerializer(next_word)

    return Response(serializer.data, status=status.HTTP_200_OK)

    # def index(request):
    #     words = Word.objects.filter(verb_inf=None).order_by(Lower('text'))
    #     return render(request, 'quiz/index.html', {'words': words})

    # def word_detail(request, word_id):
    #     word = get_object_or_404(Word, pk=word_id)
    #     sentences = Sentence.objects.filter(word=word)
    #     context = {
    #         'word': word,
    #         'prev_word': get_prev_word(word),
    #         'next_word': get_next_word(word),
    #         'sentences': sentences,
    #         'is_superuser': request.user.is_superuser,
    #     }
    #     if word.is_verb():
    #         context['verb_forms'] = Word.objects.filter(verb_inf=word)
    #     return render(request, 'quiz/word-detail.html', context)

    # def get_form(word, data=None):
    #     if word.is_noun():
    #         return NounWordForm(data) if data is not None else NounWordForm()
    #     elif word.is_verb():
    #         return VerbWordForm(data) if data is not None else VerbWordForm()
    #     return BaseWordForm(data) if data is not None else BaseWordForm()

    # def validate_word_form(word, form):
    #     is_valid = True
    #     default_message = 'Does not match!'

    #     try:
    #         Sentence.objects.get(word=word, text=form.cleaned_data['sentence'])
    #     except Sentence.DoesNotExist:
    #         form.add_error('sentence', default_message)
    #         is_valid = False

    #     if word.is_noun():
    #         if word.artikel.text != str(form.cleaned_data['artikel']):
    #             form.add_error('artikel', default_message)
    #             is_valid = False
    #         if word.plural_ending != form.cleaned_data['plural_ending']:
    #             form.add_error('plural_ending', default_message)
    #             is_valid = False

    #     if word.is_verb():
    #         try:
    #             Word.objects.get(verb_inf=word,
    #                              text=form.cleaned_data['praesens'],
    #                              verb_form=VerbForm.objects.get(name='Präsens'))
    #         except Word.DoesNotExist:
    #             form.add_error('praesens', default_message)
    #             is_valid = False

    #         try:
    #             Word.objects.get(verb_inf=word,
    #                              text=form.cleaned_data['praeteritum'],
    #                              verb_form=VerbForm.objects.get(name='Präteritum'))
    #         except Word.DoesNotExist:
    #             form.add_error('praeteritum', default_message)
    #             is_valid = False

    #         try:
    #             Word.objects.get(verb_inf=word,
    #                              text=form.cleaned_data['perfekt'],
    #                              verb_form=VerbForm.objects.get(name='Perfekt'))
    #         except Word.DoesNotExist:
    #             form.add_error('perfekt', default_message)
    #             is_valid = False

    #     return is_valid

    # def check_word(request, word_id):
    #     word = get_object_or_404(Word, pk=word_id)
    #     if request.method == 'POST':
    #         form = get_form(word, request.POST)
    #         if form.is_valid():
    #             # TODO: Move validation method to Form class
    #             if validate_word_form(word, form):
    #                 next_word = get_next_word(word)
    #                 return HttpResponseRedirect(reverse('check_word', args=(next_word.id,)))
    #     else:
    #         form = get_form(word)

    #     return render(request, 'quiz/check-word.html', {'form': form, 'word': word})

    # def get_next_word(word):
    #     word = Word.objects.filter(verb_inf=None, id__gt=word.id).first()
    #     if not word:
    #         return Word.objects.filter(verb_inf=None).first()
    #     return word

    # def get_prev_word(word):
    #     word = Word.objects.filter(verb_inf=None, id__lt=word.id).last()
    #     if not word:
    #         return Word.objects.filter(verb_inf=None).last()
    #     return word

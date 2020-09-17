from . import BaseWordForm
from django import forms

from ..models import Artikel


class NounWordForm(BaseWordForm.BaseWordForm):
    artikel = forms.ModelChoiceField(queryset=Artikel.objects.all(), empty_label='Artikel')
    plural_ending = forms.CharField(max_length=10, required=False)

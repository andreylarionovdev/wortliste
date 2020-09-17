from . import BaseWordForm
from django import forms


class VerbWordForm(BaseWordForm.BaseWordForm):
    praesens = forms.CharField(max_length=500, required=True)
    praeteritum = forms.CharField(max_length=500, required=True)
    perfekt = forms.CharField(max_length=500, required=True)

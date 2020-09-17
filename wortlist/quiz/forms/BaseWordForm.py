from django import forms


class BaseWordForm(forms.Form):
    sentence = forms.CharField(widget=forms.Textarea(attrs={'rows': 10, 'cols': 50}))

    def __init__(self, *args, **kwargs):
        super(BaseWordForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form__input'

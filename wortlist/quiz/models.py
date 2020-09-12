from django.db import models


class Language(models.Model):
    def __str__(self):
        return self.name

    name = models.CharField(max_length=3)


class WordCategory(models.Model):
    def __str__(self):
        return self.name

    name = models.CharField(max_length=50)


class VerbForm(models.Model):
    def __str__(self):
        return self.name

    name = models.CharField(max_length=50)


class Artikel(models.Model):
    def __str__(self):
        return self.text

    text = models.CharField(max_length=3)


class Word(models.Model):
    def __str__(self):
        artikel = f", {self.artikel.text}" if self.artikel else ""
        return f"{self.text}{artikel} - {self.translate}"

    text = models.CharField(max_length=500)
    artikel = models.ForeignKey(Artikel, on_delete=models.CASCADE, null=True, blank=True)
    plural_ending = models.CharField(max_length=10, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    translate = models.CharField(max_length=500, blank=True)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    category = models.ForeignKey(WordCategory, on_delete=models.CASCADE)
    verb_form = models.ForeignKey(VerbForm, on_delete=models.CASCADE, null=True, blank=True)
    verb_inf = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def is_noun(self):
        return self.category.name == 'noun'

    def is_verb(self):
        return self.category.name == 'verb'


class Sentence(models.Model):
    def __str__(self):
        return f"{self.word} - {self.text}"

    text = models.TextField()
    word = models.ForeignKey(Word, on_delete=models.CASCADE)

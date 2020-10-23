from rest_framework import serializers
from .models import Word, Sentence


class SentenceSerializer(serializers.ModelSerializer):
    change_url = serializers.ReadOnlyField(source='get_admin_change_url')

    class Meta:
        model = Sentence
        fields = ('text', 'change_url')


class WordSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(read_only=True)
    verb_form = serializers.StringRelatedField(read_only=True)
    artikel = serializers.StringRelatedField(read_only=True)
    sentences = SentenceSerializer(many=True, read_only=True)
    verbs = serializers.StringRelatedField(read_only=True, many=True)
    change_url = serializers.ReadOnlyField(source='get_admin_change_url')

    class Meta:
        model = Word
        fields = '__all__'

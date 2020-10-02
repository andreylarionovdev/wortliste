from rest_framework import serializers
from .models import Word

class WordSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(read_only=True)
    verb_form = serializers.StringRelatedField(read_only=True)
    artikel = serializers.StringRelatedField(read_only=True)
    sentences = serializers.StringRelatedField(read_only=True, many=True)
    verbs = serializers.StringRelatedField(read_only=True, many=True)

    class Meta:
        model = Word
        fields = '__all__'

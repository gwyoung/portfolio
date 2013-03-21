from django.shortcuts import render
from django.core.urlresolvers import reverse
from viewer.models import Piece, Link

def index(request):
    return render(request, 'viewer/index.html', {})
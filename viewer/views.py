from django.shortcuts import render
from django.core.urlresolvers import reverse
from viewer.models import Piece, Link

def index(request):
    # Extract the values from the constant list of piece types
    types = []
    for k, v in Piece.TYPE_CHOICES:
        types.append(v)
    # Pass a formatted type string to be used as constants on the client side
    return render(request, 'viewer/index.html', {'types': '", "'.join(types)})
from tastypie import fields
from tastypie.resources import ModelResource, ALL
from viewer.models import Piece, Link

class PieceResource(ModelResource):
    class Meta:
        queryset = Piece.objects.all()
        filtering = {
            'type': ALL,
            'created_date': ALL,
        }

class LinkResource(ModelResource):
    class Meta:
        queryset = Link.objects.all()
        filtering = {
            'type': ALL,
        }
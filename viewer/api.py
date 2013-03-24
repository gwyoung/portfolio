from tastypie import fields
from tastypie.resources import ModelResource, ALL
from viewer.models import Piece, FlatPage, Link

class PieceResource(ModelResource):
    class Meta:
        queryset = Piece.objects.all()
        filtering = {
            'type': ALL,
            'created_date': ALL,
        }

class FlatPageResource(ModelResource):
    class Meta:
        queryset = FlatPage.objects.all()
        filtering = {
            'title': ALL,
        }

class LinkResource(ModelResource):
    flat_page = fields.ForeignKey(FlatPageResource, 'flat_page')

    class Meta:
        queryset = Link.objects.all()
        filtering = {
            'flat_page': ALL
        }

from django.contrib import admin
from viewer.models import Piece, FlatPage, Link

class PieceAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_date', 'type')
    list_filter = ['created_date']
    search_fields = ['title']
    date_hierarchy = 'created_date'

admin.site.register(Piece, PieceAdmin)

class LinkInline(admin.StackedInline):
    model = Link
    extra = 3

class FlatPageAdmin(admin.ModelAdmin):
    inlines = [LinkInline]


admin.site.register(FlatPage, FlatPageAdmin)
from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from tastypie.api import Api
from viewer.api import PieceResource, LinkResource
from django.contrib import admin

admin.autodiscover()

# Set up the tastypie API
viewer_api = Api(api_name='viewer_api')
viewer_api.register(PieceResource())
viewer_api.register(LinkResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'portfolio.views.home', name='home'),
    # url(r'^portfolio/', include('portfolio.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Enable the admin
    url(r'^admin/', include(admin.site.urls)),

    # Enable the basic urls
    url(r'^$', include('viewer.urls')),

    # Enable the tastypie API
    url(r'^api/', include(viewer_api.urls)),

# Enable the media root for runserver testing. This should be removed in production.
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

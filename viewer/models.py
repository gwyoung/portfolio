from django.db import models
from django.template.defaultfilters import slugify


# Piece model
# Represents a piece of art in the portfolio collection
class Piece(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField()
    created_date = models.DateField()

    # These are the different tabs for viewing the art by type
    CANVAS = 'Canvas'
    DIGITAL = 'Digital'
    PHOTOGRAPHY = 'Photography'
    DRAWING = 'Drawing'
    ALBUM_ART = 'Album Art'
    TYPE_CHOICES = (
        (CANVAS, CANVAS),
        (DIGITAL, DIGITAL),
        (PHOTOGRAPHY, PHOTOGRAPHY),
        (DRAWING, DRAWING),
        (ALBUM_ART, ALBUM_ART),
    )
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default=CANVAS)

    materials = models.CharField(max_length=100)
    blurb = models.TextField(blank=True)
    image = models.ImageField(upload_to='images/')
    thumb = models.ImageField(upload_to='thumbs/')
    width = models.DecimalField(blank=True, max_digits=3, decimal_places=1)
    height = models.DecimalField(blank=True, max_digits=3, decimal_places=1)

    def __unicode__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Automatically generates a slug
        if not self.slug:
            self.slug = slugify(self.title)[:50]
        return super(Piece, self).save(*args, **kwargs)

# Flat page model
# Represents a page with static content, an image, and several links
class FlatPage(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
    image = models.ImageField(upload_to='flatpage/')
    caption = models.TextField(blank=True)

    def __unicode__(self):
        return self.title

# Link model
# Represents a link on a flat page
class Link(models.Model):
    flat_page = models.ForeignKey(FlatPage)
    title = models.CharField(max_length=200)
    url = models.URLField()
    description = models.TextField(blank=True)

    def __unicode__(self):
        return self.title

/*
#content_panel view
The view for displaying a grid of piece thumbnails. Each thumbnail is clickable into the
detail view for that piece.
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'singletons',
    'collections/pieces',
    'text!templates/grid.html'
], function($, _, Backbone, Singletons, PieceCollection, GridTemplate){
    var GridView = Backbone.View.extend({
        el: $('#content_panel'),
        initialize: function() {
            // Get all pieces, passing options to the collection
            this.collection = new PieceCollection(null, this.options);
            // Attach the current collection to the singletons object
            Singletons.CurrentCollection = this.collection;
            // Attach the current type to the singletons object
            Singletons.CurrentType = this.options.type || "All";
            // Set the current page to "Work"
            Singletons.CurrentPage = "Work";
            // Bind events to collection's reset event
            this.collection.bind('reset', this.render, this);
            // Call fetch with reset = true to trigger the event
            this.collection.fetch({reset: true});
        },
        render: function(){
            // Prepare the pieces for the grid template
            // Expects a list of objects of the form {{year: 2011, pieces: [piece objects]}}
            var models = this.collection.models;
            var piece_sets = [];
            var years = _.uniq(_.map(models, function(piece){ return piece.get('year'); }));
            _.each(years, function(year){
                var pieces = _.filter(models, function(piece){
                    return piece.get('year') === year;
                });
                piece_sets.push({year: year, pieces: pieces});
            });

            // Set up selectors used in binding events
            var thumb_class = 'grid_thumb_div';
            var uri_attr = 'data-uri';

            // Compile the template and render the content div
            this.$el.html(_.template(GridTemplate,
                {piece_sets: piece_sets, thumb_class: thumb_class, uri_attr: uri_attr}));

            // Set up jquery events on the fresh dom
            $('.' + thumb_class).click(function(){
                // "this" is now the dom object that triggered the event
                var uri = $(this).attr(uri_attr);
                Singletons.Router.navigate('work/detail/' + uri, true);
            });

            // Toggle scrollable class, scroll to top
            $('#content_panel').addClass(Server.Constants.Classes.Scrollable);
            $('#content_panel').scrollTop(0);
        }
    });

    return GridView;
});
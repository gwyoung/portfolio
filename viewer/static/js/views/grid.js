define([
    'jquery',
    'underscore',
    'backbone',
    'collections/pieces',
    'text!templates/grid.html'
], function($, _, Backbone, PieceCollection, GridTemplate){
    var GridView = Backbone.View.extend({
        el: $('#content_panel'),
        initialize: function() {
            // Get all pieces with a specific type, if specified
            var options = {};
            this.collection = new PieceCollection(null, options);
            // Bind events to collection's reset event
            _.bindAll(this, 'render');
            this.collection.bind('reset', this.render, this);
            // Call fetch with reset = true to trigger the event
            this.collection.fetch({reset: true});
        },
        render: function(){
            // Prepare the pieces for the grid template
            // Expects a list of objects of the form {{year: 2011, pieces: [piece objects]}}
            // Sort models reverse chronologically
            var models = _.sortBy(this.collection.models, function(piece){ return piece.get('created_date')});
            models.reverse();
            var piece_sets = [];
            var years = _.uniq(_.map(models, function(piece){ return piece.get('year'); }))
            _.each(years, function(year){
                    var pieces = _.filter(models, function(piece){
                    return piece.get('year') == year;
                });
                piece_sets.push({year: year, pieces: pieces});
            });

            // Compile the template and render the content div
            this.$el.html(_.template(GridTemplate, {piece_sets: piece_sets}));
        }
    });

    return GridView;
});
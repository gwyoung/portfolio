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
            this.collection.bind("change", this.render);
            alert('fetching');
            this.collection.fetch({
                success: function(resp){
                    alert(resp.toJSON());
                }
            });
        },
        render: function(){
            alert('rendering');
            // Prepare the pieces for the grid template
            // Expects a list of objects of the form {{year: 2011, pieces: [piece objects]}}
            var piece_sets = [];
            _.each(_.uniq(_.map(this.collection.models, function(piece){
                return piece.get('year');
            })), function(year){
                var pieces = _.filter(this.collection.models, function(piece){
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
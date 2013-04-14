/*
The collection for Pieces. Can be filtered by year, type
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/piece'
], function($, _, Backbone, Piece){
    var PieceCollection = Backbone.Collection.extend({
        model: Piece,

        // This allows specification of type and year filters
        initialize: function(data, options){
            this.type = options.type;
            this.year = options.year;
            this.limit = options.limit || 0;
            this.offset = options.offset;
        },

        // Overrides url to add parameters
        url: function() {
            return Server.Constants.PIECE_API + '?' + this.params();
        },

        // Constructs parameters for filtering set
        params: function(){
            var p = {};
            p.limit = this.limit;
            if(this.offset){
                p.offset = this.offset;
            }
            if(this.type){
                p.type = this.type;
            }
            if(this.year){
                p.created_date__year = this.year;
            }
            return $.param(p);
        },

        // Parses, sorts, and formats result
        parse: function(response){
            // Translate year from creation date
            _.each(response.objects, function(piece){
                piece.year = new Date(piece.created_date).getUTCFullYear();
            });
            // Sort the objects
            var sorted_objects = _.sortBy(response.objects, 'created_date');
            sorted_objects.reverse();
            // Return the sorted objects to be translated into models
            return sorted_objects;
        }
    })

    return PieceCollection;
});
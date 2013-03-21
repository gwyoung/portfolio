define([
    'underscore',
    'backbone',
    'backbone_tastypie',
    // Pull in the Piece model
    'models/piece'
], function(_, Backbone, Tastypie, Piece){
    var PieceCollection = Backbone.Collection.extend({
        model: Piece,

        // This allows specification of type and year filters
        initialize: function(data, options){
            this.type = options.type;
            this.year = options.year;
            this.limit = options.limit;
            this.offset = options.offset;
        },

        // Overrides url to add parameters
        url: function() {
            return Piece.urlRoot + '?' + this.params();
        },

        // Constructs parameters for filtering set
        params: function(){
            var p = {};
            if(this.limit){
                p.limit = this.limit;
            }
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

        // Parses result and handles pagination through data
        parse: function(response){
            this.total = response.meta.total_count;
            this.offset = response.meta.offset + this.limit;
            this.hasMore = this.total > this.models.length;
            return response.objects;
        }
    })

    // You don't usually return a collection instantiated
    return PieceCollection;
});
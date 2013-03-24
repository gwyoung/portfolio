/*
The collection of FlatPages. Can be filtered by title
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/flatpage'
], function($, _, Backbone, FlatPage){
    var FlatPageCollection = Backbone.Collection.extend({
        model: FlatPage,

        // This allows specification of filters
        initialize: function(data, options){
            this.title = options.title;
        },

        // Overrides url to add parameters
        url: function() {
            return Server.Constants.FLATPAGE_API + '?' + this.params();
        },

        // Constructs parameters for filtering set
        params: function(){
            var p = {};
            if(this.title){
                p.title = this.title;
            }
            return $.param(p);
        },

        // Parses and sorts result
        parse: function(response){
            // Sort the pages by title
            var sorted_objects = _.sortBy(response.objects, 'title');
            // Return the sorted objects to be translated into models
            return sorted_objects;
        }
    })

    return FlatPageCollection;
});
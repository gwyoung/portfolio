/*
The collection of links. Can be filtered by flat_page id
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/link'
], function($, _, Backbone, Link){
    var LinkCollection = Backbone.Collection.extend({
        model: Link,

        // This allows specification of filters
        initialize: function(data, options){
            this.flat_page = options.flat_page;
        },

        // Overrides url to add parameters
        url: function() {
            return Server.Constants.LINK_API + '?' + this.params();
        },

        // Constructs parameters for filtering set
        params: function(){
            var p = {};
            if(this.flat_page){
                p.flat_page = this.flat_page;
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

    return LinkCollection;
});
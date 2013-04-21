/*
 #type_navigation_panel view
 The view for tabbed navigation through the different types of work
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'singletons',
    'collections/flatpages',
    'text!templates/navigation.html'
], function($, _, Backbone, Singletons, FlatPageCollection, NavigationTemplate){
    var PageNavigationView = Backbone.View.extend({
        el: $('#page_navigation_panel'),
        initialize: function() {
            // Get all pages
            this.collection = new FlatPageCollection(null, {});
            // Bind events to collection's reset event
            this.collection.bind('reset', this.render, this);
            // Call fetch with reset = true to trigger the event
            this.collection.fetch({reset: true});
        },
        render: function(){
            // Format the list of links
            var links = [];
            var information_uri = "information/";
            // Add the "Work" link
            links.push({title: 'Work', uri: 'work'});
            // Add the rest of the links
            _.each(this.collection.models, function(model){
                links.push({title: model.get('title'),
                    uri: information_uri + encodeURIComponent(model.get('title'))});
            });

            var link_class = 'page_link_div';
            var uri_attr = 'data-uri';

            // Render the navigation panel
            this.$el.html(_.template(NavigationTemplate,
                {links: links, link_class: link_class, uri_attr: uri_attr}));

            // Set up the jquery events for this div only
            this.$el.children('.' + link_class).click(function (){
                Singletons.Router.navigate($(this).attr(uri_attr), true);
            });

            // Mark the current page
            var selected_class = 'selected_link_div';
            this.$el.children('.' + link_class).each(function (){
                if($(this).html() === Singletons.CurrentPage){
                    $(this).addClass(selected_class);
                }
            });
        }
    })

    return PageNavigationView;
});
/*
 #type_navigation_panel view
 The view for tabbed navigation through the different types of work
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'singletons',
    'text!templates/navigation.html'
], function($, _, Backbone, Singletons, NavigationTemplate){
    var TypeNavigationView = Backbone.View.extend({
        el: $('#type_navigation_panel'),
        initialize: function() {
            // Render the navigation panel
            this.render();
        },
        render: function(){
            // Format the list of links
            var links = [];
            var work_uri = "work/";
            // Add the 'All' link
            links.push({title: "All", uri: work_uri + "All"});
            // Add the rest of the links
            _.each(Server.Constants.WORK_TYPES, function(type){
                links.push({title: type, uri: work_uri + encodeURIComponent(type)});
            });

            var link_class = 'navigation_link_div';
            var uri_attr = 'data-uri';

            // Render the navigation panel
            this.$el.html(_.template(NavigationTemplate,
                {links: links, link_class: link_class, uri_attr: uri_attr}));

            // Set up the jquery events for this div only
            this.$el.children('.' + link_class).click(function (){
                Singletons.Router.navigate($(this).attr(uri_attr), true);
            });

            // Mark the currently selected tab
            var selected_class = 'selected_link_div';
            this.$el.children('.' + link_class).each(function (){
                if($(this).html() === Singletons.CurrentType){
                    $(this).addClass(selected_class);
                }
            });
        }
    })

    return TypeNavigationView;
});
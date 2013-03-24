/*
 #content_panel view
 The view for displaying a flat page, given a title option
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'singletons',
    'collections/flatpages',
    'collections/links',
    'text!templates/page.html'
], function($, _, Backbone, Singletons, FlatPageCollection, LinkCollection, PageTemplate){
    var PageView = Backbone.View.extend({
        el: $('#content_panel'),
        initialize: function() {
            // Get all pages, passing the title option to the collection
            this.collection = new FlatPageCollection(null, this.options);
            // Set the current page in the singletons object
            Singletons.CurrentPage = this.options.title;
            // Bind events to collection's reset event
            this.collection.bind('reset', this.links, this);
            // Call fetch with reset = true to trigger the event
            this.collection.fetch({reset: true});
        },
        links: function(){
            // Retrieve all the links for the current page
            this.flat_page = this.collection.models[0];
            var id = this.flat_page.get('id');
            this.linkCollection = new LinkCollection(null, {flat_page: id});
            // Bind events to the retrieval of links
            this.linkCollection.bind('reset', this.render, this);
            // Call fetch with reset = true
            this.linkCollection.fetch({reset: true});
        },
        render: function(){
            // Compile the template and render the content div
            var content = this.flat_page.get('content');
            var links = this.linkCollection.models;
            this.$el.html(_.template(PageTemplate, {content: content, links: links}));
        }
    })

    return PageView;
});
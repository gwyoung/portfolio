define([
    'jquery',
    'underscore',
    'backbone',
    'views/grid',
    'views/detail',
    'views/type_navigation',
    'views/page',
    'views/page_navigation'
], function($, _, Backbone, GridView, DetailView, TypeNavigationView, PageView, PageNavigationView){

    var Router = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'work': 'showGrid',
            'work/All': 'showGrid',
            'work/:type': 'showGridByType',
            'work/detail/:id': 'showDetail',
            'work/detail/:id/:slug': 'showDetailWithSlug',
            'information/:title': 'showInformation',

            // Default
            '*actions': 'showGrid'
        },
        initialize: function(){
            Backbone.history.start();
        },
        renderControls: function(){
            var typeNavigationView = new TypeNavigationView();
            var pageNavigationView = new PageNavigationView();
        },
        showGrid: function(){
            var gridView = new GridView();
            this.renderControls();
        },
        showGridByType: function(type){
            var gridView = new GridView({type: decodeURIComponent(type)});
            this.renderControls();
        },
        showDetail: function(id){
            var detailView = new DetailView({id: id});
            this.renderControls();
        },
        showDetailWithSlug: function(id, slug){
            var detailView = new DetailView({id: id, slug: slug});
            this.renderControls();
        },
        showInformation: function(title){
            var pageView = new PageView({title: decodeURIComponent(title)});
            this.renderControls();
        }
    });

    return Router;
});
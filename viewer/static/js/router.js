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

    // Creates router
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
            // Overrides the navigate function to show loading before navigation
            // Wrap in an immediately executed function to avoid confusion between old
            // function and new function
            this.navigate = (function(old, router){
                return function() {
                   router.showLoading();
                   old.apply(router, arguments);
                }
            })(this.navigate, this);

            // Start the history to enable the browser forward and back buttons
            Backbone.history.start();
        },
        renderControls: function(){
            var typeNavigationView = new TypeNavigationView();
            var pageNavigationView = new PageNavigationView();
            // Hide loading once everything is done
            this.hideLoading();
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
        },
        showLoading: function(){
            $('*').toggleClass(Server.Constants.Classes.Loading, true);
        },
        hideLoading: function(){
            $('*').toggleClass(Server.Constants.Classes.Loading, false);
        }
    });

    return Router;
});
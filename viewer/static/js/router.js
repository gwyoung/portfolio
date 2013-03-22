define([
    'jquery',
    'underscore',
    'backbone',
    'views/grid',
    'views/detail'
], function($, _, Backbone, GridView, DetailView){

    var Router = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'work': 'showGrid',
            'work/:type': 'showGridByType',
            'work/detail/:id': 'showDetail',
            'about': 'showAbout',
            'contact': 'showContact',
            'inspiration': 'showInspiration',

            // Default
            '*actions': 'defaultAction'
        },
        initialize: function(){
            Backbone.history.start();
        },
        showGrid: function(){
            var gridView = new GridView();
        },
        showGridByType: function(type){
            var gridView = new GridView({type: type});
        },
        showDetail: function(id){
            var detailView = new DetailView({id: id});
        },
        defaultAction: function(actions){
        }
    });

    return Router;
});
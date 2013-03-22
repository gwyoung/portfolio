define([
    'jquery',
    'underscore',
    'backbone',
    'views/grid'
], function($, _, Backbone, GridView){

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
            alert('grid view');
            var gridView = new GridView();
        },
        defaultAction: function(actions){
            alert(actions);
        }
    });

    return Router;
});
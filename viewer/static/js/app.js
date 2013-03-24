define([
    'jquery',
    'underscore',
    'backbone',
    'router', // Request router.js
    'singletons'
], function($, _, Backbone, Router, Singletons){
    var initialize = function(){
        Singletons.Router = new Router();
    }

    return {
        initialize: initialize
    };
});
/*
The model corresponding to the link on the server
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var Link = Backbone.Model.extend({
        urlRoot: Server.Constants.LINK_API
    });

    return Link;
});
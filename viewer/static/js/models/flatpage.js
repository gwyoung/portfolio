/*
The model corresponding to the FlatPage on the server
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var FlatPage = Backbone.Model.extend({
        urlRoot: Server.Constants.FLATPAGE_API
    });

    return FlatPage;
});
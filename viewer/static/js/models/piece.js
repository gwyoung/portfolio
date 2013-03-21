define([
    'underscore',
    'backbone',
    'backbone_tastypie'
], function(_, Backbone, Tastypie){
    var Piece = Backbone.Model.extend({
        urlRoot: Server.Constants.PIECE_API
    })
    // Return the model for the module
    return Piece;
});
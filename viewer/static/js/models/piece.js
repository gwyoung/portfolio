define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var Piece = Backbone.Model.extend({
        urlRoot: Server.Constants.PIECE_API
    })
    // Return the model for the module
    return Piece;
});
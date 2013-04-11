/*
The model corresponding to the Piece model on the server
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var Piece = Backbone.Model.extend({
        urlRoot: Server.Constants.PIECE_API,
        isHorizontal: function (){
            return parseFloat(this.get('width')) >= parseFloat(this.get('height'));
        }
    });

    return Piece;
});
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
            return parseInt(this.get('width')) >= parseInt(this.get('height'));
        }
    });

    return Piece;
});
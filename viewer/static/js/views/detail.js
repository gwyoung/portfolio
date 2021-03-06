/*
#content_panel view
The view for displaying piece detail (full image and metadata)
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'extensions/date',
    'singletons',
    'models/piece',
    'collections/pieces',
    'text!templates/detail.html'
], function($, _, Backbone, Date, Singletons, Piece, PieceCollection, DetailTemplate){
    var DetailView = Backbone.View.extend({
        el: $('#content_panel'),
        initialize: function() {
            // Retrieve the piece with the given id
            this.model = new Piece({id: this.options.id});
            // Bind the callback function to the change event
            // If there is no current collection we need to set it
            this.model.bind('change', Singletons.CurrentCollection ? this.render : this.setCollection, this);
            // Retrieve the data
            this.model.fetch();
        },
        setCollection: function(){
            // Create a new collection of all pieces
            Singletons.CurrentCollection = new PieceCollection(null, {});
            // Bind the render event
            Singletons.CurrentCollection.bind('reset', this.render, this);
            Singletons.CurrentCollection.fetch({reset: true});
        },
        render: function(){
            // Find the next and previous piece models using the current collection
            var models = Singletons.CurrentCollection.models;
            var piece = this.model;
            var index = _.indexOf(models, _.find(models, function(item){
                    return item.get('id') === piece.get('id');
                }));
            var prevPiece;
            var nextPiece;
            if(index){
                prevPiece = models[index - 1];
            }
            if(index < models.length - 1){
                nextPiece = models[index + 1];
            }

            // Format the date - add time to ensure the date is correct
            var date = new Date(this.model.get('created_date').split("-").join("/"));
            var formatted_date = date.getUTCMonthName() + ' ' + date.getUTCDateOrdinal() + ', '
                + date.getUTCFullYear();

            // Compile the template and render the content div
            var prevClass = 'detail_prev_img';
            var nextClass = 'detail_next_img';
            var uriAttr = 'data-uri';
            this.$el.html(_.template(DetailTemplate, {piece: piece, date: formatted_date,
                images: Server.Constants.Images, prevPiece: prevPiece, nextPiece: nextPiece,
                prevClass: prevClass, nextClass: nextClass, uriAttr: uriAttr}));

            // Set up previous and next click events
            if(prevPiece)
            {
                this.setUpEvents(prevClass, Server.Constants.Images.PREVIOUS_HOVER,
                    Server.Constants.Images.PREVIOUS, uriAttr);
            }
            if(nextPiece)
            {
                this.setUpEvents(nextClass, Server.Constants.Images.NEXT_HOVER,
                    Server.Constants.Images.NEXT, uriAttr);
            }

            // Remove scrollable class
            $('#content_panel').removeClass(Server.Constants.Classes.Scrollable);
        },
        setUpEvents: function(cssClass, hoverImg, img, uriAttr){
            // Set up click and hover events
            $('.' + cssClass).click(function(){
                Singletons.Router.navigate('work/detail/' + $(this).attr(uriAttr), true);
            }).hover(function() {
                $(this).attr('src', hoverImg);
            },
            function(){
                $(this).attr('src', img);
            });
        }
    })

    return DetailView;
});
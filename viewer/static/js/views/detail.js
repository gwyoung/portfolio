/*
#content_panel view
The view for displaying piece detail (full image and metadata)
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'extensions/date',
    'models/piece',
    'text!templates/detail.html'
], function($, _, Backbone, Date, Piece, DetailTemplate){
    var DetailView = Backbone.View.extend({
        el: $('#content_panel'),
        initialize: function() {
            // Retrieve the piece with the given id
            this.model = new Piece({id: this.options.id});
            // Bind the render function to the change event
            this.model.bind('change', this.render, this);
            // Retrieve the data
            this.model.fetch();
        },
        render: function(){
            // Compile the template and render the content div
            var date = new Date(this.model.get('created_date'));
            var formatted_date = date.getMonthName() + ' ' + date.getDayOrdinal() + ', '
                + date.getFullYear();
            this.$el.html(_.template(DetailTemplate, {piece: this.model, date: formatted_date}));
        }
    })

    return DetailView;
});
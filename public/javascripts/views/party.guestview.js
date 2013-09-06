/*global Backbone, $, _ */
var Party = Party || {};

(function (Backbone, $, _){
	'use strict';
	var ENTER_KEY, GuestView;

	ENTER_KEY = 13;
	
	GuestView = Backbone.View.extend({

		tagName: 'a',

		template: _.template($('#guest-item-template').html()),

		className: 'list-group-item',

		events: {
			'click .uninvite': 'delete'
		},

		initialize: function () {
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		delete: function(){
			this.model.destroy();
		}
	});
	
	Party.GuestListView = Backbone.View.extend({
		el: '#app-container',

		template: _.template($('#guest-list-template').html()),

		events: {
			'keypress #guest-text-box': 'createOnEnter'
		},
		initialize: function () {
			this.listenTo(this.collection, 'add', this.addOne, this);
			this.render();
			this.addAll();
		},		

		render: function () {
			this.$el.html(this.template());
			return this;
		},

		addOne: function (guest) {
			var view = new GuestView({ model: guest });
			this.$('#guest-list').append(view.render().el);
		},

		addAll: function () {
			this.$('#guest-list').html('');
			this.collection.each(this.addOne, this);
		},

		createOnEnter: function (e) {
			if (e.which !== ENTER_KEY || !this.$('#guest-text-box').val().trim()) {
				return;
			}
			this.collection.create({ name: this.$('#guest-text-box').val() });
			this.$('#guest-text-box').val('');
		}
	});

}(Backbone,$ ,_));
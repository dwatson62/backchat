var Backchat = Backchat || {};

Backchat.MessageView = Backbone.View.extend({
  tagName: 'li',

  template: _.template($('#message-template').html()),

  events: {},

  render: function() {
    this.$el.html(this.model.attributes.author + ' - ' + this.model.attributes.content);
    return this;
  }
});

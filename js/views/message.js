var Backchat = Backchat || {};

Backchat.MessageView = Backbone.View.extend({
  tagName: 'li',
  className: 'message',

  template: _.template($('#message-template').html()),

  events: {},

  render: function() {
    var attributes = this.model.attributes;
    this.$el.html(this.template());
    this.$('.author').text(attributes.author + ':');
    this.$('.content').text(attributes.content);
    return this;
  }
});

var Backchat = Backchat || {};

Backchat.BackchatView = Backbone.View.extend({
  el: '#backchat-app',

  events: {
    'click #submit': 'createNewMessage'
  },

  initialize: function() {
    this.$authorInput = this.$('#new-author');
    this.$contentInput = this.$('#new-content');

    this.listenTo(Backchat.Messages, 'add', this.addOne);
    Backchat.Messages.fetch();
  },

  addOne: function(message) {
    var view = new Backchat.MessageView({ model: message });
    $('#messages-list').append(view.render().el);
  },

  createNewMessage: function() {
    Backchat.Messages.create(this.newAttributes());
    this.$authorInput.val('');
    this.$contentInput.val('');
  },

  newAttributes: function() {
    return {
      author: this.$authorInput.val().trim(),
      content: this.$contentInput.val().trim()
    };
  }
});

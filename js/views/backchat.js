var Backchat = Backchat || {};

Backchat.BackchatView = Backbone.View.extend({
  el: '#backchat-app',

  events: {
    'click #submit': 'createNewMessage'
  },

  initialize: function() {
    var self = this;
    this.collection = new Backchat.Messages();
    this.listenTo(this.collection, 'add', this.addOne);

    var pusher = new Pusher('57dfc6cfaf53632a4da6', {
      cluster: 'eu'
    });
    var channel = pusher.subscribe('message_channel');
    Backchat.MessageBackpusher = new Backpusher(channel, this.collection);

    this.collection.fetch({
      success: function(collection) {
        _.each(collection.models, function(message) {
          self.addOne(message);
        });
      },
      error: function() {
        console.log('Something went wrong!');
      }
    });
    this.render();

    this.$authorInput = this.$('#new-author');
    this.$contentInput = this.$('#new-content');
  },

  addOne: function(message) {
    var view = new Backchat.MessageView({ model: message });
    $('#messages-list').append(view.render().el);
  },

  createNewMessage: function() {
    var message = this.collection.create(this.newAttributes());
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

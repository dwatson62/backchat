var Backchat = Backchat || {};

Backchat.BackchatView = Backbone.View.extend({
  el: '#backchat-app',

  events: {
    'click #submit': 'createNewMessage',
    'keyup #new-content' : 'keyPressEventHandler'
  },

  initialize: function() {
    var self = this;
    var pusherKey = $('#backchat-app').data('key');
    this.collection = new Backchat.Messages();

    Pusher.log = function(message) {
      if (window.console && window.console.log) {
        window.console.log(message);
      }
    };

    var pusher = new Pusher(pusherKey, {
      cluster: 'eu',
      encrypted: true
    });

    var channel = pusher.subscribe('message_channel');
    Backchat.MessageBackpusher = new Backpusher(channel, this.collection);

    channel.bind('remote_create', function(response) {
      console.log(response)
      var newMessage = new Backchat.Message(response);
      self.addOne(newMessage);
    });

    this.collection.fetch({
      success: function(collection) {
        _.each(collection.models, function(message) {
          self.addOne(message);
        });
        self.scrollToBottom();
      },
      error: function() {
        console.log('Something went wrong!');
      }
    });
    this.render();

    this.$authorInput = this.$('#new-author');
    this.$contentInput = this.$('#new-content');
    this.count = 0;
  },

  addOne: function(message) {
    var view = new Backchat.MessageView({ model: message });
    $('#messages-list').append(view.render().el);
    this.scrollToBottom();
    if (document.hidden) {
      this.count += 1;
      document.title = '(' + this.count + ') Backchat';
    }
  },

  createNewMessage: function() {
    var message = this.collection.create(this.newAttributes());
    this.$contentInput.val('');
  },

  newAttributes: function() {
    return {
      author: this.$authorInput.val().trim(),
      content: this.$contentInput.val().trim()
    };
  },

  scrollToBottom: function() {
    var messageList = $('#messages-list')[0];
    var isScrolledToBottom = messageList.scrollHeight -
      messageList.clientHeight <= messageList.scrollTop + 1;

    if (!isScrolledToBottom) {
      messageList.scrollTop = messageList.scrollHeight - messageList.clientHeight;
    }
  },

  clearNewMessageCount: function() {
    this.count = 0;
    document.title = 'Backchat';
  },

  keyPressEventHandler: function() {
    if (event.keyCode == 13) {
      this.createNewMessage();
    }
  }
});

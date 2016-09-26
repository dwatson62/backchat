var Backchat = Backchat || {};

var BackchatList = Backbone.Collection.extend({
  model: Backchat.Message,

  localStorage: new Backbone.LocalStorage('backchat-backbone')
});

Backchat.Messages = new BackchatList();

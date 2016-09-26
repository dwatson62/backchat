var Backchat = Backchat || {};

Backchat.Messages = Backbone.Collection.extend({
  model: Backchat.Message,
  url: '/messages'
});

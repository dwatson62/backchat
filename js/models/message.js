var Backchat = Backchat || {};

Backchat.Message = Backbone.Model.extend({
  defaults: {
    author: '',
    content: ''
  }
});

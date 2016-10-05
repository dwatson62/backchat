var Backchat = Backchat || {};
var ENTER_KEY = 13;

$(document).ready(function() {
  new Backchat.BackchatView();

  var params = window.location.search.substring(1).split('=');
  if (params[0] === 'author') {
    var author = params[1];
    author = author.charAt(0).toUpperCase() + author.slice(1);
    $('#new-author').val(author);
  }
});

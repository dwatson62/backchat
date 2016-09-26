var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Message', MessageSchema);
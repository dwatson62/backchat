var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Message = require('../models/message.js');

var attributes = ['author', 'content'];

var buildMessage = function(params) {
  return new Message({
    author: params.author,
    content: params.content
  });
};

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster: 'eu'
});

router.get('/messages', function(req, res, next) {
  Message.find(function(err, messages) {
    if (err) { return next(err); }
    res.json(messages);
  });
});

router.get('/message/:id', function(req, res, next) {
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      return next(err);
    } else if (message) {
      res.json(message);
    } else {
      console.log('Message not found!');
      next();
    }
  });
});

router.post('/messages', function(req, res, next) {
  var newMessage = buildMessage(req.body);
  newMessage.save(function(err) {
    if (err) { return next(err); }
    console.log('New message by ' + newMessage.author + ' was created!');
    pusher.trigger('message_channel', 'remote_create', newMessage);
    res.json(newMessage);
  });
});

router.delete('/message/:id', function(req, res, next) {
  Message.findByIdAndRemove(req.params.id, function(err, message) {
    if (err) {
      next(err);
    } else if (message) {
      res.json({ message: message.id + ' deleted!' });
    } else {
      console.log('Message not found!');
      next();
    }
  });
});

router.delete('/messages', function(req, res, next) {
  Message.remove({}, function(err) {
    if (err) {
      res.end('Error! ' + err);
    } else {
      res.end('Success!');
    }
  });
});

module.exports = router;

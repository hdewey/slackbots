// 
var Bot = require('slackbots');
var _ = require("underscore");

var tone = require("./tone.js").tone;
var emotion = require('./tone.js').emotion;
var conversation = require("./conversation.js").conversation;

var exports = module.exports = {};

// create a bot
var settings = {
  token: '',
  name: "Henry's Bot"
};

var channel = 'hdewey';

var bot = new Bot(settings);

exports.run = function() {

  bot.on('start', function() {
    // bot.postMessageToUser(channel, msg);
  });
  
  bot.listen = function(mask, handler) {
    bot.on('message', function(event) {
      var match;
      if (!event.user || event.user == bot.userId) {
        return;
      }
      match = _.every(mask, (value, property) => {
        if (_.isRegExp(value)) {
          return event[property].match(value);
        }
        return event[property] === value;
      });
      if (!match) {
        return;
      }
      handler(event);
    });
  };
  
  bot.listen(
    {
      type: 'message',
      // text: 'keywords'
    },
    function(message) {
      var text = message.text;
      
      conversation(bot, text);
      
    }
  );
};
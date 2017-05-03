// Set up .ENV to secure passwords and api keys
require("dotenv").config();

// Require useful packages
var Bot = require('slackbots');
var _   = require("underscore");

// Importing functions made in other files.
var tone         = require("./tone.js").tone;
var emotion      = require('./tone.js').emotion;
var conversation = require("./conversation.js").conversation;

// Set up module.exports
var exports = module.exports = {};

// settings for a bot
var settings = {
  token: process.env.SLACKBOT_TOKEN,
  name : "Henry's Bot"
};

// Builds a bot
var bot = new Bot(settings);

// Setting up a function that will be exported to start.js 
exports.run = function() {
  
  // Testing
  bot.on('start', function() {
    // bot.postMessageToUser(channel, msg);
  });
  
  // Function for listening for a message
  bot.listen = function(mask, handler) {
    // On start when a message is recieved
    bot.on('message', function(event) {
      
      // Making sure the msg was not sent by the bot
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
  
  // Running the listen function with specified parameters
  bot.listen(
    {
      type: 'message',
      // text: 'keywords'
    },
    function(message) {
      
      var text = message.text;
      
      // Running an imported function
      conversation(bot, text, message.user);
    }
  );
};
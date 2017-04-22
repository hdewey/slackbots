// Setting up ENV
require("dotenv").config();

// Getting the watson package
var watson = require('watson-developer-cloud');

// Setting up module.exports
var exports = module.exports = {};

// Importing the tone function from tone.js
var tone = require("./tone.js").tone;

// Using env to set up the api keys
var conversation = watson.conversation({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version: 'v1',
  version_date: '2017-04-21'
});

// Exporting the conversation function
exports.conversation = function(bot, user_msg, user) {

  var context = {};
  
  conversation.message({
    
    // The conversation workspace id
    workspace_id : process.env.WATSON_WORKSHOP_ID,
    // Text input
    input        : {'text': user_msg},
    context      : context
    
  },  function(err, response) {
    // Check for err
    if (err) {
      console.log('error:', err);
    }
    else {
      // If the msg matches a query, then respond with a random response from the conversation tool
      if(response.output.text.length != 0) {
        // Send a msg back to the user
        bot.postMessageToUser(user, response.output.text[Math.floor(Math.random() * response.output.text.length)]);
      } else {
        // If the msg does not match a catogory, send the user what emotion they're exhibiting
        tone(bot, user_msg, user);
      }
    }
  });
};
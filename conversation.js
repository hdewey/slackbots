require("dotenv").config();

var watson = require('watson-developer-cloud');

var exports = module.exports = {};

var tone = require("./tone.js").tone;

var conversation = watson.conversation({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version: 'v1',
  version_date: '2017-04-21'
});

exports.conversation = function(bot, user_msg) {

  var context = {};
  
  conversation.message({
    workspace_id: process.env.WATSON_WORKSHOP_ID,
    input: {'text': user_msg},
    context: context
  },  function(err, response) {
    if (err) {
      console.log('error:', err);
    }
    else {
      
      if(response.output.text.length != 0) {
        bot.postMessageToUser('kendell', response.output.text[Math.floor(Math.random() * response.output.text.length)]);
      } else {
        tone(bot, user_msg);
      }
    }
  });
};
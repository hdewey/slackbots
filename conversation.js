var watson = require('watson-developer-cloud');

var exports = module.exports = {};

var tone = require("./tone.js").tone;

var conversation = watson.conversation({
  username: "6ab442ca-ed68-4ae4-a624-b590e1d6d8ef",
  password: "QfIH2jidMizO",
  version: 'v1',
  version_date: '2017-04-21'
});

exports.conversation = function(bot, user_msg) {

  var context = {};
  
  conversation.message({
    workspace_id: '2e9d0b97-f3ca-4fe6-b3ba-9e05c23f264e',
    input: {'text': user_msg},
    context: context
  },  function(err, response) {
    if (err) {
      console.log('error:', err);
    }
    else {
      
      if(response.output.text.length != 0) {
        bot.postMessageToUser('hdewey', response.output.text[0]);
      } else {
        tone(bot, user_msg);
      }
    }
  });
};
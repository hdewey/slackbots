var watson = require('watson-developer-cloud');

var exports = module.exports = {};

var tone = require("./tone.js").tone;

var conversation = watson.conversation({
  username: "",
  password: "",
  version: 'v1',
  version_date: '2017-04-21'
});

exports.conversation = function(bot, user_msg) {

  var context = {};
  
  conversation.message({
    workspace_id: '',
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
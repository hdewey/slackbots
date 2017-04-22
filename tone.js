// Setting up ENV
require("dotenv").config();

// Requiring the watson package
var watson  = require('watson-developer-cloud');

// Setting up module.exports
var exports = module.exports = {};

// Setting up the tone analyzer
var tone_analyzer = watson.tone_analyzer({
  username    : process.env.WATSON_USERNAME,
  password    : process.env.WATSON_PASSWORD,
  version     : 'v3',
  version_date: '2016-05-19 '
});

exports.tone = function(bot, text) {
  tone_analyzer.tone({ text: text },
    function(err, tone) {
      if (err) {
        console.log(err);
      }
      else  {
        
        var tones = tone.document_tone.tone_categories[0].tones;
        
        var stats_names  = [];
        var stats_scores = [];
        
        //console.log(JSON.stringify(tones, null, 2));
        
        for (var x = 0; x < tones.length; x++) {
          //console.log(tones[x].tone_name + " => " + tones[x].score);
          stats_names.push(tones[x].tone_id);
          stats_scores.push(tones[x].score);
        }
        
        // console.log(stats);
        
        Array.max = function( array ){
            return Math.max.apply( Math, array );
        };
        
        var max = Array.max(stats_scores);
        
        var largest = stats_scores.indexOf(max);
        
        var emotion = stats_names[largest];
        
        emotion = stats_names[largest];
        
        bot.postMessageToUser('hdewey', "From what I can tell, you're feeling " + emotion);
      }
  });
};
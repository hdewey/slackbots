require("dotenv").config();

var colors = require('colors');

// Importing the bot function
var bot    = require("./modules/bot.js").run;

// Run it
bot();

console.log(colors.green('Bot is online!'));
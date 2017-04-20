// mongodb://<dbuser>:<dbpassword>@ds159220.mlab.com:59220/bamboo

var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:henryitunes@ds159220.mlab.com:59220/bamboo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var msgSchema = mongoose.Schema({
	response  : String,
	connection: String,
});

var Msg = mongoose.model('Msg', msgSchema);

var createMsg = function(data) {

	var temp = new Msg(data);

	temp.save(function (err, obj) {
		if (err) return console.error(err);
		console.log('Added a msg in response to: ' + obj.connotation)
	});
}

var findMsg = function() {
	Msg.find(function (err, msgs) {
		if (err) return console.error(err);
		console.log(msgs);
	})
}

var removeMsg = function(id){
	Msg.remove(id, function(err, records){
		if(err){
			console.log("Error" + err);                
		}
		else{                
			console.log('Deleted Object; ID: ' + id);
		}
	});
}
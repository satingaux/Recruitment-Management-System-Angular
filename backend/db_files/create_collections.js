var mongoclient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var db_constant = require('db_constants');

mongoclient.connect(url, function(err, database){
	if(err) throw err;
	var db_obj = database.db(db_constant.db_name);
	console.log("db connected");
	db_obj.createCollection(db_constant.student_cll, function(err, res){
		if(err) throw err;
		console.log("Collection created")
		database.close();
	})
});
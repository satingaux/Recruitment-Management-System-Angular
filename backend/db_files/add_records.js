var mongoclient = require("mongodb").MongoClient;
var url="mongodb://localhost:27017/";
var db_constant = require('./db_constants');

module.exports = 
{
  addStudentRecord: function (name, surname,email, address,contact_details,position) 
  {
   	  mongoclient.connect(url, function(err, database){
   	  	if(err) throw err;
   	  	console.log("db connected");
   	  	var db_obj=database.db(db_constant.db_name);
   	  	var data_to_insert = {
			name: name,
			lname: surname,
			email: email,
			address: address,
			contact: contact_details,
			role:position
	  	};
		db_obj.collection(db_constant.student_cll).insertOne(data_to_insert,function(err,res){
			if(err) throw err;
			console.log("data inserted");
		});
   	  });
  },
  sumoftwo: function (a,b){
  	return a+b;
  }
};
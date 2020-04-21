var mongoclient = require("mongodb").MongoClient;
var url="mongodb://localhost:27017/";
var db_constant = require('./db_constants');

exports.fetchAllStudentRecord = function(req,res){
	try{
  		mongoclient.connect(url, function(err, database){
			if(err) throw err;
			var db_obj = database.db(db_constant.db_name);
			var myPromise = () => {
				return new Promise((resolve,reject) => {
					db_obj.collection(db_constant.student_cll).find({}).toArray(function(err, res){
						err ? reject(err) : resolve(res);
					});
				});
			};
			var callMyPromise = async () => {
				var res = await (myPromise());
				return res;
			}
			callMyPromise().then(function(result){
				console.log(result);
				database.close();
				res.send(result);
			})
		}); 		
  	}catch(error){
  		console.log(error);
  	}
};

exports.fetchSpecificRecord = function(req,res){
	try{
		// var email=req.body.email;
		var email="email";
		var query={email:email};
  		mongoclient.connect(url, function(err, database){
			if(err) throw err;
			var db_obj = database.db(db_constant.db_name);
			var myPromise = () => {
				return new Promise((resolve,reject) => {
					db_obj.collection(db_constant.student_cll).find(query).toArray(function(err, res){
						err ? reject(err) : resolve(res);
					});
				});
			};
			var callMyPromise = async () => {
				var res = await (myPromise());
				return res;
			}
			callMyPromise().then(function(result){
				console.log(result);
				database.close();
				res.send(result);
			})
		}); 		
  	}catch(error){
  		console.log(error);
  	}
};

exports.fetchSorted = function(req,res){
	try{
		// var para=req.body.email;
		var para="email"
		var sortrecord={para:1};
  		mongoclient.connect(url, function(err, database){
			if(err) throw err;
			var db_obj = database.db(db_constant.db_name);
			var myPromise = () => {
				return new Promise((resolve,reject) => {
					db_obj.collection(db_constant.student_cll).find().sort(sortrecord).toArray(function(err, res){
						err ? reject(err) : resolve(res);
					});
				});
			};
			var callMyPromise = async () => {
				var res = await (myPromise());
				return res;
			}
			callMyPromise().then(function(result){
				console.log(result);
				database.close();
				res.send(result);
			})
		}); 		
  	}catch(error){
  		console.log(error);
  	}
};
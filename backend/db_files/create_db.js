//Create a database called "rms":
var MongoClient = require('mongodb').MongoClient;
var db_constant = require('db_constants');

var url = "mongodb://localhost:27017/"+db_constant.db_name;
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
//This is the Main server file.
var express = require('express');
var app = express();

var server = app.listen(2300,function(){
	console.log("Server is ready");
})

var auth=require('./controllers/auth');
app.get('/', function (req, res) { 
 	//call to auth file for authentication  
	var ans=auth.sumoftwo(2,3);
	console.log(ans);
	res.send('Hello from index.js');
})

var test=require('./controllers/test');
app.get('/test',test.index);

var addrecord=require('./db_files/add_records')
app.get('/addStudentRecord',function(req,res){
	//call to auth file for authentication
	//frontend fields like - <input type="text" name="name">
	fname=request.body.fname;
	lname=request.body.lname;
	email=request.body.email;
	address=request.body.address;
	contact_details=request.body.contact_details;
	position=request.body.position;
	var r=addrecord.addStudentRecord(fname,lname,email,address,contact_details,position);
});

var fetchrecord=require('./db_files/fetch_record')
app.get('/fetchAllStudentRecord',fetchrecord.fetchAllStudentRecord);
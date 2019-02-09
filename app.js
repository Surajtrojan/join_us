var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password: '********',
	database : 'join_us'
});



app.get("/", function(req, res){
	// res.send("You have reached the home page!");
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(err, results){
		if(err) throw err;
		var total = results[0].count;
		res.render("home", {data: total});
	});
});

app.post("/register", function(req, res){
	var person = {
		email: req.body.email
	};

	connection.query('Insert into users set ?', person, function(err, result){
		if(err) throw err;
		res.redirect("/");
	});
});



app.listen(3000, function(){
	console.log('Server has started on port 3000!');
});
const express = require("express");
const app = express();
const router = express.Router();
var pg = require('pg');
const db = require('./models');


pg.defaults.ssl = true;


var config = require(__dirname + '/config.js');

app.use(express.static(__dirname + '/public'));
const path = __dirname + '/public/views/';

const PORT = process.env.PORT || config.express.port;

app.set("view engine", "pug");

// test database connection
db.sequelize
				.authenticate()
				.then(() =>{
								console.log('[DATABASE]Connection has been established successfully.');
				})
				.catch(err =>{
								console.error('[DATABASE]Unable to connect to the database:', err);
				});

router.use(function(req, res, next){
				console.log("/" + req.method);
				next();
});

app.use("/",router);

app.use("*",function(req,res){
				res.render("404");
});

app.listen(PORT,function(){
				console.log("Listening on Port " + PORT);
});


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

// homepage
router.get("/", async function(req, res){
				// query for all recipes from newest to oldest
				const query = db.Recipe.findAll({
								order: [['createdAt', 'DESC']]
				});

				const recipes = await query;

				// render homepage with recipes
				res.render("index", {recipes});
});

// db.Recipe.destroy({where: {}}).then(function () {});

// db.Recipe.create({
// 				name: "test",
// 				ingredients: ["1 cup flour", "1 egg"],
// 				steps: ["do the first thing", "do the next thing", "last thing"]
// });

app.use("/",router);

app.use("*",function(req,res){
				res.render("404");
});

app.listen(PORT,function(){
				console.log("Listening on Port " + PORT);
});


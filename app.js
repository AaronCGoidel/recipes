const express = require("express");
const app = express();
const router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const db = require('./models');
var GoogleAuth = require('google-auth-library');


// OAuth client ID
const CLIENT_ID = '786319502323-fqjsf84cnqh79phubfcnnlior07hf385.apps.googleusercontent.com';

pg.defaults.ssl = true;

var config = require(__dirname + '/config.js');

app.use(express.static(__dirname + '/public'));
const path = __dirname + '/public/views/';

// Use body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set port
const PORT = process.env.PORT || config.express.port;

// Use pug
app.set("view engine", "pug");

// Setup OAuth
var auth = new GoogleAuth;
var client = new auth.OAuth2(CLIENT_ID, '', 'http://localhost:8081/');

router.use(cookieParser());

// test database connection
db.sequelize
				.authenticate()
				.then(() =>{
								console.log('[DATABASE]Connection has been established successfully.');
				})
				.catch(err =>{
								console.error('[DATABASE]Unable to connect to the database:', err);
				});

// Print request methods
router.use(function(req, res, next){
				console.log("/" + req.method);
				next();
});

//==========Endpoints==========//

// homepage
router.get("/", authMiddleware, async function(req, res){
				console.log("main");
				// query for all recipes from newest to oldest
				const query = db.Recipe.findAll({
								order: [['createdAt', 'DESC']]
				});


				const recipes = await query;

				// render homepage with recipes
				res.render("index", {recipes});
});


router.get("/recipe/*", function(req, res){
				// get recipe id from url
				var getID = /[^/]*$/.exec(req.path)[0];
				console.log(getID);

				// query database for recipe with id from url
				db.Recipe.findOne({
								where: {
												id: getID
								}
				}).then(thisRecipe => res.render("recipe", {thisRecipe}));
});

router.get("/login", function(req, res){
				res.render("login")
});

function verify(token, client_id) {
				return new Promise((resolve, reject) => {
								payload = null;
								client.verifyIdToken(token, client_id, function (e, login) {
												if (e) {
																reject(e);
												} else {
																payload = login.getPayload();
																resolve(payload);
												}
								})
				}).catch(function(err){
								console.log('there was an error');
				});
}

function authMiddleware(req, res, next){
				console.log(req.cookies.uid);
				next();
}

// Handle OAuth login POST
router.post("/auth", function(req, res){
				verify(req.body.idtoken, CLIENT_ID).then(function(user){
								db.User
												.findOrCreate({
																where: {
																				id: user.sub
																}, defaults: {
																				name_first: user.given_name,
																				name_last: user.family_name
																}
												})
												.spread((user, created) => {
																console.log(user.get({
																				plain: true
																}));
																console.log(created);
												});
								res.cookie("uid", user.sub);
								res.json(user);
				});
});

router.post("/deauth", function(req, res){
				res.clearCookie("uid");
				res.send();
});

app.use("/",router);

app.use("*",function(req,res){
				res.render("404");
});

app.listen(PORT,function(){
				console.log("Listening on Port " + PORT);
});


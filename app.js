const express = require('express');
const app = express();
const router = express.Router();
var pg = require('pg');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const db = require('./models');
var GoogleAuth = require('google-auth-library');

pg.defaults.ssl = true;

var config = require(__dirname + '/config.js');

app.use(express.static(__dirname + '/public'));
const path = __dirname + '/public/views/';

// Use body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// OAuth client ID
const CLIENT_ID = process.env.CLIENT_ID || config.google.client_id;

// Set port
const PORT = process.env.PORT || config.express.port;

// Use pug
app.set('view engine', 'pug');

// Setup OAuth
var auth = new GoogleAuth;
var client = new auth.OAuth2(CLIENT_ID, '', '');

router.use(cookieParser());

// test database connection
db.sequelize.authenticate().then(() => {
  console.log('[DATABASE]Connection has been established successfully.');
}).catch(err => {
  console.error('[DATABASE]Unable to connect to the database:', err);
});

// Print request methods
router.use(function(req, res, next) {
  console.log('/' + req.method);
  next();
});

//==========Endpoints==========//

// homepage
router.get('/', authMiddleware, async function(req, res) {
  // query for all recipes from newest to oldest
  const recipeQuery = db.Recipe.findAll({
    where: {
      author: req.cookies.uid,
    },
    order: [['createdAt', 'DESC']],
  });

  const userQuery = db.User.findAll({
    where: {
      id: req.cookies.uid,
    },
  });

  const recipes = await recipeQuery;
  const user = await userQuery;

  // render homepage with recipes
  res.render('index', {user, recipes});
});

router.get('/recipe/*', function(req, res) {
  // get recipe id from url
  var getID = /[^/]*$/.exec(req.path)[0];
  console.log(getID);

  // query database for recipe with id from url
  db.Recipe.findOne({
    where: {
      id: getID,
    },
  }).then(thisRecipe => res.render('recipe', {thisRecipe}));
});

router.get('/create', authMiddleware, function(req, res){
  res.render('create');
});

router.post('/upload', authMiddleware, function(req, res){
  console.log(req.body);
  
});

// Authentication middleware
function authMiddleware(req, res, next) {
  if (req.cookies.uid) {
    next();
  } else {
    res.status(401).redirect('/login');
  }
}

router.get('/login', function(req, res) {
  res.render('login');
});

function verify(token, client_id) {
  return new Promise((resolve, reject) => {
    payload = null;
    client.verifyIdToken(token, client_id, function(e, login) {
      if (e) {
        reject(e);
      } else {
        payload = login.getPayload();
        resolve(payload);
      }
    });
  }).catch(function(err) {
    console.log('there was an error');
  });
}

// Handle OAuth login POST
router.post('/auth', function(req, res) {
  verify(req.body.idtoken, CLIENT_ID).then(function(user) {
    db.User.findOrCreate({
      where: {
        id: user.sub,
      }, defaults: {
        name_first: user.given_name,
        name_last: user.family_name,
      },
    }).spread((user, created) => {
      console.log(user.get({
        plain: true,
      }));
      console.log(created);
    });
    res.cookie('uid', user.sub);
    res.json(user);
  });
});

router.post('/deauth', authMiddleware, function(req, res) {
  res.clearCookie('uid');
  res.send();
});

app.use('/', router);

app.use('*', function(req, res) {
  res.render('404');
});

app.listen(PORT, function() {
  console.log('Listening on Port ' + PORT);
});


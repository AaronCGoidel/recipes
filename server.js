const express = require('express');
const {OAuth2Client} = require('google-auth-library');
var pg = require('pg');
const db = require('./models');


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const app = express();
const router = express.Router();

router.use(cookieParser());

// App config
var config = require(__dirname + '/config.js');

// OAuth client ID
const CLIENT_ID = process.env.CLIENT_ID || config.google.client_id;

// Set port
const PORT = process.env.PORT || config.express.port;

// Google auth client
const client = new OAuth2Client(CLIENT_ID);

// Use body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// DB
pg.defaults.ssl = true;
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


// VERIFY GOOGLE USER TOKEN
function verify(token) {
  return new Promise((resolve, reject) => {
    let payload = null;
    client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    }, function(e, ticket) {
      if(e) {
        reject(e);
      }else{
        payload = ticket.getPayload();
        resolve(payload);
      }
    });
  }).catch(function(err) {
    console.log('there was an error');
  })
}

router.post('/auth', async function(req, res) {
  const user = await verify(req.body.idToken);
  res.send(user);
});

router.post('/check_user', async function(req, res) {
  const user = await db.User.findAll({
    where: {
      id: req.body.userid,
    },
  }).catch(function(err) {
  });

  if(user.length > 0){
    res.send({isuser: true,
    fname: user[0].dataValues.name_first})
  }else{
    res.send({isuser: false})
  }
});

app.use('/', router);

app.listen(PORT, function() {
  console.log('Listening on Port ' + PORT);
});

const express = require('express');
const {OAuth2Client} = require('google-auth-library');
var pg = require('pg');
const path = require('path');
const db = require('./models');
const fs = require('fs');


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

// Make sure it can find the SPA
const SPA_ROOT = path.resolve('./client/build');
const indexPath = path.resolve(SPA_ROOT, 'index.html');
if (indexPath) {
  console.log(`SPA index at: ${indexPath}`);
  if (!fs.existsSync(indexPath)) {
    console.error("Can't find SPA static files. Exiting.");
    process.exit(1);
  }
}

// Serve SPA files
app.use(express.static(SPA_ROOT));

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
  db.User.findOrCreate({
    where: {
      id: user.sub
    },
    defaults: {
      name_first: user.given_name,
      name_last: user.family_name,
    }
  });
  res.send(user);
});

router.post('/check_user', function(req, res) {
   db.User.findAll({
    where: {
      id: req.body.userid,
    },
  }).then(users => {
     if(users.length > 0){
       res.send({isuser: true,
         fname: users[0].dataValues.name_first})
     }else{
       res.send({isuser: false})
     }
   });
});

app.use('/', router);

router.get('*', (req, res, next) => {
  res.sendFile(SPA_ROOT + '/index.html');
});

app.listen(PORT, function() {
  console.log('Listening on Port ' + PORT);
});

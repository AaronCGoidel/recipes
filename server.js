const express = require('express');
const {OAuth2Client} = require('google-auth-library');
var pg = require('pg');
const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');


var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const app = express();
const router = express.Router();

router.use(cookieParser());


var env = process.env.NODE_ENV || 'development';

if(env === 'production') {
// Serve static file
  app.use(express.static(path.join(__dirname, 'client/build')));
}else{
  require('dotenv').load();
}

const db = require('./models');

// OAuth client ID
const CLIENT_ID = process.env.CLIENT_ID;

// Google auth client
const client = new OAuth2Client(CLIENT_ID);

// Set port
const PORT = process.env.PORT || 8081;

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

router.post('/create_book', function(req, res){
  db.Book.create({
    title: req.body.bookTitle,
    author: req.body.authorId,
    uuid: uuidv1()
  }).then(newBook => {
    db.Book.findAll({
      where: {
        author: newBook.dataValues.author
      }
    }).then(result => res.send(result));
  });
});

router.post('/get_library', function(req, res) {
  db.Book.findAll({
    where: {
      author: req.body.authorId
    }
  }).then(result => res.send(result));
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

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// db.Book.destroy({where: {}});
// db.Book.sync({force:true});
// db.User.sync({force:true});

app.listen(PORT, function() {
  console.log('Listening on Port ' + PORT);
});

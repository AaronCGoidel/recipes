const express = require('express');
const {OAuth2Client} = require('google-auth-library');
var pg = require('pg');
const path = require('path');
const fs = require('fs');
const uuidv1 = require('uuid/v1');


var bodyParser = require('body-parser');

const app = express();
const router = express.Router();


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
    console.log('error validating id token');
    return(false)
  })
}

async function authMiddleware(req, res, next) {
  let user = await verify(req.body.idToken);
  if(user !== false){
    req.user = user;
    next();
  }else {
    console.log("failed");
    res.status(401).send({error: "failed to authenticate"});
  }
}

router.post('/auth', authMiddleware, async function(req, res) {
  db.User.findOrCreate({
    where: {
      id: req.user.sub
    },
    defaults: {
      name_first: req.user.given_name,
      name_last: req.user.family_name,
    }
  });
  res.send({authenticated: true, user: req.user});
});

router.post('/create_book', authMiddleware, function(req, res){
  db.Book.create({
    title: req.body.bookTitle,
    author: req.user.sub,
    uuid: uuidv1()
  }).then(newBook => {
    db.Book.findAll({
      where: {
        author: newBook.dataValues.author
      }
    }).then(result => res.status(201).send(result));
  });
});

router.post('/get_library', authMiddleware, function(req, res) {
  db.Book.findAll({
    where: {
      author: req.body.authorId
    }
  }).then(result => res.send(result));
});

router.post('/get_user', function(req, res) {
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

router.post('/delete_book', authMiddleware, function(req, res) {
  db.Book.destroy({
    where: {
      uuid: req.body.id
    }
  }).then(e => res.send({deleted: ''}))
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

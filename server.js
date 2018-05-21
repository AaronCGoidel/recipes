const express = require('express');
const {OAuth2Client} = require('google-auth-library');

var bodyParser = require('body-parser');

const app = express();
const router = express.Router();


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

// Print request methods
router.use(function(req, res, next) {
  console.log('/' + req.method);
  next();
});


// VERIFY GOOGLE USER TOKEN
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  return await userid
}

router.post('/auth', async function(req, res) {
  await verify(req.body.idToken).catch(console.error);
});

app.use('/', router);

app.listen(PORT, function() {
  console.log('Listening on Port ' + PORT);
});

`use strict`;

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://nerdygerdy.auth0.com/.well-known/jwks.json"
  }),
  audience: "http://www.afterbootcamp.com",
  issuer: "https://nerdygerdy.auth0.com/",
  algorithms: ['RS256']
});

app.get('/api/user/data', authCheck, (req, res) => {
  console.log(req.body);
  let UserData = ["This is the user's data","It's pretty sweet"];
  res.json(UserData);
})

app.listen(3333);
console.log('Listening on a localhost:3333');

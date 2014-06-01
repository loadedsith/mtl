// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var passport = require('passport');
var Twit = require('twit');

var T = new Twit({
    consumer_key:         process.env.consumer_key
  , consumer_secret:      process.env.consumer_secret
  , access_token:         process.env.access_token
  , access_token_secret:  process.env.access_token_secret
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var UserAppStrategy = require('passport-userapp').Strategy;
passport.use(new UserAppStrategy({
        appId: '52e1ce7391e02'
    },
    function (userprofile, done) {
        Users.findOrCreate(userprofile, function(err,user) {
            if(err) return done(err);
            return done(null, user);
        });
    }
));
// var mongoose   = require('mongoose');
// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database



var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {

  T.get('search/tweets', { q: req.query.tag + ' since:2011-11-11', count: 100 }, function(err, data, response) {
    res.jsonp(data||'');
  })
});

// more routes for our API will happen here
app.post('/api/call', passport.authenticate('userapp'),
  function(req, res) {
    // Return some relevant data, for example the logged in user, articles, etc.
    res.send({ user: req.user });
  });
  
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/', express.static(__dirname + '/'));


// START THE SERVER
// =============================================================================

app.listen(port);

console.log('Magic happens on port ' + port);
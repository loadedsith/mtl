// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var Twit = require('twit');
var path = require('path');
var cookieParser = require('cookie-parser');
var _ = require('underscore');
var jade = require('jade');

var passport = require('passport');
var UserAppStrategy = require('passport-userapp').Strategy;
var users = [];


// Passport session setup
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new UserAppStrategy({
        appId: '52e1ce7391e02'
    },
    function (userprofile, done) {
      process.nextTick(function () {
        var exists = _.any(users, function (user) {
            return user.id == userprofile.id;
        });
    
        if (!exists) {
            users.push(userprofile);
        }

        return done(null, userprofile);
      });
    }
  ));
  
var T = new Twit({
    consumer_key:         process.env.consumer_key
  , consumer_secret:      process.env.consumer_secret
  , access_token:         process.env.access_token
  , access_token_secret:  process.env.access_token_secret
});

console.log('process.env', process.env);
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());


// var mongoose   = require('mongoose');
// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database



var port = process.env.PORT || 8080; 		// set our port
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', passport.authenticate('userapp'), function(req, res) {
  T.get('search/tweets', { q: req.query.tag + ' since:2011-11-11', count: 100, offset:50 }, function(err, data, response) {
    res.jsonp(data||'');
  })
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

var routes = {};

app.set('view engine', 'jade');

// routes.index = function(req, res){
  // res.render('index');
  // res.render('index.html');
// };

// routes.views = function (req, res) {
//   var name = req.params.name;
//   res.render('views/' + name);
// };

// app.use(express.static(path.join(__dirname, 'js')));
// app.use(express.static(path.join(__dirname, 'css')));
// app.use(express.static(path.join(__dirname, 'bower_components')));
// app.use(express.static(path.join(__dirname, 'placeholders')));
// app.use(express.static(path.join(__dirname, 'views')));
// 
app.use('/api', router);

app.get('*', express.static(path.join(__dirname, '/')));


// START THE SERVER
// =============================================================================

app.listen(port);

console.log('Magic happens on port ' + port);
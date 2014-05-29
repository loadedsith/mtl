// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var Twit = require('twit');

var T = new Twit({
})

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());


// var mongoose   = require('mongoose');
// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database



var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  
  
  
  console.log(['req', req]);
  T.get('search/tweets', { q: req.query.tag + ' since:2011-11-11', count: 100 }, function(err, data, response) {
              
    res.jsonp(data);
  })
  
  
  
  
	
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
(function() {

	'use strict';
	// server.js

	// BASE SETUP
	// ======================

	// call the packages we need

	var express = require('express'); // call express
	var app = express(); // define our app using express
	var bodyParser = require('body-parser'); // Intercepting the requests, parsing the request body and then populating it in the node.js’s req object

	// Routes callback
	var farmers = require(__dirname + '/js/routes/farmers');

	// configure app to use bodyParser()
	// this will let us get the data from a POST
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	var port = process.env.PORT || 8080; // set our port

	// ROUTE FOR OU API
	// ======================
	var router = express.Router(); // get an instance of the express Router

	// middleware to use for all requests
	router.use(function(req, res, next) {
		// do logging
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
		res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Content-Length, X-Requested-With");
		console.log('Request on route ' + req.originalUrl);
		next(); // make sure we o to the next routes and don't stop here
	});

	// test route to make sure everythinf is working (accessed at GET http://localhost:8080/)
	router.get('/', function(req, res) {
		res.json({
			message: 'Server is up!'
		});
	});

	// more routes for our API will happen 
	router.route('/farmers')
		// create a farmer (accessed at POST http://localhost:8080/api/farmers)
		.post(farmers.addFarmer)
		// get all the farmers (accessed at GET http://localhost:8080/api/farmers)
		.get(farmers.findAll);

	router.route('/farmers/:id')
		// get the farmer with that id (accessed at GET http://localhost:8080/api/farmers/:id)
		.get(farmers.findFarmer)
		// update a farmer (accessed at PUT http://localhost:8080/api/farmers/:id)
		.put(farmers.updateFarmer)
		// delete a farmer (accessed at DELETE http://localhost:8080/api/farmers/:id)
		.delete(farmers.deleteFarmer);

	router.route('/farmers/:id/livestock')
		// create a cow for a farmer (accessed at POST http://localhost:8080/api/farmers/:id/cows)
		.post(farmers.addCow);

	// REGISTER OUR ROUTES
	// all of our routes will be prefixed with /api
	app.use('/api', router);

	// START THE SERVER
	// ======================
	app.listen(port);
	console.log('Server started on port ' + port);

})();
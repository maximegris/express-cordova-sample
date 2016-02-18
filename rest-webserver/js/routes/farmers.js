/**
* @fileOverview Database operation on farmer resources.
* @author <a href="mailto:maxime.gris@gmail.com">Maxime GRIS</a>
* @version 1.0.0
*/
(function() {

	'use strict';

	var message = require(__dirname + '/../message');
	var database = require(__dirname + '/../database');
	var collection = database.getCollection('farmers');

	module.exports = {
		findAll : findAll,
		addFarmer : addFarmer, 
		findFarmer : findFarmer,
		updateFarmer : updateFarmer,
		deleteFarmer : deleteFarmer,
		addCow : addCow
	};

	/**
    * Find all the farmers.
    * @param {Object} The http Request
    * @param {Object} The http response
    */
    function findAll(req, res) {

    	var result = [];

    	var cursor = collection.find({})
    	.sort( { 
    		name : 1 
    	});

    	// Loop on cursor
    	cursor.each(function(err, doc) {   		
    		if (doc) {
    			result.push(doc);
    		} else {
    			res.json(message(result, err));
    		}
    	});
    }

	/**
    * Add a new farmer.
    * @param {Object} The http Request
    * @param {Object} The http response
    */
    function addFarmer(req, res) {

    	var farmer = req.body;
    	var newId = new database.ObjectID();

    	collection.insert({ 
    		_id : newId,
			firstname : farmer.firstname,
    		lastname : farmer.lastname, 
    		age : farmer.age, 
			infos : farmer.infos,
    		farm : farmer.farm,
    		livestock : farmer.livestock
    	}, 
    	function(err, result) {
    		_findFarmerById(newId, res);
    	});

    }

	/**
    * Find a farmer by his ID.
    * @param {Object} The http Request
    * @param {Object} The http response
    */
    function findFarmer(req, res) {
    	_findFarmerById(new database.ObjectID(req.params.id), res);
    }

	/**
    * Update a farmer.
    * @param {Object} The http Request
    * @param {Object} The http response
    */
    function updateFarmer(req, res) {

    	var farmer = req.body;

    	collection.update({ 
    		_id : req.params.id 
    	},
    	{ 
			firstname : farmer.firstname,
    		lastname : farmer.lastname, 
    		age : farmer.age, 
			infos : farmer.infos,
    		farm : farmer.farm,
    		livestock : farmer.livestock
    	}, 
    	function(err, result) {
    		_findFarmerById(new database.ObjectID(req.params.id), res);
    	});
    }

	/**
    * Delete a farmer.
    * @param {Object} The http Request
    * @param {Object} The http response
    */
    function deleteFarmer(req, res) {

    	collection.remove({ 
    		_id : req.params.id
    	}, 
    	function(err, result) {
    		res.json(message({ result : result}, err));
    	});

    }

    /**
    * Add a new cow.
    * @param {Object} The http Request
    * @param {Object} The http response
    */
    function addCow(req, res) {

    	var farmer = req.body;

    	collection.update.update({ 
    		_id : req.params.id
    	},
    	{
    		$set: {
    			livestock: req.body.livestock
    		},
    		$currentDate: { lastModified: true }
    	}, 
    	function(err, result) {
    		_findFarmerById(new database.ObjectID(req.params.id), res);
    	});

    }

    /**
    * Find a farmer by his ID (private function - factorisation).
    * @param {Object} The object ID
    * @param {Object} The http response
    */
    function _findFarmerById(id, res) {

    	collection.findOne({ 
    		_id : id 
    	}, 
    	function(err, result) {
    		res.json(message(result, err));
    	});
    }

})();
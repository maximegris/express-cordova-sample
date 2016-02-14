/**
* @fileOverview Database creation.
* @author <a href="mailto:maxime.gris@gmail.com">Maxime GRIS</a>
* @version 1.0.0
*/
(function() {

	'use strict';

	var engine = require('tingodb')();

	// TingoDB (NodeJS filesystem database based on MongoDB API)
	var db;
	var collection;

	module.exports = {
		getCollection : getCollection,
		ObjectID : engine.ObjectID
	};

	/**
    * Get the database collection (create if not exists)
    * @param {String} The name of the collection
    */
	function getCollection(name) {

		if(!db) {
			db = new engine.Db('C:/Temp/rest-webserver-test', {});
			collection = db.collection(name);
		}

		return collection;
	}

})();
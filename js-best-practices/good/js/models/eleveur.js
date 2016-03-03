(function(models, undefined) {
	"use strict";

	/**
	* Représente un éleveur.
	* @constructor
	* @param {string} name - Le prénom de l'éleveur
	* @param {string} lastname - Le nom de l'éleveur 
	* @param {number} age - L'age de l'éleveur
	*/
	models.Eleveur = function(name, lastname, age) {

		var self = this;
		self.name = name;
		self.lastname = lastname;
		self.age = age;
		self.farm = {
			address : "",
			city : "",
			postal : ""
		};

		return self;

	};


    /**
    * Retourne le nom complet de l'éleveur.
	*
    * @return {string} Le nom complet de l'éleveur
    */
	models.Eleveur.prototype.fullName = function() {
		// Si le prénom est présent
		if (this.name) {
			// Si le nom est présent
			if (this.lastname) {
				return this.name + ' ' + this.lastname;
			}
		}
		return '';
	};

    /**
    * Retourne l'adresse complete de l'éleveur.
	*
    * @param {string} pAddress - L'adresse de l'éleveur
    * @param {string} pCity - La ville de l'éleveur
    * @param {string} pPostal - le code postal de l'éleveur
    * @return {Point} La chaine de caractère de ces informations
    */
	models.Eleveur.prototype.setFarm = function(pAddress, pCity, pPostal) {

		var _that = this;

		_that.farm.address = pAddress;
		_that.farm.city = pCity;
		_that.farm.postal = pPostal;

		return _that.farm.address + ' - ' + _that.farm.postal + ' ' + _that.farm.city;
	};

}(window.models = window.models || {}));
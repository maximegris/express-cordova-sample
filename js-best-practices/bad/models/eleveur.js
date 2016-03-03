"use strict";

function Eleveur(name, lastname, age) {
	this.name = name;
	this.lastname = lastname;
	this.age = age;
	this.farm = {};

}

Eleveur.prototype.fullName = function() {
	if (this.name) {
		if (this.lastname) {
			return this.name + ' ' + this.lastname;
		}
	}
	return '';
};

Eleveur.prototype.setFarm = function(pAddress, pCity, pPostal) {
	this.farm.address = pAddress;
	this.farm.city = pCity;
	this.farm.postal = pPostal;

	return this.farm.address + ' - ' + this.farm.postal + ' ' + this.farm.city;
};
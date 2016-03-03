"use strict";

var maxime = new Eleveur('Maxime', 'GRIS', 29);
var pierre = new Eleveur('Pierre', 'DUPOND', 27);
var laurent = new Eleveur('Laurent', 'MARTIN', 32);

var vaches = [];

for (var x = 500; x >= 0; x--) {
	vaches[x] = "Vache Numéro " + x;
}

// Evaluation du code javascript

if (maxime.age === 29) {

	var eleveurDOM = 'Eleveur : ' + maxime.fullName();
	eleveurDOM += ' <div>' + maxime.setFarm('2 rue de la volga', 'CARQUEFOU', '44470') + '</div>';

	document.getElementById('eleveur1').innerHTML += eleveurDOM;
}

document.getElementById('eleveur2').innerHTML += 'Eleveur : ' + pierre.fullName();
document.getElementById('eleveur3').innerHTML += 'Eleveur : ' + laurent.fullName();

document.getElementById('eleveur3').style.textAlign = "center";

console.time('Toto');

var listeVaches = "";
for (var i = 0; i < vaches.length; i++) {
	listeVaches += '<li id="vache-' + i + '">' + vaches[i] + '</li>';
}
document.getElementById('practice-2').innerHTML = listeVaches;
console.timeEnd('Toto');


document.getElementById('practice-2').onmouseover = function(event) {
	var target = event.target || event.srcElement;
	if (target.nodeName === "LI") {
		target.style.backgroundColor = "#3399CC";
	}

};

document.getElementById('practice-2').onmouseout = function(event) {
		var target = event.target || event.srcElement;
	if (target.nodeName === "LI") {
		target.style.backgroundColor = "#FFFFFF";
	}
};


function alertTimeout() {
	alert("Timeout!");
}

document.getElementById('timeout').onclick = function(event) {
	setTimeout(alertTimeout(), 200);
};
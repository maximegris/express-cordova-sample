(function(models, utils, undefined) {

	"use strict";

	// Création du composant qui manipulera les balises HTML
	var HTMLElement = new utils.HTMLElement();

	// Création des éleveurs
	var eleveur_maxime = new models.Eleveur('Maxime', 'GRIS', 29);
	var eleveur_pierre = new models.Eleveur('Pierre', 'DUPOND', 27);
	var eleveur_laurent = new models.Eleveur('Laurent', 'MARTIN', 32);

	// Si l'age de Maxime est égal à 29, on l'ajoute au DOM

	if (eleveur_maxime.age === 29) {
		var eleveurDOM = 'Eleveur : ' + eleveur_maxime.fullName();
		eleveurDOM += ' <div>' + eleveur_maxime.setFarm('2 rue de la volga', 'CARQUEFOU', '44470') + '</div>';
		document.getElementById('eleveur1').innerHTML = eleveurDOM;
	}

	// On ajoute les 2 autres éleveurs au DOM
	document.getElementById('eleveur2').innerHTML += 'Eleveur : ' + eleveur_pierre.fullName();
	document.getElementById('eleveur3').innerHTML += 'Eleveur : ' + eleveur_laurent.fullName();

	// Création des vaches
	var vaches = [];

	console.time("timeBoucle");
	// On ajoute 501 vaches à la liste
	for (var x = 500; x >= 0; x--) {

		vaches[x] = "Vache Numéro " + x;

	}
	console.timeEnd("timeBoucle");

	// On ajoute les vaches au DOM
	var vacheTabDOM = "";
	for (var i = 0; i < vaches.length; i++) {
		vacheTabDOM += '<li id="vache-' + i + '">' + vaches[i] + '</li>';
	}

	// Si l'objet crée précédement est non vide, on l'ajoute au DOM
	if (vacheTabDOM) {
		document.getElementById('practice-2').innerHTML = vacheTabDOM;

		// On ajoute les évènements mouseover et mouseout si la liste
		// et on fonctionne en délégation d'évènement sur les élements de cette liste

		HTMLElement.addEvent('practice-2', 'mouseover', function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;

			// Si on passe sur le LI, on ajoute la classe .over
			if (target.nodeName === "LI") {
				HTMLElement.addClass(target, "over");
			}
		});

		HTMLElement.addEvent('practice-2', 'mouseout', function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;

			// Si on quitte le LI, on enlève la classe .over
			if (target.nodeName === "LI") {
				HTMLElement.removeClass(target, "over");
			}
		});

	}

	// Fonction de timeout
	function timeout() {
		alert("Timeout!");
	}

	// Ajoute un évènement sur le bouton
	HTMLElement.addEvent('timeout', 'click', function(event) {
		// Affiche une alerte au bout de 200 ms
		setTimeout(timeout(), 200);
	});

}(window.models, window.utils));
"use strict";

function InitController() {

    var self = this;


    /**
     * Init the controller
     * @method init
     */
     self.init = function() {
        this.changePage('#Home', 'fade');
    };

    /**
     * Fait une demande de changement de page
     
     * @method changePage
     * @param {String} Ptmpl Le template jqm à charger
     * @param {String} pTransition La transistion lors du changement de page
     */
     self.changePage = function(Ptmpl, pTransition, pData) {

        //go to farmers page now
        $(":mobile-pagecontainer").pagecontainer("change", Ptmpl, {
            transition: pTransition,
            data: (pData ? pData : "")

        });

    };

}

function HomeController() {

    var self = this;


    /**
     * Initialisation du controller
     * @method init
     */
     self.init = function() {

        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');        

        // Cache le header
        $("header").addClass("invisible");

        // TODO Exercice 5 
        // Cacher le footer et vide le template

        // Affiche le contenu de la page (évite le flick)
        $("#main").removeClass("invisible");

        // TODO Exercice 6
        // Attacher un évènement sur le bouton pour ouvrir la page de la liste des éleveurs
        $("#farmers").on('click', function(event) {
            self.changePage("#FarmersList", "fade");
        });
    };

    /**
     * Fait une demande de changement de page
     
     * @method changePage
     * @param {String} Ptmpl Le template jqm à charger
     * @param {String} pTransition La transistion lors du changement de page
     */
     self.changePage = function(Ptmpl, pTransition, pData) {

        //go to farmers page now
        $(":mobile-pagecontainer").pagecontainer("change", Ptmpl, {
            transition: pTransition,
            data: (pData ? pData : "")

        });

    };

}

function FarmersListController() {

    var self = this;

    /**
     * Init the controller
     * @method init
     */
     self.init = function() {

        // TODO Exercice 7 
        // Afficher les boutons Retour et de la modal d'info dans le header

        //TODO Exercice 8 
        // Ajouter un bouton dans le footer pour créer / modifier un éleveur
        // Evènement click sur le boutton du footer ouvre une nouvelle page de détail pour créer un éleveur

        this.load();
    };


    self.load = function() {
        var _that = this;

        // TODO Exercice 9 
        //Charger liste des éleveurs par Ajax
        _that.fncDisplayFarmers(undefined);

    };

    self.fncDisplayFarmers = function(farmers) {

        // TODO Exercice 9 
        // Ajouter les éleveurs dans la liste
        // Construire le template

        //TODO Exercice 10 
        // Ajouter suppression sur le swipe d'un élément

        //TODO Exercice 11 (plugin cordova)
        // Ajouter ouverture téléphone sur le clic de l'image

    };

    /**
     * Fait une demande de changement de page
     
     * @method changePage
     * @param {String} Ptmpl Le template jqm à charger
     * @param {String} pTransition La transistion lors du changement de page
     */
     self.changePage = function(Ptmpl, pTransition, pData) {

        //go to farmers page now
        $(":mobile-pagecontainer").pagecontainer("change", Ptmpl, {
            transition: pTransition,
            data: (pData ? pData : "")

        });

    };

}

function ModalInfoController() {

    var self = this;

    self.init = function() {

    };

}
(function(controllers, $, undefined) {
    "use strict";
    controllers.HomeController = function() {

        var self = this;

        $.extend(self, new controllers.MixinController());

        self._openFarmerList = function(event) {
            self.changePage('farmers_list.html', 'fade');
        };
    };

    /**
     * Init the controller
     * @method init
     */
    controllers.HomeController.prototype.init = function() {

        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        // Attacher un évènement sur l'id farmers
        this.attachEvents('#farmers', 'click', this._openFarmerList);

        // Affiche le contenu de la page (évite le flick)
        $("#main").removeClass("invisible");

    };

})(window.controllers = window.controllers || {}, $);
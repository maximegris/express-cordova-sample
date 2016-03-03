(function(controllers, $, undefined) {
    "use strict";

    controllers.ModalInfoController = function() {

        var self = this;

        $.extend(self, new controllers.MixinController());

    };

    /**
     * Init the controller
     * @method init
     */
    controllers.ModalInfoController.prototype.init = function() {

    };

})(window.controllers = window.controllers || {}, $);
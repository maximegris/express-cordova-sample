(function(controllers, $, undefined) {
    "use strict";

    controllers.InitController = function() {

        var self = this;

        $.extend(self, new controllers.MixinController());

    };

    /**
     * Init the controller
     * @method init
     */
    controllers.InitController.prototype.init = function() {
        this.changePage('tmpl/home.html', 'fade');
    };

})(window.controllers = window.controllers || {}, $);
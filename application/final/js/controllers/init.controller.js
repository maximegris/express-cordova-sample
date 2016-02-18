(function(controllers, $, undefined) {
    "use strict";

    controllers.InitController = function() {

        var self = this;

        $.extend(self, new controllers.CommonController());

    };

    /**
     * Init the controller
     * @method init
     */
    controllers.InitController.prototype.init = function() {

       // $(document).ready(function() {
            this.changePage('tmpl/home.html', 'fade');
       // });

    };

})(window.controllers = window.controllers || {}, $);
(function(mgr, $, undefined) {
    "use strict";

    mgr.common = mgr.common || {};

    mgr.common.Router = function() {

        var router = this;

        /**
         * Array of routes.
         * A route is defined by { pattern : pattern, handler: handler }
         */
         //TODO Exercice 12 Ajouter les controller en fonction des routes
        this.routes = [{
            pattern: 'Init',
            handler: new InitController()
        }, {
            pattern: 'ModalInfo',
            handler: new ModalInfoController()
        }, {
            pattern: 'Home',
            handler: new HomeController()
        }, {
            pattern: 'FarmersList',
            handler: new FarmersListController()
        }];
    };

    /**
     * Add a route
     * @method addRoute
     * @param {String} pattern regular expression of condition to access the route.
     * @param {Function} handler for this route
     */
    mgr.common.Router.prototype.addRoute = function(pattern, handler) {
        this.routes.push({
            pattern: pattern,
            handler: handler
        });
        return this;
    };

    /**
     * To purge the routes
     */
    mgr.common.Router.prototype.reset = function() {
        this.routes = [];
    };

    /**
     * Process the route to find a match and exec the associated handler
     * @method navigate
     * @param {String} route The route to evaluate
     */
    mgr.common.Router.prototype.navigate = function(route) {
        var i, match;

        for (i = 0; i < this.routes.length; i++) {
            match = route.match(this.routes[i].pattern);

            if (match) {
                match.shift();
                this.routes[i].handler.init();
                return true;
            }
        }
        return false;
    };

})(window.mgr = window.mgr || {}, $);
(function(mgr, $, undefined) {
    "use strict";

    mgr.common = mgr.common || {};

    mgr.common.Router = function() {

        var router = this;

        /**
         * Array of routes.
         * A route is defined by { pattern : pattern, handler: handler }
         */
        this.routes = [{
            pattern: 'Init',
            handler: new controllers.InitController()
        }, {
            pattern: 'Home',
            handler: new controllers.HomeController()
        }, {
            pattern: 'FarmersList',
            handler: new controllers.FarmersListController()
        }, {
            pattern: 'FarmerInfo',
            handler: new controllers.FarmerInfoController()
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
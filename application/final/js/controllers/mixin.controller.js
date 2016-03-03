(function(controllers, $, undefined) {
    "use strict";
    controllers.MixinController = function() {
        var self = this;
    };

    /**
     * Fait une demande de changement de page
     
     * @method changePage
     * @param {String} Ptmpl Le template jqm à charger
     * @param {String} pTransition La transistion lors du changement de page
     */
    controllers.MixinController.prototype.changePage = function(Ptmpl, pTransition, pData) {

        //go to farmers page now
        $(":mobile-pagecontainer").pagecontainer("change", Ptmpl, {
            transition: pTransition,
            data: (pData ? pData : "")

        });

    };


    controllers.MixinController.prototype.getURLParameter = function(name) {

        var res = decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(window.location.href) || [, null])[1]);

        return (res === "null" ? null : res);
    };


    /**
     * Execute l'appel ajax avec config POST + JSON
     * et retourne l'objet jQuery XMLHttpRequest (jqXHR)
     * @method postJson
     * @param {String} id L'identifiant du selecteur Jquery
     * @param {String} type Le type d'évenement à binder
     * @param {Function} callback La fonction de callback
     * @param {String} id L'identifiant du selecteur sur lequel appliquer la délégation
     */
    controllers.MixinController.prototype.attachEvents = function(id, type, callback, selector) {

        if ($(id) && $(id).length > 0) {
            if(selector) {
                $(id).off(type, selector).on(type, selector, callback);
            } else {
                $(id).off(type).on(type, callback);
            }
            
        }
    };

    controllers.MixinController.prototype.clearInputs = function(parent) {
        $(parent + ' input[type!="button"]').each(function() {
            $(this).val("");
        });

    };

    controllers.MixinController.prototype.validateForm = function(id, validator) {

        var $inputs = $(id).find("input");
        var valid = true;
        
        $inputs.each(function() {
            if (!validator.element(this) && valid) {
                valid = false;
            }
        });

        if (valid) {
            return true;
        } else {
            // Sinon on affiche un toast
            if (window.cordova) {
                window.plugins.toast.show('Champs du formulaire invalides !', 'long', 'center', function(a) {});
            } else {
                alert('Champs du formulaire invalides !');
            }
        }
    };

})(window.controllers = window.controllers || {}, $);
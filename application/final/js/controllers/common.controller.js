(function(controllers, $, undefined) {
    "use strict";
    controllers.CommonController = function() {
        var self = this;
    };

    /**
     * Fait une demande de changement de page
     
     * @method changePage
     * @param {String} Ptmpl Le template jqm à charger
     * @param {String} pTransition La transistion lors du changement de page
     */
    controllers.CommonController.prototype.changePage = function(Ptmpl, pTransition, pData) {

        //go to farmers page now
        $(":mobile-pagecontainer").pagecontainer("change", Ptmpl, {
            transition: pTransition,
            data: (pData ? pData : "")

        });

    };


    controllers.CommonController.prototype.getURLParameter = function(name) {

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
     */
    controllers.CommonController.prototype.attachEvents = function(id, type, callback) {

        if ($._data($(id)[0]).events === undefined) {
            $(id).off(type).on(type, callback);
        }
    };

    controllers.CommonController.prototype.flipHeaderButtons = function(btnVisibles) {

        // Si la liste est vide, on cache le heder
        $('#header').removeClass('invisible');

        // On rend tous le boutons invisibles
        $("#header a:not('.invisible')").each(function(index) {
            $(this).addClass("invisible");
        });

        // On affiche que les boutons de l'écran
        $.each(btnVisibles, function(index, value) {
            $("#" + value).removeClass("invisible");
        });

    };

    controllers.CommonController.prototype.changeFooterTemplate = function(visible, tmpl) {

        var _footer = $("footer");
        if (visible && _footer.hasClass("invisible")) {
            _footer.removeClass("invisible");
        } else if (!visible) {
            _footer.addClass("invisible");
        }
        _footer.html(tmpl);

    };

    controllers.CommonController.prototype.clearInputs = function(parent) {
        $(parent + ' input[type!="button"]').each(function() {
            $(this).val("");
        });

    };

})(window.controllers = window.controllers || {}, $);
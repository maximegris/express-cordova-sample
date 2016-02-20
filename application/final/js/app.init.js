(function(mgr, $, undefined) {
    'use strict';

    // Current page displayed
    var current;

    // Router system
    var router = new mgr.common.Router();

    // Fire when the page change
    $(document).on("pagecontainerbeforeshow", function() {

        //our requirement is that data-title is defined for all pages, we will automatically extract it
        var currentPage = $(".ui-page-active").jqmData("title");

        // Change the header
        $("header h1").text(currentPage);

        var controllerCode = $.mobile.activePage[0].id; //we use the id as the convention for control code

        //load page controller based on which controller or page title data-controller avoid Preinit and info pages
        if (current !== controllerCode && router.navigate(controllerCode)) {
            current = $.mobile.activePage[0].id;
        }

    });

    $(document).on("mobileinit", function() {

        //Fastclick
        FastClick.attach(document.body);

        // Toolbar outside the body
        $("[data-role='header'], [data-role='footer']").toolbar({
            theme: "a"
        });

        // Options jqm
        $.mobile.defaultPageTransition = "fade";
        $.mobile.buttonMarkup.hoverDelay = 100;
        $.mobile.pageLoadErrorMessage = "Ne peux pas charger la page";

        //jqm ajax loading of pages
        $.mobile.ajaxEnabled = true;
        $.mobile.linkBindingEnabled = true;
        $.mobile.defaultPageTransition = true;

        // Option event swipe jqm
        $.event.special.swipe.durationThreshold = 2000;
        $.event.special.swipe.horizontalDistanceThreshold = 50;

        // Ne pas garder les pages dans le cache
        $.mobile.page.prototype.options.domCache = false;

        // Page Theme
        $.mobile.page.prototype.options.theme = "a";

        $.mobile.toolbar.prototype.options.theme = "b";

        // Listview heme
        $.mobile.listview.prototype.options.theme = "a";

        // Popup theme
        $.mobile.popup.prototype.options.theme = "a";

        // Options de jqvalidator
        $.validator.setDefaults({
            errorPlacement: function(error, element) {
                // Ne pas afficher le label en cas d'erreur mais bordure rouge sur l'input
                $(element).parent().addClass('error');
            },
            success: function(label) {
                // bordure verte ur l'input
                var element = '#' + label.attr('for');
                $(element).parent().removeClass('error');
            }
        });

        new controllers.InitController().init();

    });

})(window.mgr = window.mgr || {}, $);
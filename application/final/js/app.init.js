(function(mgr, $, undefined) {
    'use strict';

    // Current page displayed
    var current;

    // Router system
    var router = new mgr.common.Router();

    $(document).on("mobileinit", function() {

        // Toolbar outside the body
        $("[data-role='header'], [data-role='footer']").toolbar({
            theme: "a"
        });

        $.mobile.defaultPageTransition = "fade";
        $.mobile.buttonMarkup.hoverDelay = 100;
        $.mobile.pageLoadErrorMessage = "Ne peux pas charger la page";

        //jqm ajax loading of pages
        $.mobile.ajaxEnabled = true;
        $.mobile.linkBindingEnabled = true;
        $.mobile.defaultPageTransition = true;

        //keep pages in cache
        $.mobile.page.prototype.options.domCache = false;

        // Theme
        $.mobile.page.prototype.options.theme = "a";
        $.mobile.page.prototype.options.backBtnTheme = "a";
        $.mobile.page.prototype.options.headerTheme = "a";
        $.mobile.page.prototype.options.contentTheme = "a";
        $.mobile.page.prototype.options.footerTheme = "a";
        $.mobile.listview.prototype.options.headerTheme = "a";
        $.mobile.listview.prototype.options.theme = "a";
        $.mobile.listview.prototype.options.dividerTheme = "a";

        $.mobile.listview.prototype.options.splitTheme = "a";
        $.mobile.listview.prototype.options.countTheme = "a";
        $.mobile.listview.prototype.options.filterTheme = "a";

        $.validator.setDefaults({
            errorPlacement: function(error, element) {
                error.appendTo(element.parent().parent().after());
            }
        });

        router = new mgr.common.Router();

        // Fire when the page change
        $(document).on("pagecontainerchange", function() {

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
    });

})(window.mgr = window.mgr || {}, $);
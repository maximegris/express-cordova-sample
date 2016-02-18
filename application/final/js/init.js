(function(mgr) {
    "use strict";

    // Set des variables globales (google et http)
    window.google = window.google || {};
    window.http = window.http || new mgr.common.AjaxManager();

    var jqmReady = $.Deferred();
    var pgReady = $.Deferred();

    var app = {
        //Callback for when the app is ready
        callback: null,
        //Flag for separating web and PhoneGap environments
        isWeb: true,
        // Application Constructor
        initialize: function() {
            var self = this;
            //This session storage key-value can be set in a web page to separate environments  
            if (!sessionStorage.getItem("isWeb")) {
                console.log("Is not web.");
                self.isWeb = false;
                self.bindEvents();
            } else {
                console.log("Is web.");

                //In case of web we ignore PG but resolve the Deferred Object to trigger initialization
                // timeout pour simuler deviceready
                setTimeout(function() {
                    self.loadMapsApi();
                    pgReady.resolve();
                }, 2000);

            }
        },
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        onDeviceReady: function() {
            // The scope of 'this' is the event, hence we need to use app.
            app.receivedEvent('deviceready');
        },

        receivedEvent: function(event) {
            switch (event) {
                case 'deviceready':

                    // Quirk Windows Phone 7 & 9
                    window.confirm = navigator.notification.confirm;

                    document.addEventListener("backbutton", this.onBackKeyDown, false);
                    document.addEventListener("online", this.onOnline, false);
                    document.addEventListener("resume", this.onResume, false);
                    this.loadMapsApi();
                    pgReady.resolve();

                    break;
            }
        },

        onBackKeyDown: function() {

            var active_page = $(":mobile-pagecontainer").pagecontainer("getActivePage");
            var id = active_page.page().attr('id');
            if (id === 'Home') {

                navigator.notification.confirm(
                    'Souhaitez-vous quitter l\'application?',
                    function confirmCallback(buttonIndex) {
                        if (buttonIndex === 1) {
                            navigator.app.exitApp();
                            return true;
                        } else {
                            return false;
                        }
                    },
                    'Ne partez pas!', ['Oui', 'Non']
                );
            } else {
                navigator.app.backHistory();
            }
        },

        onOnline: function() {
            alert("online!");
            this.loadMapsApi();
        },

        onResume: function() {
            alert("Resume");
            this.loadMapsApi();
        },

        loadMapsApi: function() {

            // Si online et que le js n'a pas été chargé
            if (!this.isWeb && (navigator.connection.type === Connection.NONE || !google.maps)) {
                return;
            }

            $.getScript('https://maps.googleapis.com/maps/api/js?key=API_KEY&sensor=true');
        }

    };

    $(document).on('pageinit', '#Init', function(event) {
        jqmReady.resolve();
    });

    /**
     * General initialization.
     */
    $.when(jqmReady, pgReady).then(function() {
        console.log("Frameworks Ready");
        $(window.document).trigger("mobileinit");
    });

    // Initialisation Callback
    app.initialize();
})(mgr);
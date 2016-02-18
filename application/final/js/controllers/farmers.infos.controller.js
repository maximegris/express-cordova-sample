(function(controllers, $, undefined) {
    "use strict";

    controllers.FarmerInfoController = function() {
        var self = this;

        self.activeTab = 1;

        $.extend(self, new controllers.CommonController());


        self._openTabInfo = function() {
            var id = this.getAttributeNode("id").value;

            self.displayTab(id);
        };

        self._saveFarmerInfo = function() {

            // Si le formulaire est valide, on enregistre
            if (self.validateForm("#FarmerInfoForm")) {

                var id = document.getElementById('_id').value;
                var datas = self.constructFarmerInfoJson();

                // Si on a un ID, c'est que l'on est en modification
                if (id) {
                    http.json("farmers/" + id, "PUT", datas);
                } else {
                    // Sinon en création
                    http.json("farmers", "POST", datas);
                }
            }

        };
    };

    /**
     * Init the controller
     * @method init
     */
    controllers.FarmerInfoController.prototype.init = function() {

        var id = this.getURLParameter("id");

        this.flipHeaderButtons(["headerBack", "headerInfo"]);

        this.changeFooterTemplate(true, '<fieldset> <div><a href="" id="save" class="ui-btn">Enregistrer</a></div> </fieldset>');
        this.attachEvents('#save', 'click', this._saveFarmerInfo);

        this.displayTab("info");

        $("#FarmerInfoForm").validate();

        this.load(id);

        this.attachEvents('#tabs li a', 'click', this._openTabInfo);

    };

    controllers.FarmerInfoController.prototype.load = function(id) {
        var self = this;

        // Si on a un id, c'est que l'on est en modification donc on fait un appel Ajax pour récupérer les informations de l'éleveur
        if (id) {
            http.json("farmers/" + id, "GET")
                .done(function(result) {
                    self.fncDisplayFarmerInfo(result.data);
                });
        }

    };

    controllers.FarmerInfoController.prototype.fncDisplayFarmerInfo = function(farmer) {

        if (farmer) {
            $("#_id").val(farmer._id);
            $("#firstname").val(farmer.firstname);
            $("#lastname").val(farmer.lastname);
            $("#age").val(farmer.age);

            if (farmer.infos) {
                $("#phonenumber").val(farmer.infos.phonenumber);
                $("#mail").val(farmer.infos.mail);
            }

            if (farmer.farm) {

                $("#localisation").val(farmer.farm.localisation);
                $("#postal").val(farmer.farm.postal);
                $("#city").val(farmer.farm.city);

                if (farmer.farm.lat && farmer.farm.lng) {
                    this.initMap(farmer.farm.lat, farmer.farm.lng);
                } else {
                    this.initMap(-34.397, 150.644);
                }
            } else {
                this.initMap(-34.397, 150.644);
            }

        } else {
            this.initMap(-34.397, 150.644);
        }

    };

    controllers.FarmerInfoController.prototype.displayTab = function(id) {

        // Si l'onglet n'est pas visible, c'est qu'il y a une demande de changement d'onglet
        if ($("#tab-" + id).hasClass("invisible")) {
            $("#tab-info").addClass("invisible !important");
            $("#tab-address").addClass("invisible !important");
            $("#tab-livestock").addClass("invisible !important");

            $("#tab-" + id).removeClass("invisible");
        }

        // Initilisation des pages

    };

    controllers.FarmerInfoController.prototype.constructFarmerInfoJson = function() {

        var farmer = {};

        farmer._id = $("#_id").val() ? $("#_id").val() : null;
        farmer.firstname = $("#firstname").val() ? $("#firstname").val() : null;
        farmer.lastname = $("#lastname").val() ? $("#lastname").val() : null;
        farmer.age = $("#age").val() ? $("#age").val() : null;
        farmer.infos = {};
        farmer.infos.phonenumber = $("#phonenumber").val() ? $("#phonenumber").val() : null;
        farmer.infos.mail = $("#mail").val() ? $("#mail").val() : null;
        farmer.farm = {};
        farmer.farm.localisation = $("#localisation").val() ? $("#localisation").val() : null;
        farmer.farm.postal = $("#postal").val() ? $("#postal").val() : null;
        farmer.farm.city = $("#city").val() ? $("#city").val() : null;

        farmer.livestock = [];

        return farmer;
    };

    controllers.FarmerInfoController.prototype.initMap = function(latitude, longitude) {
        if (google.maps) {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: new google.maps.LatLng(latitude, longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                mapTypeControl: false,
                streetViewControl: false
            });
            google.maps.event.trigger(map, "resize");

            var geocoder = new google.maps.Geocoder();

            document.getElementById('submit').addEventListener('click', function() {
                this.geocodeAddress(geocoder, map);
            });
        }
    };

    controllers.FarmerInfoController.prototype.geocodeAddress = function(geocoder, resultsMap) {
        var address = document.getElementById('search').value;
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };


})(window.controllers = window.controllers || {}, $);
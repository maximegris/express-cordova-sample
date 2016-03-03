(function(controllers, $, undefined) {
    "use strict";

    controllers.FarmerInfoController = function() {
        var self = this;

        self.activeTab = 1;
        self.validator = null;
        self.current = null;

        $.extend(self, new controllers.MixinController());

        self._openTabInfo = function(event) {
            var id = $(this).attr("id");
            self.displayTab(id);
        };

        self._upperCase = function(event) {
            var _$this = $(this);
            _$this.val(_$this.val().toUpperCase());
        };

        self._saveFarmerInfo = function(event) {

            // Si le formulaire est valide, on enregistre
            if (self.validateForm("#farmer-info-form", self.validator)) {

                var datas = self.constructFarmerInfoJson();

                // Si on a un ID, c'est que l'on est en modification
                if (self.current) {
                    http.json("farmers/" + self.current._id, "PUT", datas);
                } else {
                    // Sinon en création
                    http.json("farmers", "POST", datas).done(function(response) {
                        self.current = response.data;
                    });
                }
            }

        };

        self._getLocation = function(event) {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function onSuccess(position) {
                        alert(position);
                        alert(position.coords);
                        alert(position.coords.latitude);
                        $("#lat").val(position.coords.latitude);
                        $("#lng").val(position.coords.longitude);
                    },
                    // onError Callback receives a PositionError object
                    function onError(error) {
                        alert('code: ' + error.code + ' - ' + 'message: ' + error.message + '\n');
                    }, {
                        maximumAge: 3000,
                        timeout: 5000,
                        enableHighAccuracy: true
                    });
            }
        };

        self._findContact = function(event) {
            if (navigator.contacts) {
                navigator.contacts.pickContact(function(contact) {
                    alert(JSON.stringify(contact));
                    $("#firstname").val(contact.givenName);
                    $("#lastname").val(contact.famillyName);

                    if (contact.phoneNumbers) {
                        $("#phonenumber").val(contact.phoneNumbers[0].value);
                    }
                    if (contact.emails) {
                        $("#mail").val(contact.mails[0].value);
                    }

                }, function(err) {
                    console.log('Error: ' + err);
                });
            }
        };

        self._initAddCowPopup = function(event, ui) {
            $("#cow-type").val("");
            $("#cow-name").val("");
        };

        self._saveCowInfo = function(event) {

            var datas = self.constructNewCowJson();
            http.json("farmers/" + self.current._id + "/livestock", "POST", datas).done(function(response) {
                this.load(self.current._id);
                $("#add-cow").popup("close");
            });
        };
    };

    /**
     * Init the controller
     * @method init
     */
    controllers.FarmerInfoController.prototype.init = function() {

        var id = this.getURLParameter("id");

        this.displayTab("info");

        this.validator = $("#farmer-info-form").validate({
            rules: {
                firstname: "required",
                lastname: "required",
                age: "required",
                phonenumber: "required",
                mail: {
                    required: true,
                    email: true
                },
                localisation: "required",
                postal: "required",
                city: "required"
            },
            ignore: []
        });

        this.load(id);

        this.attachEvents('#tabs', 'click', this._openTabInfo, 'a');
        this.attachEvents('#get-geoloc', 'click', this._getLocation);
        this.attachEvents("#find-contact", 'click', this._findContact);
        this.attachEvents('#save-farmer', 'click', this._saveFarmerInfo);
        this.attachEvents("#save-cow", 'click', this._saveCowInfo);
        this.attachEvents('#lastname', 'blur', this._upperCase);
        this.attachEvents('#city', 'blur', this._upperCase);
        this.attachEvents("#add-cow", "popupbeforeposition", this._initAddCowPopup);


    };

    controllers.FarmerInfoController.prototype.load = function(id) {
        var _that = this;

        // Si on a un id, c'est que l'on est en modification donc on fait un appel Ajax pour récupérer les informations de l'éleveur
        if (id) {
            http.json("farmers/" + id, "GET")
                .done(function(result) {
                    _that.fncDisplayFarmerInfo(result.data);
                });
        } else {
            _that.current = null;
            $("#btn-add-cow").prop('disabled', true).addClass('ui-disabled');
        }

    };

    controllers.FarmerInfoController.prototype.fncDisplayFarmerInfo = function(farmer) {

        if (farmer) {
            this.current = farmer;

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
                    $("#lat").val(farmer.farm.lat);
                    $("#lng").val(farmer.farm.lng);
                }
            }

            var outList = "";

            if (farmer.livestock) {
                var obj = {};

                farmer.livestock.forEach(function(value) {
                    if (obj.hasOwnProperty(value.type)) {
                        obj[value.type].push(value.name);
                    } else {
                        obj[value.type] = [value.name];
                    }
                });

                for (var key in obj) {
                    outList += "<div data-role='collapsible' data-iconpos='right' data-inset='true'>";
                    outList += "<h2>" + key + "</h2>";
                    outList += "<ul data-role='listview' data-theme='b' >";

                    for (var value in obj[key]) {
                        outList += "<li>" + obj[key][value] + "</li>";
                    }

                    outList += "</ul>";
                    outList += "</div>";
                }
            }

            $("#accordion-cows").html(outList).enhanceWithin();

            $("#btn-add-cow").prop('disabled', false).removeClass('ui-disabled');

        } else {
            this.current = null;
            $("#btn-add-cow").prop('disabled', true).addClass('ui-disabled');
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
        farmer.farm.lat = $("#lat").val() ? $("#lat").val() : null;
        farmer.farm.lng = $("#lng").val() ? $("#lng").val() : null;

        // Si on est en modification, on ajoute le livestock sinon on crée la clé de l'objet JSON
        if (this.current) {
            farmer.livestock = this.current.livestock;
        } else {
            farmer.livestock = [];
        }


        return farmer;
    };

    controllers.FarmerInfoController.prototype.constructNewCowJson = function() {

        var farmer = this.current;

        var cow = {
            type: $("#cow-type").val() ? $("#cow-type").val() : null,
            name: $("#cow-name").val() ? $("#cow-name").val() : null
        };

        farmer.livestock.push(cow);

        return farmer;
    };


})(window.controllers = window.controllers || {}, $);
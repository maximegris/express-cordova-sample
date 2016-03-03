(function(controllers, $, undefined) {
    "use strict";

    controllers.FarmersListController = function() {

        var self = this;

        $.extend(self, new controllers.MixinController());

        self._openFarmerInfo = function(event) {
            var arrIdx = this.getAttributeNode("dataIndex").value;

            self.changePage('farmers_infos.html', 'fade', "id=" + arrIdx);
        };

        self._phoneCall = function(event) {

            // Ne pas propager le click sur la ligne de la liste (pour ne pas ouvrir le détail)
            event.stopPropagation();

            var phonenumber = this.getAttributeNode("dataPhone").value;
            
            // Ouvre le clavier d'appel
            document.location.href = 'tel:' + phonenumber;
        };

        self._deleteFarmer = function(event) {

             event.stopPropagation();

            var _that = this;
            var arrIdx = _that.getAttributeNode("dataIndex").value;

            http.json("farmers/" + arrIdx, "DELETE").done(function(result) {
                // On supprime du DOM l'élément

                $(_that).slideUp(300, function(){$(_that).remove();});

            });
        };


        self._addNewFarmer = function(event) {

            self.changePage('farmers_infos.html', 'fade');
        };
    };

    /**
     * Init the controller
     * @method init
     */
    controllers.FarmersListController.prototype.init = function() {


        this.attachEvents('#add-farmer', 'click', this._addNewFarmer);

        this.load();
    };


    controllers.FarmersListController.prototype.load = function() {
        var _that = this;

        http.json("farmers", "GET")
            .done(function(result) {
                _that.fncDisplayFarmers(result.data);
            });
    };

    controllers.FarmersListController.prototype.fncDisplayFarmers = function(farmers) {

        var outList = "",
            farmer;

        if (farmers) {

            for (var i = 0; i < farmers.length; ++i) {
                farmer = farmers[i];
                outList += "<li><a class='ui-btn ui-btn-icon-right ui-icon-edit' dataIndex='" + farmer._id + "'>";
                outList += "<div class='same-line'><img src='../img/phone.png' alt='Call number' class='call' dataPhone='" + farmer.infos.phonenumber + "'/></div>";
                outList += "<div class='same-line'><h2>" + farmer.firstname + " " + farmer.lastname + "</h2> <p>" + farmer.farm.localisation + " - " + farmer.farm.city + "</p></div>";
                outList += "</li>";
            }

        }

        //display
        $("#farmers-list").html(outList).enhanceWithin();

        this.attachEvents('#farmers-list', 'click', this._openFarmerInfo, 'a');

        this.attachEvents('#farmers-list', 'swipe', this._deleteFarmer, 'li');

        this.attachEvents('.call', 'click', this._phoneCall);

    };

})(window.controllers = window.controllers || {}, $);
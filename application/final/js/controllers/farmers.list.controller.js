(function(controllers, $, undefined) {
    "use strict";

    controllers.FarmersListController = function() {

        var self = this;

        self.http = new mgr.common.AjaxManager();


        $.extend(self, new controllers.CommonController());

        self._openFarmerInfo = function() {
            var arrIdx = this.getAttributeNode("dataIndex").value;

            self.changePage('farmers_infos.html', 'fade', "id=" + arrIdx);
        };

        self._addNewFarmer = function() {

            self.changePage('farmers_infos.html', 'fade');
        };
    };

    /**
     * Init the controller
     * @method init
     */
    controllers.FarmersListController.prototype.init = function() {

        this.flipHeaderButtons(["headerInfo"]);

        this.changeFooterTemplate(true, '<fieldset> <div><a href="" id="addFarmer" class="ui-btn">Ajouter un éleveur</a></div> </fieldset>');

        this.attachEvents('#addFarmer', 'click', this._addNewFarmer);

        this.load();
    };


    controllers.FarmersListController.prototype.load = function() {
        var self = this;

        self.http.json("farmers", "GET")
            .done(function(result) {
                self.fncDisplayFarmers(result.data);
            });
    };

    controllers.FarmersListController.prototype.fncDisplayFarmers = function(farmers) {

        var outList = "",
            farmer;

        if (farmers) {

            for (var i = 0; i < farmers.length; ++i) {
                farmer = farmers[i];
                outList += "<li><a class='ui-btn ui-btn-icon-right ui-icon-carat-r' dataIndex='" + farmer._id + "'>";
                outList += "<h2>" + farmer.firstname + "</h2>";
                outList += "<p>" + farmer.age + " </p>";
                outList += "</li>";
            }

        }

        //display
        $("#farmers-list").html(outList);

        this.attachEvents('#farmers-list a', 'click', this._openFarmerInfo);

    };

})(window.controllers = window.controllers || {}, $);
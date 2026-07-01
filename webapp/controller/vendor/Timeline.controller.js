sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/service/vendor/VendorService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, VendorService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.vendor.Timeline", {
        onInit: function () {
            this._oService = new VendorService(this.getOwnerComponent());
            this.getView().setModel(new JSONModel(), "model");
            this.getRouter().getRoute("vendorTimeline").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._sId = oEvent.getParameter("arguments").id;
            var oVendor = this._oService.getById(this._sId);
            if (oVendor) {
                this.getModel("model").setData(oVendor);
            }
        },

        onNavBack: function () {
            this.getRouter().navTo("vendorDetail", { id: this._sId }, true);
        }
    });
});

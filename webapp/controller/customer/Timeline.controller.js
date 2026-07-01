sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/service/customer/CustomerService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, CustomerService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.customer.Timeline", {
        onInit: function () {
            this._oService = new CustomerService(this.getOwnerComponent());
            this.getView().setModel(new JSONModel(), "model");
            this.getRouter().getRoute("customerTimeline").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._sId = oEvent.getParameter("arguments").id;
            var oCustomer = this._oService.getCustomerById(this._sId);
            if (oCustomer) {
                this.getModel("model").setData(oCustomer);
            }
        },

        onNavBack: function () {
            this.getRouter().navTo("customerDetail", { id: this._sId }, true);
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/service/customer/CustomerService",
    "sap/erm/app/service/customer/CustomerValidationService",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, CustomerService, CustomerValidationService, MessageService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.customer.Edit", {
        onInit: function () {
            this._oService = new CustomerService(this.getOwnerComponent());
            this._oValidationService = new CustomerValidationService(this.getOwnerComponent());
            this._oMessageService = new MessageService(this.getOwnerComponent());
            
            this.getView().setModel(new JSONModel(), "model");
            this.getRouter().getRoute("customerEdit").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._sId = oEvent.getParameter("arguments").id;
            var oCustomer = this._oService.getCustomerById(this._sId);
            if (!oCustomer) {
                this._oMessageService.showError("Customer not found.");
                this.onNavBack();
                return;
            }
            this.getModel("model").setData(JSON.parse(JSON.stringify(oCustomer)));
        },

        onNavBack: function () { this.getRouter().navTo("customerDetail", { id: this._sId }, true); },

        onSavePress: function () {
            var oData = this.getModel("model").getData();
            var aAll = this._oService.getAllCustomers(true);
            
            var aErrors = this._oValidationService.validateCustomer(oData, aAll);
            if (aErrors.length > 0) {
                this._oMessageService.showError(aErrors.join("\n"));
                return;
            }

            this._oService.updateCustomer(this._sId, oData).then(function() {
                this._oMessageService.showToast("Customer updated successfully.");
                this.onNavBack();
            }.bind(this));
        }
    });
});

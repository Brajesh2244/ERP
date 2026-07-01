sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/service/customer/CustomerService",
    "sap/erm/app/service/customer/CustomerValidationService",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, CustomerService, CustomerValidationService, MessageService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.customer.Create", {
        onInit: function () {
            this._oService = new CustomerService(this.getOwnerComponent());
            this._oValidationService = new CustomerValidationService(this.getOwnerComponent());
            this._oMessageService = new MessageService(this.getOwnerComponent());
            
            this.getRouter().getRoute("customerCreate").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            this.getView().setModel(new JSONModel({
                companyName: "", legalName: "", email: "", phone: "", primaryContact: "", creditLimit: 0, customerType: "B2B"
            }), "model");
        },

        onNavBack: function () { this.getRouter().navTo("customers", {}, true); },

        onSavePress: function () {
            var oData = this.getModel("model").getData();
            var aAll = this._oService.getAllCustomers(true);
            
            var aErrors = this._oValidationService.validateCustomer(oData, aAll);
            if (aErrors.length > 0) {
                this._oMessageService.showError(aErrors.join("\n"));
                return;
            }

            this._oService.createCustomer(oData).then(function() {
                this._oMessageService.showToast("Customer created successfully.");
                this.onNavBack();
            }.bind(this));
        }
    });
});

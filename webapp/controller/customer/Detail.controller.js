sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/service/customer/CustomerService",
    "sap/erm/app/services/shared/FormatterService",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (BaseController, CustomerService, FormatterService, MessageService, JSONModel, Fragment) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.customer.Detail", {
        formatter: new FormatterService(),
        
        onInit: function () {
            this._oService = new CustomerService(this.getOwnerComponent());
            this._oMessageService = new MessageService(this.getOwnerComponent());
            this.getView().setModel(new JSONModel(), "model");
            
            this.getRouter().getRoute("customerDetail").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._sId = oEvent.getParameter("arguments").id;
            this._loadData();
            var oEventBus = this.getOwnerComponent().getEventBus();
            oEventBus.publish("Customer", "CustomerViewed", { id: this._sId });
        },

        _loadData: function () {
            var oCustomer = this._oService.getCustomerById(this._sId);
            if (!oCustomer) {
                this._oMessageService.showError("Customer not found.");
                this.getRouter().navTo("customers");
                return;
            }
            this.getModel("model").setData(oCustomer);
        },

        onNavBack: function () { this.getRouter().navTo("customers", {}, true); },
        onEditPress: function () { this.getRouter().navTo("customerEdit", { id: this._sId }); },
        onTimelinePress: function () { this.getRouter().navTo("customerTimeline", { id: this._sId }); },

        onDeletePress: function () {
            if (!this._pDeleteDialog) {
                this._pDeleteDialog = Fragment.load({
                    name: "sap.erm.app.fragments.ConfirmDeleteDialog", controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }
            this._pDeleteDialog.then(function(oDialog) { oDialog.open(); });
        },

        onConfirmDelete: function (oEvent) {
            this._oService.deleteCustomer(this._sId).then(function() {
                this._oMessageService.showToast("Customer deleted.");
                this._loadData();
                oEvent.getSource().getParent().close();
            }.bind(this));
        },

        onCancelDelete: function (oEvent) { oEvent.getSource().getParent().close(); },

        onRestorePress: function () {
            this._oService.restoreCustomer(this._sId).then(function() {
                this._oMessageService.showToast("Customer restored.");
                this._loadData();
            }.bind(this));
        }
    });
});

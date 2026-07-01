sap.ui.define([
    "sap/erm/app/core/TransactionDetailController",
    "sap/erm/app/service/sales/SalesService",
    "sap/erm/app/service/core/DocumentApprovalService",
    "sap/ui/model/json/JSONModel"
], function (TransactionDetailController, SalesService, DocumentApprovalService, JSONModel) {
    "use strict";

    return TransactionDetailController.extend("sap.erm.app.controller.sales.Detail", {
        onInitHook: function () {
            this._oService = new SalesService(this.getOwnerComponent());
            this._oApprovalService = new DocumentApprovalService(this.getOwnerComponent());
        },
        getRouteName: function () { return "salesDetail"; },
        getListRouteName: function () { return "sales"; },
        getService: function () { return this._oService; },
        getEntityName: function () { return "Sales Order"; },

        _loadData: function () {
            var oRecord = this.getService().getById(this._sId);
            if (!oRecord) {
                this._oMessageService.showError("Sales Order not found.");
                this.getRouter().navTo(this.getListRouteName());
                return;
            }
            
            // Fetch items using DocumentService
            oRecord.items = this.getService().getItemsByHeaderId(this._sId);
            this.getModel("model").setData(oRecord);
        },

        onSubmitPress: function () {
            this.getService().submit(this._sId).then(function() {
                this._oMessageService.showSuccess("Sales Order submitted for approval.");
                this._loadData();
            }.bind(this));
        },

        onApprovePress: function () {
            this.getService().approve(this._sId).then(function() {
                this._oMessageService.showSuccess("Sales Order approved.");
                this.getOwnerComponent().getEventBus().publish("Sales", "SalesOrderApproved", { id: this._sId });
                this._loadData();
            }.bind(this));
        },
        
        onReservePress: function () {
            this.getService().reserveInventory(this._sId).then(function() {
                this._oMessageService.showSuccess("Inventory reserved successfully.");
                this._loadData();
            }.bind(this));
        }
    });
});

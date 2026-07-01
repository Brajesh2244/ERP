sap.ui.define([
    "sap/erm/app/core/TransactionDetailController",
    "sap/erm/app/service/purchase/PurchaseService",
    "sap/erm/app/service/purchase/GoodsReceiptService",
    "sap/erm/app/service/core/DocumentApprovalService",
    "sap/ui/model/json/JSONModel"
], function (TransactionDetailController, PurchaseService, GoodsReceiptService, DocumentApprovalService, JSONModel) {
    "use strict";

    return TransactionDetailController.extend("sap.erm.app.controller.purchase.Detail", {
        onInitHook: function () {
            this._oService = new PurchaseService(this.getOwnerComponent());
            this._oApprovalService = new DocumentApprovalService(this.getOwnerComponent());
            this._oGoodsReceiptService = new GoodsReceiptService(this.getOwnerComponent());
        },
        getRouteName: function () { return "purchaseDetail"; },
        getListRouteName: function () { return "purchaseList"; },
        getService: function () { return this._oService; },
        getEntityName: function () { return "Purchase Order"; },

        _loadData: function () {
            var oRecord = this.getService().getById(this._sId);
            if (!oRecord) {
                this._oMessageService.showError("Purchase Order not found.");
                this.getRouter().navTo(this.getListRouteName());
                return;
            }
            
            oRecord.items = this.getService().getItemsByHeaderId(this._sId);
            this.getModel("model").setData(oRecord);
        },

        onSubmitPress: function () {
            this.getService().submit(this._sId).then(function() {
                this._oMessageService.showSuccess("Purchase Order submitted for approval.");
                this._loadData();
            }.bind(this));
        },

        onApprovePress: function () {
            this.getService().approve(this._sId).then(function() {
                this._oMessageService.showSuccess("Purchase Order approved.");
                this.getOwnerComponent().getEventBus().publish("Purchase", "PurchaseOrderApproved", { id: this._sId });
                
                // Also mark ready for receipt
                this.getService().markReadyForReceipt(this._sId).then(function() {
                    this._loadData();
                }.bind(this));
            }.bind(this));
        },
        
        onGoodsReceiptPress: function () {
            var oData = this.getModel("model").getData();
            this._oGoodsReceiptService.postReceiptForPO(this._sId, oData.items).then(function() {
                this._oMessageService.showSuccess("Goods Receipt posted successfully. Inventory updated.");
                this.getService().updateTransactionStatus(this._sId, "COMPLETED").then(function() {
                    this._loadData();
                }.bind(this));
            }.bind(this));
        }
    });
});

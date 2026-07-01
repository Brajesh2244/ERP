sap.ui.define([
    "sap/erm/app/integration/BusinessProcessService",
    "sap/erm/app/service/purchase/GoodsReceiptService",
    "sap/erm/app/service/purchase/PurchaseService"
], function (BusinessProcessService, GoodsReceiptService, PurchaseService) {
    "use strict";

    return BusinessProcessService.extend("sap.erm.app.integration.process.ProcureToPayProcess", {
        constructor: function (oComponent) {
            BusinessProcessService.prototype.constructor.call(this, oComponent, "ProcureToPay");
            this._oGoodsReceiptService = new GoodsReceiptService(oComponent);
            this._oPurchaseService = new PurchaseService(oComponent);
        },
        
        processGoodsReceipt: function(sPurchaseOrderId, aItems) {
            var that = this;
            return this.startProcess({ purchaseOrderId: sPurchaseOrderId })
                .then(function() {
                    return that.nextStep("PostGoodsReceipt", { purchaseOrderId: sPurchaseOrderId });
                })
                .then(function() {
                    return that._oGoodsReceiptService.postReceiptForPO(sPurchaseOrderId, aItems);
                })
                .then(function() {
                    return that.nextStep("InventoryUpdate", { purchaseOrderId: sPurchaseOrderId });
                })
                .then(function() {
                    return that.nextStep("FinancialPosting_Placeholder", { purchaseOrderId: sPurchaseOrderId });
                })
                .then(function() {
                    return that.completeProcess({ purchaseOrderId: sPurchaseOrderId, status: "Completed" });
                })
                .catch(function(err) {
                    return that.rollbackProcess({ purchaseOrderId: sPurchaseOrderId }, err);
                });
        }
    });
});

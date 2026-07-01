sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/service/inventory/InventoryService"
], function (BaseService, InventoryService) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.purchase.GoodsReceiptService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oInventoryService = new InventoryService(oComponent);
        },
        postReceiptForPO: function (sPurchaseOrderId, aItems) {
            var oEventBus = this.getComponent().getEventBus();
            
            // Loop through PO items and create inventory receipt
            var aPromises = aItems.map(function(item) {
                // In a real application, the receiving warehouse and inventory ID logic is more complex.
                // Assuming we have an inventory record, or the InventoryService handles it.
                // Here we just publish the EventBus hook and mock the call.
                return this._oInventoryService.postGoodsReceipt("INV_MOCK", item.quantity, sPurchaseOrderId);
            }.bind(this));

            return Promise.all(aPromises).then(function() {
                oEventBus.publish("Purchase", "GoodsReceiptRequested", { purchaseOrderId: sPurchaseOrderId });
                return true;
            });
        }
    });
});

sap.ui.define([
    "sap/erm/app/integration/BusinessProcessService",
    "sap/erm/app/service/inventory/InventoryService",
    "sap/erm/app/service/sales/SalesService"
], function (BusinessProcessService, InventoryService, SalesService) {
    "use strict";

    return BusinessProcessService.extend("sap.erm.app.integration.process.OrderToCashProcess", {
        constructor: function (oComponent) {
            BusinessProcessService.prototype.constructor.call(this, oComponent, "OrderToCash");
            this._oInventoryService = new InventoryService(oComponent);
            this._oSalesService = new SalesService(oComponent);
        },
        
        processApprovedOrder: function(sSalesOrderId) {
            var that = this;
            return this.startProcess({ salesOrderId: sSalesOrderId })
                .then(function() {
                    return that.nextStep("ReserveInventory", { salesOrderId: sSalesOrderId });
                })
                .then(function() {
                    return that._oSalesService.reserveInventory(sSalesOrderId);
                })
                .then(function() {
                    return that.nextStep("FinancialPosting_Placeholder", { salesOrderId: sSalesOrderId });
                })
                .then(function() {
                    return that.nextStep("ReadyForDelivery", { salesOrderId: sSalesOrderId });
                })
                .then(function() {
                    return that.completeProcess({ salesOrderId: sSalesOrderId, status: "Completed" });
                })
                .catch(function(err) {
                    return that.rollbackProcess({ salesOrderId: sSalesOrderId }, err);
                });
        }
    });
});

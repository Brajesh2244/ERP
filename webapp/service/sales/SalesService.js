sap.ui.define([
    "sap/erm/app/core/BaseDocumentService",
    "sap/erm/app/repository/sales/SalesRepository",
    "sap/erm/app/repository/sales/SalesItemRepository",
    "sap/erm/app/service/core/TotalCalculationService",
    "sap/erm/app/service/inventory/InventoryService"
], function (BaseDocumentService, SalesRepository, SalesItemRepository, TotalCalculationService, InventoryService) {
    "use strict";

    return BaseDocumentService.extend("sap.erm.app.service.sales.SalesService", {
        constructor: function (oComponent) {
            BaseDocumentService.prototype.constructor.call(this, oComponent, "salesOrderModel", "salesOrderItemModel");
            this._oRepository = new SalesRepository(oComponent);
            this._oItemRepository = new SalesItemRepository(oComponent);
            this._oTotalCalc = new TotalCalculationService(oComponent);
            this._oInventoryService = new InventoryService(oComponent);
        },
        getAll: function () {
            return this._oRepository.getAll() || [];
        },
        getById: function (sId) {
            return this._oRepository.getById("id", sId);
        },
        reserveInventory: function (sSalesOrderId) {
            var aItems = this.getItemsByHeaderId(sSalesOrderId);
            var oEventBus = this.getComponent().getEventBus();
            
            aItems.forEach(function (item) {
                // In a real scenario we'd lookup the actual inventory ID, 
                // but since items just have product and warehouse, we'd query inventory for it.
                // For mock purposes, just publish event.
                oEventBus.publish("Sales", "InventoryReserved", { salesOrderId: sSalesOrderId, productId: item.productId, quantity: item.quantity });
            });
            return Promise.resolve(true);
        },
        createTransaction: function(oData) {
            var oEventBus = this.getComponent().getEventBus();
            oEventBus.publish("Sales", "SalesOrderCreated", oData);
            return this._oRepository.create(oData); // Needs implementation in Repository if needed, currently Base has it.
        }
    });
});

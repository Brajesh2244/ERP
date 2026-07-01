sap.ui.define([
    "sap/erm/app/core/BaseService", 
    "sap/erm/app/repository/inventory/StockMovementRepository",
    "sap/erm/app/service/core/TransactionNumberService"
], function (BaseService, StockMovementRepository, TransactionNumberService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.inventory.StockMovementService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oRepository = new StockMovementRepository(oComponent);
            this._oNumberService = new TransactionNumberService(oComponent);
        },
        recordMovement: function (sType, sInventoryId, sProductId, iQty, sRef) {
            var sPrefix = "";
            if (sType.indexOf("Receipt") !== -1) sPrefix = "GR";
            else if (sType.indexOf("Issue") !== -1) sPrefix = "GI";
            else if (sType.indexOf("Transfer") !== -1) sPrefix = "TR";
            else sPrefix = "MV";

            var oMovement = {
                id: this._oNumberService.generateNumber(sPrefix),
                type: sType,
                inventoryId: sInventoryId,
                productId: sProductId,
                quantity: iQty,
                date: new Date().toISOString(),
                reference: sRef || "",
                status: "POSTED"
            };
            this._oRepository.create(oMovement);
            return oMovement;
        },
        getByInventoryId: function (sInventoryId) {
            var aData = this._oRepository.getAll() || [];
            return aData.filter(function (m) { return m.inventoryId === sInventoryId; });
        }
    });
});

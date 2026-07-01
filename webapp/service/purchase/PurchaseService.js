sap.ui.define([
    "sap/erm/app/core/BaseProcurementService",
    "sap/erm/app/repository/purchase/PurchaseRepository",
    "sap/erm/app/repository/purchase/PurchaseItemRepository",
    "sap/erm/app/service/core/TotalCalculationService"
], function (BaseProcurementService, PurchaseRepository, PurchaseItemRepository, TotalCalculationService) {
    "use strict";

    return BaseProcurementService.extend("sap.erm.app.service.purchase.PurchaseService", {
        constructor: function (oComponent) {
            BaseProcurementService.prototype.constructor.call(this, oComponent, "purchaseOrderModel", "purchaseOrderItemModel");
            this._oRepository = new PurchaseRepository(oComponent);
            this._oItemRepository = new PurchaseItemRepository(oComponent);
            this._oTotalCalc = new TotalCalculationService(oComponent);
        },
        getAll: function () {
            return this._oRepository.getAll() || [];
        },
        getById: function (sId) {
            return this._oRepository.getById("id", sId);
        },
        markReadyForReceipt: function (sPurchaseOrderId) {
            return this.updateTransactionStatus(sPurchaseOrderId, "Ready For Receipt");
        }
    });
});

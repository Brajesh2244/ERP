sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/repository/inventory/InventoryRepository",
    "sap/erm/app/service/inventory/StockMovementService",
    "sap/erm/app/service/inventory/InventoryValidationService"
], function (BaseService, InventoryRepository, StockMovementService, InventoryValidationService) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.inventory.InventoryService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oRepository = new InventoryRepository(oComponent);
            this._oMovementService = new StockMovementService(oComponent);
            this._oValidation = new InventoryValidationService(oComponent);
        },
        getAll: function () {
            return this._oRepository.getAll() || [];
        },
        getById: function (sId) {
            return this._oRepository.getById("id", sId);
        },
        
        // Goods Receipt (Increase Stock)
        postGoodsReceipt: function (sInventoryId, iQuantity, sReference) {
            var oInventory = this.getById(sInventoryId);
            if (!oInventory) return Promise.reject("Inventory record not found.");
            
            oInventory.availableQuantity += iQuantity;
            this._recalculateStock(oInventory);
            
            var oMovement = this._oMovementService.recordMovement("Goods Receipt", sInventoryId, oInventory.productId, iQuantity, sReference);
            
            this.getComponent().getEventBus().publish("Inventory", "GoodsReceived", { inventoryId: sInventoryId, quantity: iQuantity });
            
            return this._oRepository.update(sInventoryId, oInventory);
        },

        // Goods Issue (Decrease Stock)
        postGoodsIssue: function (sInventoryId, iQuantity, sReference) {
            var oInventory = this.getById(sInventoryId);
            if (!oInventory) return Promise.reject("Inventory record not found.");
            
            var aErrors = this._oValidation.validateIssue(oInventory, iQuantity);
            if (aErrors.length > 0) return Promise.reject(aErrors.join("\n"));
            
            oInventory.availableQuantity -= iQuantity;
            this._recalculateStock(oInventory);
            
            this._oMovementService.recordMovement("Goods Issue", sInventoryId, oInventory.productId, -iQuantity, sReference);
            
            this.getComponent().getEventBus().publish("Inventory", "GoodsIssued", { inventoryId: sInventoryId, quantity: iQuantity });
            
            return this._oRepository.update(sInventoryId, oInventory);
        },

        // Stock Transfer
        postTransfer: function (sSourceId, sTargetId, iQuantity, sReference) {
            var oSource = this.getById(sSourceId);
            var oTarget = this.getById(sTargetId);
            
            if (!oSource || !oTarget) return Promise.reject("Invalid source or target inventory.");
            
            var aErrors = this._oValidation.validateIssue(oSource, iQuantity);
            if (aErrors.length > 0) return Promise.reject(aErrors.join("\n"));
            
            oSource.availableQuantity -= iQuantity;
            oTarget.availableQuantity += iQuantity;
            
            this._recalculateStock(oSource);
            this._recalculateStock(oTarget);
            
            this._oMovementService.recordMovement("Stock Transfer (Out)", sSourceId, oSource.productId, -iQuantity, sReference);
            this._oMovementService.recordMovement("Stock Transfer (In)", sTargetId, oTarget.productId, iQuantity, sReference);
            
            this.getComponent().getEventBus().publish("Inventory", "StockTransferred", { from: sSourceId, to: sTargetId, quantity: iQuantity });
            
            this._oRepository.update(sSourceId, oSource);
            return this._oRepository.update(sTargetId, oTarget);
        },

        _recalculateStock: function (oInventory) {
            // Recalculate Current Stock Value (Mocking cost price as 10 for simplicity if not set, or reading from product)
            // In a real system, would lookup product cost or use moving average
            var iCostPrice = 10; 
            oInventory.currentStockValue = oInventory.availableQuantity * iCostPrice;
            
            if (oInventory.availableQuantity <= oInventory.reorderLevel) {
                oInventory.status = "Low Stock";
            } else if (oInventory.availableQuantity === 0) {
                oInventory.status = "Out of Stock";
            } else {
                oInventory.status = "Available";
            }
        }
    });
});

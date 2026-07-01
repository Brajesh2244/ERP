sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/service/inventory/InventoryService",
    "sap/erm/app/service/inventory/StockMovementService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, InventoryService, StockMovementService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.inventory.Dashboard", {
        onInit: function () {
            this._oInventoryService = new InventoryService(this.getOwnerComponent());
            this._oMovementService = new StockMovementService(this.getOwnerComponent());
            this.getView().setModel(new JSONModel(), "model");
            this.getRouter().getRoute("inventoryDashboard").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            this._loadDashboardData();
        },

        _loadDashboardData: function () {
            var aInventory = this._oInventoryService.getAll();
            var aMovements = this._oMovementService._oRepository.getAll() || [];

            var dTotalValue = 0;
            var aLowStock = [];
            var aOutOfStock = [];

            aInventory.forEach(function (oItem) {
                dTotalValue += (oItem.currentStockValue || 0);
                if (oItem.availableQuantity === 0) {
                    aOutOfStock.push(oItem);
                } else if (oItem.availableQuantity <= oItem.reorderLevel) {
                    aLowStock.push(oItem);
                }
            });

            this.getModel("model").setData({
                totalValue: dTotalValue.toFixed(2),
                lowStockCount: aLowStock.length,
                outOfStockCount: aOutOfStock.length,
                lowStockItems: aLowStock.slice(0, 3), // Show top 3
                outOfStockItems: aOutOfStock.slice(0, 3), // Show top 3
                recentMovements: aMovements.slice(0, 5) // Show top 5 recent
            });
        }
    });
});

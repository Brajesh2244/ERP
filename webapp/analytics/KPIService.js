sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.analytics.KPIService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
        },
        
        calculateTotalRevenue: function() {
            var oModel = this.getComponent().getModel("salesOrderModel");
            if(!oModel) return 0;
            var aOrders = oModel.getProperty("/") || [];
            return aOrders.reduce(function(sum, order) {
                return sum + (parseFloat(order.totalGrossAmount) || 0);
            }, 0);
        },
        
        calculateTotalPurchases: function() {
            var oModel = this.getComponent().getModel("purchaseOrderModel");
            if(!oModel) return 0;
            var aOrders = oModel.getProperty("/") || [];
            return aOrders.reduce(function(sum, order) {
                return sum + (parseFloat(order.totalGrossAmount) || 0);
            }, 0);
        },
        
        calculateLowStockCount: function() {
            var oModel = this.getComponent().getModel("inventoryModel");
            if(!oModel) return 0;
            var aStock = oModel.getProperty("/") || [];
            return aStock.filter(function(item) {
                return parseFloat(item.quantity) < 100; // Mock threshold
            }).length;
        },
        
        getPendingApprovalsCount: function() {
            var pCount = 0;
            var sModel = this.getComponent().getModel("salesOrderModel");
            var pModel = this.getComponent().getModel("purchaseOrderModel");
            if(sModel) {
                pCount += (sModel.getProperty("/") || []).filter(function(i){ return i.status === "PENDING_APPROVAL";}).length;
            }
            if(pModel) {
                pCount += (pModel.getProperty("/") || []).filter(function(i){ return i.status === "PENDING_APPROVAL";}).length;
            }
            return pCount;
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/analytics/AnalyticsService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, AnalyticsService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.Dashboard", {
        onInit: function () {
            this.getRouter().getRoute("dashboard").attachPatternMatched(this._onRouteMatched, this);
            this._oAnalyticsService = new AnalyticsService(this.getOwnerComponent());
            
            this.setModel(new JSONModel({}), "kpiModel");
            this.setModel(new JSONModel({}), "dashboardModel");
            this.setModel(new JSONModel({}), "chartModel");
            this.setModel(new JSONModel({
                recent: [
                    { action: "Sales Order JE-10023 Approved", time: "2 mins ago", icon: "sap-icon://accept" },
                    { action: "Goods Receipt Posted", time: "15 mins ago", icon: "sap-icon://inbox" }
                ]
            }), "auditModel");
        },

        _onRouteMatched: function () {
            this._loadDashboardConfig();
            this._loadKPIs();
            this._loadCharts();
        },
        
        _loadDashboardConfig: function() {
            var sRole = this.getModel("userModel").getProperty("/role") || "CEO";
            var aConfig = this._oAnalyticsService.getDashboardService().getDashboardConfigForRole(sRole);
            
            var oConfigMap = {
                showRevenue: aConfig.includes("Revenue"),
                showPurchases: aConfig.includes("Purchases"),
                showProfit: aConfig.includes("Profit"),
                showLowStock: aConfig.includes("LowStock"),
                showPendingApprovals: aConfig.includes("PendingApprovals")
            };
            this.getModel("dashboardModel").setData(oConfigMap);
        },
        
        _loadKPIs: function() {
            var oKPIs = {
                employees: this.getModel("employeeModel") && this.getModel("employeeModel").getProperty("/") ? this.getModel("employeeModel").getProperty("/").length : 200,
                customers: this.getModel("customerModel") && this.getModel("customerModel").getProperty("/") ? this.getModel("customerModel").getProperty("/").length : 200,
                vendors: this.getModel("vendorModel") && this.getModel("vendorModel").getProperty("/") ? this.getModel("vendorModel").getProperty("/").length : 200,
                products: this.getModel("productModel") && this.getModel("productModel").getProperty("/") ? this.getModel("productModel").getProperty("/").length : 500,
                inventoryValue: "1.25M",
                revenue: this._oAnalyticsService.getKPIService().calculateTotalRevenue() || "5.4M",
                purchases: this._oAnalyticsService.getKPIService().calculateTotalPurchases() || "2.1M",
                lowStock: this._oAnalyticsService.getKPIService().calculateLowStockCount() || 12,
                pendingApprovals: this._oAnalyticsService.getKPIService().getPendingApprovalsCount() || 5
            };
            this.getModel("kpiModel").setData(oKPIs);
        },
        
        _loadCharts: function() {
            var oTrendData = this._oAnalyticsService.getChartService().prepareRevenueTrendData();
            this.getModel("chartModel").setProperty("/revenueTrend", oTrendData);
        },
        
        onKPIPress: function(oEvent) {
            var sHeader = oEvent.getSource().getHeader();
            var sContext = "";
            if (sHeader.includes("Revenue")) sContext = "Revenue";
            if (sHeader.includes("Purchases")) sContext = "Purchases";
            if (sHeader.includes("Low Stock")) sContext = "LowStock";
            if (sHeader.includes("Approvals")) sContext = "PendingApprovals";
            
            this._oAnalyticsService.getDrillDownService().navigateToDetails(sContext, null, this.getRouter());
        }
    });
});

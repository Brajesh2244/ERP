sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/ui/model/json/JSONModel"
], function (BaseService, JSONModel) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.admin.RBACService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            // In a real app, this matrix comes from the backend
            this._oRBACMatrix = {
                "System Administrator": {
                    routes: ["*"],
                    actions: ["*"]
                },
                "Employee": {
                    routes: ["dashboard", "employeeDetail"],
                    actions: ["View"]
                },
                "Sales Manager": {
                    routes: ["dashboard", "sales", "salesList", "salesDetail", "customers", "customerDetail", "customerCreate", "customerEdit", "customerTimeline", "genericReport"],
                    actions: ["View", "Create", "Edit", "Approve", "Export"]
                },
                "Inventory Manager": {
                    routes: ["dashboard", "inventory", "inventoryDashboard", "inventoryList", "inventoryDetail", "products", "productDetail", "productCreate", "productEdit", "productTimeline"],
                    actions: ["View", "Create", "Edit", "Export"]
                },
                "Purchase Manager": {
                    routes: ["dashboard", "purchase", "purchaseList", "purchaseDetail", "vendors", "vendorDetail", "vendorCreate", "vendorEdit", "vendorTimeline"],
                    actions: ["View", "Create", "Edit", "Approve", "Export"]
                },
                "Finance Manager": {
                    routes: ["dashboard", "finance", "financeList", "financeDetail", "genericReport"],
                    actions: ["View", "Create", "Edit", "Approve", "Export"]
                },
                "Viewer": {
                    routes: ["dashboard", "employees", "employeeDetail", "customers", "customerDetail", "vendors", "vendorDetail", "products", "productDetail", "inventory", "inventoryDashboard", "inventoryList", "inventoryDetail", "sales", "salesList", "salesDetail", "purchase", "purchaseList", "purchaseDetail", "finance", "financeList", "financeDetail", "genericReport"],
                    actions: ["View"]
                }
            };
        },
        
        isRouteAllowed: function(sRole, sRoute) {
            if (!sRole) return false;
            var oRoleConfig = this._oRBACMatrix[sRole];
            if (!oRoleConfig) return false;
            
            if (oRoleConfig.routes.includes("*")) return true;
            return oRoleConfig.routes.includes(sRoute);
        },
        
        isActionAllowed: function(sRole, sAction) {
            if (!sRole) return false;
            var oRoleConfig = this._oRBACMatrix[sRole];
            if (!oRoleConfig) return false;
            
            if (oRoleConfig.actions.includes("*")) return true;
            return oRoleConfig.actions.includes(sAction);
        }
    });
});

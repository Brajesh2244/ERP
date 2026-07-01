sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.analytics.DashboardService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
        },
        
        getDashboardConfigForRole: function(sRole) {
            // RBAC layout generation
            var aConfig = [];
            
            // Everyone sees basic profile/quick actions
            
            if (sRole === "System Administrator" || sRole === "CEO") {
                aConfig.push("Revenue");
                aConfig.push("Purchases");
                aConfig.push("Profit");
                aConfig.push("LowStock");
                aConfig.push("PendingApprovals");
            } else if (sRole === "Sales Manager") {
                aConfig.push("Revenue");
                aConfig.push("PendingApprovals");
            } else if (sRole === "Purchase Manager") {
                aConfig.push("Purchases");
                aConfig.push("PendingApprovals");
            } else if (sRole === "Inventory Manager") {
                aConfig.push("LowStock");
            } else if (sRole === "Finance Manager") {
                aConfig.push("Revenue");
                aConfig.push("Purchases");
                aConfig.push("Profit");
            }
            
            return aConfig;
        }
    });
});

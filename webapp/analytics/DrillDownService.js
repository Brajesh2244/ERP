sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.analytics.DrillDownService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
        },
        
        navigateToDetails: function(sContext, oData, oRouter) {
            switch(sContext) {
                case "Revenue":
                    oRouter.navTo("genericReport", { reportId: "Sales" });
                    break;
                case "Purchases":
                    oRouter.navTo("genericReport", { reportId: "Purchase" });
                    break;
                case "LowStock":
                    oRouter.navTo("genericReport", { reportId: "Inventory" });
                    break;
                case "PendingApprovals":
                    // Route to approval inbox placeholder
                    oRouter.navTo("dashboard");
                    break;
                default:
                    break;
            }
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.admin.SystemHealthService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
        },
        getHealthMetrics: function() {
            return {
                usersOnline: Math.floor(Math.random() * 50) + 10,
                activeSessions: Math.floor(Math.random() * 200) + 50,
                memoryUsage: (Math.random() * 40 + 20).toFixed(1) + "%",
                dbStatus: "Healthy",
                eventBusStatus: "Active",
                integrationStatus: "Active",
                analyticsStatus: "Active",
                version: "1.0.0"
            };
        }
    });
});

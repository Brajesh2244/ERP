sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.shared.FormatterService", {
        statusText: function (sStatus) {
            return sStatus || "Unknown";
        },
        statusState: function (sStatus) {
            switch (sStatus) {
                case "Approved":
                case "Completed":
                case "Active":
                    return "Success";
                case "Draft":
                case "Open":
                    return "Information";
                case "Rejected":
                case "Cancelled":
                    return "Error";
                case "Inactive":
                    return "Warning";
                default:
                    return "None";
            }
        }
    });
});

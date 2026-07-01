sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.EmployeeExportService", {
        exportTable: function (oTable) {
            // Placeholder for UI5 Spreadsheet export
            console.log("Export triggered for table:", oTable.getId());
        }
    });
});

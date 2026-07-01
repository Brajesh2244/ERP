sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV"
], function (BaseObject, Export, ExportTypeCSV) {
    "use strict";

    return BaseObject.extend("sap.erm.app.service.EmployeeExportService", {
        
        exportToCSV: function(oModel, sPath) {
            var oExport = new Export({
                exportType: new ExportTypeCSV({
                    separatorChar: ","
                }),
                models: oModel,
                rows: {
                    path: sPath
                },
                columns: [
                    { name: "Employee ID", template: { content: "{EmployeeID}" } },
                    { name: "First Name", template: { content: "{FirstName}" } },
                    { name: "Last Name", template: { content: "{LastName}" } },
                    { name: "Email", template: { content: "{Email}" } },
                    { name: "Department", template: { content: "{Department}" } },
                    { name: "Designation", template: { content: "{Designation}" } },
                    { name: "Status", template: { content: "{Status}" } }
                ]
            });

            return oExport.saveFile("Employee_List").catch(function(oError) {
                console.error("Export failed:", oError);
            }).finally(function() {
                oExport.destroy();
            });
        }
    });
});

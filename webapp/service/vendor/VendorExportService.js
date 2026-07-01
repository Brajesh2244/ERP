sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.vendor.VendorExportService", {
        exportTable: function (oTable) {
            console.log("Vendor export triggered for table:", oTable.getId());
            var oEventBus = oTable.getParent().getController().getOwnerComponent().getEventBus();
            oEventBus.publish("Vendor", "VendorExported", {});
        }
    });
});

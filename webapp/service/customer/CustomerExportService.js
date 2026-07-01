sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.customer.CustomerExportService", {
        exportTable: function (oTable) {
            console.log("Customer export triggered for table:", oTable.getId());
            var oEventBus = oTable.getParent().getController().getOwnerComponent().getEventBus();
            oEventBus.publish("Customer", "CustomerExported", {});
        }
    });
});

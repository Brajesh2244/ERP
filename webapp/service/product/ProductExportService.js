sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.product.ProductExportService", {
        exportTable: function (oTable) {
            console.log("Product export triggered for table:", oTable.getId());
            var oEventBus = oTable.getParent().getController().getOwnerComponent().getEventBus();
            oEventBus.publish("Product", "ProductExported", {});
        }
    });
});

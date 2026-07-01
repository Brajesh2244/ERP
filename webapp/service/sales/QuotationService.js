sap.ui.define(["sap/erm/app/core/BaseDocumentService", "sap/erm/app/repository/sales/QuotationRepository"], function (BaseDocumentService, QuotationRepository) {
    "use strict";
    return BaseDocumentService.extend("sap.erm.app.service.sales.QuotationService", {
        constructor: function (oComponent) {
            BaseDocumentService.prototype.constructor.call(this, oComponent, "quotationModel", "salesOrderItemModel");
            this._oRepository = new QuotationRepository(oComponent);
        }
    });
});

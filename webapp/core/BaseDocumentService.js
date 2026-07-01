sap.ui.define([
    "sap/erm/app/core/BaseTransactionService"
], function (BaseTransactionService) {
    "use strict";

    return BaseTransactionService.extend("sap.erm.app.core.BaseDocumentService", {
        constructor: function (oComponent, sHeaderModel, sItemModel) {
            BaseTransactionService.prototype.constructor.call(this, oComponent, sHeaderModel);
            this.sItemModel = sItemModel;
        },
        getItemsByHeaderId: function (sHeaderId) {
            var oModel = this.getComponent().getModel(this.sItemModel);
            if (!oModel) return [];
            var aItems = oModel.getProperty("/") || [];
            return aItems.filter(function (item) {
                // By convention, assume the foreign key is the model name without 'Model' + 'Id'
                // E.g. 'salesOrder' -> 'salesOrderId'
                // For a more robust approach, we can pass the foreign key field name or just check fields
                return item.salesOrderId === sHeaderId || item.documentId === sHeaderId;
            });
        }
    });
});

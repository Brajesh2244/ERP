sap.ui.define([
    "sap/erm/app/core/BaseDocumentService"
], function (BaseDocumentService) {
    "use strict";

    return BaseDocumentService.extend("sap.erm.app.core.BaseAccountingService", {
        constructor: function (oComponent, sHeaderModel, sItemModel) {
            BaseDocumentService.prototype.constructor.call(this, oComponent, sHeaderModel, sItemModel);
        }
    });
});

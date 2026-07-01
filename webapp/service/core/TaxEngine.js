sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.core.TaxEngine", {
        calculateTax: function (dNetAmount, dTaxPct) {
            return dNetAmount * (dTaxPct / 100);
        }
    });
});

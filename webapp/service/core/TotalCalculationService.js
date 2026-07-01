sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.core.TotalCalculationService", {
        calculateDocumentTotals: function (aItems) {
            var dTotalNet = 0;
            var dTotalTax = 0;
            aItems.forEach(function (item) {
                dTotalNet += parseFloat(item.netAmount || 0);
                dTotalTax += parseFloat(item.taxAmount || 0);
            });
            return {
                totalNetAmount: dTotalNet,
                totalTaxAmount: dTotalTax,
                totalGrossAmount: dTotalNet + dTotalTax
            };
        }
    });
});

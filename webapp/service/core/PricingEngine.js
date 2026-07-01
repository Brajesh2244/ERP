sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.core.PricingEngine", {
        calculateItemPrice: function (iQty, dUnitPrice, dDiscountPct, dTaxPct) {
            var dGross = iQty * dUnitPrice;
            var dDiscountAmt = dGross * (dDiscountPct / 100);
            var dNet = dGross - dDiscountAmt;
            var dTaxAmt = dNet * (dTaxPct / 100);
            return {
                netAmount: dNet,
                taxAmount: dTaxAmt,
                grossAmount: dNet + dTaxAmt
            };
        }
    });
});

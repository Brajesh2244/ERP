sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.core.DiscountEngine", {
        calculateDiscount: function (dGrossAmount, dDiscountPct) {
            return dGrossAmount * (dDiscountPct / 100);
        }
    });
});

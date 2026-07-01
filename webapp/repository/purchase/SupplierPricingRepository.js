sap.ui.define(["sap/erm/app/core/BaseRepository"], function (BaseRepository) {
    "use strict";
    return BaseRepository.extend("sap.erm.app.repository.purchase.SupplierPricingRepository", {
        constructor: function (oComponent) {
            BaseRepository.prototype.constructor.call(this, "supplierPricingModel", oComponent);
        }
    });
});

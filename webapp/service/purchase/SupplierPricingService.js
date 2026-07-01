sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/repository/purchase/SupplierPricingRepository",
    "sap/erm/app/service/core/PricingEngine"
], function (BaseService, SupplierPricingRepository, PricingEngine) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.purchase.SupplierPricingService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oRepository = new SupplierPricingRepository(oComponent);
            this._oPricingEngine = new PricingEngine(oComponent);
        },
        getPreferredPrice: function (sVendorId, sProductId) {
            var aPrices = this._oRepository.getAll() || [];
            var oMatch = aPrices.find(function(p) { return p.vendorId === sVendorId && p.productId === sProductId; });
            return oMatch ? oMatch.purchasePrice : 0;
        }
    });
});

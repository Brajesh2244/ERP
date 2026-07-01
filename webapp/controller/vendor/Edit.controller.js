sap.ui.define([
    "sap/erm/app/core/MasterDataEditController",
    "sap/erm/app/service/vendor/VendorService",
    "sap/erm/app/service/vendor/VendorValidationService"
], function (MasterDataEditController, VendorService, VendorValidationService) {
    "use strict";

    return MasterDataEditController.extend("sap.erm.app.controller.vendor.Edit", {
        onInitHook: function () {
            this._oService = new VendorService(this.getOwnerComponent());
            this._oValidationService = new VendorValidationService(this.getOwnerComponent());
        },
        getRouteName: function () { return "vendorEdit"; },
        getDetailRouteName: function () { return "vendorDetail"; },
        getService: function () { return this._oService; },
        getValidationService: function () { return this._oValidationService; },
        getEntityName: function () { return "Vendor"; }
    });
});

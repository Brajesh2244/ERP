sap.ui.define([
    "sap/erm/app/core/MasterDataCreateController",
    "sap/erm/app/service/vendor/VendorService",
    "sap/erm/app/service/vendor/VendorValidationService"
], function (MasterDataCreateController, VendorService, VendorValidationService) {
    "use strict";

    return MasterDataCreateController.extend("sap.erm.app.controller.vendor.Create", {
        onInitHook: function () {
            this._oService = new VendorService(this.getOwnerComponent());
            this._oValidationService = new VendorValidationService(this.getOwnerComponent());
        },
        getRouteName: function () { return "vendorCreate"; },
        getListRouteName: function () { return "vendors"; },
        getService: function () { return this._oService; },
        getValidationService: function () { return this._oValidationService; },
        getEntityName: function () { return "Vendor"; },
        getInitialModelData: function () {
            return { vendorName: "", legalName: "", email: "", phone: "", primaryContact: "", taxId: "", vendorType: "Local" };
        }
    });
});

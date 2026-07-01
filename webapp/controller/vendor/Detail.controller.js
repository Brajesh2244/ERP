sap.ui.define([
    "sap/erm/app/core/MasterDataDetailController",
    "sap/erm/app/service/vendor/VendorService"
], function (MasterDataDetailController, VendorService) {
    "use strict";

    return MasterDataDetailController.extend("sap.erm.app.controller.vendor.Detail", {
        onInitHook: function () {
            this._oService = new VendorService(this.getOwnerComponent());
        },
        getRouteName: function () { return "vendorDetail"; },
        getListRouteName: function () { return "vendors"; },
        getEditRouteName: function () { return "vendorEdit"; },
        getTimelineRouteName: function () { return "vendorTimeline"; },
        getService: function () { return this._oService; },
        getEntityName: function () { return "Vendor"; }
    });
});

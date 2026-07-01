sap.ui.define([
    "sap/erm/app/core/MasterDataDetailController",
    "sap/erm/app/service/product/ProductService"
], function (MasterDataDetailController, ProductService) {
    "use strict";

    return MasterDataDetailController.extend("sap.erm.app.controller.product.Detail", {
        onInitHook: function () {
            this._oService = new ProductService(this.getOwnerComponent());
        },
        getRouteName: function () { return "productDetail"; },
        getListRouteName: function () { return "products"; },
        getEditRouteName: function () { return "productEdit"; },
        getTimelineRouteName: function () { return "productTimeline"; },
        getService: function () { return this._oService; },
        getEntityName: function () { return "Product"; }
    });
});

sap.ui.define([
    "sap/erm/app/core/MasterDataEditController",
    "sap/erm/app/service/product/ProductService",
    "sap/erm/app/service/product/ProductValidationService"
], function (MasterDataEditController, ProductService, ProductValidationService) {
    "use strict";

    return MasterDataEditController.extend("sap.erm.app.controller.product.Edit", {
        onInitHook: function () {
            this._oService = new ProductService(this.getOwnerComponent());
            this._oValidationService = new ProductValidationService(this.getOwnerComponent());
        },
        getRouteName: function () { return "productEdit"; },
        getDetailRouteName: function () { return "productDetail"; },
        getService: function () { return this._oService; },
        getValidationService: function () { return this._oValidationService; },
        getEntityName: function () { return "Product"; }
    });
});

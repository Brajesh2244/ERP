sap.ui.define([
    "sap/erm/app/core/MasterDataCreateController",
    "sap/erm/app/service/product/ProductService",
    "sap/erm/app/service/product/ProductValidationService"
], function (MasterDataCreateController, ProductService, ProductValidationService) {
    "use strict";

    return MasterDataCreateController.extend("sap.erm.app.controller.product.Create", {
        onInitHook: function () {
            this._oService = new ProductService(this.getOwnerComponent());
            this._oValidationService = new ProductValidationService(this.getOwnerComponent());
        },
        getRouteName: function () { return "productCreate"; },
        getListRouteName: function () { return "products"; },
        getService: function () { return this._oService; },
        getValidationService: function () { return this._oValidationService; },
        getEntityName: function () { return "Product"; },
        getInitialModelData: function () {
            return { productName: "", productCode: "", barcode: "", sellingPrice: 0, costPrice: 0, stock: 0, reorderLevel: 0 };
        }
    });
});

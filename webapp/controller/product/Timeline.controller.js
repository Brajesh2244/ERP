sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/service/product/ProductService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, ProductService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.product.Timeline", {
        onInit: function () {
            this._oService = new ProductService(this.getOwnerComponent());
            this.getView().setModel(new JSONModel(), "model");
            this.getRouter().getRoute("productTimeline").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            this._sId = oEvent.getParameter("arguments").id;
            var oProduct = this._oService.getById(this._sId);
            if (oProduct) {
                this.getModel("model").setData(oProduct);
            }
        },

        onNavBack: function () {
            this.getRouter().navTo("productDetail", { id: this._sId }, true);
        }
    });
});

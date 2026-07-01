sap.ui.define(["sap/erm/app/core/BaseController", "sap/ui/model/json/JSONModel", "sap/erm/app/services/shared/MessageService"], function (BaseController, JSONModel, MessageService) {
    "use strict";
    return BaseController.extend("sap.erm.app.controller.inventory.Edit", {
        onInit: function () {
            this._oMessageService = new MessageService(this.getOwnerComponent());
            this.getRouter().getRoute("inventoryEdit").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function (oEvent) {
            var sId = oEvent.getParameter("arguments").id;
            this.getView().setModel(new JSONModel({ id: sId, title: "Mock Edit Data", amount: 100 }), "model");
        },
        onSavePress: function () {
            this._oMessageService.showToast("Inventory updated successfully (Mock).");
            this.onNavBack();
        }
    });
});
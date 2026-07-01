sap.ui.define(["sap/erm/app/core/BaseController", "sap/ui/model/json/JSONModel", "sap/erm/app/services/shared/MessageService"], function (BaseController, JSONModel, MessageService) {
    "use strict";
    return BaseController.extend("sap.erm.app.controller.inventory.Create", {
        onInit: function () {
            this._oMessageService = new MessageService(this.getOwnerComponent());
            this.getRouter().getRoute("inventoryCreate").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function () {
            this.getView().setModel(new JSONModel({}), "model");
        },
        onSavePress: function () {
            this._oMessageService.showToast("Inventory created successfully (Mock).");
            this.onNavBack();
        }
    });
});
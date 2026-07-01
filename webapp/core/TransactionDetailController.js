sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/shared/FormatterService",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, FormatterService, MessageService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.core.TransactionDetailController", {
        formatter: new FormatterService(),
        
        onInit: function () {
            this._oMessageService = new MessageService(this.getOwnerComponent());
            this.getView().setModel(new JSONModel(), "model");
            this.getRouter().getRoute(this.getRouteName()).attachMatched(this._onRouteMatched, this);
            this.onInitHook();
        },

        onInitHook: function () {}, 
        getRouteName: function () { return ""; },
        getListRouteName: function () { return ""; },
        getService: function () { return null; },
        getEntityName: function () { return "Transaction"; },

        _onRouteMatched: function (oEvent) {
            this._sId = oEvent.getParameter("arguments").id;
            this._loadData();
        },

        _loadData: function () {
            var oRecord = this.getService().getById(this._sId);
            if (!oRecord) {
                this._oMessageService.showError(this.getEntityName() + " not found.");
                this.getRouter().navTo(this.getListRouteName());
                return;
            }
            this.getModel("model").setData(oRecord);
        },

        onNavBack: function () { this.getRouter().navTo(this.getListRouteName(), {}, true); }
    });
});

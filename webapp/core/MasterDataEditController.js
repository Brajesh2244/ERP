sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, MessageService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.core.MasterDataEditController", {
        onInit: function () {
            this._oMessageService = new MessageService(this.getOwnerComponent());
            this.getView().setModel(new JSONModel(), "model");
            this.getRouter().getRoute(this.getRouteName()).attachMatched(this._onRouteMatched, this);
            this.onInitHook();
        },

        onInitHook: function () {},
        getRouteName: function () { return ""; },
        getDetailRouteName: function () { return ""; },
        getService: function () { return null; },
        getValidationService: function () { return null; },
        getEntityName: function () { return "Record"; },

        _onRouteMatched: function (oEvent) {
            this._sId = oEvent.getParameter("arguments").id;
            var oRecord = this.getService().getById(this._sId);
            if (!oRecord) {
                this._oMessageService.showError(this.getEntityName() + " not found.");
                this.onNavBack();
                return;
            }
            this.getModel("model").setData(JSON.parse(JSON.stringify(oRecord)));
        },

        onNavBack: function () { this.getRouter().navTo(this.getDetailRouteName(), { id: this._sId }, true); },

        onSavePress: function () {
            var oData = this.getModel("model").getData();
            var aAll = this.getService().getAll(true);
            
            var aErrors = this.getValidationService().validateRecord(oData, aAll);
            if (aErrors.length > 0) {
                this._oMessageService.showError(aErrors.join("\n"));
                return;
            }

            this.getService().updateRecord(this._sId, oData).then(function() {
                this._oMessageService.showToast(this.getEntityName() + " updated successfully.");
                this.onNavBack();
            }.bind(this));
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, MessageService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.core.MasterDataCreateController", {
        onInit: function () {
            this._oMessageService = new MessageService(this.getOwnerComponent());
            this.getRouter().getRoute(this.getRouteName()).attachMatched(this._onRouteMatched, this);
            this.onInitHook();
        },

        onInitHook: function () {},
        getRouteName: function () { return ""; },
        getListRouteName: function () { return ""; },
        getService: function () { return null; },
        getValidationService: function () { return null; },
        getEntityName: function () { return "Record"; },
        getInitialModelData: function () { return {}; },

        _onRouteMatched: function () {
            this.getView().setModel(new JSONModel(this.getInitialModelData()), "model");
        },

        onNavBack: function () { this.getRouter().navTo(this.getListRouteName(), {}, true); },

        onSavePress: function () {
            var oData = this.getModel("model").getData();
            var aAll = this.getService().getAll(true);
            
            var aErrors = this.getValidationService().validateRecord(oData, aAll);
            if (aErrors.length > 0) {
                this._oMessageService.showError(aErrors.join("\n"));
                return;
            }

            this.getService().createRecord(oData).then(function() {
                this._oMessageService.showToast(this.getEntityName() + " created successfully.");
                this.onNavBack();
            }.bind(this));
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/shared/FormatterService",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (BaseController, FormatterService, MessageService, JSONModel, Fragment) {
    "use strict";

    return BaseController.extend("sap.erm.app.core.MasterDataDetailController", {
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
        getEditRouteName: function () { return ""; },
        getTimelineRouteName: function () { return ""; },
        getService: function () { return null; },
        getEntityName: function () { return "Record"; },

        _onRouteMatched: function (oEvent) {
            this._sId = oEvent.getParameter("arguments").id;
            this._loadData();
            
            var oEventBus = this.getOwnerComponent().getEventBus();
            oEventBus.publish(this.getEntityName(), this.getEntityName() + "Viewed", { id: this._sId });
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

        onNavBack: function () { this.getRouter().navTo(this.getListRouteName(), {}, true); },
        onEditPress: function () { this.getRouter().navTo(this.getEditRouteName(), { id: this._sId }); },
        onTimelinePress: function () { this.getRouter().navTo(this.getTimelineRouteName(), { id: this._sId }); },

        onDeletePress: function () {
            if (!this._pDeleteDialog) {
                this._pDeleteDialog = Fragment.load({
                    name: "sap.erm.app.fragments.ConfirmDeleteDialog", controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }
            this._pDeleteDialog.then(function(oDialog) { oDialog.open(); });
        },

        onConfirmDelete: function (oEvent) {
            this.getService().deleteRecord(this._sId).then(function() {
                this._oMessageService.showToast(this.getEntityName() + " deleted.");
                this._loadData();
                oEvent.getSource().getParent().close();
            }.bind(this));
        },

        onCancelDelete: function (oEvent) { oEvent.getSource().getParent().close(); },

        onRestorePress: function () {
            this.getService().restoreRecord(this._sId).then(function() {
                this._oMessageService.showToast(this.getEntityName() + " restored.");
                this._loadData();
            }.bind(this));
        }
    });
});

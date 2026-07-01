sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
    "use strict";

    return Controller.extend("sap.erm.app.core.BaseController", {
        
        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        getModel: function (sName) {
            return this.getView().getModel(sName) || this.getOwnerComponent().getModel(sName);
        },

        setModel: function (oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },

        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        getEventBus: function () {
            return this.getOwnerComponent().getEventBus();
        },

        hasPermission: function (sAction) {
            var oRBAC = this.getOwnerComponent()._oRBACService;
            if (!oRBAC) return true; // Fallback if not initialized
            var sRole = this.getModel("userModel") ? this.getModel("userModel").getProperty("/role") : "System Administrator";
            return oRBAC.isActionAllowed(sRole, sAction);
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("main", {}, true);
            }
        }
    });
});

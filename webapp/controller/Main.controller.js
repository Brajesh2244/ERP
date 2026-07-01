sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/shared/MessageService",
    "sap/erm/app/services/core/AuthService",
    "sap/ui/core/Configuration",
    "sap/m/ActionSheet",
    "sap/m/Button"
], function (BaseController, MessageService, AuthService, Configuration, ActionSheet, Button) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.Main", {
        onInit: function () {
            this._oMessageService = new MessageService(this.getOwnerComponent());
            this._oAuthService = new AuthService(this.getOwnerComponent());
            
            // Listen to route matched to apply RBAC to sidebar
            this.getRouter().attachRouteMatched(this._applyRBAC, this);
        },

        _applyRBAC: function () {
            var oUserModel = this.getModel("userModel");
            if (!oUserModel) return;
            var sRole = oUserModel.getProperty("/role");
            
            // Wait for RBAC service to be available
            sap.ui.require(["sap/erm/app/service/admin/RBACService"], function(RBACService) {
                var oRBAC = new RBACService(this.getOwnerComponent());
                
                var oSideNav = this.getView().byId("toolPage").getSideContent();
                var aItems = oSideNav.getItem().getItems();
                var aFixedItems = oSideNav.getFixedItem().getItems();
                
                var updateVisibility = function(aNavItems) {
                    aNavItems.forEach(function(oItem) {
                        var sKey = oItem.getKey();
                        var bAllowed = oRBAC.isRouteAllowed(sRole, sKey);
                        oItem.setVisible(bAllowed);
                    });
                };
                
                updateVisibility(aItems);
                updateVisibility(aFixedItems);
            }.bind(this));
        },

        onSideNavButtonPress: function () {
            var oAppState = this.getModel("appStateModel");
            var bExpanded = oAppState.getProperty("/isSideNavExpanded");
            oAppState.setProperty("/isSideNavExpanded", !bExpanded);
        },

        onThemeTogglePress: function () {
            var oThemeModel = this.getModel("themeModel");
            var sCurrentTheme = oThemeModel.getProperty("/currentTheme");
            
            var sNewTheme = (sCurrentTheme === "sap_fiori_3_dark" || sCurrentTheme === "sap_horizon_dark") ? 
                            "sap_horizon" : "sap_horizon_dark";
            
            Configuration.setTheme(sNewTheme);
            oThemeModel.setProperty("/currentTheme", sNewTheme);
            this._oMessageService.showToast("Theme switched to " + sNewTheme);
        },

        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            var sKey = oItem.getKey();
            this.getRouter().navTo(sKey);
        },

        onUserAvatarPress: function (oEvent) {
            var oButton = oEvent.getSource();
            
            if (!this._actionSheet) {
                this._actionSheet = new ActionSheet({
                    title: "User Profile",
                    buttons: [
                        new Button({ text: "Profile Placeholder", press: function() {
                            this._oMessageService.showToast("Profile placeholder");
                        }.bind(this)}),
                        new Button({ text: "Logout", press: this.onLogoutPress.bind(this) })
                    ]
                });
                this.getView().addDependent(this._actionSheet);
            }
            this._actionSheet.openBy(oButton);
        },

        onLogoutPress: function () {
            this._oAuthService.logout().then(function() {
                this._oMessageService.showToast("Logged out successfully");
                this.getRouter().navTo("login", {}, true);
            }.bind(this));
        },

        onNotificationsPress: function () {
            this._oMessageService.showToast("No new notifications");
        },

        onSearchPlaceholder: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            this._oMessageService.showToast("Search placeholder for: " + sQuery);
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/core/AuthService",
    "sap/erm/app/services/core/ValidationService",
    "sap/erm/app/services/shared/MessageService",
    "sap/erm/app/services/shared/LoadingService"
], function (BaseController, AuthService, ValidationService, MessageService, LoadingService) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.Login", {
        onInit: function () {
            this._oAuthService = new AuthService(this.getOwnerComponent());
            this._oValidationService = new ValidationService(this.getOwnerComponent());
            this._oMessageService = new MessageService(this.getOwnerComponent());
            this._oLoadingService = new LoadingService(this.getOwnerComponent());

            // Check if remember me was used
            var sRememberedUser = localStorage.getItem("erm_remember_me");
            if (sRememberedUser) {
                this.byId("usernameInput").setValue(sRememberedUser);
                this.byId("rememberMeCheck").setSelected(true);
            }
        },

        onLoginPress: function () {
            var sUsername = this.byId("usernameInput").getValue();
            var sPassword = this.byId("passwordInput").getValue();
            var bRememberMe = this.byId("rememberMeCheck").getSelected();

            if (this._oValidationService.isEmpty(sUsername) || this._oValidationService.isEmpty(sPassword)) {
                this._oMessageService.showError("Username and password are required.");
                return;
            }

            this._oLoadingService.show(0);

            this._oAuthService.login(sUsername, sPassword, bRememberMe).then(function(oResult) {
                this._oLoadingService.hide();
                this._oMessageService.showToast("Login successful!");
                this.getRouter().navTo("dashboard");
            }.bind(this)).catch(function(oError) {
                this._oLoadingService.hide();
                this._oMessageService.showError("Invalid credentials. Please try again.");
            }.bind(this));
        },

        onForgotPasswordPress: function () {
            this._oMessageService.showToast("Forgot Password dialog placeholder");
        }
    });
});

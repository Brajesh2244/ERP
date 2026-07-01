sap.ui.define([
    "sap/erm/app/core/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.Unauthorized", {
        onLoginPress: function () {
            this.getRouter().navTo("login", {}, true);
        }
    });
});

sap.ui.define([
    "sap/erm/app/core/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.Forbidden", {
        onDashboardPress: function () {
            this.getRouter().navTo("dashboard", {}, true);
        }
    });
});

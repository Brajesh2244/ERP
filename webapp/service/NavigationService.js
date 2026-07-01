sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    /**
     * NavigationService centralizes routing logic.
     */
    return BaseService.extend("sap.erm.app.service.NavigationService", {
        
        constructor: function(oRouter) {
            this._oRouter = oRouter;
        },

        navTo: function (sRouteName, oParameters, bReplace) {
            this._oRouter.navTo(sRouteName, oParameters, bReplace);
        },

        navToLogin: function () {
            this.navTo("login", {}, true);
        },

        navToDashboard: function () {
            this.navTo("dashboard");
        }
    });
});

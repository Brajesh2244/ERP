sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.core.NavigationService", {
        constructor: function(oRouter) {
            this._oRouter = oRouter;
        },
        navTo: function (sRouteName, oParameters, bReplace) {
            this._oRouter.navTo(sRouteName, oParameters, bReplace);
        }
    });
});

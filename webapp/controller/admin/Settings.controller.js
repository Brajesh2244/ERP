sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/service/admin/ConfigurationService"
], function (BaseController, ConfigurationService) {
    "use strict";
    return BaseController.extend("sap.erm.app.controller.admin.Settings", {
        onInit: function() {
            this._oConfigService = new ConfigurationService(this.getOwnerComponent());
        },
        onThemeChange: function(oEvent) {
            var sTheme = oEvent.getParameter("selectedItem").getKey();
            this._oConfigService.applyTheme(sTheme);
        }
    });
});

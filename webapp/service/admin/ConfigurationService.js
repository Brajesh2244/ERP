sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/ui/core/Configuration"
], function (BaseService, Configuration) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.admin.ConfigurationService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
        },
        applyTheme: function(sTheme) {
            Configuration.setTheme(sTheme);
        },
        applyLanguage: function(sLanguage) {
            Configuration.setLanguage(sLanguage);
        }
    });
});

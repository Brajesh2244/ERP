sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/config/AppConfig"
], function (BaseService, AppConfig) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.core.ConfigurationService", {
        getConfig: function (sKey) {
            return AppConfig[sKey];
        },
        isMock: function () {
            return AppConfig.isMockMode;
        }
    });
});

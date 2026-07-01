sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.core.StorageService", {
        put: function (sKey, oValue) {
            localStorage.setItem(sKey, JSON.stringify(oValue));
        },
        get: function (sKey) {
            var sValue = localStorage.getItem(sKey);
            return sValue ? JSON.parse(sValue) : null;
        },
        remove: function (sKey) {
            localStorage.removeItem(sKey);
        }
    });
});

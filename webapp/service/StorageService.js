sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    /**
     * StorageService handles local/session storage interactions.
     */
    return BaseService.extend("sap.erm.app.service.StorageService", {
        
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

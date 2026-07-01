sap.ui.define([
    "sap/ui/base/Object",
    "sap/erm/app/service/StorageService"
], function (BaseObject, StorageService) {
    "use strict";

    /**
     * SessionService handles active user session logic.
     */
    return BaseObject.extend("sap.erm.app.service.SessionService", {
        
        initSession: function (oUserContext) {
            var oStorage = new StorageService();
            oStorage.put("erm_session", oUserContext);
        },

        destroySession: function () {
            var oStorage = new StorageService();
            oStorage.remove("erm_session");
        },

        isValidSession: function () {
            var oStorage = new StorageService();
            return !!oStorage.get("erm_session");
        }
    });
});

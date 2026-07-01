sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.core.ValidationService", {
        isEmpty: function (sValue) {
            return !sValue || sValue.trim() === "";
        },
        isValidEmail: function (sEmail) {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(sEmail);
        }
    });
});

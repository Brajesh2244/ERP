sap.ui.define(["sap/erm/app/core/BaseService"], function (BaseService) {
    "use strict";
    return BaseService.extend("sap.erm.app.service.core.TransactionNumberService", {
        generateNumber: function (sPrefix) {
            var sYear = new Date().getFullYear();
            var sRandom = Math.floor(Math.random() * 900000) + 100000;
            return sPrefix + "-" + sYear + "-" + sRandom;
        }
    });
});

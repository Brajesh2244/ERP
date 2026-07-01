sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (BaseService, MessageToast, MessageBox) {
    "use strict";

    return BaseService.extend("sap.erm.app.services.shared.MessageService", {
        showToast: function (sMessage) {
            MessageToast.show(sMessage);
        },
        showError: function (sMessage) {
            MessageBox.error(sMessage);
        },
        showWarning: function (sMessage) {
            MessageBox.warning(sMessage);
        }
    });
});
